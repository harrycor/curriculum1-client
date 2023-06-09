import * as React from "react";
import { render } from "react-dom";
import App from "./App";
import "./scss/app";
import * as serviceWorkerRegistration from "../serviceWorkerRegistration";
import reportWebVitals from "./reportWebVitals";

render(<App />, document.getElementById("root"));
// This is a commit that I made to test the push to github

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
//@ts-ignore
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
