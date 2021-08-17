export type operatorParams = {
  startTime: number;
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
  operatorType: "carrier" | "modulator";
  destination:
    | "speaker"
    | "operator1"
    | "operator2"
    | "operator3"
    | "operator4";
};
