import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

export const FormContainer = styled.div`
  background: linear-gradient(135deg, #5B21B6 0%, #7749c1 100%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 24px;
  padding: 32px;
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  box-shadow: 0 10px 30px rgba(91, 33, 182, 0.25);
  color: #ffffff;
  box-sizing: border-box;

  /* 2. Применяем анимацию при монтировании компонента */
  animation: ${fadeIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;

  * {
    box-sizing: border-box;
  }
`;

export const FormTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 8px 0;
  font-family: 'Plus Jakarta Sans', sans-serif;
`;

export const FormSubtitle = styled.p`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 28px 0;
  line-height: 1.4;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const Label = styled.label`
  font-size: 14px;
  font-weight: 600;
  color: #ffffff;
  letter-spacing: 0.2px;
`;

export const Input = styled.input<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.hasError ? "#f87171" : "rgba(255, 255, 255, 0.4)")};
  background: #6D3ABD;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  transition: all 0.2s ease;

  color-scheme: dark; 

  &::-webkit-calendar-picker-indicator {
    filter: invert(1); 
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 0.2s ease;

    &:hover {
      opacity: 1;
    }
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? "#f87171" : "#ffffff")};
    background: #733dd0;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
  }
`;

export const Select = styled.select<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.hasError ? "#f87171" : "rgba(255, 255, 255, 0.4)")};
  background: #6D3ABD;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  cursor: pointer;
  transition: all 0.2s ease;

  option {
    background: #6D3ABD;
    color: #ffffff;
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? "#f87171" : "#ffffff")};
    background: #733dd0;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
  }
`;

export const TextArea = styled.textarea<{ hasError?: boolean }>`
  width: 100%;
  padding: 12px 16px;
  border-radius: 12px;
  border: 1px solid ${(props) => (props.hasError ? "#f87171" : "rgba(255, 255, 255, 0.4)")};
  background: #6D3ABD;
  font-size: 14px;
  color: #ffffff;
  outline: none;
  resize: vertical;
  min-height: 100px;
  font-family: inherit;
  transition: all 0.2s ease;

  &::placeholder {
    color: rgba(255, 255, 255, 0.6);
  }

  &:focus {
    border-color: ${(props) => (props.hasError ? "#f87171" : "#ffffff")};
    background: #733dd0;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.15);
  }
`;

export const ImageUploadBox = styled.label<{ hasPreview?: boolean }>`
  border: 2px dashed rgba(255, 255, 255, 0.4);
  border-radius: 16px;
  padding: ${(props) => (props.hasPreview ? "12px" : "28px 16px")};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  background-color: #6D3ABD;
  transition: all 0.2s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    border-color: #ffffff;
    background-color: #733dd0;
  }
`;

export const HiddenFileInput = styled.input`
  display: none;
`;

export const UploadText = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;

  strong {
    color: #ffffff;
    text-decoration: underline;
  }
`;

export const ImagePreview = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ErrorMessage = styled.span`
  font-size: 12px;
  color: #fca5a5;
  margin-top: 4px;
  font-weight: 500;
`;

export const SubmitButton = styled.button`
  background-color: #ffffff;
  color: #5B21B6;
  padding: 14px 24px;
  border-radius: 14px;
  border: none;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  &:hover {
    background-color: #f4f0ff;
    transform: translateY(-1px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }
`;