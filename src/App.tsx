import React from "react";
import "./styles.scss";
import { LocationContextProvider } from "./store";
import { HomePage } from "./components/home-page";

export const App = () => {
    return (
        <LocationContextProvider>
            <HomePage />
        </LocationContextProvider>
    );
};
