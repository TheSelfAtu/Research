import { SoundButton } from "../atoms/SoundButton";
import { SelectFitness } from "../atoms/SelectFitness";
import { Canvas } from "../molecules/Canvas";
import { ParametersTable } from "../molecules/ParametersTable";
import { fmParamsList, genesParams } from "../../@types/fmParams";
interface OptionProps {
  genesParameters: genesParams;
  setGenesParameters: React.Dispatch<React.SetStateAction<genesParams | null>>;
  geneNumber: string;
  soundParamsList: fmParamsList;
  algorithmNum: string;
  genesFitnessValue: string;
}

export function Option(props: OptionProps) {
  return (
    <div>
      <SoundButton soundParamsList={props.soundParamsList}></SoundButton>
      <SelectFitness
        geneNumber={props.geneNumber}
        genesParameters={props.genesParameters}
        setGenesParameters={props.setGenesParameters}
        fitnessValue={props.genesFitnessValue}
      ></SelectFitness>
      <Canvas></Canvas>
      <ParametersTable fmParamsList={props.soundParamsList}></ParametersTable>
    </div>
  );
}
