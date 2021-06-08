type beepSoundType = "sine" | "sawtooth" | "triangle";

export function beepSound(soundType:beepSoundType,frequency:number=440,length:number) {
  const ctx = new AudioContext()
  const gainNode = ctx.createGain();
  // 音量の初期値を0.5にする
  gainNode.gain.value = 0.05;
  let oscillator = ctx.createOscillator();
  oscillator.type = soundType;
  oscillator.frequency.setValueAtTime(frequency, 0);
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  oscillator.stop(length);
}
