import React, { createContext, useContext, useReducer, useCallback, useEffect } from "react";
import { Location, Coords, Weather, LocationSourceState, LocationSourceActions } from "./types";
import { LocationStorage } from "./LocationStorage";

const locationStorage = new LocationStorage();
const INITIAL_LOCATION = locationStorage.lastLocation?.coords || {
    lat: 51.5072,
    lng: 0.1276,
};

const useLocationSource = (): {
    location: Coords;
    mapCenter: Coords;
    weather: Weather;
    locations: Location[];
    setLocation: (coords: Coords) => void;
    setMapCenter: (coords: Coords) => void;
    deleteLocations: () => void;
    deleteLocationById: (id: string) => void;
} => {
    const [{ weather, location, locations, mapCenter }, dispatch] = useReducer(
        (state: LocationSourceState, action: LocationSourceActions) => {
            switch (action.type) {
                case "SET_LOCATION":
                    return {
                        ...state,
                        weather: action.payload.weather,
                        location: action.payload.location,
                        // mapCenter: action.payload.mapCenter || state.mapCenter,
                        locations: locationStorage.locationsExceptLast,
                    };
                case "DELETE_LOCATIONS":
                    return { ...state, locations: locationStorage.locationsExceptLast };
                case "DELETE_LOCATION_BY_ID":
                    return { ...state, locations: locationStorage.locationsExceptLast };
                case "SET_MAP_CENTER":
                    return { ...state, mapCenter: action.payload.mapCenter };
            }
        },
        {
            location: INITIAL_LOCATION,
            mapCenter: INITIAL_LOCATION,
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
            console.log("weather: ", data);
            const weather: Weather = {
                coords,
                name: data.name,
                averageTemperature: data?.main?.temp,
                realFeel: data?.main?.feels_like,
                humidity: data?.main?.humidity,
                windSpeed: data?.wind.speed,
                windGust: data?.wind.gust,
                windDeg: data?.wind.deg,
                icon: data.weather[0]?.icon,
                description: data.weather[0]?.description,
                sunrise: data?.sys?.sunrise,
                sunset: data?.sys?.sunset,
                timezone: data?.timezone,
            };
            locationStorage.save({ coords, name: data.name });
            dispatch({ type: "SET_LOCATION", payload: { weather: weather, location: coords } });
        } catch (error) {
            console.error(error);
        }
    }, []);

    const setMapCenter = useCallback((coords: Coords) => {
        dispatch({
            type: "SET_MAP_CENTER",
            payload: { mapCenter: { lat: coords.lat, lng: coords.lng } },
        });
    }, []);

    useEffect(() => {
        if (locationStorage.isEmpty && navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                geolocation => {
                    setLocation({ lat: geolocation.coords.latitude, lng: geolocation.coords.longitude });
                    setMapCenter({ lat: geolocation.coords.latitude, lng: geolocation.coords.longitude });
                },
                () => {
                    setLocation(location);
                },
            );
            return;
        }
        setLocation(location);
    }, []);

    const deleteLocations = useCallback(() => {
        locationStorage.deleteAllExceptLast();
        dispatch({ type: "DELETE_LOCATIONS" });
    }, []);

    const deleteLocationById = useCallback((id: string) => {
        locationStorage.deleteById(id);
        dispatch({ type: "DELETE_LOCATION_BY_ID" });
    }, []);

    return { location, mapCenter, weather, locations, setLocation, setMapCenter, deleteLocations, deleteLocationById };
};

// check later
const LocationContext = createContext<ReturnType<typeof useLocationSource>>({} as unknown as ReturnType<typeof useLocationSource>);

export const useLocation = () => useContext(LocationContext);

export const LocationContextProvider = ({ children }: { children: React.ReactNode }) => (
    <LocationContext.Provider value={useLocationSource()}>{children}</LocationContext.Provider>
);
