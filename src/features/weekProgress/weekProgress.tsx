import React from "react";

import * as S from "./weekProgress.styles";

interface DayStatus {
  day: string;
  dateNum: number | string; 
  status: "completed" | "active" | "pending";
}

interface WeekProgressProps {
  dateRange?: string;
  days?: DayStatus[];
  completedStepsText?: string;
  comparisonText?: string;
}

export const WeekProgress: React.FC<WeekProgressProps> = ({
  dateRange = "Ноябрь 1-7",
  days = [
    { day: "П", dateNum: "", status: "completed" },
    { day: "В", dateNum: "", status: "completed" },
    { day: "С", dateNum: 3, status: "active" },
    { day: "Ч", dateNum: 4, status: "pending" },
    { day: "П", dateNum: 5, status: "pending" },
    { day: "С", dateNum: 6, status: "pending" },
    { day: "В", dateNum: 7, status: "pending" },
  ],
  completedStepsText = "8 шагов сделано",
  comparisonText = "Это на 3 больше чем на прошлой недели",
}) => {
  return (
    <S.WeekContainer>
      <S.HeaderRow>
        <S.Title>Эта неделя</S.Title>
        <S.DateRange>{dateRange}</S.DateRange>
      </S.HeaderRow>

      <S.DaysGrid>
        {days.map((item, index) => (
          <S.DayItem key={index}>
            <S.DayLabel>{item.day}</S.DayLabel>
            <S.DayCircle
              completed={item.status === "completed"}
              active={item.status === "active"}
            >
              {item.status === "completed" ? (
                <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              ) : (
                item.dateNum
              )}
            </S.DayCircle>
          </S.DayItem>
        ))}
      </S.DaysGrid>

      <S.Divider />

      <S.FooterInfo>
        <S.StepsTitle>
          <svg viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
            <polyline points="17 6 23 6 23 12" />
          </svg>
          <span>{completedStepsText}</span>
        </S.StepsTitle>
        <S.StepsSubtitle>{comparisonText}</S.StepsSubtitle>
      </S.FooterInfo>
    </S.WeekContainer>
  );
};

export default WeekProgress;