import styled from "@emotion/styled";

export const MockupContainer = styled.div`
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(124, 58, 237, 0.14);
  border-radius: 22px;
  box-shadow: 0 30px 80px rgba(91, 33, 182, 0.16);
  margin-left: auto;
  max-width: 540px;
  overflow: hidden;
  transform: rotate(1deg); /* Легкий наклон как в дизайне */
  font-family: 'Inter', sans-serif;
`;

export const MockupHead = styled.div`
  align-items: center;
  border-bottom: 1px solid #e5e7eb;
  display: flex;
  gap: 12px;
  padding: 18px 20px;
  background: white;
`;

export const AiAvatar = styled.div`
  align-items: center;
  background: #ede9fe;
  border-radius: 10px;
  color: #7c3aed;
  display: flex;
  flex: 0 0 auto;
  height: 34px;
  justify-content: center;
  width: 34px;
`;

export const HeadInfo = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 3px;
  
  strong {
    color: #1f2937;
    font-size: 13px;
  }
  
  span {
    color: #6b7280;
    font-size: 11px;
    display: flex;
    align-items: center;
    gap: 6px;
    
    &::before {
      content: '';
      background: #10b981;
      border-radius: 50%;
      display: inline-block;
      height: 6px;
      width: 6px;
    }
  }
`;

export const MoreButton = styled.button`
  background: transparent;
  border: 0;
  color: #6b7280;
  padding: 8px;
  cursor: pointer;
  font-size: 16px;
  line-height: 1;
`;

export const MockupBody = styled.div`
  background: #fcfcfd;
  display: flex;
  flex-direction: column;
  gap: 18px;
  min-height: 374px;
  padding: 34px 26px;
`;

export const Bubble = styled.div<{ isUser?: boolean }>`
  font-size: 15px;
  line-height: 1.55;
  max-width: 82%;
  padding: 13px 16px;
  align-self: ${props => props.isUser ? 'flex-end' : 'flex-start'};
  background: ${props => props.isUser ? '#7c3aed' : '#f3f4f6'};
  color: ${props => props.isUser ? 'white' : '#1f2937'};
  border-radius: ${props => props.isUser 
    ? '16px 16px 4px 16px' 
    : '16px 16px 16px 4px'};
`;

export const MiniPlan = styled.div`
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  margin-top: 13px;
  padding: 13px;
  
  strong {
    font-size: 12px;
    color: #1f2937;
    display: block;
    margin-bottom: 9px;
  }
`;

export const PlanItem = styled.p`
  align-items: center;
  display: flex;
  font-size: 11px;
  gap: 7px;
  margin-top: 9px;
  color: #4b5563;
  
  &:first-of-type { margin-top: 0; }
`;

export const StatusDot = styled.i<{ checked?: boolean }>`
  align-items: center;
  border: 1px solid ${props => props.checked ? '#10b981' : '#c4b5fd'};
  border-radius: 50%;
  color: ${props => props.checked ? 'white' : '#7c3aed'};
  background: ${props => props.checked ? '#10b981' : 'transparent'};
  display: flex;
  font-size: 9px;
  font-style: normal;
  height: 17px;
  justify-content: center;
  width: 17px;
  flex-shrink: 0;
`;

export const MockupInput = styled.div`
  align-items: center;
  border-top: 1px solid #e5e7eb;
  color: #9ca3af;
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  padding: 14px 18px;
  background: white;
  
  button {
    align-items: center;
    background: #7c3aed;
    border: 0;
    border-radius: 50%;
    color: white;
    display: flex;
    height: 34px;
    justify-content: center;
    width: 34px;
    cursor: pointer;
    transition: background 0.2s;
    
    &:hover { background: #6d28d9; }
  }
`;