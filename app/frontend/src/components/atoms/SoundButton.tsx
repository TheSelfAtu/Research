import Button from "@material-ui/core/Button";
import { makeFMSounds } from "../../Common/makeFMSounds";
import { fmParamsList } from "../../@types/fmParams";

interface SoundButtonProps {
  algoNum: string;
  soundParamsList: fmParamsList;
  geneNumber: string;
}
export function SoundButton(props: SoundButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        makeFMSounds(props.algoNum, props.soundParamsList, props.geneNumber);
      }}
    >
      クリックすると音が鳴ります
    </Button>
  );
}
