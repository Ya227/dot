import styled from '@emotion/styled';

export const DreamPage = styled.div`
  min-height: 100vh;
  padding-bottom: 3rem;
  background: var(--page);
`;

export const DreamHeader = styled.header`
  background: var(--page);
  border-bottom: 1px solid var(--border);
  padding: 1.5rem 2rem 0 2rem;
`;

export const DreamHeaderContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem;
`;

export const DreamHeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

export const DreamHeaderSubtitle = styled.span`
  font-size: 0.75rem;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
  letter-spacing: 0.05em;
  margin-bottom: 0.25rem;
`;

export const DreamHeaderTitle = styled.h1`
  font-size: 1.75rem;
  font-weight: 800;
  margin: 0;
  color: var(--violet);
`;

export const DreamHeaderProgressBlock = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 280px;
`;

export const DreamHeaderBarBg = styled.div`
  width: 100%;
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: 9999px;
  height: 12px;
  overflow: hidden;
`;

export const DreamHeaderBarFill = styled.div<{ width?: string }>`
  background: var(--purple);
  height: 100%;
  border-radius: 9999px;
  width: ${(props) => props.width || '0%'};
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1);
`;

export const DreamHeaderProgressText = styled.div`
  text-align: right;
`;

export const DreamHeaderPercentage = styled.span`
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--purple-dark);
`;

export const DreamHeaderLabel = styled.p`
  font-size: 0.65rem;
  text-transform: uppercase;
  color: var(--muted);
  margin: 0;
`;

export const DreamHeaderNavWrapper = styled.div`
  max-width: 1200px;
  margin: 1.5rem auto 0 auto;
`;

export const DreamTabs = styled.nav`
  display: flex;
  gap: 0.25rem;
`;

export const DreamTabsBtn = styled.button<{ isActive?: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  padding: 0.75rem 1.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  color: var(--muted);
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    color: var(--purple);
  }

  ${(props) =>
    props.isActive &&
    `
    border-color: var(--purple);
    color: var(--purple-dark);
    background: var(--lavender);
    border-top-left-radius: 6px;
    border-top-right-radius: 6px;
  `}
`;

export const DreamContent = styled.main`
  max-width: 1200px;
  margin: 2.5rem auto;
  padding: 0 1rem;
`;

export const BlankTab = styled.div`
  text-align: center;
  padding: 5rem 2rem;
  border: 2px dashed var(--border);
  border-radius: 1rem;
  background: var(--page);
  box-shadow: var(--shadow);
`;

export const BlankTabTitle = styled.h3`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: var(--violet);
`;

export const BlankTabText = styled.p`
  font-size: 0.875rem;
  color: var(--muted);
  margin: 0;
`;
