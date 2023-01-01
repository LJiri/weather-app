import React from "react";
import Map from "../map";
import { WeatherInfo } from "../weather-info";
import { LocationHistory } from "../location-history";
import "./styles.scss";

export const HomePage = () => {
    return (
        <div className="wa-home-page">
            <WeatherInfo />
            <LocationHistory />
            <div>Choose location on the map</div>
            <Map />
        </div>
    );
};
