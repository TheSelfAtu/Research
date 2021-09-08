import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Option } from "../organisms/Option";
import { genesParams } from "../../@types/fmParams";

import axios from "axios";

export function ResearchIGA(): JSX.Element {
  // 被験者指名、ニックネーム
  const [name, setName] = useState("");
  // 世代数
  const [generationCount, setGenerationCount] = useState(1);
  // １つの世代に存在する遺伝子の情報
  const [genesParams, setGenesParams] = useState<genesParams | null>(null);

  // 世代の適応度、および音生成パラメータを送信。次世代の音生成パラメータの格納
  const postResult = useCallback(async () => {
    // 結果を送信する
    console.log(genesParams, "genes");

    axios
      .post("/research1", genesParams)
      .then((response) => {
        const nextGenerationParams: genesParams = response.data;
        setGenesParams(nextGenerationParams);
        setGenerationCount(generationCount + 1);
      })
      .catch((err) => {
        alert("データの送信に失敗しました");
      });
  }, [genesParams, name]);

  {
    /* 1世代目はランダムにパラメータを生成 */
  }
  useEffect(() => {
    if (generationCount == 1) {
      axios
        .get("/genetic-algorithm/make-ramdom/all")
        .then((response) => {
          const nextGenerationParams: genesParams = response.data;
          setGenesParams(nextGenerationParams);
        })
        .catch((err) => {
          alert("データの受信に失敗しました");
        });
    }
  }, []);

  // サーバーから受け取った遺伝子情報をフォーマットして格納
  const OptionsEL = () => {
    // 1つの遺伝子の評価をするためのコンポーネントのリスト
    const Options: JSX.Element[] = [];
    if (genesParams) {
      for (const [geneNum, geneParam] of Object.entries(genesParams)) {
        Options.push(
          <Option
            key={geneNum}
            genesParameters={genesParams}
            setGenesParameters={setGenesParams}
            geneNumber={geneNum}
            algorithmNum={geneParam.algorithmNum}
            genesFitnessValue={geneParam.fitness}
            soundParamsList={geneParam.fmParamsList}
          ></Option>
        );
      }
    }
    return Options;
  };

  return (
    <div>
      <h1>{generationCount}世代目</h1>
      {/* 各遺伝子コンポーネントの描画 */}
      {OptionsEL()}
      {/* 遺伝子の評価を送信 */}
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
