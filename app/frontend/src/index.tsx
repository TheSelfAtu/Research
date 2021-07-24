import React from "react";
import ReactDOM from "react-dom";
import { Research0 } from "./components/pages/Research0";
import { Research1 } from "./components/pages/Research1";

export function App(): JSX.Element {
  return <Research1></Research1>;
}

window.onload = () => {
  // if (document.getElementById("app")) {
  //   ReactDOM.render(<App />, document.getElementById("app"));
  // }
  if (document.getElementById("research0")) {
    ReactDOM.render(<Research0 />, document.getElementById("research0"));
  }
  if (document.getElementById("research1")) {
    ReactDOM.render(<Research1 />, document.getElementById("research1"));
  }
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
};
