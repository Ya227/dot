import React, { useEffect, useState } from "react";

import styled from "@emotion/styled";
import { useNavigate } from "react-router-dom";

import im1 from "../../public/CatsCafe.jpg";
import { WelcomeBanner } from "../components/welcomeBanner/welcomeBanner";
import { DreamCard } from "../features/dreamCard/dreamCard";
import { StreakCard } from "../features/streakCard/streakCard";
import { WeekProgress } from "../features/weekProgress/weekProgress";

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

interface Dream {
  id: string;
  title: string;
  image_url: string | null;
  target_date: string | null;
  progress: number;
}

const isDreamArray = (value: unknown): value is Dream[] =>
  Array.isArray(value) &&
  value.every((dream: unknown) => {
    if (typeof dream !== "object" || dream === null) {
      return false;
    }

    const record = dream as Record<string, unknown>;
    return (
      typeof record.id === "string" &&
      typeof record.title === "string" &&
      typeof record.progress === "number" &&
      (record.image_url === null || typeof record.image_url === "string") &&
      (record.target_date === null || typeof record.target_date === "string")
    );
  });

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
  const [dreams, setDreams] = useState<Dream[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    let isActive = true;

    const loadDreams = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/dreams");
        const result: unknown = await response.json();

        if (!response.ok) {
          const message =
            typeof result === "object" &&
            result !== null &&
            "message" in result &&
            typeof result.message === "string"
              ? result.message
              : "Не удалось загрузить список мечт";
          throw new Error(message);
        }

        if (!isDreamArray(result)) {
          throw new Error("Сервер вернул некорректный список мечт");
        }

        if (isActive) {
          setDreams(result);
        }
      } catch (error) {
        if (isActive) {
          setLoadError(
            error instanceof Error ? error.message : "Не удалось загрузить список мечт",
          );
        }
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    void loadDreams();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <PageContainer>
      <WelcomeBanner
        activeDreamsCount={dreams.length}
        onNewDreamClick={() => navigate("/dreamform")} 
        />

      <DashboardLayout>
        <div>
          <CardsGrid>
            {isLoading ? (
              <GridMessage role="status">Загружаем мечты...</GridMessage>
            ) : loadError ? (
              <GridMessage role="alert">{loadError}</GridMessage>
            ) : dreams.length === 0 ? (
              <GridMessage>Пока нет мечт. Создайте первую!</GridMessage>
            ) : (
              dreams.map((dream) => (
                <DreamCard
                  key={dream.id}
                  imageSrc={dream.image_url || im1}
                  title={dream.title}
                  progress={dream.progress}
                  targetDate={formatTargetDate(dream.target_date)}
                  onContinueChat={() => navigate("/aboutDream")}
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
