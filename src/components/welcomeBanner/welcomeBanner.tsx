import React from "react";

import * as S from "./welcomeBanner.styles";

interface WelcomeBannerProps {
  date?: string;
  username?: string;
  activeDreamsCount?: number;
  onNewDreamClick?: () => void;
}

const getDefaultFormattedDate = (): string => {
  const formatted = new Intl.DateTimeFormat("ru-RU", {
    weekday: "long",
    day: "numeric",
    month: "long",
  }).format(new Date());

  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
};

// Возвращает согласованную фразу для любого количества мечт
const formatActiveDreamsPhrase = (count: number): { prefix: string; highlight: string } => {
  const safeCount = Math.max(0, Math.floor(count));

  if (safeCount === 0) {
    return {
      prefix: "У вас пока ",
      highlight: "нет активных мечт",
    };
  }

  const mod10 = safeCount % 10;
  const mod100 = safeCount % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return {
      prefix: "У вас имеется ",
      highlight: `${safeCount} активных мечт`,
    };
  }

  if (mod10 === 1) {
    return {
      prefix: "У вас имеется ",
      highlight: `${safeCount} активная мечта`,
    };
  }

  if (mod10 >= 2 && mod10 <= 4) {
    return {
      prefix: "У вас имеются ",
      highlight: `${safeCount} активные мечты`,
    };
  }

  return {
    prefix: "У вас имеется ",
    highlight: `${safeCount} активных мечт`,
  };
};

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  date = getDefaultFormattedDate(),
  username = "Яна",
  activeDreamsCount = 0,
  onNewDreamClick,
}) => {
  const { prefix, highlight } = formatActiveDreamsPhrase(activeDreamsCount);

  return (
    <S.BannerContainer>
      <S.TextContent>
        <S.Subtitle>{date}</S.Subtitle>
        <S.TitleWrapper>
          <h1>Здравствуйте, {username}</h1>
          <span role="img" aria-label="waving hand">
            👋
          </span>
        </S.TitleWrapper>
        <S.Description>
          {prefix}
          <strong>{highlight}</strong>.
        </S.Description>
      </S.TextContent>

      <S.NewDreamButton onClick={onNewDreamClick}>+ Новая мечта</S.NewDreamButton>
    </S.BannerContainer>
  );
};

export default WelcomeBanner;