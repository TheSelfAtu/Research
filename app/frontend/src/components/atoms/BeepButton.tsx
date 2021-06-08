import { soundConfig } from "../../data/Research1";
import Button from "@material-ui/core/Button";
import { beepSound } from "../../Common/beepSound";
type beepSoundType = "sine" | "sawtooth" | "triangle";

interface BeepButtonProps {
  questionNumber: number;
  setQuestionNumber: any;
}
export function BeepButton(props: BeepButtonProps) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onMouseEnter={() => {
        beepSound(soundConfig.type, soundConfig.frequency, soundConfig.length);
      }}
      onClick={() => {
        props.setQuestionNumber(props.questionNumber + 1);
      }}
    >
      マウスを重ねると音がなります
    </Button>
  );
}
