import React, { useState } from 'react';
import * as S from './aboutDreamStyles';
import { DashboardDream } from '../features/aboutDream/boardDream';
import { PlanDream } from '../features/aboutDream/planDream';

type TabType = 'PLAN' | 'BOARD' | 'RESOURCES' | 'CHAT';

export const AboutDream: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('PLAN');
  const [progressPercentage, setProgressPercentage] = useState<number>(40);

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
            {(['PLAN', 'BOARD', 'RESOURCES', 'CHAT'] as const).map(tab => (
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
        {activeTab === 'PLAN' && (
          <PlanDream onProgressChange={setProgressPercentage} />
        )}

        {activeTab === 'BOARD' && (
          <div
            style={{
              width: '100%',
              maxWidth: 'none',
              flex: 1,
              minHeight: 0,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <DashboardDream />
          </div>
        )}

        {activeTab !== 'PLAN' && activeTab !== 'BOARD' && (
          <S.BlankTab>
            <S.BlankTabTitle>{activeTab} Section</S.BlankTabTitle>
            <S.BlankTabText>
              This view is currently empty. Core logic will be attached later.
            </S.BlankTabText>
          </S.BlankTab>
        )}
      </S.DreamContent>
    </S.DreamPage>
  );
};

export default AboutDream;
