import { fmParamsType } from "../@types/fmParams";
export function generateFMParameters() {
  const modulationIndexCandidate = [0.1, 1, 10, 100, 200, 500];
  const frequencyCandidate = [440];
  const ratioCandidate = [1, 2, 3, 4];
  const fmParams: fmParamsType = {
    atack:
      Math.floor((1 / Math.tan(getRandom_f(Math.atan(2), Math.PI / 2))) * 100) /
      100,
    decay: getRandom_f(0, 1),
    sustain: getRandom_f(0, 1),
    release: getRandom_f(0, 0.5),
    frequency:
      frequencyCandidate[Math.floor(Math.random() * frequencyCandidate.length)],
    ratioToFoundamentalFrequency:
      ratioCandidate[Math.floor(Math.random() * ratioCandidate.length)],
    modulationIndex:
      modulationIndexCandidate[
        Math.floor(Math.random() * modulationIndexCandidate.length)
      ],
  };
  return fmParams;
}

function getRandom(min: number, max: number) {
  let random = Math.floor(Math.random() * (max + 1 - min)) + min;
  random = Math.floor(random * 100) / 100;
  return random;
}

function getRandom_f(min: number, max: number) {
  let random = Math.random() * (max - min) + min;
  random = Math.floor(random * 100) / 100;
  return random;
}
