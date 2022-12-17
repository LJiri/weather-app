import React from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";

const containerStyle = {
    // width: "1200px",
    // height: "800px",
};

const center = {
    lat: 50.073,
    lng: 14.418,
};

const showLocationName = async (lat: number, lng: number) => {
    const data = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&units=metric&appid=f9a6a093213359be775456e986a62e93`,
    );
    const data2 = await data.json();
    console.log(data2.name);
    console.log(data2);
};

function Map() {
    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        // Api key souĺd be hidden. Not possible here without backend.
        googleMapsApiKey: "AIzaSyByvUegCZkBw3Z0B5KnEdBvws3qc6OBmws",
    });

    const [markerPosition, setMarkerPosition] = React.useState(center);

    // const [map, setMap] = React.useState(null);

    // const onLoad = React.useCallback(function callback(map) {
    //     // This is just an example of getting and using the map instance!!! don't just blindly copy!
    //     const bounds = new window.google.maps.LatLngBounds(center);
    //     map.fitBounds(bounds);

    //     setMap(map);
    // }, []);

    // const onUnmount = React.useCallback(function callback(map) {
    //     setMap(null);
    // }, []);

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onClick={map => {
                setMarkerPosition({ lat: map.latLng.lat(), lng: map.latLng.lng() });
                showLocationName(map.latLng.lat(), map.latLng.lng());
                console.log("lat: ", map.latLng.lat());
                console.log("lng: ", map.latLng.lng());
                console.log("map: ", map);
            }}
            // onLoad={onLoad} onUnmount={onUnmount}
        >
            <Marker position={markerPosition} />
            {/* Child components, such as markers, info windows, etc. */}
            <></>
        </GoogleMap>
    ) : (
        <></>
    );
}

export default React.memo(Map);
