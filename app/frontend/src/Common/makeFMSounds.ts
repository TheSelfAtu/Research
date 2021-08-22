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
  const algoNum: number = 1;
  const audioctx: AudioContext = new AudioContext();
  const startTime: number = audioctx.currentTime;
  let operatorObj:
    | { [key: string]: operatorParams }
    | { [key: string]: never } = {};
  if (algoNum == 0) {
    //   1オペレータ、1キャリアのアルゴリズム
    operatorObj["operator1"] = {
      audioContext: audioctx,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioctx),
      analyserNode: new AnalyserNode(audioctx),
      gainNode: new GainNode(audioctx),
      operatorType: "carrier",
      destination: "speaker",
    };

    operatorObj["operator2"] = {
      audioContext: audioctx,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioctx),
      analyserNode: new AnalyserNode(audioctx),
      gainNode: new GainNode(audioctx),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  if (algoNum == 1) {
    operatorObj["operator1"] = {
      audioContext: audioctx,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioctx),
      analyserNode: new AnalyserNode(audioctx),
      gainNode: new GainNode(audioctx),
      operatorType: "carrier",
      destination: "speaker",
    };
    operatorObj["operator2"] = {
      audioContext: audioctx,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioctx),
      analyserNode: new AnalyserNode(audioctx),
      gainNode: new GainNode(audioctx),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorObj["operator3"] = {
      audioContext: audioctx,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioctx),
      analyserNode: new AnalyserNode(audioctx),
      gainNode: new GainNode(audioctx),
      operatorType: "modulator",
      destination: "operator1",
    };
    operatorObj["operator4"] = {
      audioContext: audioctx,
      startTime: startTime,
      oscillatorNode: new OscillatorNode(audioctx),
      analyserNode: new AnalyserNode(audioctx),
      gainNode: new GainNode(audioctx),
      operatorType: "modulator",
      destination: "operator1",
    };
  }
  Object.keys(operatorObj).forEach((key) => {
    const oscillatorNode: OscillatorNode = operatorObj[key].oscillatorNode;
    const analyserNode: AnalyserNode = operatorObj[key].analyserNode;
    const gainNode: GainNode = operatorObj[key].gainNode;
    const destination: string = operatorObj[key].destination;
    // gainノードをアナライザーに接続
    gainNode.connect(analyserNode);
    // 出力先に接続
    if (destination == "speaker") {
      oscillatorNode.connect(gainNode).connect(audioctx.destination);
    } else {
      oscillatorNode
        .connect(gainNode)
        .connect(operatorObj[destination].oscillatorNode.frequency);
    }
  });
  return operatorObj;
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
  gainNode.gain.setValueAtTime(0, t0);
  gainNode.gain.linearRampToValueAtTime(AtkLevel, t1);
  gainNode.gain.linearRampToValueAtTime(s, t1 + d);
  gainNode.gain.setValueAtTime(s, t1 + d);
}
