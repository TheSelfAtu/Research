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
  // 被験者指名、ニックネーム
  const [name, setName] = useState("");
  // 世代数
  const [generationCount, setGenerationCount] = useState(1);
  // １つの世代に存在する遺伝子の情報
  const [genesParameters, setGenesParameters] = useState<genesParams | null>(
    null
  );

  // 世代の適応度、および音生成パラメータを送信。次世代の音生成パラメータの格納
  const postResult = useCallback(async () => {
    // 結果を送信する
    console.log(genesParameters, "genes");

    axios
      .post("/research1", genesParameters)
      .then((response) => {
        const nextGenerationParams: genesParams = response.data;
        setGenesParameters(nextGenerationParams);
        setGenerationCount(generationCount + 1);
      })
      .catch((err) => {
        alert("データの送信に失敗しました");
      });
  }, [genesParameters, name]);

  {
    /* 1世代目はランダムにパラメータを生成 */
  }
  useEffect(() => {
    if (generationCount == 1) {
      axios
        .get("/genetic-algorithm/make-ramdom/all")
        .then((response) => {
          const nextGenerationParams: genesParams = response.data;
          setGenesParameters(nextGenerationParams);
        })
        .catch((err) => {
          alert("データの受信に失敗しました");
        });
    }
  }, []);

  // サーバーから受け取った遺伝子情報をフォーマットして格納
  const OptionsEL = (genesParameters: genesParams) => {
    const Options = [];

    for (const [geneNum, optionValue] of Object.entries(genesParameters)) {
      Options.push(
        <Option
          genesParameters={genesParameters}
          setGenesParameters={setGenesParameters}
          geneNumber={geneNum}
          algorithmNum={optionValue.algorithm}
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
      <Button
        variant="contained"
        color="primary"
        onClick={() => {
          postResult();
        }}
      >
        回答を送信
      </Button>
    </div>
  );
}
