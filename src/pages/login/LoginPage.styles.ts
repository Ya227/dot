import styled from '@emotion/styled';

export const PageWrapper = styled.div`
  background: linear-gradient(180deg, #ede9fe 0%, #f8f6ff 56%, #fff 100%);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
  position: relative;
  overflow: hidden;
`;

export const GlowOne = styled.div`
  border-radius: 50%;
  filter: blur(80px);
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
  bottom: -100px;
  width: 460px;
  z-index: 0;
`;

export const FormCard = styled.div`
  background: white;
  border: 1px solid var(--border);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(124, 58, 237, 0.08);
  padding: 48px 40px;
  width: 100%;
  max-width: 460px;
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Header = styled.div`
  text-align: center;
  margin-bottom: 8px;

  h1 {
    font-family: 'Plus Jakarta Sans', sans-serif;
    font-size: 32px;
    font-weight: 700;
    color: var(--violet);
    letter-spacing: -0.02em;
    margin-bottom: 12px;
  }

  p {
    font-size: 15px;
    color: var(--body);
    line-height: 1.5;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  label {
    font-size: 14px;
    font-weight: 600;
    color: var(--ink);
  }

  input {
    background: #f9fafb;
    border: 1px solid var(--border);
    border-radius: 12px;
    font-family: inherit;
    font-size: 15px;
    padding: 14px 16px;
    outline: none;
    transition: all 0.2s ease;
    color: var(--ink);

    &:focus {
      background: white;
      border-color: var(--purple);
      box-shadow: 0 0 0 4px rgba(124, 58, 237, 0.1);
    }

    &::placeholder {
      color: #9ca3af;
    }
  }
`;

export const ErrorMessage = styled.div`
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 12px;
  color: #dc2626;
  font-size: 14px;
  padding: 12px 16px;
  text-align: center;
`;

export const SubmitButton = styled.button`
  align-items: center;
  background: var(--purple);
  border: none;
  border-radius: 12px;
  color: white;
  cursor: pointer;
  display: inline-flex;
  font-family: inherit;
  font-weight: 600;
  font-size: 16px;
  gap: 8px;
  justify-content: center;
  min-height: 52px;
  padding: 0 28px;
  transition: all 0.2s ease;
  box-shadow: 0 4px 14px rgba(124, 58, 237, 0.3);
  margin-top: 8px;

  &:hover {
    background: var(--purple-dark);
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
  }
`;

export const FooterText = styled.p`
  color: var(--body);
  font-size: 14px;
  text-align: center;
  margin-top: 8px;

  a {
    color: var(--purple);
    font-weight: 600;
    text-decoration: none;
    transition: color 0.2s;

    &:hover {
      color: var(--purple-dark);
      text-decoration: underline;
    }
  }
`;