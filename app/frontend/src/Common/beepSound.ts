export function beepSound(soundType:string,frequency:number=440,length:number) {
  const ctx = new AudioContext()

  const gainNode = ctx.createGain();
  // 音量の初期値を0.5にする
  gainNode.gain.value = 0.05;
  let oscillator = ctx.createOscillator();
  oscillator.type = soundType as "sine" | "sawtooth" | "triangle";
  oscillator.frequency.setValueAtTime(frequency, 0);
  oscillator.connect(gainNode).connect(ctx.destination);
  oscillator.start();
  oscillator.stop(length);
}

export function changeSound(soundType:string,frequency:number=440,length:number) {
  const ctx = new AudioContext()

  const gainNode = ctx.createGain();
  // 音量の初期値を0.5にする
  gainNode.gain.value = 0.05;
  let oscillator = ctx.createOscillator();
  oscillator.type = soundType as "sine" | "sawtooth" | "triangle";
  oscillator.frequency.setValueAtTime(frequency, 0);
  oscillator.connect(gainNode).connect(ctx.destination);
  gainNode.gain.setValueAtTime(0,0)
  gainNode.gain.linearRampToValueAtTime(1,2)
  oscillator.start();
  oscillator.stop(length);
}

export function makeSound(){
  const ctx = new AudioContext()
  for (let k = 1;k < 3; k++){
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.5;
    let oscillator = ctx.createOscillator();
    oscillator.type = "sine"
    oscillator.frequency.value = (k+1) * 440
    oscillator.connect(ctx.destination)
    oscillator.start();
    // oscillator.stop(length);
  }
  // 音量の初期値を0.5にする
  // oscillator.connect(gainNode).connect(ctx.destination);
  // gainNode.gain.setValueAtTime(0,0)
  // gainNode.gain.linearRampToValueAtTime(1,2)

}

export function makeFMSound(){
  var ctx = new AudioContext();
  var carrier, modulator;
  var modulatorGain, carrierGain, feedbackGain;


      modulator = ctx.createOscillator();
      carrier = ctx.createOscillator();

      modulatorGain = ctx.createGain();
      carrierGain = ctx.createGain();
      feedbackGain = ctx.createGain();

      modulator.connect(modulatorGain);
      modulatorGain.connect(carrier.frequency);
      carrier.connect(carrierGain);
      carrierGain.connect(ctx.destination);
      modulator.connect(feedbackGain);
      feedbackGain.connect(modulator.frequency);

      var freq = 440;
      modulator.type = "sine";
      carrier.type = "sine";
      //carrier.frequency.value = 440;
      modulator.frequency.value = 3.17 * freq;
      carrier.frequency.value = 1 * freq;
      feedbackGain.gain.value = 0.1;
      modulatorGain.gain.value = (60 / 100) * 1024;
      carrierGain.gain.value = (99 / 100);
      modulator.start(0);
      carrier.start(0);

      var now = ctx.currentTime;
      var mattack = 0; mdecay = 0.5; msustain = 0.3; mrelease = 0.5;
      var cattack = 0; cdecay = 0.3; csustain = 0.7; crelease = 0.4;
      var modulatorRootValue = modulatorGain.gain.value;
      modulatorGain.gain.cancelScheduledValues(0);
      modulatorGain.gain.setValueAtTime(0.0, now);
      modulatorGain.gain.linearRampToValueAtTime(modulatorRootValue, now + mattack);
      modulatorGain.gain.linearRampToValueAtTime(msustain + modulatorRootValue, now + mattack + mdecay);
      var carrierRootValue = carrierGain.gain.value;
      carrierGain.gain.cancelScheduledValues(0);
      carrierGain.gain.setValueAtTime(0.0, now);
      carrierGain.gain.linearRampToValueAtTime(carrierRootValue, now + cattack);
      carrierGain.gain.linearRampToValueAtTime(sustain + carrierRootValue, now + cattack + cdecay);
    );

    $('#sound').mouseup(function(){
        var now = ctx.currentTime;
        var mattack = 0; mdecay = 0.5; msustain = 0.3; mrelease = 0.5;
        var cattack = 0.4; cdecay = 0.3; csustain = 0.7; crelease = 0.4;
        var modulatorRootValue = modulatorGain.gain.value;
        modulatorGain.gain.cancelScheduledValues(0);
        modulatorGain.gain.setValueAtTime(modulatorRootValue, now);
        modulatorGain.gain.linearRampToValueAtTime(0.0, now + mrelease);

        var carrierRootValue = carrierGain.gain.value;
        carrierGain.gain.cancelScheduledValues(0);
        carrierGain.gain.setValueAtTime(carrierRootValue, now);
        carrierGain.gain.linearRampToValueAtTime(0.0, now + mrelease);
        modulator.stop(now + mrelease);
        carrier.stop(now + mrelease);

        setTimeout(function(){
          delete modulator;
          delete carrier;
          delete modulatorGain;
          delete carrierGain;
        }, now + mrelease);
    });
  );
}
