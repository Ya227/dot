import styled from "@emotion/styled";

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
    var(--purple, #7c3aed) ${(props) => props.$progressDeg}deg,
    var(--lavender, #ede9fe) ${(props) => props.$progressDeg}deg
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
  color: var(--purple-dark, #5b21b6);
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
  status?: "completed" | "in_progress" | "pending";
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

  ${(props) =>
    props.status === "in_progress" &&
    `
    border-color: var(--purple);
    background: var(--surface);
  `}

  ${(props) =>
    props.status === "completed" &&
    `
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
  variant: "completed" | "progress" | "pending";
}

export const StatusBadge = styled.div<BadgeProps>`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  ${(props) =>
    props.variant === "completed" &&
    `
    background: var(--purple-dark);
    color: var(--page);
    font-size: 0.75rem;
    font-weight: bold;
  `}

  ${(props) =>
    props.variant === "progress" &&
    `
    border: 2px solid var(--purple);
  `}

  ${(props) =>
    props.variant === "pending" &&
    `
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

export const PlanSummary = styled.div`
  display: grid;
  grid-template-columns: minmax(280px, 1fr) repeat(3, auto);
  gap: 1.25rem;
  align-items: center;
  padding: 1.25rem 1.5rem;
  margin-bottom: 1.25rem;
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--page);
`;

export const SummaryLabel = styled.p`
  margin: 0 0 0.25rem;
  color: var(--muted);
  font-size: 0.75rem;
`;

export const SummaryValue = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--violet);
`;

export const SummaryProgressTrack = styled.div`
  height: 8px;
  margin-top: 0.45rem;
  border-radius: 999px;
  background: var(--lavender);
  overflow: hidden;
`;

export const SummaryProgressFill = styled.div<{ width: number }>`
  height: 100%;
  width: ${(props) => props.width}%;
  border-radius: inherit;
  background: var(--purple);
`;

export const SummaryStat = styled.div`
  min-width: 90px;
  text-align: center;
`;

export const SummaryStatValue = styled.div`
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--ink);
`;

export const StageCard = styled.section<{ $open: boolean }>`
  border: 1px solid var(--border);
  border-radius: 1rem;
  background: var(--page);
  overflow: hidden;
`;

export const StageHeader = styled.button`
  width: 100%;
  min-height: 68px;
  border: 0;
  background: transparent;
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto auto;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.25rem;
  color: var(--ink);
  cursor: pointer;
  text-align: left;
`;

export const StageTitle = styled.span`
  font-weight: 750;
`;

export const StageBadge = styled.span<{ $completed?: boolean }>`
  border-radius: 999px;
  padding: 0.25rem 0.55rem;
  color: ${(props) => (props.$completed ? "#16866f" : "var(--purple-dark)")};
  background: ${(props) => (props.$completed ? "#dff6ef" : "var(--lavender)")};
  font-size: 0.75rem;
  font-weight: 700;
`;

export const StageProgress = styled.span`
  color: var(--purple);
  font-weight: 800;
`;

export const StageTasks = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--border);
`;

export const TaskRow = styled.label`
  display: grid;
  grid-template-columns: 20px minmax(0, 1fr) auto;
  align-items: center;
  gap: 0.75rem;
  min-height: 52px;
  padding: 0.65rem 1.25rem;
  cursor: pointer;
`;

export const TaskCheckbox = styled.input`
  width: 18px;
  height: 18px;
  accent-color: var(--purple);
`;

export const TaskTitle = styled.span<{ $completed?: boolean }>`
  color: var(--ink);
  font-size: 0.9rem;
  ${(props) => props.$completed && `text-decoration: line-through; color: var(--muted);`}
`;

export const TaskDeadline = styled.span`
  color: var(--muted);
  font-size: 0.75rem;
  white-space: nowrap;
`;

export const EmptyPlan = styled.div`
  padding: 3.5rem 1.5rem;
  text-align: center;
  color: var(--muted);
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  padding: 1.5rem;
  background: rgba(35, 32, 52, 0.35);
`;

export const Modal = styled.div`
  width: min(720px, 100%);
  max-height: calc(100vh - 3rem);
  overflow: auto;
  border-radius: 1.25rem;
  background: var(--page);
  border: 1px solid var(--border);
  box-shadow: 0 24px 70px rgba(35, 32, 52, 0.24);
  padding: 1.5rem;
`;

export const ModalTitle = styled.h2`
  margin: 0 0 1.25rem;
  color: var(--violet);
`;

export const DraftStage = styled.div`
  border: 1px solid var(--border);
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
`;

export const DraftRow = styled.div`
  display: grid;
  grid-template-columns: minmax(160px, 1fr) 140px 18px auto;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.65rem;
`;

export const DraftInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid var(--border);
  border-radius: 0.55rem;
  padding: 0.65rem 0.75rem;
  background: var(--surface);
  color: var(--ink);
`;

export const DraftButton = styled.button`
  border: 1px solid var(--purple);
  border-radius: 0.55rem;
  background: var(--page);
  color: var(--purple-dark);
  padding: 0.55rem 0.75rem;
  cursor: pointer;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 0.75rem;
  margin-top: 1.25rem;
`;
