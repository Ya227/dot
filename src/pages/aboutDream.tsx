import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as S from "./aboutDream.styles";
import { DashboardDream } from "../features/aboutDream/boardDream";
import { PlanDream } from "../features/aboutDream/planDream";
import { CreatePlanDream } from "../features/aboutDream/createPlanDream";
import { EditPlanDream } from "../features/aboutDream/editPlanDream";
import { useGetDreamQuery, useGetDreamsQuery } from "../services/dreamsApi";

type TabType = "План" | "Доска" | "Ресурсы" | "Чат";

export const AboutDream: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: dreams = [] } = useGetDreamsQuery();
  const [resolvedId, setResolvedId] = useState(id);
  const { data: dream, isLoading, error } = useGetDreamQuery(resolvedId || "", { skip: !resolvedId });
  const [activeTab, setActiveTab] = useState<TabType>("План");
  const [progressPercentage, setProgressPercentage] = useState<number>(0);
  const [createPlanOpen, setCreatePlanOpen] = useState(false);
  const [editPlanOpen, setEditPlanOpen] = useState(false);

  useEffect(() => {
    if (id) setResolvedId(id);
  }, [id]);

  useEffect(() => {
    if (!id && dreams.length > 0) {
      setResolvedId(dreams[0].id);
      navigate(`/aboutDream/${dreams[0].id}`, { replace: true });
    }
  }, [id, dreams, navigate]);

  useEffect(() => {
    if (dream) setProgressPercentage(dream.progress);
  }, [dream]);

  return (
    <S.DreamPage>
      <S.DreamHeader>
        <S.DreamHeaderContainer>
          <S.DreamHeaderInfo>
            <S.DreamHeaderSubtitle>Ваша мечта</S.DreamHeaderSubtitle>
            <S.DreamHeaderTitle>{dream?.title || "Загрузка мечты..."}</S.DreamHeaderTitle>
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
          {activeTab === "План" && resolvedId && (
            <S.PlanActionButton
              type="button"
              onClick={() => (dream?.stages.length ? setEditPlanOpen(true) : setCreatePlanOpen(true))}
            >
              {dream?.stages.length ? "Изменить план" : "Создать план"}
            </S.PlanActionButton>
          )}
        </S.DreamHeaderNavWrapper>
      </S.DreamHeader>

      <S.DreamContent>
        {activeTab === "План" && resolvedId && dream && (
          <PlanDream
            dreamId={resolvedId}
            stages={dream.stages}
            onProgressChange={setProgressPercentage}
          />
        )}
        {activeTab === "План" && (isLoading || (!dream && !error)) && (
          <S.BlankTab>
            <S.BlankTabText>Загружаем план мечты...</S.BlankTabText>
          </S.BlankTab>
        )}

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
            <DashboardDream key={resolvedId} dreamId={resolvedId} />
          </div>
        )}

        {activeTab !== "План" && activeTab !== "Доска" && (
          <S.BlankTab>
            <S.BlankTabTitle>{activeTab} Section</S.BlankTabTitle>
            <S.BlankTabText>Страница пока не готова :(())</S.BlankTabText>
          </S.BlankTab>
        )}
      </S.DreamContent>
      {createPlanOpen && resolvedId && (
        <CreatePlanDream dreamId={resolvedId} onClose={() => setCreatePlanOpen(false)} />
      )}
      {editPlanOpen && resolvedId && dream && (
        <EditPlanDream
          dreamId={resolvedId}
          stages={dream.stages}
          onClose={() => setEditPlanOpen(false)}
        />
      )}
    </S.DreamPage>
  );
};

export default AboutDream;
