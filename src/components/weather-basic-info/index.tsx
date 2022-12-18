import React from "react";
import { useWeather } from "../../store";

export const WeatherBasicInfo = () => {
    //@ts-ignore
    const { weather } = useWeather();

    return weather ? (
        <div>
            <div>{weather?.name}</div>
            <div>{weather?.main?.temp} Celsius</div>{" "}
        </div>
    ) : (
        <div>loading ...</div>
    );
};
