// Web Audio API Synthesizer for Ringtone & SOS Siren

let audioCtx = null;
let ringtoneInterval = null;
let sirenInterval = null;
let sirenOsc = null;
let sirenGain = null;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

// Play pleasant smartphone ringtone sequence
export function playRingtone() {
  stopRingtone();
  const ctx = getAudioContext();
  if (!ctx) return;

  const notes = [
    { freq: 587.33, dur: 0.15 }, // D5
    { freq: 659.25, dur: 0.15 }, // E5
    { freq: 880.00, dur: 0.25 }, // A5
    { freq: 783.99, dur: 0.25 }, // G5
    { freq: 659.25, dur: 0.35 }  // E5
  ];

  const playTone = (freq, duration, delay = 0) => {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0, ctx.currentTime + delay);
      gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + duration);
    } catch (e) {
      console.warn('Audio ringtone tone error:', e);
    }
  };

  const playPhrase = () => {
    let offset = 0;
    notes.forEach(n => {
      playTone(n.freq, n.dur, offset);
      offset += n.dur + 0.05;
    });
  };

  playPhrase();
  ringtoneInterval = setInterval(playPhrase, 2200);
}

export function stopRingtone() {
  if (ringtoneInterval) {
    clearInterval(ringtoneInterval);
    ringtoneInterval = null;
  }
}

// Play emergency SOS siren sound
export function playSosSiren() {
  stopSosSiren();
  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    sirenOsc = ctx.createOscillator();
    sirenGain = ctx.createGain();

    sirenOsc.type = 'sawtooth';
    sirenGain.gain.setValueAtTime(0.25, ctx.currentTime);

    sirenOsc.connect(sirenGain);
    sirenGain.connect(ctx.destination);

    sirenOsc.start();

    let high = true;
    sirenInterval = setInterval(() => {
      if (sirenOsc && ctx) {
        const targetFreq = high ? 950 : 650;
        sirenOsc.frequency.linearRampToValueAtTime(targetFreq, ctx.currentTime + 0.2);
        high = !high;
      }
    }, 250);
  } catch (e) {
    console.warn('Siren play error:', e);
  }
}

export function stopSosSiren() {
  if (sirenInterval) {
    clearInterval(sirenInterval);
    sirenInterval = null;
  }
  if (sirenOsc) {
    try {
      sirenOsc.stop();
      sirenOsc.disconnect();
    } catch (e) {}
    sirenOsc = null;
  }
}

// Synthesize friendly escape dialogue
export function speakEscapeDialogue(callerName = "Mom", onEnd) {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();

  const script = `Hey sweetie! Just checking in on you. Can you head back soon? We really need your help with something at home, let me know when you've ordered your ride!`;
  const utterance = new SpeechSynthesisUtterance(script);
  utterance.rate = 1.0;
  utterance.pitch = 1.1;

  // Try to pick a natural friendly voice
  const voices = window.speechSynthesis.getVoices();
  const femaleVoice = voices.find(v => (v.name.includes('Female') || v.name.includes('Samantha') || v.name.includes('Google') || v.name.includes('Zira')));
  if (femaleVoice) {
    utterance.voice = femaleVoice;
  }

  if (onEnd) {
    utterance.onend = onEnd;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopEscapeDialogue() {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
