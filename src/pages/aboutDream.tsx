import React, { useState } from "react";

import * as S from "./aboutDream.styles";
import { DashboardDream } from "../features/aboutDream/boardDream";
import { PlanDream } from "../features/aboutDream/planDream";

type TabType = "План" | "Доска" | "Ресурсы" | "Чат";

export const AboutDream: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>("План");
  const [progressPercentage, setProgressPercentage] = useState<number>(40);

  return (
    <S.DreamPage>
      <S.DreamHeader>
        <S.DreamHeaderContainer>
          <S.DreamHeaderInfo>
            <S.DreamHeaderSubtitle>Ваша мечта</S.DreamHeaderSubtitle>
            <S.DreamHeaderTitle>Speak Spanish with confidence</S.DreamHeaderTitle>
          </S.DreamHeaderInfo>

          <S.DreamHeaderProgressBlock>
            <S.DreamHeaderBarBg>
              <S.DreamHeaderBarFill width={`${progressPercentage}%`} />
            </S.DreamHeaderBarBg>
            <S.DreamHeaderProgressText>
              <S.DreamHeaderPercentage>{progressPercentage}%</S.DreamHeaderPercentage>
              <S.DreamHeaderLabel>Общий прогресс</S.DreamHeaderLabel>
            </S.DreamHeaderProgressText>
          </S.DreamHeaderProgressBlock>
        </S.DreamHeaderContainer>

        <S.DreamHeaderNavWrapper>
          <S.DreamTabs>
            {(["План", "Доска", "Ресурсы", "Чат"] as const).map((tab) => (
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
        {activeTab === "План" && <PlanDream onProgressChange={setProgressPercentage} />}

        {activeTab === "Доска" && (
          <div
            style={{
              width: "100%",
              maxWidth: "none",
              flex: 1,
              minHeight: 0,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <DashboardDream />
          </div>
        )}

        {activeTab !== "План" && activeTab !== "Доска" && (
          <S.BlankTab>
            <S.BlankTabTitle>{activeTab} Section</S.BlankTabTitle>
            <S.BlankTabText>Страница пока не готова :(())</S.BlankTabText>
          </S.BlankTab>
        )}
      </S.DreamContent>
    </S.DreamPage>
  );
};

export default AboutDream;
