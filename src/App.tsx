import React from "react";
import "./styles.scss";
import { LocationContextProvider } from "./store";
import { HomePage } from "./components/home-page";
import { About } from "./components/about";

export const App = () => {
    return (
        <LocationContextProvider>
            <HomePage />
            <About />
        </LocationContextProvider>
    );
};
