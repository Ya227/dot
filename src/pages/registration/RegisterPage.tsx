import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./RegisterPage.styles";
import { useRegisterMutation, setAccessToken } from "../../services/authApi";
import { getApiErrorMessage } from "../../services/dreamsApi";

// Пароль: 8–72 байта (в UTF-8 кириллица = 2 байта на символ)
const passwordByteLength = (s: string) => new TextEncoder().encode(s).length;

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [register, { isLoading }] = useRegisterMutation();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Пожалуйста, заполните email и пароль");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Введите корректный email");
      return;
    }
    const pwdBytes = passwordByteLength(formData.password);
    if (pwdBytes < 8 || pwdBytes > 72) {
      setError("Пароль должен быть от 8 до 72 байт");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    try {
      const data = await register({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        first_name: formData.firstName.trim() || undefined,
        last_name: formData.lastName.trim() || undefined,
      }).unwrap();

      setAccessToken(data.token);
      navigate("/dashboard");
    } catch (err: any) {
      // 409 — email занят
      if (err?.status === 409) {
        setError("Этот email уже зарегистрирован");
      } else if (err?.status === 400) {
        setError(getApiErrorMessage(err, "Проверьте правильность заполнения полей"));
      } else {
        setError(getApiErrorMessage(err, "Не удалось зарегистрироваться"));
      }
    }
  };

  return (
    <S.PageWrapper>
      <S.GlowOne />
      <S.GlowTwo />

      <S.FormCard>
        <S.Header>
          <h1>Создать аккаунт</h1>
          <p>Начните свой путь к мечте вместе с Dot</p>
        </S.Header>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <S.InputGroup>
            <label htmlFor="firstName">Имя</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="Анна"
              value={formData.firstName}
              onChange={handleChange}
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="lastName">Фамилия</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="Иванова"
              value={formData.lastName}
              onChange={handleChange}
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Минимум 8 символов"
              value={formData.password}
              onChange={handleChange}
            />
          </S.InputGroup>

          <S.InputGroup>
            <label htmlFor="confirmPassword">Повторите пароль</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Еще раз пароль"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </S.InputGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Регистрация..." : "Зарегистрироваться"}
          </S.SubmitButton>
        </form>

        <S.FooterText>
          Уже есть аккаунт? <Link to="/login">Войти</Link>
        </S.FooterText>
      </S.FormCard>
    </S.PageWrapper>
  );
};

export default RegisterPage;