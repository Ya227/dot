import React, { useEffect, useRef, useState } from "react";

import { getApiErrorMessage, useCreateDreamMutation } from "../../services/dreamsApi";
import * as S from "./createDreamForm.styles";

const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

const readFileAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject(new Error("Не удалось прочитать файл изображения"));
      }
    };
    reader.onerror = () =>
      reject(reader.error ?? new Error("Не удалось прочитать файл изображения"));
    reader.onabort = () => reject(new Error("Чтение файла изображения прервано"));
    reader.readAsDataURL(file);
  });

export interface DreamFormData {
  title: string;
  description: string;
  deadline: string;
  image: File | null;
}

interface CreateDreamFormProps {
  onSubmit?: (data: DreamFormData) => void;
}

export const CreateDreamForm: React.FC<CreateDreamFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<DreamFormData>({
    title: "",
    description: "",
    deadline: "",
    image: null,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitError, setSubmitError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const [createDream, { isLoading: isSubmitting }] = useCreateDreamMutation();

  useEffect(
    () => () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    },
    [imagePreviewUrl],
  );

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Введите название мечты";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Заполните описание мечты";
    }
    if (!formData.deadline) {
      newErrors.deadline = "Укажите планируемый дедлайн";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");
    setIsSubmitted(false);

    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    setIsSubmitted(false);
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      setFormData((prev) => ({ ...prev, image: null }));
      setImagePreviewUrl(null);
      setSubmitError("Выберите изображение в формате JPG, PNG или WebP.");
      e.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE_BYTES) {
      setFormData((prev) => ({ ...prev, image: null }));
      setImagePreviewUrl(null);
      setSubmitError("Размер изображения не должен превышать 5 МБ.");
      e.target.value = "";
      return;
    }

    setFormData((prev) => ({ ...prev, image: file }));
    setImagePreviewUrl(URL.createObjectURL(file));
    setSubmitError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setSubmitError("");
    setIsSubmitted(false);

    try {
      const imageUrl = formData.image ? await readFileAsDataUrl(formData.image) : null;
      await createDream({
        title: formData.title,
        description: formData.description,
        target_date: formData.deadline,
        image_url: imageUrl,
      }).unwrap();

      onSubmit?.(formData);
      setFormData({
        title: "",
        description: "",
        deadline: "",
        image: null,
      });
      setImagePreviewUrl(null);
      if (imageInputRef.current) {
        imageInputRef.current.value = "";
      }
      setIsSubmitted(true);
    } catch (error) {
      console.error("Ошибка при сохранении мечты:", error);
      setSubmitError(getApiErrorMessage(error, "Не удалось сохранить мечту. Попробуйте ещё раз."));
    }
  };

  return (
    <S.FormContainer>
      <S.FormTitle>Создать новую мечту</S.FormTitle>
      <S.FormSubtitle>Сформулируйте вашу цель и двигайтесь к ней шаг за шагом</S.FormSubtitle>

      <S.StyledForm onSubmit={handleSubmit}>
        {/* Загрузка фото */}
        <S.FormGroup>
          <S.Label>Обложка мечты</S.Label>
          <S.ImageUploadBox hasPreview={!!imagePreviewUrl}>
            <S.HiddenFileInput
              ref={imageInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
            />
            {imagePreviewUrl ? (
              <S.ImagePreview src={imagePreviewUrl} alt="Preview" />
            ) : (
              <>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <S.UploadText>
                  <strong>Нажмите, чтобы загрузить</strong> фото или перетащите его сюда
                </S.UploadText>
              </>
            )}
          </S.ImageUploadBox>
        </S.FormGroup>

        {/* Название */}
        <S.FormGroup>
          <S.Label htmlFor="title">Название мечты</S.Label>
          <S.Input
            id="title"
            name="title"
            type="text"
            placeholder="Например: Открыть уютное котокафе"
            value={formData.title}
            onChange={handleInputChange}
            hasError={!!errors.title}
          />
          {errors.title && <S.ErrorMessage>{errors.title}</S.ErrorMessage>}
        </S.FormGroup>

        {/* Дедлайн */}
        <S.FormGroup>
          <S.Label htmlFor="deadline">Планируемая дата достижения</S.Label>
          <S.Input
            id="deadline"
            name="deadline"
            type="date"
            value={formData.deadline}
            onChange={handleInputChange}
            hasError={!!errors.deadline}
          />
          {errors.deadline && <S.ErrorMessage>{errors.deadline}</S.ErrorMessage>}
        </S.FormGroup>

        {/* Описание */}
        <S.FormGroup>
          <S.Label htmlFor="description">Описание и цели</S.Label>
          <S.TextArea
            id="description"
            name="description"
            placeholder="Опишите, почему эта мечта важна для вас и какие первые шаги необходимо сделать..."
            value={formData.description}
            onChange={handleInputChange}
            hasError={!!errors.description}
          />
          {errors.description && <S.ErrorMessage>{errors.description}</S.ErrorMessage>}
        </S.FormGroup>

        {submitError && <S.ErrorMessage role="alert">{submitError}</S.ErrorMessage>}
        {isSubmitted && <S.UploadText role="status">Мечта успешно сохранена!</S.UploadText>}
        <S.SubmitButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Сохраняем..." : "Создать мечту ✨"}
        </S.SubmitButton>
      </S.StyledForm>
    </S.FormContainer>
  );
};

export default CreateDreamForm;
