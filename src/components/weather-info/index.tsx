import React from "react";
import { useLocation } from "../../store";
import { getDirection, getTime } from "./helpers";
import "./styles.scss";

export const WeatherInfo = () => {
    const { weather } = useLocation();

    return weather ? (
        <div>
            <div className="wa-weather-info__header">{weather?.name || `${weather.coords.lat.toFixed(4)}, ${weather.coords.lng.toFixed(4)}`}</div>
            <div className="wa-weather-info__content">
                <div>
                    <div className="wa-weather-info__average-temperature">{weather?.averageTemperature.toFixed(1)} °C</div>
                    {weather?.icon && weather?.description && (
                        <div className="wa-weather-info__description">
                            <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
                            <div>
                                {weather?.description.substring(0, 1).toLocaleUpperCase()}
                                {weather.description.substring(1)}
                            </div>
                        </div>
                    )}
                </div>
                <div className="wa-weather-info__rows">
                    {weather?.realFeel && (
                        <div>
                            Real Feel: <span className="wa-weather-info__value">{weather?.realFeel.toFixed(1)} °C</span>
                        </div>
                    )}
                    {weather?.humidity && (
                        <div>
                            Humidity: <span className="wa-weather-info__value">{weather?.humidity}%</span>
                        </div>
                    )}
                    {weather?.windSpeed && (
                        <div>
                            Wind:{" "}
                            <span className="wa-weather-info__value">
                                {weather?.windDeg && `${getDirection(weather?.windDeg)} `}
                                {weather?.windSpeed.toFixed(0)} km/h
                            </span>
                        </div>
                    )}
                    {weather?.windGust && (
                        <div>
                            Wind Gusts: <span className="wa-weather-info__value">{weather?.windGust.toFixed(0)} km/h</span>
                        </div>
                    )}
                    {weather?.sunrise ? (
                        <div>
                            Sunrise: <span className="wa-weather-info__value">{getTime(weather?.sunrise)}</span>
                        </div>
                    ) : null}
                    {weather?.sunset ? (
                        <div>
                            Sunset: <span className="wa-weather-info__value">{getTime(weather?.sunset)}</span>
                        </div>
                    ) : null}
                </div>
            </div>
        </div>
    ) : (
        <div>loading ...</div>
    );
};
