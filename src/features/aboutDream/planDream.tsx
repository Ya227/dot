import React, { useState } from 'react';
import * as S from './planDreamStyles';

export interface PlanStep {
  id: string;
  dayOfWeek: string;
  dayNumber: number;
  title: string;
  duration: string;
  category: string;
  status: 'completed' | 'in_progress' | 'pending';
  movedByAi?: boolean;
}

const initialStepsMock: PlanStep[] = [
  { id: 's1', dayOfWeek: 'MON', dayNumber: 19, title: 'Review 20 travel phrases', duration: '15 min', category: 'Vocabulary', status: 'completed' },
  { id: 's2', dayOfWeek: 'TUE', dayNumber: 20, title: 'Speaking practice', duration: '20 min', category: 'Conversation', status: 'completed' },
  { id: 's3', dayOfWeek: 'WED', dayNumber: 21, title: 'Watch an episode', duration: '25 min', category: 'Listening', status: 'in_progress' },
  { id: 's4', dayOfWeek: 'THU', dayNumber: 22, title: 'Read Chapter 1', duration: '20 min', category: 'Reading', status: 'pending', movedByAi: true },
  { id: 's5', dayOfWeek: 'SAT', dayNumber: 24, title: 'Weekly reflection', duration: '15 min', category: 'Review', status: 'pending' },
];

interface PlanDreamProps {
  onProgressChange: (percentage: number) => void;
}

export const PlanDream: React.FC<PlanDreamProps> = ({ onProgressChange }) => {
  const [steps, setSteps] = useState<PlanStep[]>(initialStepsMock);

  const handleCheckboxClick = (clickedId: string) => {
    const updatedSteps = steps.map((step): PlanStep => {
      if (step.id === clickedId) {
        return {
          ...step,
          status: step.status === 'completed' ? 'pending' : 'completed',
        };
      }
      return step;
    });

    const firstUncompletedIndex = updatedSteps.findIndex(step => step.status !== 'completed');

    const finalSteps = updatedSteps.map((step, index): PlanStep => {
      if (firstUncompletedIndex === -1) {
        return step;
      }
      if (index < firstUncompletedIndex) {
        return { ...step, status: 'completed' };
      }
      if (index === firstUncompletedIndex) {
        return { ...step, status: 'in_progress' };
      }
      return { ...step, status: 'pending' };
    });

    setSteps(finalSteps);

    const completedCount = finalSteps.filter(s => s.status === 'completed').length;
    const totalCount = finalSteps.length;
    const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
    
    onProgressChange(progressPercentage);
  };

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const totalCount = steps.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const progressDeg = (progressPercentage / 100) * 360;

  return (
    <S.PlanSection>
      <S.PlanSectionHeader>
        <div>
          <S.PlanSectionSubtitle>Your Plan</S.PlanSectionSubtitle>
          <S.PlanSectionTitle>This week</S.PlanSectionTitle>
        </div>

        <S.WeeklyWidget>
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: '50%',
              flexShrink: 0,
              background: `conic-gradient(
                var(--purple, #7C3AED) ${progressDeg}deg,
                var(--lavender, #EDE9FE) ${progressDeg}deg
              )`,
              display: 'grid',
              placeItems: 'center',
              transition: 'background 0.35s ease',
            }}
            aria-label={`Progress ${progressPercentage}%`}
          >
            <div
              style={{
                width: 37,
                height: 37,
                borderRadius: '50%',
                background: 'var(--surface, #fff)',
                display: 'grid',
                placeItems: 'center',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--purple-dark, #5B21B6)',
              }}
            >
              {progressPercentage}%
            </div>
          </div>
          
          <S.WeeklyWidgetInfo>
            <S.WeeklyWidgetCounter>
              {completedCount} of {totalCount}
            </S.WeeklyWidgetCounter>
            <S.WeeklyWidgetLabel>steps complete</S.WeeklyWidgetLabel>
          </S.WeeklyWidgetInfo>
        </S.WeeklyWidget>
      </S.PlanSectionHeader>

      <S.StepsContainer>
        {steps.map(step => {
          const isCompleted = step.status === 'completed';
          const isInProgress = step.status === 'in_progress';

          return (
            <S.StepCard key={step.id} status={step.status}>
              <S.StepCardLeft>
                <S.StepCardDate>
                  <S.StepCardDayName>{step.dayOfWeek}</S.StepCardDayName>
                  <S.StepCardDayNumber>{step.dayNumber}</S.StepCardDayNumber>
                </S.StepCardDate>

                <S.StepCardStatusWrapper
                  onClick={() => handleCheckboxClick(step.id)}
                  style={{ cursor: 'pointer' }}
                >
                  {isCompleted ? (
                    <S.StatusBadge variant="completed">✓</S.StatusBadge>
                  ) : isInProgress ? (
                    <S.StatusBadge variant="progress">
                      <S.StatusBadgePulseDot />
                    </S.StatusBadge>
                  ) : (
                    <S.StatusBadge variant="pending" />
                  )}
                </S.StepCardStatusWrapper>

                <S.StepCardDetails>
                  <S.StepCardTitleRow>
                    <S.StepCardTitle
                      style={{
                        textDecoration: isCompleted ? 'line-through' : 'none',
                        opacity: isCompleted ? 0.6 : 1,
                      }}
                    >
                      {step.title}
                    </S.StepCardTitle>
                    {step.movedByAi && <S.AiTag>✨ Moved by AI</S.AiTag>}
                  </S.StepCardTitleRow>
                  <S.StepCardMeta>
                    {step.duration} • <S.StepCardCategory>{step.category}</S.StepCardCategory>
                  </S.StepCardMeta>
                </S.StepCardDetails>
              </S.StepCardLeft>
            </S.StepCard>
          );
        })}
      </S.StepsContainer>

      <S.PlanSectionFooter>
        <span>✨ Your plan adapted to your energy level</span>
      </S.PlanSectionFooter>
    </S.PlanSection>
  );
};

export default PlanDream;
