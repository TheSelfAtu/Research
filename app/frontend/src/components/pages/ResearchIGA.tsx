import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { SoundButton } from "../atoms/SoundButton";
import { Option } from "../organisms/Option";
import { genesParams, fmParamsList } from "../../@types/fmParams";
import { genesFitness } from "../../@types/genesFitness";

import axios from "axios";
import { generateFMParameters } from "../../Common/generateFMParameters";
declare global {
  interface Window {
    webkitAudioContext: any;
  }
}

export function ResearchIGA(): JSX.Element {
  const [name, setName] = useState("");
  // 世代数
  const [generationCount, setGenerationCount] = useState(1);
  // １つの世代に存在する遺伝子の情報
  const [genesParameters, setGenesParameters] = useState<genesParams | null>(
    null
  );
  // const [optinJSXEl, setOptionJSXEl] = useState([{ key: -1, content: <Option fileHandlers={fileHandlers} /> }]);

  const [fmParamsList, setFMParamslist] = useState<fmParamsList[] | null>(null);
  const [genesFitness, setGenesFitness] = useState<genesFitness>({
    gene1: "",
    gene2: "",
    gene3: "",
    gene4: "",
    gene5: "",
    gene6: "",
    gene7: "",
    gene8: "",
    gene9: "",
    gene10: "",
  });
  const geneNumInEachGeneration = 10;

  // const postResult = useCallback(async () => {
  //   // 結果を送信する
  //   console.log(genesParameters, "genes");

  //   axios
  //     .post("/research1", { ...questionResults, ...{ algorithmNum: 1 } })
  //     .then((response) => {
  //       const nextGenerationParams: genesParams = response.data;
  //       setGenesParameters(nextGenerationParams);
  //       setGenerationCount(generationCount + 1);
  //     })
  //     .catch((err) => {
  //       alert("データの送信に失敗しました");
  //     });
  // }, [genesFitness, name]);

  {
    /* 1世代目はランダムにパラメータを生成 */
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
      setFMParamslist(items);
    }
  }, []);

  // サーバーから受け取った遺伝子情報をフォーマットして格納
  // useEffect(() => {
  //   const items = [];
  //   if (!genesParameters) {
  //     return;
  //   }
  //   Object.keys(genesParameters).forEach((key) => {
  //     if (!genesParameters.hasOwnProperty(key)) {
  //       return;
  //     }
  //     items.push(genesParameters[key]);
  //   });
  //   for (let i = 0; i < items.length; i++) {
  //     const soundParamsList: fmParamsList = {
  //       operator1: items[i]["operator1"],
  //       operator2: items[i]["operator2"],
  //       operator3: items[i]["operator3"],
  //       operator4: items[i]["operator4"],
  //     };
  //     items.push(soundParamsList);
  //   }
  //   setFMParamslist(items);
  // }, [genesParameters]);

  // サーバーから受け取った遺伝子情報をフォーマットして格納
  const OptionsEL = (genesParameters: genesParams) => {
    const Options = [];

    for (const [geneNum, optionValue] of Object.entries(genesParameters)) {
      Options.push(
        <Option
          genesParameters={genesParameters}
          geneNumber={geneNum}
          algorithmNum={optionValue.algorithmNum}
          genesFitnessValue={optionValue.fitness}
          soundParamsList={optionValue.fmParamsList}
        ></Option>
      );
    }
    return Options;
  };

  return (
    <div>
      <h1>{generationCount}世代目</h1>
      {genesParameters && OptionsEL(genesParameters)}
    </div>
  );
}
