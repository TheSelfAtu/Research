import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import AlertDialog from "../organisms/AlertDialog";
import Button from "@material-ui/core/Button";
import { Description } from "../organisms/Description";
import { SoundButton } from "../atoms/SoundButton";
import { postFire } from "../../Common/postFire";
import axios from "axios";
import { research1Data } from "../../data/research1Data";
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function Research1(): JSX.Element {
  const [name, setName] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionResults, setquestionResults] = useState({});
  const [dialogOpen, setDialogOpen] = useState(false);

  // トピックを投稿する関数
  const postResultToDB = useCallback(async () => {
    // 結果を送信する
    console.log(questionResults, "question");

    axios
      .post("/research1", { ...questionResults, ...{ name: name } })
      .then((response) => {
        alert(
          "ご協力ありがとうございました。ブラウザを閉じていただいても大丈夫です"
        );
      })
      .catch((err) => {
        alert("データの送信に失敗しました");
      });
  }, [questionResults, questionNumber, name]);

  useEffect(() => {
    if (questionNumber == Object.keys(research1Data).length + 1) {
      postResultToDB();
    }
  });
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
      <SoundButton></SoundButton>
      {questionNumber <= Object.keys(research1Data).length && (
        <AlertDialog
          dialogOpen={dialogOpen}
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
          questionResults={questionResults}
          setQuestionResults={setquestionResults}
          postResultToDB={postResultToDB}
        ></AlertDialog>
      )}
    </div>
  );
}
