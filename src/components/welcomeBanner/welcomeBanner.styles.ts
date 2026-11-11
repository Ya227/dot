import styled from "@emotion/styled";

export const BannerContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  width: 100%;
  margin-bottom: 40px;
  padding-top: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const TextContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Subtitle = styled.span`
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--violet);
  letter-spacing: 0.05em;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  h1 {
    font-size: 38px;
    font-weight: 800;
    color: var(--violet);
    margin: 0;
  }

  span {
    font-size: 32px;
    line-height: 1;
  }
`;

export const Description = styled.p`
  font-size: 16px;
  color: var(--body);
  margin: 0;

  strong {
    color: var(--ink);
    font-weight: 600;
  }
`;

export const NewDreamButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  background-color: var(--purple);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  padding: 12px 24px;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.35);
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background-color: var(--purple-dark);
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.45);
  }

  &:active {
    transform: translateY(0);
  }
`;