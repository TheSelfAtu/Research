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
  const [questionResults, setquestionResults] = useState({
    1: "",
    2: "",
    3: "",
    4: "",
    5: "",
    6: "",
    7: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  // トピックを投稿する関数
  const postResultToDB = useCallback(async () => {
    // 結果を送信する
    try {
      await postFire("/test", {
        name: "tsuchida",
        age: "24",
      });
      alert("success");
      // await postFire("/test", {
      //   id: "100",
      //   name: "tsuchida",
      //   age: "24",
      //   // Q1: questionResults["1"],
      // });
      setDialogOpen(false);
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
        onClick={() => {
          postResultToDB();
          alert("done");
        }}
      >
        test
      </Button>
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
