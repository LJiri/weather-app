import React, { useState } from "react";
import classNames from "classnames";
import "./styles.scss";

const DISABLE_SCROLLING = "disable-scrolling";

export const About = () => {
    const [open, setOpen] = useState(false);

    const onOpen = () => {
        setOpen(true);
        document.body.classList.add(DISABLE_SCROLLING);
    };

    const onClose = () => {
        setOpen(false);
        document.body.classList.remove(DISABLE_SCROLLING);
    };

    return (
        <>
            <div className={classNames("wa-about__open-btn-wrapper", open && "wa-about__open-btn-wrapper--hidden")}>
                <button className="wa-about__open-btn" onClick={onOpen}>
                    About
                </button>
            </div>

            <div className={classNames("wa-about", open && "wa-about--open")}>
                <div className="wa-about__content">
                    <h2 className="wa-about__content-header">About Weather App</h2>
                    <div className="wa-about__paragraphs">
                        <p>
                            This application was developed by Jiří Laudát, a front-end developer with 4 years of experience.
                            <a href="https://www.linkedin.com/in/jirilaudat/" target="_blank" rel="noreferrer">
                                Linkedin
                            </a>
                        </p>
                        <p>It is programmed in TypeScript using the React library. Modules are bundled by Webpack.</p>
                        <p>
                            Geolocation data, latitude and longitude, are retrieved through Google Maps API. These coordinates are then used to search
                            current weather information of the particular location via Open Weather API.
                        </p>
                        <p>The history of searched locations is saved into Local Storage inside user’s browser.</p>
                        <p>
                            Project repository:{" "}
                            <a href="https://github.com/LJiri/weather-app" target="_blank" rel="noreferrer">
                                github
                            </a>
                        </p>
                    </div>
                    <button className="wa-about__close-btn" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </>
    );
};
