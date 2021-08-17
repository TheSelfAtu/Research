import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import AlertDialog from "../organisms/AlertDialog";
import Button from "@material-ui/core/Button";
import { Description } from "../organisms/Description";
import { SoundButton } from "../atoms/SoundButton";
import axios from "axios";
import { generateFMParameters } from "../../Common/generateFMParameters";
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function ResearchIGA(): JSX.Element {
  return <SoundButton soundParameter={generateFMParameters()}></SoundButton>;
}
