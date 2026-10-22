import React from "react";
import { useLocation } from "react-router-dom";

function Logo({ onClick }: { onClick?: () => void}) {
    return (
        <button className="logo" onClick={onClick}>
            d<span>o</span>t<span className="logo-mark">*</span>
        </button>
    )
}

function Navbar({
    page,
    go,
    openMenu,
}: {
    page: string
    go: (path: string) => void
    openMenu?: () => void
}) {
    const location = useLocation();
    const isLandingPage = location.pathname === "/";

    /*Нужно будет добавить лого и что при нажатии открывается главная страница
    Так же нужна иконка профиля, где тоже будет открываться профиль, пока просто кнопка которая не тыкается*/
    return (
        <header className="navbar">
            <div className="nav-inner">
                {isLandingPage ? (
                    <div className="nav-actions">
                        <button className="text-button" onClick={() => go("/dashboard")}>
                            Войти
                        </button>
                        <button onClick={() => go("/dashboard")}>
                            Начать бесплатно
                        </button>
                    </div>
                ) : (
                    <nav className="desktop-nav">
                        <button className={page === "/dashboard" ? "active" : ""} onClick={() => go("/dashboard")}>
                            Дашборд
                        </button>
                        <button className={page === "/dreams" ? "active" : ""} onClick={() => go("/dreams")}>
                            Мои мечты
                        </button>
                        <button className={page === "/habits" ? "active" : ""} onClick={() => go("/habits")}>
                            Привычки
                        </button>
                        <button>Профиль</button> 
                    </nav>
                )
            }
            </div>
        </header>
    )
}

export default Navbar;