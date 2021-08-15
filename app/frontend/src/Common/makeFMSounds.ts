export function makeFMSounds() {
  // const audioctx = new AudioContext();
  const envelopParams = {
    level: 1,
    ratio: getRandom(1, 10),
    atack: 1 / Math.tan(getRandom_f(Math.atan(2), Math.PI / 2)),
    decay: getRandom_f(0, 1),
    sustain: getRandom_f(0, 1),
    release: getRandom_f(0, 0.5),
  };
  const operatorObj = GenerateOperator();
  Object.keys(operatorObj).forEach((key) => {
      operatorObj[key].oscillatorNode.start()
  });
}

function GenerateOperator() {
  const algoNum: number = 0;
  const audioctx:AudioContext = new AudioContext();
  // if(algoNum==0){
  let operatorObj: any = {};
  operatorObj["operator1"] = {
    oscillatorNode: new OscillatorNode(audioctx),
    gainNode: new GainNode(audioctx),
    operatorType: "carrier",
    destination: "speaker",
  };
  operatorObj["operator2"] = {
    oscillatorNode: new OscillatorNode(audioctx),
    gainNode: new GainNode(audioctx),
    operatorType: "modulator",
    destination: "operator1",
  };
  Object.keys(operatorObj).forEach((key) => {
    const oscillatorNode:OscillatorNode = operatorObj[key].oscillatorNode;
    const gainNode:GainNode = operatorObj[key].gainNode;
    const destination:string = operatorObj[key].destination;
    if (destination == "speaker") {
      oscillatorNode.connect(gainNode).connect(audioctx.destination);
    } else {
        console.log("os",oscillatorNode,"op",operatorObj[destination].oscillatorNode.frequency)
      oscillatorNode
        .connect(gainNode)
        .connect(operatorObj[destination].oscillatorNode.frequency);
    }
  });

  return operatorObj;
  // }
}

function getRandom(min: number, max: number) {
  var random = Math.floor(Math.random() * (max + 1 - min)) + min;
  return random;
}
function getRandom_f(min: number, max: number) {
  var random = Math.random() * (max - min) + min;
  return random;
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
