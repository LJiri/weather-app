import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { LocationHistory, Coords, Weather, WeatherSourceState, WeatherSourceAction } from "./types";

const addLocationToLocalStorage = ({ coords, name }: LocationHistory) => {
    const locationHistory: LocationHistory[] = JSON.parse(localStorage.getItem("locationHistory"));

    if (locationHistory && locationHistory.length > 0) {
        const lastItem = locationHistory[locationHistory.length - 1];

        if (lastItem.coords.lat == coords.lat && lastItem.coords.lng == coords.lng) {
            return;
        }
    }

    console.log(localStorage.setItem("locationHistory", JSON.stringify([...locationHistory, { coords, name }])));
};

const useWeatherSource = (): {
    location: Coords;
    weather: Weather;
    setLocation: (coords: Coords) => void;
} => {
    const [{ weather, location }, dispatch] = useReducer(
        (state: WeatherSourceState, action: WeatherSourceAction) => {
            switch (action.type) {
                case "SET_WEATHER":
                    return { ...state, weather: action.payload.weather, location: action.payload.location };
            }
        },
        {
            location: {
                lat: 51.5072,
                lng: 0.1276,
            },
            weather: null,
            locationHistory: JSON.parse(localStorage.getItem("locationHistory")),
        },
    );

    const setLocation = useCallback(async (coords: Coords) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=f9a6a093213359be775456e986a62e93`,
            );
            const data = await response.json();
            const weather: Weather = {
                coords,
                name: data.name,
                temperature: {
                    averageTemperature: data?.main?.temp,
                },
            };
            addLocationToLocalStorage({ coords, name: data.name });
            dispatch({ type: "SET_WEATHER", payload: { weather: weather, location: coords } });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        setLocation(location);
    }, []);

    return { location: location, weather: weather, setLocation: setLocation };
};

// check later
const WeatherContext = createContext<ReturnType<typeof useWeatherSource>>({} as unknown as ReturnType<typeof useWeatherSource>);

export const useWeather = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }: { children: React.ReactNode }) => (
    <WeatherContext.Provider value={useWeatherSource()}>{children}</WeatherContext.Provider>
);
