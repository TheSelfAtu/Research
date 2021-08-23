import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SoundButton } from "../atoms/SoundButton";
import { Option } from "../organisms/Option";
import { fmParamsList } from "../../@types/fmParams";

import axios from "axios";
import { generateFMParameters } from "../../Common/generateFMParameters";
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function ResearchIGA(): JSX.Element {
  const [name, setName] = useState("");
  const [generationCount, setGenerationCount] = useState(1);
  const [genesParameters, setGenesParameters] = useState<fmParamsList[] | null>(
    null
  );
  const geneNumInEachGeneration = 10;

  {
    /* 1世代目はランダム */
  }
  useEffect(() => {
    if (generationCount == 1) {
      const items = [];
      for (let i = 0; i < geneNumInEachGeneration; i++) {
        const soundParamsList: fmParamsList = {
          operator1: generateFMParameters(),
          operator2: generateFMParameters(),
          operator3: generateFMParameters(),
          operator4: generateFMParameters(),
        };
        items.push(soundParamsList);
      }
      setGenesParameters(items);
    }
  }, []);
  return (
    <div>
      <h1>{generationCount}世代目</h1>
      {genesParameters?.map((soundParamsList) => {
        console.log(soundParamsList);

        return <Option soundParamsList={soundParamsList}></Option>;
      })}
    </div>
  );
}
