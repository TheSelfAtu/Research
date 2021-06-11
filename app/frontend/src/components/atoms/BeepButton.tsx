import Button from "@material-ui/core/Button";
import { beepSound } from "../../Common/beepSound";

type beepSoundType = "sine" | "sawtooth" | "triangle";

interface BeepButtonProps {
  questionNumber: any;
  setQuestionNumber: any;
  type: string;
  frequency: number;
  length: number;
  questionResults: any;
  setQuestionResults: any;
  postResultToDB: () => {};
}
export function BeepButton(props: BeepButtonProps) {
  const questionResults = props.questionResults;
  const questionNumber = props.questionNumber;
  const type = props.type;
  const frequency = props.frequency;
  const length = props.length;
  const soundConfig = type + frequency + "Hz" + length + "s";
  const QplusNumber = "Q" + props.questionNumber;
  return (
    <Button
      variant="contained"
      color="secondary"
      onMouseEnter={() => {
        beepSound(type, frequency, length);
      }}
      onClick={() => {
        console.log(props.questionResults, soundConfig, QplusNumber);

        props.setQuestionResults({
          ...props.questionResults,
          Q1: soundConfig,
          // QplusNumber: soundConfig,
        });

        props.setQuestionNumber(props.questionNumber + 1);
        if (questionNumber == Object.keys(questionResults).length - 1) {
          props.postResultToDB();
        }
      }}
    >
      マウスを重ねると音がなります
    </Button>
  );
}
