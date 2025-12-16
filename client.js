let socket;

document.getElementById("join").onclick = async () => {
  await Tone.start();

  socket = new WebSocket(ws://192.168.192.19:3000);

  socket.onmessage = (msg) => {
    const data = JSON.parse(msg.data);
    if (data.type === "START") {
      startSound(data.time);
    }
  };

  document.getElementById("join").innerText = "CONNECTED";
};

function startSound(startTime) {
  Tone.Transport.start(startTime);

  for (let i = 0; i < 3; i++) {
    const synth = new Tone.FMSynth({
      harmonicity: Math.random() * 5,
      modulationIndex: Math.random() * 20,
      envelope: {
        attack: 5,
        decay: 2,
        sustain: 1,
        release: 10
      }
    }).toDestination();

    const loop = new Tone.Loop(time => {
      const freq = 100 + Math.random() * 800;
      synth.triggerAttackRelease(freq, 8, time);
    }, Math.random() * 6 + 4);

    loop.start(0);
  }
}
