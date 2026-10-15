import React from "react";
import { navigateTo } from "../navigation";

function Navbar({ landing = false }: { landing?: boolean }) {
    const openDashboard = () => {
        navigateTo("/dot/dashboard");
    };

    return (
        <header className="navbar">
            <div className="nav-inner">
                {landing ? (
                    <div className="nav-actions">
                        <button onClick={openDashboard}>
                            Войти
                        </button>
                        <button onClick={openDashboard}>
                            Начать бесплатно
                        </button>
                    </div>
                ) : (
                    <>
                        <nav className="desctop-nav">
                            <button>Мечты</button>
                            <button>Привычки</button>
                            <button>Профиль</button>
                        </nav>
                    </>
                )
            }
            </div>
        </header>
    )
}

export default Navbar;