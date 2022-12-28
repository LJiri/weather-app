import React from "react";
import { useLocation } from "../../store";
import "./style.scss";

export const LocationHistory = () => {
    const { locations, setLocation, deleteLocations, deleteLocationById } = useLocation();
    return locations && locations.length > 0 ? (
        <div className="wa-location-history">
            <div>
                {locations
                    .slice()
                    .reverse()
                    .map((location, index) => (
                        <div key={index} className="wa-location-history__item">
                            <button className="wa-location-history__select-btn" onClick={() => setLocation(location.coords)}>
                                {location.name}
                            </button>
                            <button className="wa-location-history__delete-btn" onClick={() => deleteLocationById(location.id)}>
                                x
                            </button>
                        </div>
                    ))}
            </div>
            <button onClick={deleteLocations}>Clear history</button>
        </div>
    ) : (
        <div>Locatin history is empty</div>
    );
};