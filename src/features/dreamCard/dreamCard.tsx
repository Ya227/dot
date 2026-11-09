import React from "react";

import * as S from "./dreamCard.styles";

export interface DreamCardProps {
  imageSrc: string;
  title: string;
  progress: number;
  targetDate: string;
  statusText?: string;
  statusVariant?: "on-track" | "warning";
  onContinueChat?: () => void;
}

export const DreamCard: React.FC<DreamCardProps> = ({
  imageSrc,
  title,
  progress,
  targetDate,
  statusText = "On track",
  statusVariant = "on-track",
  onContinueChat,
}) => {
  return (
    <S.CardContainer>
      <S.ImageWrapper>
        <S.CardImage src={imageSrc} alt={title} />
        {statusText && (
          <S.Badge variant={statusVariant}>{statusText}</S.Badge>
        )}
      </S.ImageWrapper>

      <S.CardContent>
        <S.Title>{title}</S.Title>

        <S.ProgressSection>
          <S.ProgressHeader>
            <S.ProgressLabel>Прогресс</S.ProgressLabel>
            <S.ProgressValue>{progress}%</S.ProgressValue>
          </S.ProgressHeader>

          <S.ProgressBarTrack>
            <S.ProgressBarFill progress={progress} />
          </S.ProgressBarTrack>
        </S.ProgressSection>

        <S.CardFooter>
          <S.DateWrapper>
            <svg
              viewBox="0 0 24 24"
              fill="none"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span>{targetDate}</span>
          </S.DateWrapper>

          <S.ChatButton onClick={onContinueChat}>
            Продолжить чат
          </S.ChatButton>
        </S.CardFooter>
      </S.CardContent>
    </S.CardContainer>
  );
};

export default DreamCard;