import React from "react";
import webpackImage from "../assets/webpack.png";

export const HelloWorld = () => {
    return (
        <div>
            <h1 className="h1">Hello world!</h1>
            <img src={webpackImage} alt="" />
        </div>
    );
};
