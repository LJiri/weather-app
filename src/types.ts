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

export interface LocationSourceState {
    location: Coords;
    mapCenter: Coords;
    weather: Weather;
    locations: Location[];
}

export type LocationSourceActions =
    | SetLocationAction
    | ClearLocationHistoryAction
    | DeleteLocationAction
    | SetMapCenterAction;

interface SetLocationAction {
    type: "SET_LOCATION";
    payload: {
        location: Coords;
        weather: Weather;
    };
}

interface SetMapCenterAction {
    type: "SET_MAP_CENTER";
    payload: {
        mapCenter: Coords;
    };
}

interface ClearLocationHistoryAction {
    type: "DELETE_LOCATIONS";
}

interface DeleteLocationAction {
    type: "DELETE_LOCATION_BY_ID";
}
