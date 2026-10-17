import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isLandingPage = location.pathname === "/";

    const goToDashboard = () => {
        navigate("/dashboard");
    };

    return (
        <header className="navbar">
            <div className="nav-inner">
                {isLandingPage ? (
                    <div className="nav-actions">
                        <button onClick={goToDashboard}>
                            Войти
                        </button>
                        <button onClick={goToDashboard}>
                            Начать бесплатно
                        </button>
                    </div>
                ) : (
                    <nav className="desktop-nav">
                        <button>Мечты</button>
                        <button>Привычки</button>
                        <button>Профиль</button>
                    </nav>
                )
            }
            </div>
        </header>
    )
}

export default Navbar;