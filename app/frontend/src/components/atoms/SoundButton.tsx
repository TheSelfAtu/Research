import Button from "@material-ui/core/Button";
import { makeSound } from "../../Common/beepSound";
import { makeFMSounds } from "../../Common/makeFMSounds";

interface SoundButtonProps {
  soundParameter: any;
}
export function SoundButton(props: SoundButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        makeFMSounds();
      }}
    >
      クリックすると音が鳴ります
    </Button>
  );
}
