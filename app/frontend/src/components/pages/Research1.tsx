import React, { useState, useEffect, useCallback } from "react";
import AlertDialog from "../organisms/AlertDialog";
import Button from "@material-ui/core/Button";
import { Description } from "../organisms/Description";
import { postFire } from "../../Common/postFire";
import axios from "axios";

declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function Research1(): JSX.Element {
  const [name, setName] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [questionResults, setquestionResults] = useState({
    Q1: "",
    Q2: "",
    Q3: "",
    Q4: "",
    Q5: "",
    Q6: "",
    Q7: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // トピックを投稿する関数
  const postResultToDB = useCallback(async () => {
    // 結果を送信する
    console.log(questionResults, "question");

    axios
      .post("/research1", questionResults)
      .then((response) => {
        alert(
          "ご協力ありがとうございました。ブラウザを閉じていただいても大丈夫です"
        );
      })
      .catch((err) => {
        alert("データの送信に失敗しました");
      });
  }, [questionResults, questionNumber]);

  useEffect(() => {
    if (questionNumber == Object.keys(questionResults).length + 1) {
      postResultToDB();
    }
  });
  return (
    <div>
      <Description></Description>

      <Button
        variant="contained"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        実験を開始します
      </Button>
      {questionNumber <= Object.keys(questionResults).length && (
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
