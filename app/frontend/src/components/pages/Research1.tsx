import React, { useState, useEffect, useCallback } from "react";
import AlertDialog from "../organisms/AlertDialog";
import Button from "@material-ui/core/Button";
import { beepSound } from "../../Common/beepSound";
import { Description } from "../organisms/Description";
import { postFire } from "../../Common/postFire";

declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function Research1(): JSX.Element {
  const [name, setName] = useState("");
  const [questionNumber, setQuestionNumber] = useState(1);
  const [question, setquestion] = useState({
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
    try {
      await postFire("/post-topic", {
        name: name,
        Q1: question["Q1"],
        Q2: question["Q2"],
        Q3: question["Q3"],
        Q4: question["Q4"],
        Q5: question["Q5"],
        Q6: question["Q6"],
        Q7: question["Q7"],
      });
    } catch (e) {
      // 結果の送信に失敗した場合はエラーを表示
      alert("結果の送信に失敗しました");
      return;
    }
  }, []);

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
      <AlertDialog
        dialogOpen={dialogOpen}
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
      ></AlertDialog>
    </div>
  );
}
