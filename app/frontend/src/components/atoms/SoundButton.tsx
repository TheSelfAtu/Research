import Button from "@material-ui/core/Button";
import { makeSound } from "../../Common/beepSound";
import { makeFMSounds } from "../../Common/makeFMSounds";
import { generateFMParameters } from "../../Common/generateFMParameters";
import { fmParamsType } from "../../@types/fmParams";
import { fmParamsList } from "../../@types/fmParams";

interface SoundButtonProps {
  soundParamsList: fmParamsList;
}
export function SoundButton(props: SoundButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        makeFMSounds(props.soundParamsList);
      }}
    >
      クリックすると音が鳴ります
    </Button>
  );
}
