import React from "react";
import "./styles.scss";
import { WeatherContextProvider } from "./store";
import { HomePage } from "./components/home-page";

export const App = () => {
    return (
        <WeatherContextProvider>
            <HomePage />
        </WeatherContextProvider>
    );
};
