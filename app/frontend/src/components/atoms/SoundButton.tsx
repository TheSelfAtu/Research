import Button from "@material-ui/core/Button";
import { makeSound } from "../../Common/beepSound";

export function SoundButton() {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        makeSound();
      }}
    >
      重ねると音がなります
    </Button>
  );
}
