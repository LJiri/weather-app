import React from "react";
import { useLocation } from "../../store";
import "./style.scss";

export const LocationHistory = () => {
    const { locations, setLocation, deleteLocations, deleteLocationById } = useLocation();
    return (
        <div className="wa-location-history">
            <div className="wa-location-history__header">History:</div>
            <div className="wa-location-history__content">
                {locations && locations.length > 0 ? (
                    locations
                        .slice()
                        .reverse()
                        .map((location, index) => (
                            <div key={index} className="wa-location-history__location">
                                <button className="wa-location-history__select-btn" onClick={() => setLocation(location.coords)}>
                                    {location.name || `${location.coords.lat.toFixed(4)}, ${location.coords.lng.toFixed(4)}`}
                                </button>
                                <button className="wa-location-history__delete-btn" onClick={() => deleteLocationById(location.id)}>
                                    x
                                </button>
                            </div>
                        ))
                ) : (
                    <span>Location history is empty...</span>
                )}
            </div>
            <div className="wa-location-history__clear-history">
                <button onClick={deleteLocations} className="wa-location-history__clear-history-btn">
                    Clear history
                </button>
            </div>
        </div>
    );
};
