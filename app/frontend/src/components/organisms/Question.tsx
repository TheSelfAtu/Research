import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import { Description } from "../organisms/Description";
import { postFire } from "../../Common/postFire";
import axios from "axios";
import { research1Data } from "../../data/research1Data";

interface Question {
  data: any;
  questionNumber: Number;
}

export function Question(props: Question): JSX.Element {
  const [questionResults, setquestionResults] = useState({});

  return (
    <div>
      <p>第{props.questionNumber}問</p>
      <audio src={"sounds/sine440Hz.wav"}></audio>
    </div>
  );
}
