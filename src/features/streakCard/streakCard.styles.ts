import styled from "@emotion/styled";

export const StreakContainer = styled.div`
  /* Нежный теплый градиентный фон для всей карточки */
  background: linear-gradient(135deg, #fffbf5 0%, #fff5eb 100%);
  border: 1px solid #fde6cc; /* Мягкая оранжевая граница */
  border-radius: 20px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(245, 158, 11, 0.06);
  width: 100%;
  max-width: 360px;
`;

export const IconWrapper = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background-color: #ffffff; /* Белый фон под иконкой для контраста */
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: var(--warning);
  box-shadow: 0 2px 8px rgba(245, 158, 11, 0.12);
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Subtitle = styled.span`
  font-size: 11px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: var(--warning);
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const Title = styled.h4`
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const Description = styled.p`
  font-size: 13px;
  color: var(--muted);
  margin: 0;
`;