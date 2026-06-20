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
      beep(523.25, 0.08, 'sine', 0.15);
      setTimeout(() => beep(659.25, 0.08, 'sine', 0.15), 50);
      setTimeout(() => beep(783.99, 0.08, 'sine', 0.15), 100);
      setTimeout(() => beep(1046.50, 0.18, 'sine', 0.2), 150);
    },
    wrong() {
      beep(150, 0.15, 'sawtooth', 0.22);
      beep(152, 0.15, 'triangle', 0.22);
      setTimeout(() => {
        beep(110, 0.22, 'sawtooth', 0.25);
      }, 70);
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
      chord([523.25, 659.25, 783.99], 0.25, 'sine', 0.15);
      setTimeout(() => chord([659.25, 783.99, 987.77], 0.25, 'sine', 0.12), 120);
      setTimeout(() => chord([783.99, 987.77, 1318.51], 0.45, 'sine', 0.1), 240);
    },
    click() {
      beep(650, 0.04, 'sine', 0.08);
      setTimeout(() => beep(950, 0.03, 'sine', 0.05), 25);
    },
    hover() {
      beep(1200, 0.03, 'sine', 0.04);
    },
    setMuted(v) { muted = v; },
    isMuted() { return muted; }
  };
})();
