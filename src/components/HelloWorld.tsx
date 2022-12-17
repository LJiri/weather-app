import React from "react";
import webpackImage from "../assets/webpack.png";
import Map from "./map";

export const HelloWorld = () => {
    return (
        <div>
            <h1 className="h1">Hello world!</h1>
            <Map />
            <img src={webpackImage} alt="" />
        </div>
    );
};
