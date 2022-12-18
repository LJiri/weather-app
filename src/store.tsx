import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";

type Coords = { lat: number; lng: number };
type LocationHistory = { name: string; coords: Coords };

const addLocationToLocalStorate = ({ coords, name }: LocationHistory) => {
    const locationHistory: LocationHistory[] = JSON.parse(localStorage.getItem("locationHistory"));

    if (locationHistory && locationHistory.length > 0) {
        const lastItem = locationHistory[locationHistory.length - 1];

        if (lastItem.coords.lat == coords.lat && lastItem.coords.lng == coords.lng) {
            return;
        }
    }

    console.log(localStorage.setItem("locationHistory", JSON.stringify([...locationHistory, { coords, name }])));
};

const useWeatherSource = () => {
    const [{ weather, location }, dispatch] = useReducer(
        // @ts-ignore
        (state, action) => {
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
            weather: {},
            locationHistory: localStorage.getItem("locationHistory") ?? [],
        },
    );

    const setLocation = useCallback(async (coords: Coords) => {
        try {
            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=f9a6a093213359be775456e986a62e93`,
            );
            const data = await response.json();
            addLocationToLocalStorate({ coords, name: data.name });
            dispatch({ type: "SET_WEATHER", payload: { weather: data, location: coords } });
        } catch (error) {
            console.error(error);
        }
    }, []);

    useEffect(() => {
        setLocation(location);
    }, []);

    return { location: location, weather: weather, setLocation: setLocation };
};

const WeatherContext = createContext({});

export const useWeather = () => useContext(WeatherContext);

export const WeatherContextProvider = ({ children }: { children: React.ReactNode }) => (
    <WeatherContext.Provider value={useWeatherSource()}>{children}</WeatherContext.Provider>
);
