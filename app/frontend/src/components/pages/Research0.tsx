import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Description } from "../organisms/Description";
import { Question } from "../organisms/Question";
import { postFire } from "../../Common/postFire";
import axios from "axios";
import { research0Data } from "../../data/research0Data";
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function Research0(): JSX.Element {
  const [name, setName] = useState("");
  const [questionResults, setquestionResults] = useState({});

  // トピックを投稿する関数
  const postResultToDB = useCallback(async () => {
    // 結果を送信する

    axios
      .post("/research0", { ...questionResults, ...{ name: name } })
      .then((response) => {
        alert(
          "ご協力ありがとうございました。ブラウザを閉じていただいても大丈夫です"
        );
      })
      .catch((err) => {
        alert("データの送信に失敗しました");
      });
  }, [questionResults, name]);

  return (
    <div>
      <Description></Description>
      <p>
        名前を入力してください（ニックネームなどどのような名前でも結構です。今後の実験の際には
        同じ名前を使用してください。）
      </p>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
      {research0Data.map((data, index) => {
        return (
          <Question
            data={data}
            questionNumber={index + 1}
            questionResults={questionResults}
            setQuestionResults={setquestionResults}
          ></Question>
        );
      })}
      <Button variant="outlined" onClick={() => postResultToDB()}>
        結果を送信する
      </Button>
    </div>
  );
}
