import React, { useState, useEffect } from "react";
import AlertDialog from "../organisms/Dialog";
import Button from "@material-ui/core/Button";
import { beepSound } from "../../Common/beepSound";
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function Research1(): JSX.Element {
  const [audioContextInstance, setAudioContext] =
    useState<null | AudioContext>(null);
  const [questionNumber, setquestionNumber] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(0);

  useEffect(() => {
    setAudioContext(new AudioContext());
  }, []);
  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={() => {
        beepSound(audioContextInstance);
      }}
    >
      マウスを重ねると音がなります
    </Button>
  );
}
