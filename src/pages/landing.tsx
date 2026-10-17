import React from "react";
import { useNavigate } from "react-router-dom";

const landingImage: string = require('../../public/cats.jpg');

function Landing() {
    return (
        <div>
            <img src={landingImage} alt="" />
        </div>
    )
}

export default Landing;