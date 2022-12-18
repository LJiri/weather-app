import React from "react";
import Map from "../map";
import { WeatherBasicInfo } from "../weather-basic-info";
import "./styles.scss";

export const HomePage = () => {
    return (
        <div className="wa-home-page">
            <WeatherBasicInfo />
            <div>Location history</div>
            <Map />
        </div>
    );
};
