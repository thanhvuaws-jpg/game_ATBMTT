// audio.js — Web Audio API sound effects, không cần file mp3 ngoài

const Audio = (() => {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); }
      catch(e) { return null; }
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function beep(freq, duration, type = 'sine', gain = 0.3) {
    if (muted) return;
    const c = getCtx();
    if (!c) return;
    const osc = c.createOscillator();
    const g = c.createGain();
    osc.connect(g);
    g.connect(c.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, c.currentTime);
    g.gain.setValueAtTime(gain, c.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + duration);
  }

  function chord(freqs, duration, type = 'sine', gain = 0.2) {
    if (muted) return;
    freqs.forEach(f => beep(f, duration, type, gain));
  }

  return {
    correct() {
      beep(523, 0.1, 'sine', 0.25);
      setTimeout(() => beep(659, 0.15, 'sine', 0.25), 80);
      setTimeout(() => beep(784, 0.2,  'sine', 0.25), 160);
    },
    wrong() {
      beep(220, 0.12, 'sawtooth', 0.2);
      setTimeout(() => beep(180, 0.18, 'sawtooth', 0.2), 100);
    },
    stamp() {
      beep(300, 0.06, 'square', 0.15);
      setTimeout(() => beep(250, 0.1, 'square', 0.1), 50);
    },
    tick() {
      beep(880, 0.04, 'square', 0.08);
    },
    urgent() {
      beep(440, 0.08, 'square', 0.15);
      setTimeout(() => beep(440, 0.08, 'square', 0.15), 150);
    },
    chapterComplete() {
      chord([523, 659, 784], 0.4, 'sine', 0.18);
      setTimeout(() => chord([659, 784, 987], 0.5, 'sine', 0.15), 300);
    },
    click() {
      beep(600, 0.05, 'sine', 0.1);
    },
    setMuted(v) { muted = v; },
    isMuted() { return muted; }
  };
})();
