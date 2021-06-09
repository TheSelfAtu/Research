import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { beepSound } from "../../Common/beepSound";
import { BeepButton } from "../atoms/BeepButton";
import { research1Data } from "../../data/research1Data";

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
        <DialogTitle id="alert-dialog-title">
          <span>第{props.questionNumber}問</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            危険な操作だと感じるボタンをクリックしてください
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <BeepButton
            questionNumber={props.questionNumber}
            setQuestionNumber={props.setQuestionNumber}
            type={research1Data[props.questionNumber]["sound1"]["type"]}
            frequency={
              research1Data[props.questionNumber]["sound1"]["frequency"]
            }
            length={research1Data[props.questionNumber]["sound1"]["length"]}
          ></BeepButton>
          <BeepButton
            questionNumber={props.questionNumber}
            setQuestionNumber={props.setQuestionNumber}
            type={research1Data[props.questionNumber]["sound2"]["type"]}
            frequency={
              research1Data[props.questionNumber]["sound2"]["frequency"]
            }
            length={research1Data[props.questionNumber]["sound2"]["length"]}
          ></BeepButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
