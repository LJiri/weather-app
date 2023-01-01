import React, { useRef, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { useLocation } from "../../store";
import { Loader } from "../loader";
import "./styles.scss";

function Map() {
    const { location, mapCenter, weather, setLocation, setMapCenter } = useLocation();
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        // Api key souĺd be hidden. Not possible here without backend.
        googleMapsApiKey: "AIzaSyByvUegCZkBw3Z0B5KnEdBvws3qc6OBmws",
    });
    const myRef = useRef<google.maps.Map>();

    const onMapLoad = useCallback(
        (map: google.maps.Map) => {
            myRef.current = map;
        },
        [myRef],
    );

    const onMapClick = useCallback((map: google.maps.MapMouseEvent) => {
        setLocation({ lat: map.latLng.lat(), lng: map.latLng.lng() });
    }, []);

    const onMapDragEnd = useCallback(() => {
        setMapCenter({ lat: myRef.current.getBounds().getCenter().lat(), lng: myRef.current.getBounds().getCenter().lng() });
    }, [myRef]);

    const onMarkerPositionChanged = useCallback(() => {
        if (!myRef.current) return;
        if (myRef.current?.getBounds().contains(location)) return;
        setMapCenter({ lat: location.lat, lng: location.lng });
    }, [myRef, location]);

    return isLoaded && weather ? (
        <GoogleMap
            mapContainerClassName="wa-map"
            center={mapCenter}
            zoom={10}
            options={{ fullscreenControl: false }}
            onLoad={onMapLoad}
            onClick={onMapClick}
            onDragEnd={onMapDragEnd}
        >
            <Marker position={location} onPositionChanged={onMarkerPositionChanged} />
        </GoogleMap>
    ) : (
        <div className="wa-map-loader">
            <Loader />
        </div>
    );
}

export default React.memo(Map);
