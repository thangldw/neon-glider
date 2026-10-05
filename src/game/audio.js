export function createFlightAudio() {
  let context;
  return {
    unlock() {
      context ??= new (window.AudioContext || window.webkitAudioContext)();
      context.resume().catch(() => {});
    },
    play(kind) {
      if (!context || context.state !== "running") return;
      const notes = kind === "hit" ? [90, 45] : kind === "gate" ? [330, 440, 660] : kind === "near-miss" ? [520, 780] : [660, 990];
      notes.forEach((frequency, i) => {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const at = context.currentTime + i * 0.065;
        oscillator.type = kind === "hit" ? "sawtooth" : "sine";
        oscillator.frequency.setValueAtTime(frequency, at);
        gain.gain.setValueAtTime(0, at);
        gain.gain.linearRampToValueAtTime(0.055, at + 0.008);
        gain.gain.exponentialRampToValueAtTime(0.001, at + 0.16);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(at);
        oscillator.stop(at + 0.18);
      });
    },
    dispose() { context?.close().catch(() => {}); },
  };
}
