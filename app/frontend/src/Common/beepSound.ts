export function beepSound(){
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    const gainNode = ctx.createGain();
    // 音量の初期値を0.5にする
    gainNode.gain.value = 0.5;
    
    let oscillator;
    let isPlaying = false;
}