import React from 'react';
import Navbar from "../features/header";

const dashboardImage: string = require('../../public/сonfue.jpg');

function Dashboard() {
    return (
        <div>
            <Navbar />
            <h1>Пока не готово!</h1>
            <img src={dashboardImage} alt="" />
        </div>
    )
}

export default Dashboard;