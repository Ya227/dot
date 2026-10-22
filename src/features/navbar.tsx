import React from "react";

import { useLocation, useNavigate, Link } from "react-router-dom";

import * as S from "./navbar.styles";

export const Navbar = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const isLandingPage = location.pathname === "/";
    
    return (
        <S.NavbarContainer>
            <S.NavInner >
                <S.LogoLink onClick={() => navigate("/")}>
                    d<span className="dot">.</span>t
                </S.LogoLink>
                {isLandingPage ? (
                    <S.NavActions>
                        <S.AuthButton variant="secondary" onClick={() => navigate("/dashboard")}>
                            Войти
                        </S.AuthButton>
                        <S.AuthButton variant="primary" onClick={() => navigate("/dashboard")}>
                            Начать бесплатно
                        </S.AuthButton>
                    </S.NavActions>
                ) : (
                    <S.NavActions>
                        <S.NavLink isActive={location.pathname === "/dashboard"} onClick={() => navigate("/dashboard")}>
                            Дашборд
                        </S.NavLink>
                        <S.NavLink isActive={location.pathname === "/dreams"} onClick={() => navigate("/dreams")}>
                            Мои мечты
                        </S.NavLink>
                        <S.NavLink isActive={location.pathname === "/habits"} onClick={() => navigate("/habits")}>
                            Привычки
                        </S.NavLink>
                        <Link to="/profile">
                            <S.ProfileAvatar>
                                A
                            </S.ProfileAvatar>
                        </Link>
                    </S.NavActions>
                )}
            </S.NavInner>
        </S.NavbarContainer>
    );
}

export default Navbar;