import { fmParamsType, fmParamsList } from "../@types/fmParams";
import { operatorParams } from "../@types/operatorParams";
import { visualizeFFT } from "./visualizeFFT";

export function makeFMSounds(fmParamsList: fmParamsList) {
  //   アルゴリズムをセット
  const operatorsInfo = setAlgorithm();
  // エンベロープをセット;
  Object.keys(operatorsInfo).forEach((key) => {
    const startTime = operatorsInfo[key].startTime;
    const gainNode = operatorsInfo[key].gainNode;
    const fmParams = fmParamsList[key];
    setEnvelop(startTime, gainNode, fmParams, 1);
  });
  // 周波数や変調指数などをセット
  Object.keys(operatorsInfo).forEach((key) => {
    const operatorParam = operatorsInfo[key];
    const fmParams = fmParamsList[key];
    setParams(operatorParam, fmParams);
  });
  // アナライザーをセット
  Object.keys(operatorsInfo).forEach((key) => {
    if (operatorsInfo[key].destination == "speaker") {
      const audioContext: AudioContext = operatorsInfo[key].audioContext;
      const analyserNode: AnalyserNode = operatorsInfo[key].analyserNode;
      visualizeFFT(audioContext, analyserNode);
    }
  });

  //   音を再生
  Object.keys(operatorsInfo).forEach((key) => {
    operatorsInfo[key].oscillatorNode.start();
  });
  return operatorsInfo;
}

function setAlgorithm() {
  const algoNum: number = 4;
  const audioContext: AudioContext = new AudioContext();
  const startTime: number = audioContext.currentTime;
  let operatorsInfo:
    | { [key: string]: operatorParams }
    | { [key: string]: never } = {};

  // オペレーターに関する情報をセット
  setOperatorInfo(algoNum, startTime, audioContext, operatorsInfo);

  Object.keys(operatorsInfo).forEach((key) => {
    const oscillatorNode: OscillatorNode = operatorsInfo[key].oscillatorNode;
    const analyserNode: AnalyserNode = operatorsInfo[key].analyserNode;
    const gainNode: GainNode = operatorsInfo[key].gainNode;
    const destination: string = operatorsInfo[key].destination;
    // gainノードをアナライザーに接続
    gainNode.connect(analyserNode);
    // 出力先に接続
    if (destination == "speaker") {
      oscillatorNode.connect(gainNode).connect(audioContext.destination);
    } else {
      oscillatorNode
        .connect(gainNode)
        .connect(operatorsInfo[destination].oscillatorNode.frequency);
    }
  });
  return operatorsInfo;
}

/**
 *　オペレーターごとの周波数、変調指数を設定
 *
 * @param {operatorParams} operatorParams
 * @param {fmParamsType} fmParams
 */
function setParams(operatorParams: operatorParams, fmParams: fmParamsType) {
  const frequency = fmParams.frequency;
  operatorParams.oscillatorNode.frequency.value = fmParams.frequency;
  if (operatorParams.destination != "speaker") {
    //   オペレーターがモジュレータの場合、変調指数を変更　＝＞振幅を変える
    operatorParams.gainNode.gain.value = fmParams.modulationIndex;
    // operatorParams.gainNode.gain.value = 200;
    // operatorParams.oscillatorNode.frequency.value = 440;
    operatorParams.oscillatorNode.frequency.value =
      frequency * fmParams.ratioToFoundamentalFrequency;
  }
}

function setEnvelop(
  t0: number,
  gainNode: GainNode,
  envelopParams: any,
  AtkLevel: number
) {
  const t1 = t0 + envelopParams.atack;
  const d = envelopParams.decay;
  const s = AtkLevel * envelopParams.sustain;
  const r = AtkLevel * envelopParams.release;
  gainNode.gain.setValueAtTime(0, t0);
  gainNode.gain.linearRampToValueAtTime(AtkLevel, t1);
  gainNode.gain.linearRampToValueAtTime(s, t1 + d);
  gainNode.gain.linearRampToValueAtTime(0, t1 + d + r);
}

function setOperatorInfo(
  algoNum: number,
  startTime: number,
  audioContext: AudioContext,
  operatorsInfo: { [key: string]: operatorParams }
) {
  if (algoNum == 0) {
    //   1オペレータ、1キャリアのアルゴリズム
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };

    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  if (algoNum == 1) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  if (algoNum == 2) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator2",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator2",
    };
  }
  if (algoNum == 3) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator2",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  if (algoNum == 4) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator3",
    };
  }
  // 以下は現在の実装ではアルゴリズムが組めない
  if (algoNum == 5) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator2",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  if (algoNum == 6) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator2",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  if (algoNum == 7) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator2",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  if (algoNum == 8) {
    operatorsInfo["operator1"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorsInfo["operator2"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorsInfo["operator3"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator2",
    };
    operatorsInfo["operator4"] = {
      audioContext: audioContext,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioContext),
      analyserNode: new AnalyserNode(audioContext),
      gainNode: new GainNode(audioContext),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
}
