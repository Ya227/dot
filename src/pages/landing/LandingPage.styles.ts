import styled from '@emotion/styled';

// --- HERO SECTION ---
export const HeroSection = styled.section`
  background: linear-gradient(180deg, #ede9fe 0%, #f8f6ff 56%, #fff 100%);
  min-height: 720px;
  overflow: hidden;
  padding: 106px 0 96px;
  position: relative;
`;

export const GlowOne = styled.div`
  border-radius: 50%;
  filter: blur(80px); /* Увеличил блюр для мягкости как в Figma */
  position: absolute;
  background: rgba(255, 255, 255, 0.6);
  height: 480px;
  left: -100px;
  top: -100px;
  width: 480px;
  z-index: 0;
`;

export const GlowTwo = styled.div`
  border-radius: 50%;
  filter: blur(80px);
  position: absolute;
  border: 1px solid rgba(124, 58, 237, 0.08);
  background: rgba(237, 233, 254, 0.3);
  height: 460px;
  right: -100px;
  top: 60px;
  width: 460px;
  z-index: 0;
`;

export const Container = styled.div`
  width: min(1200px, calc(100% - 48px));
  margin-inline: auto;
  position: relative;
  z-index: 1;
`;

export const HeroGrid = styled.div`
  align-items: center;
  display: grid;
  gap: 60px;
  grid-template-columns: 1fr 1fr;
  
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    text-align: center;
  }

  @media (max-width: 600px) {
    gap: 40px;
  }
`;

export const HeroCopy = styled.div`
  h1 {
    font-size: clamp(40px, 5vw, 64px);
    line-height: 1.1;
    max-width: 600px;
    margin-inline: auto;
    color: var(--violet);
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-weight: 700;
    letter-spacing: -0.03em;
    margin-bottom: 24px;
    
    em {
      color: var(--purple);
      font-style: normal;
    }
  }
  
  > p {
    font-size: 18px;
    line-height: 1.6;
    margin-bottom: 32px;
    max-width: 520px;
    margin-inline: auto;
    color: var(--body);
  }
`;

export const Eyebrow = styled.div`
  align-items: center;
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid rgba(124, 58, 237, 0.15);
  border-radius: 100px;
  color: var(--purple);
  display: inline-flex;
  font-size: 12px;
  font-weight: 700;
  gap: 8px;
  letter-spacing: 0.05em;
  margin-bottom: 24px;
  padding: 6px 14px;
  text-transform: uppercase;
  backdrop-filter: blur(4px);
`;

export const HeroActions = styled.div`
  align-items: center;
  display: flex;
  gap: 20px;
  margin-bottom: 40px;
  justify-content: center;
  
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
  }

`;

export const PrimaryButton = styled.button`
  align-items: center;
  background: var(--purple);
  border: none;
  border-radius: 12px;
  color: white;
  display: inline-flex;
  font-weight: 600;
  font-size: 16px;
  gap: 8px;
  justify-content: center;
  min-height: 52px;
  padding: 0 28px;
  transition: all 0.2s ease;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
  
  &:hover {
    background: var(--purple-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
  }
`;

export const WatchLink = styled.button`
  align-items: center;
  background: none;
  border: none;
  color: var(--violet);
  display: flex;
  font-weight: 600;
  font-size: 15px;
  gap: 10px;
  cursor: pointer;
  padding: 0;
  
  span {
    align-items: center;
    background: white;
    border-radius: 50%;
    box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    display: flex;
    font-size: 10px;
    height: 36px;
    justify-content: center;
    width: 36px;
    color: var(--purple);
  }
  
  &:hover span {
    transform: scale(1.05);
  }
`;

// --- FEATURES SECTION ---
export const FeaturesSection = styled.section`
  padding: 100px 0;
  background: white;
`;

export const SectionHeading = styled.div`
  margin: 0 auto 60px;
  max-width: 700px;
  text-align: center;
  
  > span {
    color: var(--purple);
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 16px;
  }
  
  h2 {
    font-size: clamp(30px, 5vw, 40px);
    line-height: 1.2;
    margin-bottom: 16px;
    color: var(--violet);
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  p {
    font-size: 18px;
    line-height: 1.6;
    color: var(--body);
  }
`;

export const FeaturesGrid = styled.div`
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(3, 1fr);
  
  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

export const FeatureCard = styled.article`
  background: white;
  border: 1px solid var(--border);
  border-radius: 20px;
  padding: 32px;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  
  &:hover {
    border-color: #c4b5fd;
    box-shadow: 0 10px 30px rgba(124, 58, 237, 0.08);
    transform: translateY(-5px);
  }
  
  h3 {
    font-size: 20px;
    margin: 24px 0 12px;
    color: var(--ink);
    font-weight: 600;
  }
  
  p {
    font-size: 15px;
    line-height: 1.6;
    color: var(--body);
    margin-bottom: 24px;
    flex-grow: 1;
  }
`;

export const FeatureIconWrapper = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--purple);
  
  &.icon-purple { background: #f3e8ff; color: #7c3aed; }
  &.icon-green { background: #dcfce7; color: #10b981; }
  &.icon-orange { background: #fef3c7; color: #d97706; }
`;

// --- CTA SECTION ---
export const CtaSection = styled.section`
  background: var(--lavender);
  padding: 100px 24px;
  position: relative;
  text-align: center;
  overflow: hidden;
  
  h2 {
    font-size: clamp(30px, 5vw, 42px);
    color: var(--violet);
    margin-bottom: 16px;
    font-family: 'Plus Jakarta Sans', sans-serif;
  }
  
  p {
    font-size: 18px;
    color: var(--body);
    margin-bottom: 32px;
    max-width: 500px;
    margin-inline: auto;
  }
`;

export const CtaOrb = styled.div`
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(124, 58, 237, 0.1);
  
  &.left {
    width: 400px;
    height: 400px;
    bottom: -200px;
    left: -100px;
  }
  
  &.right {
    width: 300px;
    height: 300px;
    top: -100px;
    right: -50px;
  }
`;