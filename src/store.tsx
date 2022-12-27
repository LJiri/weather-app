import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { Location, Coords, Weather, WeatherSourceState, WeatherSourceActions } from "./types";
import { LocationStorage } from "./LocationStorage";

const locationStorage = new LocationStorage();

const useWeatherSource = (): {
    location: Coords;
    weather: Weather;
    locations: Location[];
    setLocation: (coords: Coords) => void;
    clearLocationHistory: () => void;
    deleteLocationById: (id: string) => void;
} => {
    const [{ weather, location, locations }, dispatch] = useReducer(
        (state: WeatherSourceState, action: WeatherSourceActions) => {
            switch (action.type) {
                case "SET_LOCATION":
                    return {
                        ...state,
                        weather: action.payload.weather,
                        location: action.payload.location,
                        locations: locationStorage.locationsExceptLast,
                    };
                case "DELETE_LOCATIONS":
                    return { ...state, locations: locationStorage.locationsExceptLast };
                case "DELETE_LOCATION_BY_ID":
                    return { ...state, locations: locationStorage.locationsExceptLast };
            }
        },
        {
            location: {
                lat: 51.5072,
                lng: 0.1276,
            },
            weather: null,
            locations: locationStorage.locationsExceptLast,
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
            dispatch({ type: "SET_LOCATION", payload: { weather: weather, location: coords } });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        setLocation(location);
    }, []);

    const clearLocationHistory = useCallback(() => {
        locationStorage.deleteAllExceptLast();
        dispatch({ type: "DELETE_LOCATIONS" });
    }, []);

    const deleteLocationById = useCallback((id: string) => {
        locationStorage.deleteById(id);
        dispatch({ type: "DELETE_LOCATION_BY_ID" });
    }, []);

    return { location, weather, locations, setLocation, clearLocationHistory, deleteLocationById };
};

// check later
const WeatherContext = createContext<ReturnType<typeof useWeatherSource>>({} as unknown as ReturnType<typeof useWeatherSource>);

export const useWeather = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }: { children: React.ReactNode }) => (
    <WeatherContext.Provider value={useWeatherSource()}>{children}</WeatherContext.Provider>
);
