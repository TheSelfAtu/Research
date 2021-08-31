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
  // エンベロープをセット;
  Object.keys(operatorsInfo).forEach((key) => {
    Object.keys(operatorsInfo[key].destination).forEach(
      (gainNodeDestination) => {
        const fmParams = fmParamsList[key];
        const startTime = operatorsInfo[key].startTime;
        const gainNode = operatorsInfo[key].destination[gainNodeDestination];
        setEnvelop(startTime, gainNode, fmParams, 1);
      }
    );
  });
  // 周波数や変調指数などをセット
  Object.keys(operatorsInfo).forEach((key) => {
    const operatorParams = operatorsInfo[key];
    const fmParams = fmParamsList[key];
    setParams(operatorParams, fmParams);
  });

  // アナライザーをセット
  const audioContext = new AudioContext();
  visualizeFFT(audioContext, analyzerNodeForSpeaker, geneNumber);
  console.log("here");

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
  // console.log("ossdsdfsdf", operatorsInfo.destinationNode.oscillatorNode);
  setAlgorithm(algoNum, startTime, audioContext, operatorsInfo);
  for (let operatorParams of Object.values(operatorsInfo)) {
    for (let [destinationNode, gainNode] of Object.entries(
      operatorParams.destination
    )) {
      operatorParams.oscillatorNode.connect(gainNode);
      if (!(destinationNode == "gainNodeToSpeaker")) {
        // 接続先オペレーターの周波数変調を行うために接続
        console.log(
          "ossdsdfsdf",
          destinationNode,
          operatorsInfo,
          operatorsInfo.destinationNode
        );
        const s = String(destinationNode);
        gainNode.connect(
          operatorsInfo[destinationNode].oscillatorNode.frequency
        );
      } else {
        // スピーカー出力用のゲインノードに接続
        gainNode.connect(gainNodeToSpeaker);
      }
    }
  }
  // console.log("oaaa");

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
  const frequency = fmParams.frequency;
  //キャリアの周波数を設定
  operatorParams.oscillatorNode.frequency.value = fmParams.frequency;

  // モジュレーターの周波数を設定
  if (!operatorParams.destination.hasOwnProperty("gainNodeToSpeaker")) {
    // operatorParams.oscillatorNode.frequency.value = 440;
    operatorParams.oscillatorNode.frequency.value =
      frequency * fmParams.ratioToFoundamentalFrequency;
  }
  for (let gainNodeToDestinaion of Object.values(operatorParams.destination)) {
    //   オペレーターがモジュレータの場合、変調指数を変更　＝＞振幅を変える
    gainNodeToDestinaion.gain.value = fmParams.modulationIndex;
    // operatorParams.gainNode.gain.value = 1000;
  }
}

function setEnvelop(
  t0: number,
  gainNode: GainNode,
  envelopParams: any,
  AtkLevel: number
) {
  console.log(gainNode, "gain");

  const t1 = t0 + envelopParams.attack;
  const decay = envelopParams.decay;
  const sustain = AtkLevel * envelopParams.sustain;
  const release = AtkLevel * envelopParams.release;
  gainNode.gain.setValueAtTime(0, t0);
  gainNode.gain.linearRampToValueAtTime(AtkLevel, t1);
  gainNode.gain.linearRampToValueAtTime(sustain, t1 + decay);
  gainNode.gain.linearRampToValueAtTime(0, t1 + decay + release);
}

function setAlgorithm(
  algoNum: string,
  startTime: number,
  audioContext: AudioContext,
  operatorsInfo: { [key: string]: operatorParams | GainNode }
) {
  console.log("out", algoNum);

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
    console.log("algo");
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
