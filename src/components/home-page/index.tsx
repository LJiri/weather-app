import React from "react";
import Map from "../map";
import { WeatherBasicInfo } from "../weather-basic-info";
import { LocationHistory } from "../location-history";
import "./styles.scss";

export const HomePage = () => {
    return (
        <div className="wa-home-page">
            <WeatherBasicInfo />
            <LocationHistory />
            <div>Choose location on the map</div>
            <Map />
        </div>
    );
};
