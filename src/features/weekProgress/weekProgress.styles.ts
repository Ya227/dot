import styled from "@emotion/styled";

export const WeekContainer = styled.div`
  background: var(--page);
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.02);
  width: 100%;
  max-width: 360px;
`;

export const HeaderRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.h4`
  font-size: 16px;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const DateRange = styled.span`
  font-size: 12px;
  color: var(--muted);
`;

export const DaysGrid = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
`;

export const DayItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

export const DayLabel = styled.span`
  font-size: 11px;
  font-weight: 600;
  color: var(--muted);
  text-transform: uppercase;
`;

export const DayCircle = styled.div<{ completed?: boolean; active?: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;

  /* Если день выполнен (галочка) */
  background-color: ${(props) => (props.completed ? "var(--purple)" : "transparent")};
  color: ${(props) => (props.completed ? "#ffffff" : "var(--ink)")};
  border: ${(props) => (props.completed ? "none" : "1px solid var(--border)")};

  /* Если это текущий/активный день со схемой числа */
  ${(props) =>
    props.active &&
    `
    border-color: var(--purple);
    color: var(--purple);
    background-color: var(--lavender);
  `}

  svg {
    width: 14px;
    height: 14px;
    stroke: #ffffff;
    stroke-width: 3;
  }
`;

export const Divider = styled.hr`
  border: none;
  height: 1px;
  background-color: var(--border);
  margin: 0;
`;

export const FooterInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StepsTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  font-weight: 700;
  color: var(--ink);

  svg {
    width: 16px;
    height: 16px;
    stroke: var(--success);
  }
`;

export const StepsSubtitle = styled.span`
  font-size: 12px;
  color: var(--success);
`;