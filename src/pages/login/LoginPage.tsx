import React, { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as S from "./LoginPage.styles";
import { useLoginMutation, setAccessToken } from "../../services/authApi";
import { getApiErrorMessage } from "../../services/dreamsApi";

export const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [login, { isLoading }] = useLoginMutation();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim() || !formData.password) {
      setError("Пожалуйста, заполните все поля");
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError("Введите корректный email");
      return;
    }

    try {
      const data = await login({
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      }).unwrap();

      setAccessToken(data.token);
      navigate("/dashboard");
    } catch (err: any) {
      if (err?.status === 401) {
        setError("Неверный email или пароль");
      } else {
        setError(getApiErrorMessage(err, "Не удалось войти"));
      }
    }
  };

  return (
    <S.PageWrapper>
      <S.GlowOne />
      <S.GlowTwo />

      <S.FormCard>
        <S.Header>
          <h1>Войдите в аккаунт</h1>
        </S.Header>

        {error && <S.ErrorMessage>{error}</S.ErrorMessage>}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
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
              placeholder="Ваш пароль"
              value={formData.password}
              onChange={handleChange}
            />
          </S.InputGroup>

          <S.SubmitButton type="submit" disabled={isLoading}>
            {isLoading ? "Вход..." : "Войти"}
          </S.SubmitButton>
        </form>

        <S.FooterText>
          Нет аккаунта? <Link to="/registration">Зарегистрироваться</Link>
        </S.FooterText>
      </S.FormCard>
    </S.PageWrapper>
  );
};

export default LoginPage;