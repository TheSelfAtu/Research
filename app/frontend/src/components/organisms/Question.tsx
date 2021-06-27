import React, { useState, useEffect, useCallback } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";

interface Question {
  data: any;
  questionNumber: Number;
  questionResults: any;
  setQuestionResults: React.Dispatch<React.SetStateAction<{}>>;
}

export function Question(props: Question): JSX.Element {
  const [questionResults, setquestionResults] = useState({});
  const [selectValue, setSelectValue] = useState<null | unknown | Number>(-1);
  const sound1SrcURL =
    "static/sounds/" +
    props.data["sound1"]["type"] +
    props.data["sound1"]["frequency"] +
    "Hz" +
    props.data["sound1"]["modulation"] +
    props.data["sound1"]["late"] +
    ".wav";
  const sound2SrcURL =
    "static/sounds/" +
    props.data["sound2"]["type"] +
    props.data["sound2"]["frequency"] +
    "Hz" +
    props.data["sound2"]["modulation"] +
    props.data["sound2"]["late"] +
    ".wav";
  return (
    <div>
      <p>第{props.questionNumber}問</p>
      <audio
        src={sound1SrcURL}
        id={String(props.questionNumber) + "-1"}
      ></audio>
      <audio
        src={sound2SrcURL}
        id={String(props.questionNumber) + "-2"}
      ></audio>
      <Button
        variant="contained"
        color="secondary"
        onMouseEnter={() => {
          let audioElement;
          audioElement = document.getElementById(
            String(props.questionNumber) + "-1"
          ) as HTMLAudioElement;
          audioElement.currentTime = 0;
          audioElement.play();
        }}
      >
        マウスを重ねると音がなります
      </Button>
      <Button
        variant="contained"
        color="secondary"
        onMouseEnter={() => {
          let audioElement;
          audioElement = document.getElementById(
            String(props.questionNumber) + "-2"
          ) as HTMLAudioElement;
          audioElement.currentTime = 0;

          audioElement.play();

          // [ID:sound-file]の音声ファイルを再生[play()]する
        }}
      >
        マウスを重ねると音がなります
      </Button>
      <FormControl>
        <Select
          labelId="demo-simple-select-label"
          id=""
          value={selectValue}
          onChange={(e) => {
            setSelectValue(e.target.value);
            const sound1Config =
              props.data["sound1"]["type"] +
              props.data["sound1"]["frequency"] +
              "Hz" +
              props.data["sound1"]["modulation"] +
              props.data["sound1"]["late"];
            const sound2Config =
              props.data["sound2"]["type"] +
              props.data["sound2"]["frequency"] +
              "Hz" +
              props.data["sound2"]["modulation"] +
              props.data["sound2"]["late"];
            const result =
              sound1Config + "-" + sound2Config + "-" + e.target.value;
            const QplusNumber = "Q" + props.questionNumber;
            const changeObj = { [QplusNumber]: result };

            props.setQuestionResults({
              ...props.questionResults,
              ...changeObj,
            });
            console.log(props.questionResults);
          }}
        >
          <MenuItem value={-1}>-</MenuItem>
          <MenuItem value={1}>1</MenuItem>
          <MenuItem value={2}>2</MenuItem>
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
