import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useWeather } from "../../store";

function Map() {
    // @ts-ignore
    const { location, weather, setLocation } = useWeather();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        // Api key souĺd be hidden. Not possible here without backend.
        googleMapsApiKey: "AIzaSyByvUegCZkBw3Z0B5KnEdBvws3qc6OBmws",
    });

    const center = { lat: Number(weather?.coord?.lat), lng: Number(weather?.coord?.lon) };

    return isLoaded && weather ? (
        <GoogleMap
            center={location}
            zoom={10}
            onClick={map => {
                setLocation({ lat: map.latLng.lat(), lng: map.latLng.lng() });
            }}
            // onLoad={onLoad} onUnmount={onUnmount}
        >
            <Marker position={center} />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(Map);
