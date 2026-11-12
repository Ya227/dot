import styled from '@emotion/styled';

export const PlanSection = styled.div`
  background: var(--page);
  border: 1px solid var(--border);
  border-radius: 1.25rem;
  padding: 2rem;
  box-shadow: var(--shadow);
  max-width: 800px;
  margin: 0 auto;
`;

export const PlanSectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1.5rem;
  margin-bottom: 2rem;
`;

export const PlanSectionSubtitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--purple);
`;

export const PlanSectionTitle = styled.h2`
  font-size: 1.5rem;
  margin: 0;
  color: var(--violet);
`;

export const WeeklyWidget = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: var(--surface);
  padding: 0.5rem 1rem;
  border-radius: 0.75rem;
  border: 1px solid var(--border);
`;

interface ProgressCircleProps {
  $progressDeg: number;
}

export const ProgressCircle = styled.div<ProgressCircleProps>`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  transition: background 0.35s ease;
  
  background: conic-gradient(
    var(--purple, #7C3AED) ${(props) => props.$progressDeg}deg,
    var(--lavender, #EDE9FE) ${(props) => props.$progressDeg}deg
  );
`;

export const ProgressInner = styled.div`
  width: 37px;
  height: 37px;
  border-radius: 50%;
  background: var(--surface, #fff);
  display: grid;
  place-items: center;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--purple-dark, #5B21B6);
`;

export const WeeklyWidgetInfo = styled.div``;

export const WeeklyWidgetCounter = styled.p`
  font-size: 1.125rem;
  font-weight: 700;
  color: var(--ink);
  margin: 0;
`;

export const WeeklyWidgetLabel = styled.p`
  font-size: 0.75rem;
  color: var(--muted);
  margin: 0;
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StepCardDayNumber = styled.span`
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--ink);
  transition: color 0.2s ease;
`;

export const StepCardTitle = styled.h4`
  font-size: 1rem;
  font-weight: 600;
  margin: 0;
  color: var(--ink);
  transition: color 0.2s ease;
`;

interface StepCardProps {
  status?: 'completed' | 'in_progress' | 'pending';
}

export const StepCard = styled.div<StepCardProps>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem;
  background: var(--page);
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--purple);
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(124, 58, 237, 0.04);
  }

  ${(props) => props.status === 'in_progress' && `
    border-color: var(--purple);
    background: var(--surface);
  `}

  ${(props) => props.status === 'completed' && `
    background: var(--surface);
    opacity: 0.75;
    
    span, h4 {
      color: var(--muted) !important;
      text-decoration: line-through;
    }
  `}
`;

export const StepCardLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

export const StepCardDate = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 44px;
`;

export const StepCardDayName = styled.span`
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--muted);
`;

export const StepCardStatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

interface BadgeProps {
  variant: 'completed' | 'progress' | 'pending';
}

export const StatusBadge = styled.div<BadgeProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) => props.variant === 'completed' && `
    background: var(--purple-dark);
    color: var(--page);
    font-size: 0.75rem;
    font-weight: bold;
  `}

  ${(props) => props.variant === 'progress' && `
    border: 2px solid var(--purple);
  `}

  ${(props) => props.variant === 'pending' && `
    border: 2px solid var(--border);
    background: var(--page);
  `}
`;

export const StatusBadgePulseDot = styled.div`
  width: 8px;
  height: 8px;
  background: var(--purple);
  border-radius: 50%;
`;

export const StepCardDetails = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StepCardTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

export const AiTag = styled.span`
  font-size: 0.65rem;
  background: var(--lavender);
  color: var(--purple-dark);
  padding: 0.15rem 0.5rem;
  border-radius: 9999px;
  font-weight: 600;
`;

export const StepCardMeta = styled.p`
  font-size: 0.75rem;
  color: var(--muted);
  margin: 0;
  margin-top: 0.25rem;
`;

export const StepCardCategory = styled.span`
  color: var(--body);
  font-weight: 500;
`;

export const PlanSectionFooter = styled.div`
  text-align: center;
  margin-top: 2rem;
  font-size: 0.75rem;
  color: var(--muted);
`;
