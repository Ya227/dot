import React from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";

import * as S from "./navbar.styles";
import { getAccessToken, useGetMeQuery } from "../services/authApi";

export const getLogoDestination = (isAuthenticated: boolean): string =>
  isAuthenticated ? "/dashboard" : "/";

export const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLandingPage = location.pathname === "/";
  const { refetch } = useGetMeQuery(undefined, { skip: !getAccessToken() });

  const handleLogoClick = async () => {
    if (!getAccessToken()) {
      navigate(getLogoDestination(false));
      return;
    }

    const result = await refetch();
    navigate(getLogoDestination(Boolean(result.data)));
  };

  return (
    <S.NavbarContainer>
      <S.NavInner>
        <S.LogoLink onClick={handleLogoClick}>
          d<span className="dot">.</span>t
        </S.LogoLink>
        {isLandingPage ? (
          <S.NavActions>
            <S.AuthButton variant="secondary" onClick={() => navigate("/login")}>
              Войти
            </S.AuthButton>
            <S.AuthButton variant="primary" onClick={() => navigate("/registration")}>
              Начать бесплатно
            </S.AuthButton>
          </S.NavActions>
        ) : (
          <S.NavActions>
            <S.NavLink
              isActive={location.pathname === "/dashboard"}
              onClick={() => navigate("/dashboard")}
            >
              Дашборд
            </S.NavLink>
            <S.NavLink
              isActive={location.pathname === "/habits"}
              onClick={() => navigate("/habits")}
            >
              Привычки
            </S.NavLink>
            <Link to="/profile">
              <S.ProfileAvatar>A</S.ProfileAvatar>
            </Link>
          </S.NavActions>
        )}
      </S.NavInner>
    </S.NavbarContainer>
  );
};

export default Navbar;
