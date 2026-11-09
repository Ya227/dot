import React from "react";

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

function Dashboard() {
    const navigate = useNavigate();
    return (
        <PageContainer>
            <WelcomeBanner onNewDreamClick={() => navigate('/dreamform')} />
            
            <DashboardLayout>
                <div>
                    <CardsGrid>
                        <DreamCard
                            imageSrc={im1}
                            title="Хочу открыть котокафе"
                            progress={51}
                            targetDate="Июль 28, 2025"
                            statusText="Активно"
                            statusVariant="on-track"
                            onContinueChat={() => navigate('/dreams')}
                        />
                    </CardsGrid>
                </div>
                
                <Sidebar>
                    <StreakCard/>
                    <WeekProgress/>
                </Sidebar>

            </DashboardLayout>
        </PageContainer>

    )
}

export default Dashboard;