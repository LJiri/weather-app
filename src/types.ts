export type Coords = { lat: number; lng: number };
export type Location = { id: string; name: string; coords: Coords };

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
    locationHistory: Location[];
}

export type WeatherSourceActions = SetWeatherAction | ClearLocationHistoryAction | DeleteLocationAction;

interface SetWeatherAction {
    type: "SET_WEATHER";
    payload: {
        location: Coords;
        weather: Weather;
    };
}

interface ClearLocationHistoryAction {
    type: "CLEAR_LOCATION_HISTORY";
}

interface DeleteLocationAction {
    type: "DELETE_LOCATION";
}
