import React from "react";
import ReactDOM from "react-dom";
import { Research1 } from "./components/pages/Research1";


export function App(): JSX.Element {
    return <Research1></Research1>
}

window.onload = () => {
    if (document.getElementById("app")) {
        ReactDOM.render(<App />, document.getElementById("app"));
    }
};