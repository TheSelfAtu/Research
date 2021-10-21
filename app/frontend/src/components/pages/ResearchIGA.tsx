import React, { useState, useEffect, useCallback } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { Option } from "../organisms/Option";
import { chromosomesParams } from "../../@types/chromosomesParams";

import axios from "axios";

export function ResearchIGA(): JSX.Element {
  // 被験者指名、ニックネーム
  const [name, setName] = useState("");
  // 世代数
  const [generationCount, setGenerationCount] = useState(1);
  // １つの世代に存在する遺伝子の情報
  const [chromosomesParams, setChromosomesParams] =
    useState<chromosomesParams | null>(null);

  // 世代の適応度、および音生成パラメータを送信。次世代の音生成パラメータの格納
  const postResult = useCallback(async () => {
    // 被験者名とパラメータを結合する
    // Object.assign(chromosomesParams, { name: name });
    // 結果を送信する
    axios
      .post("/manipulation", chromosomesParams)
      .then((response) => {
        const nextGenerationParams: chromosomesParams = response.data;
        setChromosomesParams(nextGenerationParams);
        setGenerationCount(generationCount + 1);
      })
      .catch((err) => {
        alert("データの送信に失敗しました");
      });
  }, [chromosomesParams, name]);

  {
    /* 1世代目はランダムにパラメータを生成 */
  }
  useEffect(() => {
    if (generationCount == 1) {
      axios
        .get("/manipulation/make-ramdom/all")
        .then((response) => {
          const firstGenerationParams: chromosomesParams = response.data;
          setChromosomesParams(firstGenerationParams);
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
    if (chromosomesParams) {
      for (const [chromosomeNum, chromosomeParam] of Object.entries(
        chromosomesParams
      )) {
        Options.push(
          <Option
            key={chromosomeNum}
            chromosomesParams={chromosomesParams}
            setChromosomesParameters={setChromosomesParams}
            chromosomeNumber={chromosomeNum}
            algorithmNum={chromosomeParam.algorithmNum}
            chromosomesFitnessValue={chromosomeParam.fitness}
            soundParamsList={chromosomeParam.fmParamsList}
          ></Option>
        );
      }
    }
    return Options;
  };

  return (
    <div>
      <h1>実験概要</h1>
      <ul>
        <li>実験前に下記の名前入力欄に名前を入力してください</li>
        <li>名前は英小文字、英大文字での記入としてください</li>
        <li>
          名前は本名でなくても構いませんが、今後の実験で同じ名前を使用してください
        </li>
      </ul>
      {/* 被験者名 */}
      <p>名前を入力して下さい(ローマ字で入力してください)</p>
      <TextField
        id="name"
        label="名前"
        variant="outlined"
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
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
