import React from "react";
import { useWeather } from "../../store";

export const WeatherBasicInfo = () => {
    const { weather } = useWeather();

    return weather ? (
        <div>
            <div>{weather?.name}</div>
            <div>{weather?.temperature.averageTemperature} Celsius</div>{" "}
        </div>
    ) : (
        <div>loading ...</div>
    );
};
