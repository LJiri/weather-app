export type Coords = { lat: number; lng: number };
export type LocationHistory = { name: string; coords: Coords };

interface Temperature {
    averageTemperature: number;
}

export interface Weather {
    coords: Coords;
    name: string;
    temperature: Temperature;
}

export interface WeatherSourceState {
    location: Coords;
    weather: Weather;
    locationHistory: LocationHistory[];
}

export interface WeatherSourceAction {
    type: "SET_WEATHER";
    payload: {
        location: Coords;
        weather: Weather;
    };
}
