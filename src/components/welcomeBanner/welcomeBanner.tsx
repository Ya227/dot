import React from "react";

import * as S from "./welcomeBanner.styles";

interface WelcomeBannerProps {
  date?: string;
  username?: string;
  activeDreamsCount?: number;
  onNewDreamClick?: () => void;
}

// Функция для правильного склонения слова "мечта"
const getDreamWord = (count: number): string => {
  const mod10 = count % 10;
  const mod100 = count % 100;

  if (mod100 >= 11 && mod100 <= 19) {
    return "активных мечт";
  }
  if (mod10 === 1) {
    return "активная мечта";
  }
  if (mod10 >= 2 && mod10 <= 4) {
    return "активные мечты";
  }
  return "активных мечт";
};

export const WelcomeBanner: React.FC<WelcomeBannerProps> = ({
  date = "Четверг, 5 ноября",
  username = "Яна",
  activeDreamsCount = 2,
  onNewDreamClick,
}) => {
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
          У вас имеются{" "}
          <strong>
            {activeDreamsCount} {getDreamWord(activeDreamsCount)}
          </strong>
          .
        </S.Description>
      </S.TextContent>

      <S.NewDreamButton onClick={onNewDreamClick}>
        + Новая мечта
      </S.NewDreamButton>
    </S.BannerContainer>
  );
};

export default WelcomeBanner;