import { fmParamsType } from "../@types/fmParams";
import { operatorParams } from "../@types/operatorParams";

export function makeFMSounds(fmParams: fmParamsType) {
  //   アルゴリズムをセット
  const operatorsInfo = setAlgorithm();
  //   エンベロープをセット
  //   Object.keys(operatorsInfo).forEach((key) => {
  //     const startTime = operatorsInfo[key].startTime;
  //     const gainNode = operatorsInfo[key].gainNode;
  //     setEnvelop(startTime, gainNode, fmParams, 1);
  //   });
  // 周波数や変調指数などをセット
  Object.keys(operatorsInfo).forEach((key) => {
    const operatorParam = operatorsInfo[key];
    setParams(operatorParam, fmParams);
  });
  //   音を再生
  Object.keys(operatorsInfo).forEach((key) => {
    operatorsInfo[key].oscillatorNode.start();
  });
}

function setAlgorithm() {
  const algoNum: number = 0;
  const audioctx: AudioContext = new AudioContext();
  const startTime: number = audioctx.currentTime;
  // if(algoNum==0){
  //   1オペレータ、1キャリアのアルゴリズム
  let operatorObj:
    | { [key: string]: operatorParams }
    | { [key: string]: never } = {};
  operatorObj["operator1"] = {
    startTime: startTime,
    oscillatorNode: new OscillatorNode(audioctx),
    gainNode: new GainNode(audioctx),
    operatorType: "carrier",
    destination: "speaker",
  };

  operatorObj["operator2"] = {
    startTime: startTime,
    oscillatorNode: new OscillatorNode(audioctx),
    gainNode: new GainNode(audioctx),
    operatorType: "modulator",
    destination: "operator1",
  };
  Object.keys(operatorObj).forEach((key) => {
    const oscillatorNode: OscillatorNode = operatorObj[key].oscillatorNode;
    const gainNode: GainNode = operatorObj[key].gainNode;
    const destination: string = operatorObj[key].destination;
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
  // }
}

function setParams(operatorParams: operatorParams, fmParams: fmParamsType) {
  operatorParams.oscillatorNode.frequency.value = 220;
  //   operatorParams.oscillatorNode.frequency.value = fmParams.frequency;
  if (operatorParams.destination != "speaker") {
    //   オペレーターがモジュレータの場合、変調指数を変更　＝＞振幅を変える
    console.log("modu indx", fmParams.modulationIndex);
    operatorParams.gainNode.gain.value = 1000;
    operatorParams.gainNode.gain.value = fmParams.modulationIndex;
    operatorParams.oscillatorNode.frequency.value = 440;
    console.log(operatorParams.destination);
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
