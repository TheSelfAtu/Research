import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { beepSound } from "../../Common/beepSound";
import { BeepButton } from "../atoms/BeepButton";

interface AlertDialog {
  dialogOpen: boolean;
  questionNumber: number;
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>;
}

export default function AlertDialog(props: AlertDialog): JSX.Element {
  return (
    <div>
      <Dialog
        open={props.dialogOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"危険操作検証"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            危険な操作だと感じるボタンをクリックしてください
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BeepButton
            soundConfig={props.soundConfig.questionNumber.sound1}
            questionNumber={props.questionNumber}
            setQuestionNumber={props.setQuestionNumber}
          ></BeepButton>
          <BeepButton
            soundConfig={props.soundConfig.questionNumber.sound2}
            questionNumber={props.questionNumber}
            setQuestionNumber={props.setQuestionNumber}
          ></BeepButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
