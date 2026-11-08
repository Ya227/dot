import React, { useState, FormEvent } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import * as S from './RegisterPage.styles';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }
    if (formData.password.length < 6) {
      setError('Пароль должен быть не менее 6 символов');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Пароли не совпадают');
      return;
    }

    navigate('/dashboard');
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <S.InputGroup>
            <label htmlFor="name">Как вас зовут?</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Иван Иванов"
              value={formData.name}
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
              placeholder="Минимум 6 символов"
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

          <S.SubmitButton type="submit">
            Зарегистрироваться
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