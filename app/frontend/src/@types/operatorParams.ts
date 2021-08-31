// 各オペレータがもつ属性
export type operatorParams = {
  startTime: number;
  audioContext: AudioContext;
  oscillatorNode: OscillatorNode;
  analyserNode: AnalyserNode;
  destination: { [key: string]: GainNode };
};
// export type operatorParams = {
//   startTime: number;
//   audioContext: AudioContext;
//   oscillatorNode: OscillatorNode;
//   analyserNode: AnalyserNode;
//   gainNode: GainNode;
//   operatorType: "carrier" | "modulator";
//   destination:
//     | "speaker"
//     | "operator1"
//     | "operator2"
//     | "operator3"
//     | "operator4";
// };
