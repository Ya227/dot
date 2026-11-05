import styled from "@emotion/styled";

export const CardContainer = styled.article`
  background: var(--page);
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow);
  }
`;

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
`;

export const CardImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

export const Badge = styled.span<{ variant?: "on-track" | "warning" }>`
  position: absolute;
  top: 12px;
  right: 12px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: 20px;
  background-color: #ffffff;
  font-size: 11px;
  font-weight: 600;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  color: ${(props) =>
    props.variant === "warning" ? "#d97706" : "var(--success)"};

  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: currentColor;
  }
`;

export const CardContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const Title = styled.h3`
  font-size: 18px;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: 20px;
  line-height: 1.3;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const ProgressSection = styled.div`
  margin-bottom: 20px;
`;

export const ProgressHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
`;

export const ProgressLabel = styled.span`
  color: var(--muted);
`;

export const ProgressValue = styled.span`
  font-weight: 600;
  color: var(--purple);
`;

export const ProgressBarTrack = styled.div`
  width: 100%;
  height: 6px;
  background-color: var(--lavender);
  border-radius: 3px;
  overflow: hidden;
`;

export const ProgressBarFill = styled.div<{ progress: number }>`
  height: 100%;
  width: ${(props) => Math.min(100, Math.max(0, props.progress))}%;
  background-color: var(--purple);
  border-radius: 3px;
  transition: width 0.3s ease;
`;

export const CardFooter = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: auto;
  padding-top: 12px;
`;

export const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: var(--muted);
  font-size: 12px;

  svg {
    width: 14px;
    height: 14px;
    stroke: currentColor;
  }
`;

export const ChatButton = styled.button`
  background: transparent;
  border: 1px solid var(--purple);
  color: var(--purple);
  font-size: 13px;
  font-weight: 600;
  padding: 8px 16px;
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--lavender);
  }
`;