import Button from "@material-ui/core/Button";
import { beepSound } from "../../Common/beepSound";

type beepSoundType = "sine" | "sawtooth" | "triangle";

interface BeepButtonProps {
  questionNumber: any;
  setQuestionNumber: any;
  type: string;
  frequency: number;
  length: number;
}
export function BeepButton(props: BeepButtonProps) {
  return (
    <Button
      variant="contained"
      color="secondary"
      onMouseEnter={() => {
        beepSound(props.type, props.frequency, props.length);
      }}
      onClick={() => {
        props.setQuestionNumber(props.questionNumber + 1);
      }}
    >
      マウスを重ねると音がなります
    </Button>
  );
}
