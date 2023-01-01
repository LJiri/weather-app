import React from "react";
import Map from "../map";
import { WeatherInfo } from "../weather-info";
import { LocationHistory } from "../location-history";
import "./styles.scss";

export const HomePage = () => {
    return (
        <div className="wa-home-page__container">
            <div className="wa-home-page">
                <div className="wa-home-page__weather-info">
                    <WeatherInfo />
                </div>
                <div className="wa-home-page__map-header">Choose location on the map</div>
                <div className="wa-home-page__map">
                    <Map />
                </div>
                <div className="wa-home-page__weather-location-history">
                    <LocationHistory />
                </div>
            </div>
        </div>
    );
};
