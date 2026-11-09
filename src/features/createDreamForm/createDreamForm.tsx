import React, { useState } from "react";

import * as S from "./createDreamForm.styles";

export interface DreamFormData {
  title: string;
  category: string;
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
    category: "",
    description: "",
    deadline: "",
    image: null,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Введите название мечты";
    }
    if (!formData.category) {
      newErrors.category = "Выберите категорию";
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Очищаем ошибку при вводе
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      if (onSubmit) {
        onSubmit(formData);
      }
      // Очистка формы при необходимости
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
              type="file"
              accept="image/*"
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

        {/* Категория */}
        <S.FormGroup>
          <S.Label htmlFor="category">Категория</S.Label>
          <S.Select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            hasError={!!errors.category}
          >
            <option value="">Выберите категорию...</option>
            <option value="business">Бизнес и карьера</option>
            <option value="travel">Путешествия</option>
            <option value="education">Образование и навыки</option>
            <option value="lifestyle">Лайфстайл и здоровье</option>
            <option value="creative">Творчество</option>
          </S.Select>
          {errors.category && <S.ErrorMessage>{errors.category}</S.ErrorMessage>}
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

        <S.SubmitButton type="submit">Создать мечту ✨</S.SubmitButton>
      </S.StyledForm>
    </S.FormContainer>
  );
};

export default CreateDreamForm;