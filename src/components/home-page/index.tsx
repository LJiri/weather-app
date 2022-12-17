import React from "react";
import Map from "../map";
import "./styles.scss";

export const HomePage = () => {
    return (
        <div className="wa-home-page">
            <div>Current location</div>
            <div>Location history</div>
            <Map />
        </div>
    );
};
