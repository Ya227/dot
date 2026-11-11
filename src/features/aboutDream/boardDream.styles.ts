import styled from '@emotion/styled';

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

export const MainContent = styled.div`
  display: flex;
  gap: 16px;
  align-items: stretch;
  width: 100%;
  flex: 1;
  min-height: 0;
`;

export const BoardToplineControls = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ResizeHandle = styled.div`
  position: absolute;
  right: 2px;
  bottom: 2px;
  width: 14px;
  height: 14px;
  cursor: nwse-resize;
  background: linear-gradient(135deg, transparent 50%, rgba(0, 0, 0, 0.25) 50%);
  border-radius: 2px;
  z-index: 5;
`;

const shapeClipPathCss = (shape: ShapeType): string => {
  switch (shape) {
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
};

export const CardSurface = styled.div<{
  $bgColor: string;
  $shape: ShapeType;
  $isShaped: boolean;
  $isFreeForm: boolean;
  $isPhoto: boolean;
}>`
  position: absolute;
  inset: 0;
  background: ${(p) => p.$bgColor};
  clip-path: ${(p) => (p.$isShaped ? shapeClipPathCss(p.$shape) : undefined)};
  border-radius: ${(p) =>
    p.$shape === 'rectangle' ? '12px' : p.$isFreeForm ? '8px' : '0'};
  border: ${(p) =>
    p.$isFreeForm
      ? '1px dashed rgba(36, 40, 65, 0.18)'
      : p.$shape === 'rectangle'
        ? '1px solid rgba(36, 40, 65, 0.07)'
        : 'none'};
  box-shadow: ${(p) =>
    !p.$isShaped && p.$shape === 'rectangle'
      ? '0 8px 24px rgba(35, 39, 65, 0.10)'
      : 'none'};
  overflow: hidden;
  padding: ${(p) =>
    p.$isPhoto ? '0' : p.$isShaped ? '36px 28px 20px' : '28px 14px 14px'};
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
`;

export const PhotoContainer = styled.div<{ $bgColor: string }>`
  position: absolute;
  inset: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.$bgColor || '#EFEFEF'};
`;

export const PhotoImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const PhotoPlaceholder = styled.span`
  color: #999;
  font-size: 13px;
`;

export const TextContentWrap = styled.div`
  padding: 4px 2px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  z-index: 1;
`;

export const StickerTitle = styled.div<{ $color: string }>`
  font-weight: 600;
  font-size: 13px;
  color: ${(p) => p.$color};
  margin-bottom: 6px;
  outline: none;
  opacity: 0.85;
`;

export const EditableText = styled.div<{ $color: string; $isText?: boolean }>`
  flex: 1;
  font-size: ${(p) => (p.$isText ? '16px' : '14px')};
  line-height: 1.45;
  color: ${(p) => p.$color};
  outline: none;
  word-break: break-word;
  overflow: auto;
`;

export const LinkContentWrap = styled.div`
  padding: 4px 2px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 6px;
  position: relative;
  z-index: 1;
`;

export const LinkTitle = styled.div<{ $color: string }>`
  font-weight: 600;
  font-size: 14px;
  color: ${(p) => p.$color};
  outline: none;
`;

export const LinkInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.12);
  border-radius: 6px;
  padding: 6px 8px;
  font-size: 12px;
  color: #5b7cfa;
  background: rgba(255, 255, 255, 0.7);
  outline: none;
`;

export const LinkOpen = styled.a`
  font-size: 11px;
  color: #5b7cfa;
  word-break: break-all;
  text-decoration: underline;
`;

export const SettingsMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  margin-top: 6px;
  width: 220px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 8px 28px rgba(0, 0, 0, 0.15);
  padding: 12px;
  z-index: 50;
  border: 1px solid rgba(0, 0, 0, 0.06);
`;

export const SettingsTabs = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 10px;
`;

export const SettingsTabBtn = styled.button<{ $active: boolean }>`
  flex: 1;
  padding: 5px 0;
  font-size: 11px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: ${(p) => (p.$active ? '#34312D' : '#f0f0f0')};
  color: ${(p) => (p.$active ? '#fff' : '#333')};
`;

export const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
`;

export const ColorSwatch = styled.button<{ $color: string; $selected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: ${(p) => p.$color};
  border: ${(p) =>
    p.$selected ? '2px solid #34312D' : '1px solid rgba(0, 0, 0, 0.12)'};
  cursor: pointer;
  padding: 0;
`;

export const TransparentSwatch = styled.button<{ $selected: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  background: repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 12px 12px;
  border: ${(p) =>
    p.$selected ? '2px solid #34312D' : '1px solid rgba(0, 0, 0, 0.12)'};
  cursor: pointer;
  padding: 0;
`;

export const ShapeList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const ShapeOptionBtn = styled.button<{ $selected: boolean }>`
  text-align: left;
  padding: 6px 8px;
  font-size: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  background: ${(p) => (p.$selected ? '#EDE8FA' : 'transparent')};
  color: #34312d;
`;
