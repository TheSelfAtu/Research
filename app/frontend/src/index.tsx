import React from "react";
import ReactDOM from "react-dom";
import { ResearchIGA } from "./components/pages/ResearchIGA";
import "./css/index.scss";

window.onload = () => {
  if (document.getElementById("research-iga")) {
    ReactDOM.render(<ResearchIGA />, document.getElementById("research-iga"));
  }
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
};
