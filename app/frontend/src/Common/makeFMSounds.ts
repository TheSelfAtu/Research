import { fmParamsType, fmParamsList } from "../@types/fmParams";
import { operatorParams } from "../@types/operatorParams";
import { visualizeFFT } from "./visualizeFFT";

export function makeFMSounds(
  algoNum: string,
  fmParamsList: fmParamsList,
  geneNumber: string
) {
  //   アルゴリズムをセット
  const operatorsInfoWithGainNode = setOperatorsInfo(algoNum);
  const operatorsInfo = operatorsInfoWithGainNode["operatorsInfo"];
  const gainNodeToSpeaker = operatorsInfoWithGainNode["gainNodeToSpeaker"];
  const analyzerNodeForSpeaker = operatorsInfoWithGainNode["analyzerNode"];

  // 周波数や変調指数などをセット
  Object.keys(operatorsInfo).forEach((key) => {
    const operatorParams = operatorsInfo[key];
    const fmParams = fmParamsList[key];
    setParams(operatorParams, fmParams);
  });

  // エンベロープをセット;
  Object.keys(operatorsInfo).forEach((key) => {
    Object.keys(operatorsInfo[key].destination).forEach(
      (gainNodeDestination) => {
        const fmParams = fmParamsList[key];
        const startTime = operatorsInfo[key].startTime;
        const gainNode = operatorsInfo[key].destination[gainNodeDestination];
        if (gainNodeDestination == "gainNodeToSpeaker") {
          setEnvelop(startTime, gainNode, fmParams);
        }
      }
    );
  });

  // アナライザーをセット
  const audioContext = new AudioContext();
  visualizeFFT(audioContext, analyzerNodeForSpeaker, geneNumber);

  //   音を再生
  Object.keys(operatorsInfo).forEach((key) => {
    operatorsInfo[key].oscillatorNode.start();
  });
  return operatorsInfo;
}

function setOperatorsInfo(algoNum: string) {
  const audioContext: AudioContext = new AudioContext();
  const startTime: number = audioContext.currentTime;
  // スピーカに接続するゲインノードを生成（複数のオシレーターからの入力を受け付ける）
  const gainNodeToSpeaker = new GainNode(audioContext);
  gainNodeToSpeaker.connect(audioContext.destination);
  // アナライザーノードに接続
  const analyzerNode = new AnalyserNode(audioContext);
  gainNodeToSpeaker.connect(analyzerNode);

  let operatorsInfo: {
    [key: string]: operatorParams;
  } = {};

  // オペレーターに関する情報をセット
  setAlgorithm(algoNum, startTime, audioContext, operatorsInfo);
  for (let operatorParams of Object.values(operatorsInfo)) {
    for (let [destinationNode, gainNode] of Object.entries(
      operatorParams.destination
    )) {
      operatorParams.oscillatorNode.connect(gainNode);
      if (!(destinationNode == "gainNodeToSpeaker")) {
        // 接続先オペレーターの周波数変調を行うために接続
        gainNode.connect(
          operatorsInfo[destinationNode].oscillatorNode.frequency
        );
      } else {
        // スピーカー出力用のゲインノードに接続
        gainNode.connect(gainNodeToSpeaker);
      }
    }
  }

  return {
    operatorsInfo: operatorsInfo,
    gainNodeToSpeaker: gainNodeToSpeaker,
    analyzerNode: analyzerNode,
  };
}
/**
 *　オペレーターごとの周波数、変調指数を設定
 *
 * @param {operatorParams} operatorParams
 * @param {fmParamsType} fmParams
 */
function setParams(operatorParams: operatorParams, fmParams: fmParamsType) {
  //キャリアの周波数を設定
  operatorParams.oscillatorNode.frequency.value = fmParams.frequency;

  if (!operatorParams.destination.hasOwnProperty("gainNodeToSpeaker")) {
    // モジュレーターの周波数を設定
    // operatorParams.oscillatorNode.frequency.value = 440;
    operatorParams.oscillatorNode.frequency.value =
      fmParams.frequency * fmParams.ratioToFoundamentalFrequency;
    //   オペレーターがモジュレータの場合、変調指数を変更　＝＞振幅を変える
    for (let gainNodeToDestinaion of Object.values(
      operatorParams.destination
    )) {
      gainNodeToDestinaion.gain.value = fmParams.modulationIndex;
      // operatorParams.gainNode.gain.value = 1000;
    }
  }
}

function setEnvelop(t0: number, gainNode: GainNode, envelopParams: any) {
  const t1 = t0 + envelopParams.attack;
  const decay = envelopParams.decay;
  const sustain = envelopParams.sustain;
  const release = envelopParams.release;
  const gainValue = gainNode.gain.value;
  console.log(t1 + decay + release, "time", t1, decay, release);

  gainNode.gain.setValueAtTime(0, t0);
  // ゲインの最大までゲインを線形的に増加
  gainNode.gain.linearRampToValueAtTime(gainValue, t1);
  // sustainまでゲインを線形的に減少
  // gainNode.gain.setTargetAtTime(sustain * gainValue, t1, t1 + decay);
  gainNode.gain.setTargetAtTime(sustain * gainValue, t1, decay);
  // gainNode.gain.setTargetAtTime(sustain * gainValue, t1, t1 + decay + 1);
  // sustainからゲインを0まで減少
  // gainNode.gain.setTargetAtTime(0, t1 + decay + 1, t1 + decay + release);
  gainNode.gain.setTargetAtTime(0, t1 + decay, release);
}

function setAlgorithm(
  algoNum: string,
  startTime: number,
  audioContext: AudioContext,
  operatorsInfo: { [key: string]: operatorParams | GainNode }
) {
  if (algoNum == "0") {
    //   1オペレータ、1キャリアのアルゴリズム
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: {
        gainNodeToSpeaker: new GainNode(audioContext),
      },
    };

    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: {
        operator1: new GainNode(audioContext),
      },
    };
  }
  if (algoNum == "1") {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { gainNodeToSpeaker: new GainNode(audioContext) },
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
  }
  if (algoNum == "2") {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { gainNodeToSpeaker: new GainNode(audioContext) },
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator2: new GainNode(audioContext) },
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator2: new GainNode(audioContext) },
    };
  }
  if (algoNum == "3") {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { gainNodeToSpeaker: new GainNode(audioContext) },
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator2: new GainNode(audioContext) },
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
  }
  if (algoNum == "4") {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { gainNodeToSpeaker: new GainNode(audioContext) },
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator1: new GainNode(audioContext) },
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      destination: { operator3: new GainNode(audioContext) },
    };
  }
  // 以下は現在の実装ではアルゴリズムが組めない
  // if (algoNum == "5") {
  //   operatorsInfo["operator1"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "speaker",
  //   };
  //   operatorsInfo["operator2"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  //   operatorsInfo["operator3"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator2",
  //   };
  //   operatorsInfo["operator4"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  // }
  // if (algoNum == "6") {
  //   operatorsInfo["operator1"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "speaker",
  //   };
  //   operatorsInfo["operator2"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  //   operatorsInfo["operator3"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator2",
  //   };
  //   operatorsInfo["operator4"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  // }
  // if (algoNum == "7") {
  //   operatorsInfo["operator1"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "speaker",
  //   };
  //   operatorsInfo["operator2"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  //   operatorsInfo["operator3"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator2",
  //   };
  //   operatorsInfo["operator4"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  // }
  // if (algoNum == "8") {
  //   operatorsInfo["operator1"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "speaker",
  //   };
  //   operatorsInfo["operator2"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  //   operatorsInfo["operator3"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator2",
  //   };
  //   operatorsInfo["operator4"] = {
  //     audioContext: audioContext,
  //     startTime: startTime,
  //     oscillatorNode: new OscillatorNode(audioContext),
  //     analyserNode: new AnalyserNode(audioContext),
  //     destination: "operator1",
  //   };
  // }
}
