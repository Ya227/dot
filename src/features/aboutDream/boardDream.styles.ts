import styled from 'styled-components';

export type ShapeType = 'rectangle' | 'circle' | 'triangle' | 'star' | 'pentagon' | 'none';

const palette = {
  page: 'var(--page)',
  surface: 'var(--surface)',
  ink: 'var(--ink)',
  muted: 'var(--muted)',
  line: 'var(--border)',
  accent: 'var(--purple)',
  accentSoft: 'var(--lavender)',
};

export const DashboardContainer = styled.div`
  width: 100%;
  max-width: none;
  min-height: calc(100vh - 160px);
  height: 100%;
  padding: 16px 24px 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 16px;
  color: ${palette.ink};
  background: ${palette.page};
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
`;

export const PageHeader = styled.header`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
  flex-shrink: 0;
  @media (max-width: 640px) {
    align-items: flex-start;
    flex-direction: column;
  }
`;

export const Eyebrow = styled.div`
  margin-bottom: 6px;
  color: ${palette.accent};
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 0.16em;
`;

export const PageTitle = styled.h1`
  margin: 0;
  color: ${palette.ink};
  font-size: clamp(26px, 2.6vw, 34px);
  line-height: 1.12;
  letter-spacing: -0.045em;
  font-weight: 750;
`;

export const PageSubtitle = styled.p`
  margin: 6px 0 0;
  color: ${palette.muted};
  font-size: 13px;
  line-height: 1.5;
`;

export const HeaderMeta = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 9px;
  padding: 9px 14px;
  border: 1px solid ${palette.line};
  border-radius: 999px;
  background: ${palette.surface};
  color: #626779;
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
`;

export const StatusDot = styled.span`
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #39b980;
  box-shadow: 0 0 0 3px #e7f8f0;
`;

export const CalendarSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  label {
    margin-right: 3px;
    color: ${palette.muted};
    font-size: 9px;
    font-weight: 800;
    letter-spacing: 0.12em;
  }
  select,
  input {
    height: 36px;
    box-sizing: border-box;
    border: 1px solid ${palette.line};
    border-radius: 9px;
    background: #fff;
    color: ${palette.ink};
    padding: 0 11px;
    font: inherit;
    font-size: 12px;
    font-weight: 650;
    outline: none;
    &:focus {
      border-color: ${palette.accent};
      box-shadow: 0 0 0 3px rgba(101, 88, 211, 0.1);
    }
  }
  select {
    max-width: 145px;
  }
  input[type='number'] {
    width: 82px;
  }
`;

export const BoardFrame = styled.section`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid ${palette.line};
  border-radius: 18px;
  background: ${palette.surface};
  box-shadow: 0 8px 30px rgba(31, 37, 66, 0.045);
`;

export const BoardTopline = styled.div`
  min-height: 64px;
  box-sizing: border-box;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  border-bottom: 1px solid ${palette.line};
  flex-shrink: 0;
`;

export const BoardHeading = styled.h2`
  margin: 0;
  color: ${palette.ink};
  font-size: 15px;
  font-weight: 750;
  letter-spacing: -0.02em;
`;

export const BoardHint = styled.p`
  margin: 4px 0 0;
  color: ${palette.muted};
  font-size: 11px;
`;

export const ItemCounter = styled.span`
  padding: 7px 10px;
  border-radius: 8px;
  background: #f5f6fa;
  color: #73788a;
  font-size: 11px;
  font-weight: 650;
  white-space: nowrap;
`;

export const BoardArea = styled.div`
  position: relative;
  flex: 1;
  min-height: 520px;
  overflow: auto;
  isolation: isolate;
  background-color: #fbfbfe;
  background-image: radial-gradient(#dde0eb 1px, transparent 1px);
  background-size: 22px 22px;
`;

export const YearBadge = styled.div`
  position: sticky;
  top: 18px;
  left: 100%;
  width: max-content;
  margin: 18px 20px 0 auto;
  z-index: 1;
  pointer-events: none;
  color: #a0a3b1;
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.13em;
  span {
    color: #c0c2cd;
  }
`;

export const DraggableCard = styled.div<{
  cardType: string;
  bgColor?: string;
  shape: ShapeType;
}>`
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  padding: ${(p) => (p.shape === 'none' ? '28px 14px 14px' : '38px 20px 20px')};
  border: ${(p) =>
    p.shape === 'none'
      ? '1px dashed rgba(36, 40, 65, 0.18)'
      : '1px solid rgba(36, 40, 65, 0.07)'};
  border-radius: ${(p) =>
    p.shape === 'rectangle' || p.shape === 'none' ? '12px' : '0'};
  background: ${(p) =>
    p.bgColor || (p.shape === 'none' ? 'transparent' : '#FFFFFF')};
  box-shadow: ${(p) =>
    p.shape === 'rectangle'
      ? '0 8px 24px rgba(35, 39, 65, 0.10), 0 2px 5px rgba(35, 39, 65, 0.04)'
      : 'none'};
  z-index: 2;
  transition: box-shadow 0.18s ease;
  &:hover {
    box-shadow: ${(p) =>
      p.shape === 'rectangle'
        ? '0 13px 32px rgba(35, 39, 65, 0.14), 0 3px 8px rgba(35, 39, 65, 0.05)'
        : 'none'};
  }
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: -1;
    background: ${(p) => p.bgColor || '#FFFFFF'};
    clip-path: ${(p) => {
      switch (p.shape) {
        case 'circle':
          return 'circle(50% at 50% 50%)';
        case 'triangle':
          return 'polygon(50% 0%, 0% 100%, 100% 100%)';
        case 'star':
          return 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';
        case 'pentagon':
          return 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';
        default:
          return 'none';
      }
    }};
    display: ${(p) =>
      p.shape === 'none' || p.shape === 'rectangle' ? 'none' : 'block'};
  }
  ${(p) =>
    p.shape !== 'rectangle' && p.shape !== 'none'
      ? `
    padding: 48px 34px 30px;
    border: 0;
    filter: drop-shadow(0 5px 8px rgba(35, 39, 65, 0.13));
  `
      : ''}
`;

export const CardActions = styled.div`
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 8;
`;

export const DeleteBtn = styled.button`
  width: 27px;
  height: 27px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  color: #969aaa;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  transition: 0.18s ease;
  &:hover {
    background: #fff0f0;
    color: #e05252;
  }
`;

export const EditTriggerBtn = styled.button`
  width: 27px;
  height: 27px;
  display: grid;
  place-items: center;
  border: 0;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.72);
  color: #85899a;
  font-size: 14px;
  cursor: pointer;
  transition: 0.18s ease;
  &:hover {
    background: ${palette.accentSoft};
    color: ${palette.accent};
  }
`;

export const SidePanel = styled.aside`
  width: 152px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 4px;
`;

export const SidePanelTitle = styled.div`
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 2px;
`;

export const SideBtn = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid ${palette.line};
  border-radius: 10px;
  background: ${palette.surface};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: ${palette.ink};
  text-align: left;
  transition: border-color 0.15s, background 0.15s;
  &:hover {
    border-color: #d7d1ff;
    background: ${palette.accentSoft};
    color: ${palette.accent};
  }
`;

export const SideUploadLabel = styled.label`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid ${palette.line};
  border-radius: 10px;
  background: ${palette.surface};
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: ${palette.ink};
  transition: border-color 0.15s, background 0.15s;
  &:hover {
    border-color: #d7d1ff;
    background: ${palette.accentSoft};
    color: ${palette.accent};
  }
  input {
    display: none;
  }
`;
