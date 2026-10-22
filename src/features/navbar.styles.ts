import styled from "@emotion/styled";
import { motion } from "framer-motion";

export const NavbarContainer = styled.header`
  background: rgba(255, 255, 255, .92);
  border-bottom: 1px solid #E5E7EB;
  height: 72px;
  position: sticky;
  top: 0;
  z-index: 50;
  backdrop-filter: blur(16px);
  width: 100%;
`;

export const NavInner = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: space-between;
  margin: 0 auto;
  width: min(1200px, calc(100% - 48px));
`;

export const LogoLink = styled.a`
  font-size: 24px;
  font-weight: 700;
  color: #5B21B6;
  text-decoration: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  
  .dot {
    color: #7C3AED;
    font-size: 32px;
    line-height: 0;
    margin: 0 2px;
  }
`;

export const navActions = styled.nav`
  align-items: center;
  display: flex;
  gap: 12px;
`;

export const NavLink = styled.a<{ isActive?: boolean }>`
  text-decoration: none;
  color: ${props => props.isActive ? '#7C3AED' : '#4B5563'};
  font-weight: 500;
  font-size: 15px;
  padding: 8px 12px;
  border-radius: 8px;
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    color: #7C3AED;
    background-color: #F3F4F6;
  }
  
  ${props => props.isActive && `
    background-color: #EDE9FE;
    font-weight: 600;
  `}
`;

export const AuthButton = styled.button<{ variant?: 'primary' | 'secondary' }>`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  border: none;
  transition: all 0.2s;

  ${props => props.variant === 'primary' ? `
    background-color: #7C3AED;
    color: white;
    &:hover { background-color: #6D28D9; }
  ` : `
    background: transparent;
    color: #7C3AED;
    &:hover { background-color: #EDE9FE; }
  `}
`;

export const ProfileAvatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #EDE9FE;
  border: 2px solid #7C3AED;
  cursor: pointer;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7C3AED;
  font-weight: 600;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;