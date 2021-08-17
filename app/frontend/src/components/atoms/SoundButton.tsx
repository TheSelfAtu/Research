import Button from "@material-ui/core/Button";
import { makeSound } from "../../Common/beepSound";
import { makeFMSounds } from "../../Common/makeFMSounds";
import { generateFMParameters } from "../../Common/generateFMParameters";
import { fmParamsType } from "../../@types/fmParams";

interface SoundButtonProps {
  soundParameter: fmParamsType;
}
export function SoundButton(props: SoundButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        makeFMSounds(props.soundParameter);
      }}
    >
      クリックすると音が鳴ります
    </Button>
  );
}
