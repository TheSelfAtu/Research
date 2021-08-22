import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SoundButton } from "../atoms/SoundButton";
import { Option } from "../organisms/Option";
import { fmParamsList } from "../../@types/fmParams";

import axios from "axios";
import { generateFMParameters } from "../../Common/generateFMParameters";
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function ResearchIGA(): JSX.Element {
  const soundParamsList: fmParamsList = {
    operator1: generateFMParameters(),
    operator2: generateFMParameters(),
    operator3: generateFMParameters(),
    operator4: generateFMParameters(),
  };
  return <Option soundParamsList={soundParamsList}></Option>;
}
