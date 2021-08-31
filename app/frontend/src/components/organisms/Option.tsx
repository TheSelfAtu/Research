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
      <SoundButton
        algoNum={props.algorithmNum}
        soundParamsList={props.soundParamsList}
        geneNumber={props.geneNumber}
      ></SoundButton>
      <SelectFitness
        geneNumber={props.geneNumber}
        genesParameters={props.genesParameters}
        setGenesParameters={props.setGenesParameters}
        fitnessValue={props.genesFitnessValue}
      ></SelectFitness>
      <Canvas geneNumber={props.geneNumber}></Canvas>
      <ParametersTable
        fmParamsList={props.soundParamsList}
        algorithmNum={props.algorithmNum}
      ></ParametersTable>
    </div>
  );
}
