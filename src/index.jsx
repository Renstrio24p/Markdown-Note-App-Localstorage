import React from "react";
import ReactDOM from "react-dom";
import ReactApp from "./react-17/react";
import Start from "./start"; // Start coding from scratch
import './assets/sass/index.scss'

const DOM = ReactDOM
DOM.render(
    <React.StrictMode>
        <Start /> {/* Replace <ReactApp /> to <Start />*/}
    </React.StrictMode>
    ,document.getElementById('root'))

// The Same as main.js/jsx in vite and cra



