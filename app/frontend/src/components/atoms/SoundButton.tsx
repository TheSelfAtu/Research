import Button from "@material-ui/core/Button";
import { makeFMModel } from "../../Common/makeFMSounds";
import { fmParamsList } from "../../@types/fmParams";

import { visualizeFFT } from "../../Common/visualizeFFT";

interface SoundButtonProps {
  algoNum: number;
  soundParamsList: fmParamsList;
  chromosomeNum: string;
}
export function SoundButton(props: SoundButtonProps) {
  return (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        const soundData = makeFMModel(props.algoNum, props.soundParamsList);
        const operatorsInfo = soundData.operatorsInfo;
        const analyzerNodeForSpeaker = soundData.analyzerNodeForSpeaker;

        // 音を再生
        Object.keys(operatorsInfo).forEach((key) => {
          operatorsInfo[key].oscillatorNode.start();
        });

        // 出力音の周波数スペクトルを描画
        visualizeFFT(
          new AudioContext(),
          analyzerNodeForSpeaker,
          props.chromosomeNum
        );
      }}
    >
      クリックすると音が鳴ります
    </Button>
  );
}
