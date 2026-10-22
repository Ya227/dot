import React from "react";

import { useNavigate } from "react-router-dom";

import * as S from "./LandingPage.styles";
import ChatMockup from "../../components/chatMockup/chatMocup";
import { featuresList } from "../../components/features/features";

const featureIconClasses = ["icon-purple", "icon-green", "icon-orange"];

const SparklesIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);

export const Landing = () => {
    const navigate = useNavigate();

    return (
        <div>
            <S.HeroSection>
                <S.GlowOne />
                <S.GlowTwo />
                <S.Container>
                    <S.HeroGrid>
                        <S.HeroCopy>
                            <S.Eyebrow>
                                <SparklesIcon /> Ваши мечты теперь осуществимы
                            </S.Eyebrow>
                            <h1>
                                Превращайте свои мечты в реальность <em>шаг за шагом, в ходе общения.</em>
                            </h1>
                            <p>
                                Ваш персональный ИИ-помощник разбивает амбициозные цели на части, адаптируется к
                                неожиданным жизненным обстоятельствам и вместе с вами радуется каждому сделанному шагу.
                            </p>
                            <S.HeroActions>
                                <S.PrimaryButton onClick={() => navigate("/dashboard")}>
                                    Создайте свою первую мечту
                                </S.PrimaryButton>
                                <S.WatchLink
                                    onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
                                    <span>▶</span>
                                    Смотрите как это работает
                                </S.WatchLink>
                            </S.HeroActions>
                        </S.HeroCopy>
                        <ChatMockup />
                    </S.HeroGrid>
                </S.Container>
            </S.HeroSection>
            <S.FeaturesSection id="features">
                <S.Container>
                    <S.SectionHeading>
                        <span>Создано для реальной жизни</span>
                        <h2>Более мягкий путь к вашей цели</h2>
                        <p>
                            Никаких жестких систем. 
                            Только поддержка, мотивация и помощь в планировании, когда это необходимо. 
                            Dot помогает вам оставаться на пути к вашей мечте, даже когда жизнь становится непредсказуемой.
                        </p>
                    </S.SectionHeading>
                    <S.FeaturesGrid>
                        {featuresList.map(([icon, title, text], index) => (
                            <S.FeatureCard key={title}>
                                <S.FeatureIconWrapper className={featureIconClasses[index % featureIconClasses.length]}>
                                    {icon()}
                                </S.FeatureIconWrapper>
                                <h3>{title}</h3>
                                <p>{text}</p>
                            </S.FeatureCard>
                        ))}
                    </S.FeaturesGrid>
                </S.Container>
            </S.FeaturesSection>

            <S.CtaSection>
                <S.CtaOrb className="left" />
                <S.CtaOrb className="right" />
                <S.Container style={{position: 'relative', zIndex: 2}}>
                    <div style={{display:'flex', justifyContent:'center', marginBottom: 24, color: 'var(--violet)'}}>
                        <SparklesIcon />
                    </div>
                    <h2>Ваша мечта не должна ждать.</h2>
                    <p>Сделайте первый маленький шаг сегодня. Dot поможет вам с остальным.</p>
                    <S.PrimaryButton onClick={() => navigate("/dashboard")}>
                        Начните мечтать бесплатно <ArrowRightIcon />
                    </S.PrimaryButton>
                </S.Container>
            </S.CtaSection>
        </div>
    )
};

export default Landing;