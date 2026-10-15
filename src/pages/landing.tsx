import Navbar from "../features/header";
import React from "react";

const landingImage: string = require('../../public/cats.jpg');

function Landing() {
    return (
        <div>
            <Navbar landing />
            <img src={landingImage} alt="" />
        </div>
    )
}

export default Landing;