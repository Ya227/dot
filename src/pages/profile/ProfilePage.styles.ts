import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  background: #f8f9fb;
  min-height: 100vh;
  padding: 60px 24px;
  font-family: 'Plus Jakarta Sans', sans-serif;
  color: var(--ink);
`;

export const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

export const PageHeader = styled.div`
  margin-bottom: 40px;

  > span {
    color: var(--purple);
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    display: block;
    margin-bottom: 12px;
  }

  h1 {
    font-size: 40px;
    font-weight: 700;
    color: var(--violet);
    margin-bottom: 12px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 16px;
    color: var(--body);
  }
`;

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 320px 1fr;
  gap: 24px;
  align-items: start;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
  }
`;

// Profile Card
export const ProfileCard = styled.div`
  background: white;
  border-radius: 20px;
  padding: 40px 32px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  text-align: center;
`;

export const AvatarWrapper = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  margin: 0 auto 24px;

  .avatar {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: #f3e8ff;
    color: #7c3aed;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 36px;
    font-weight: 700;
    border: 2px solid #d8b4fe;
  }

  .edit-icon {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 32px;
    height: 32px;
    background: var(--purple);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    border: 3px solid white;
    cursor: pointer;
  }
`;

export const ProfileName = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 8px;
`;

export const ProfileEmail = styled.p`
  font-size: 14px;
  color: var(--body);
  margin-bottom: 24px;
`;

export const ChangePhotoBtn = styled.button`
  background: white;
  border: 1.5px solid var(--purple);
  color: var(--purple);
  border-radius: 10px;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;

  &:hover {
    background: #f9f5ff;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid var(--border);
  margin: 32px 0;
`;

export const DreamingSince = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  text-align: left;
  color: var(--body);
  font-size: 13px;

  svg {
    color: var(--purple);
    flex-shrink: 0;
    margin-top: 2px;
  }

  strong {
    display: block;
    color: var(--ink);
    font-size: 14px;
    margin-bottom: 4px;
  }
`;

// Settings
export const SettingsCard = styled.div`
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  overflow: hidden;
`;

export const Tabs = styled.div`
  display: flex;
  border-bottom: 1px solid var(--border);
  padding: 0 32px;
`;

export const Tab = styled.button<{ active?: boolean }>`
  background: none;
  border: none;
  padding: 20px 0;
  margin-right: 32px;
  font-size: 15px;
  font-weight: 600;
  color: ${({ active }) => (active ? 'var(--purple)' : 'var(--body)')};
  cursor: pointer;
  position: relative;
  font-family: inherit;
  transition: color 0.2s;

  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: var(--purple);
    opacity: ${({ active }) => (active ? 1 : 0)};
  }

  &:hover {
    color: var(--purple);
  }
`;

export const Section = styled.div`
  padding: 32px;
  border-bottom: 1px solid var(--border);

  h3 {
    font-size: 20px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 8px;
  }

  > p {
    font-size: 14px;
    color: var(--body);
    margin-bottom: 24px;
  }
`;

export const FormRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 13px;
    font-weight: 600;
    color: var(--ink);
  }

  input {
    background: #f9fafb;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 12px 16px;
    font-size: 15px;
    color: var(--ink);
    outline: none;
    font-family: inherit;
    transition: all 0.2s;

    &:focus {
      border-color: var(--purple);
      background: white;
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.1);
    }
  }
`;

export const PasswordInputWrapper = styled.div`
  position: relative;

  input {
    width: 100%;
    letter-spacing: 2px;
  }

  .change-link {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--purple);
    font-size: 13px;
    font-weight: 600;
    cursor: pointer;
    background: none;
    border: none;
    font-family: inherit;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const NotificationRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  h4 {
    font-size: 15px;
    font-weight: 600;
    color: var(--ink);
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    color: var(--body);
  }
`;

// Toggle
export const ToggleSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 26px;
  flex-shrink: 0;

  input {
    opacity: 0;
    width: 0;
    height: 0;

    &:checked + span {
      background-color: var(--purple);
    }

    &:checked + span:before {
      transform: translateX(22px);
    }
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #e5e7eb;
    transition: .4s;
    border-radius: 34px;

    &:before {
      position: absolute;
      content: "";
      height: 20px;
      width: 20px;
      left: 3px;
      bottom: 3px;
      background-color: white;
      transition: .4s;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  }
`;

export const Footer = styled.div`
  padding: 24px 32px;
  display: flex;
  justify-content: flex-end;
  background: #fafafa;
`;

export const SaveButton = styled.button`
  background: var(--purple);
  color: white;
  border: none;
  border-radius: 10px;
  padding: 12px 32px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: inherit;

  &:hover {
    background: var(--purple-dark);
  }
`;