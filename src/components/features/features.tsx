import React from "react";

const ChatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z" />
    <path d="M8 9h8M8 13h5" />
  </svg>
);

const HabitsIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 4h14v16H5z" />
    <path d="m8 9 2 2 5-5M8 16h8" />
  </svg>
);

const BoardIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <path d="M8 9h3v6H8zM15 8h2M15 12h2M15 16h2" />
  </svg>
);

const features = [
    [
      ChatIcon,
      "Планируйте через общение",
      "Рассказывайте о своих желаниях в свободной форме. Dot превратит ваши мысли в четкие и реалистичные шаги.",
    ],
    [
      HabitsIcon,
      "Наглядно отслеживайте процесс",
      "Небольшие ежедневные действия складываются в результат. Наблюдайте за своей динамикой - без таблиц и чувства вины.",
    ],
    [
      BoardIcon,
      "Держите цель перед глазами",
      "Собирайте изображения, цитаты и напоминания, которые помогут вам вспомнить, ради чего всё началось.",
    ],
  ] as const;

export const featuresList = features;