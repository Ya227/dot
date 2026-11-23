import React from "react";

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import im1 from "../../public/default.jpg";
import { WelcomeBanner } from "../components/welcomeBanner/welcomeBanner";
import { DreamCard } from "../features/dreamCard/dreamCard";
import { StreakCard } from "../features/streakCard/streakCard";
import { WeekProgress } from "../features/weekProgress/weekProgress";
import { useGetMeQuery } from "../services/authApi";
import { getApiErrorMessage, useGetDreamsQuery } from "../services/dreamsApi";

const PageContainer = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 48px 40px 0; /* 48px сверху, 40px по бокам */
`;

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
`;

const DashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 32px;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const GridMessage = styled.p`
  grid-column: 1 / -1;
  color: var(--muted);
`;

const formatTargetDate = (targetDate: string | null): string => {
  if (!targetDate) {
    return "Дата не указана";
  }

  const [year, month, day] = targetDate.slice(0, 10).split("-").map(Number);
  const date = new Date(year, month - 1, day);

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return "Дата не указана";
  }

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};

function Dashboard() {
  const navigate = useNavigate();
  const { data: user } = useGetMeQuery(undefined, { refetchOnMountOrArgChange: true });
  const { data: dreams = [], isLoading, error } = useGetDreamsQuery();
  const loadError = getApiErrorMessage(error, "Не удалось загрузить список мечт");
  const username = user?.first_name?.trim() || user?.email.split("@")[0] || "пользователь";

  return (
    <PageContainer>
      <WelcomeBanner
        username={username}
        activeDreamsCount={dreams.length}
        onNewDreamClick={() => navigate("/dreamform")}
      />

      <DashboardLayout>
        <div>
          <CardsGrid>
            {isLoading ? (
              <GridMessage role="status">Загружаем мечты...</GridMessage>
            ) : error ? (
              <GridMessage role="alert">{loadError}</GridMessage>
            ) : dreams.length === 0 ? (
              <GridMessage>Пока нет мечт. Создайте первую!</GridMessage>
            ) : (
              dreams.map((dream) => (
                <DreamCard
                  key={dream.id}
                  dreamId={dream.id}
                  imageSrc={dream.image_url || im1}
                  title={dream.title}
                  progress={dream.progress}
                  targetDate={formatTargetDate(dream.target_date)}
                  onContinueChat={() => navigate(`/aboutDream/${dream.id}`)}
                />
              ))
            )}
          </CardsGrid>
        </div>

        <Sidebar>
          <StreakCard />
          <WeekProgress />
        </Sidebar>
      </DashboardLayout>
    </PageContainer>
  );
}

export default Dashboard;
