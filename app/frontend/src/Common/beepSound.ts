export function beepSound(ctx: AudioContext | null) {
  if (ctx == null) {
    console.log("ctx null");
    return;
  }
  console.log("ctx not null", ctx);
  const gainNode = ctx.createGain();
  // 音量の初期値を0.5にする
  gainNode.gain.value = 0.05;
  let oscillator = ctx.createOscillator();
  oscillator.type = "sawtooth";
  let isPlaying = false;
  oscillator.frequency.setValueAtTime(880, 0);
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  oscillator.stop(0.1);
}
