import { SoundButton } from "../atoms/SoundButton";
import { Canvas } from "../molecules/Canvas";
import { ParametersTable } from "../molecules/ParametersTable";
import { fmParamsList } from "../../@types/fmParams";
interface OptionProps {
  soundParamsList: fmParamsList;
}

export function Option(props: OptionProps) {
  return (
    <div>
      <SoundButton soundParamsList={props.soundParamsList}></SoundButton>
      <Canvas></Canvas>
      <ParametersTable fmParamsList={props.soundParamsList}></ParametersTable>
    </div>
  );
}
