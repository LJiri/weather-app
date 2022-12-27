import React from "react";
import { useLocation } from "../../store";

export const WeatherBasicInfo = () => {
    const { weather } = useLocation();

    return weather ? (
        <div>
            <div>{weather?.name}</div>
            <div>{weather?.temperature.averageTemperature} Celsius</div>{" "}
        </div>
    ) : (
        <div>loading ...</div>
    );
};
