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

type TabType = 'PLAN' | 'BOARD' | 'RESOURCES' | 'CHAT';

export const AboutDream: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('PLAN');
  const [steps, setSteps] = useState<PlanStep[]>(initialStepsMock);

  const handleCheckboxClick = (clickedId: string) => {
    setSteps(prevSteps => {
      const updatedSteps = prevSteps.map(step => {
        if (step.id === clickedId) {
          return {
            ...step,
            status: step.status === 'completed' ? 'pending' : ('completed' as const),
          };
        }
        return step;
      });

     const firstUncompletedIndex = updatedSteps.findIndex(step => step.status !== 'completed');

      return updatedSteps.map((step, index) => {
        if (firstUncompletedIndex === -1) {
          return step;
        }
        if (index < firstUncompletedIndex) {
          return { ...step, status: 'completed' as const };
        }
        if (index === firstUncompletedIndex) {
          return { ...step, status: 'in_progress' as const };
        }
        return { ...step, status: 'pending' as const };
      });
    });
  };

  const completedCount = steps.filter(s => s.status === 'completed').length;
  const totalCount = steps.length;
  const progressPercentage = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <S.DreamPage>
      
      <S.DreamHeader>
        <S.DreamHeaderContainer>
          <S.DreamHeaderInfo>
            <S.DreamHeaderSubtitle>Your Dream</S.DreamHeaderSubtitle>
            <S.DreamHeaderTitle>Speak Spanish with confidence</S.DreamHeaderTitle>
          </S.DreamHeaderInfo>

          <S.DreamHeaderProgressBlock>
            <S.DreamHeaderBarBg>
              <S.DreamHeaderBarFill width={`${progressPercentage}%`} />
            </S.DreamHeaderBarBg>
            <S.DreamHeaderProgressText>
              <S.DreamHeaderPercentage>{progressPercentage}%</S.DreamHeaderPercentage>
              <S.DreamHeaderLabel>Overall Progress</S.DreamHeaderLabel>
            </S.DreamHeaderProgressText>
          </S.DreamHeaderProgressBlock>
        </S.DreamHeaderContainer>

        <S.DreamHeaderNavWrapper>
          <S.DreamTabs>
            {(['PLAN', 'BOARD', 'RESOURCES', 'CHAT'] as const).map((tab) => (
              <S.DreamTabsBtn
                key={tab}
                onClick={() => setActiveTab(tab)}
                isActive={activeTab === tab}
              >
                {tab}
              </S.DreamTabsBtn>
            ))}
          </S.DreamTabs>
        </S.DreamHeaderNavWrapper>
      </S.DreamHeader>

      <S.DreamContent>
        {activeTab === 'PLAN' ? (
          <S.PlanSection>
            
            <S.PlanSectionHeader>
              <div>
                <S.PlanSectionSubtitle>Your Plan</S.PlanSectionSubtitle>
                <S.PlanSectionTitle>This week</S.PlanSectionTitle>
              </div>
              
              <S.WeeklyWidget>
                <S.WeeklyWidgetCircle>
                  <span>{progressPercentage}%</span>
                </S.WeeklyWidgetCircle>
                <S.WeeklyWidgetInfo>
                  <S.WeeklyWidgetCounter>{completedCount} of {totalCount}</S.WeeklyWidgetCounter>
                  <S.WeeklyWidgetLabel>steps complete</S.WeeklyWidgetLabel>
                </S.WeeklyWidgetInfo>
              </S.WeeklyWidget>
            </S.PlanSectionHeader>

            <S.StepsContainer>
              {steps.map((step) => {
                const isCompleted = step.status === 'completed';
                const isInProgress = step.status === 'in_progress';

                return (
                  <S.StepCard key={step.id} status={step.status}>
                    <S.StepCardLeft>
                      <S.StepCardDate>
                        <S.StepCardDayName>{step.dayOfWeek}</S.StepCardDayName>
                        <S.StepCardDayNumber>{step.dayNumber}</S.StepCardDayNumber>
                      </S.StepCardDate>

                      <S.StepCardStatusWrapper onClick={() => handleCheckboxClick(step.id)} style={{ cursor: 'pointer' }}>
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
                          <S.StepCardTitle style={{ 
                            textDecoration: isCompleted ? 'line-through' : 'none', 
                            opacity: isCompleted ? 0.6 : 1 
                          }}>
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
        ) : (
          <S.BlankTab>
            <S.BlankTabTitle>{activeTab} Section</S.BlankTabTitle>
            <S.BlankTabText>This view is currently empty. Core logic will be attached later.</S.BlankTabText>
          </S.BlankTab>
        )}
      </S.DreamContent>
    </S.DreamPage>
  );
};

export default AboutDream;
