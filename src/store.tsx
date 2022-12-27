import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { Location, Coords, Weather, WeatherSourceState, WeatherSourceActions } from "./types";
import { LocationStorage } from "./LocationStorage";

const locationStorage = new LocationStorage();

const useWeatherSource = (): {
    location: Coords;
    weather: Weather;
    locationHistory: Location[];
    setLocation: (coords: Coords) => void;
    clearLocationHistory: () => void;
    deleteLocation: (id: string) => void;
} => {
    const [{ weather, location, locationHistory }, dispatch] = useReducer(
        (state: WeatherSourceState, action: WeatherSourceActions) => {
            switch (action.type) {
                case "SET_WEATHER":
                    return {
                        ...state,
                        weather: action.payload.weather,
                        location: action.payload.location,
                        locationHistory: locationStorage.locationsExceptLast,
                    };
                case "CLEAR_LOCATION_HISTORY":
                    return { ...state, locationHistory: locationStorage.locationsExceptLast };
                case "DELETE_LOCATION":
                    return { ...state, locationHistory: locationStorage.locationsExceptLast };
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
            locationStorage.save({ coords, name: data.name });
            dispatch({ type: "SET_WEATHER", payload: { weather: weather, location: coords } });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        setLocation(location);
    }, []);

    const clearLocationHistory = useCallback(() => {
        locationStorage.deleteAllExceptLast();
        dispatch({ type: "CLEAR_LOCATION_HISTORY" });
    }, []);

    const deleteLocation = useCallback((id: string) => {
        locationStorage.deleteById(id);
        dispatch({ type: "DELETE_LOCATION" });
    }, []);

    return { location, weather, locationHistory, setLocation, clearLocationHistory, deleteLocation };
};

// check later
const WeatherContext = createContext<ReturnType<typeof useWeatherSource>>({} as unknown as ReturnType<typeof useWeatherSource>);

export const useWeather = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }: { children: React.ReactNode }) => (
    <WeatherContext.Provider value={useWeatherSource()}>{children}</WeatherContext.Provider>
);
