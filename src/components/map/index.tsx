import React, { useRef, useState } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useLocation } from "../../store";

function Map() {
    const { location, weather, setLocation } = useLocation();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        // Api key souĺd be hidden. Not possible here without backend.
        googleMapsApiKey: "AIzaSyByvUegCZkBw3Z0B5KnEdBvws3qc6OBmws",
    });

    const [center, setCenter] = useState({ lat: Number(location.lat), lng: Number(location.lng) });

    const myRef = useRef<google.maps.Map>();

    const onLoad = React.useCallback(function callback(map: google.maps.Map) {
        myRef.current = map;
    }, []);

    return isLoaded && weather ? (
        <GoogleMap
            center={center}
            zoom={10}
            options={{ fullscreenControl: false }}
            onLoad={onLoad}
            onClick={map => {
                setLocation({ lat: map.latLng.lat(), lng: map.latLng.lng() });
            }}
            onDragEnd={() => setCenter({ lat: myRef.current.getBounds().getCenter().lat(), lng: myRef.current.getBounds().getCenter().lng() })}
        >
            <Marker position={location} />
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(Map);
