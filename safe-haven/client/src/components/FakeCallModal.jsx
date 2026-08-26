import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  PhoneOff, 
  Mic, 
  Volume2, 
  User, 
  ShieldCheck, 
  Clock,
  Sparkles
} from 'lucide-react';
import { playRingtone, stopRingtone, speakEscapeDialogue, stopEscapeDialogue } from '../utils/audio';

export default function FakeCallModal({ onClose, defaultCaller = "Mom 💕" }) {
  const [callerName, setCallerName] = useState(defaultCaller);
  const [callState, setCallState] = useState('incoming'); // 'incoming', 'active', 'ended'
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeaker, setIsSpeaker] = useState(true);

  // Play ringtone on mount if in 'incoming' state
  useEffect(() => {
    if (callState === 'incoming') {
      playRingtone();
    }
    return () => {
      stopRingtone();
      stopEscapeDialogue();
    };
  }, [callState]);

  // Call timer when active
  useEffect(() => {
    let timer = null;
    if (callState === 'active') {
      timer = setInterval(() => {
        setCallDuration(d => d + 1);
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [callState]);

  const handleAnswer = () => {
    stopRingtone();
    setCallState('active');
    // Speak friendly escape dialogue
    speakEscapeDialogue(callerName, () => {
      // Finished speaking
    });
  };

  const handleDecline = () => {
    stopRingtone();
    stopEscapeDialogue();
    setCallState('ended');
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const formatDuration = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  return (
    <div className="modal-backdrop" style={{ background: 'rgba(15, 12, 25, 0.85)', backdropFilter: 'blur(16px)' }}>
      <div style={{
        width: '100%',
        maxWidth: '360px',
        height: '640px',
        maxHeight: '90vh',
        background: 'linear-gradient(180deg, #1E1B29 0%, #2A2035 50%, #171421 100%)',
        borderRadius: '36px',
        border: '3px solid rgba(255, 180, 200, 0.4)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '36px 24px',
        color: 'white',
        position: 'relative',
        overflow: 'hidden'
      }}>
        
        {/* Top Reassurance Tag */}
        <div style={{
          background: 'rgba(255, 158, 170, 0.2)',
          border: '1px solid rgba(255, 158, 170, 0.4)',
          borderRadius: 'var(--radius-full)',
          padding: '4px 12px',
          fontSize: '0.72rem',
          color: '#FFB6C1',
          display: 'flex',
          alignItems: 'center',
          gap: '5px'
        }}>
          <ShieldCheck size={13} />
          <span>SafeHaven Escape Simulator 🌸</span>
        </div>

        {/* Caller Avatar & Info */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '10px'
        }}>
          <div style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF9EAA 0%, #B8A4E3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '44px',
            boxShadow: '0 10px 25px rgba(255, 158, 170, 0.4)',
            marginBottom: '16px',
            animation: callState === 'incoming' ? 'pulseGlow 2s infinite' : 'none'
          }}>
            👩‍👧
          </div>

          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 4px 0', color: 'white' }}>
            {callerName}
          </h2>

          <p style={{
            fontSize: '0.9rem',
            color: callState === 'incoming' ? '#FF9EAA' : '#62C498',
            fontWeight: 600,
            margin: 0
          }}>
            {callState === 'incoming' && 'Incoming Call...'}
            {callState === 'active' && formatDuration(callDuration)}
            {callState === 'ended' && 'Call Ended'}
          </p>
        </div>

        {/* Mid Voice Script Simulation Prompt (When Active) */}
        {callState === 'active' && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            borderRadius: '16px',
            padding: '12px 16px',
            fontSize: '0.8rem',
            lineHeight: 1.4,
            color: '#F4EEFB',
            textAlign: 'center',
            border: '1px solid rgba(255, 255, 255, 0.15)'
          }}>
            💬 <em>"Hey sweetie! Just checking in on you. Can you head back soon? We really need your help at home!"</em>
          </div>
        )}

        {/* Bottom Controls */}
        <div style={{ width: '100%' }}>
          
          {callState === 'incoming' ? (
            /* Incoming Answer / Decline Buttons */
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              width: '100%'
            }}>
              {/* Decline Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleDecline}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#FF3B30',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(255, 59, 48, 0.4)'
                  }}
                >
                  <PhoneOff size={28} />
                </button>
                <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>Decline</span>
              </div>

              {/* Answer Button */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={handleAnswer}
                  style={{
                    width: '68px',
                    height: '68px',
                    borderRadius: '50%',
                    background: '#34C759',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 8px 20px rgba(52, 199, 89, 0.4)',
                    animation: 'pulseGlow 1.5s infinite'
                  }}
                >
                  <Phone size={28} />
                </button>
                <span style={{ fontSize: '0.78rem', opacity: 0.8 }}>Answer</span>
              </div>
            </div>
          ) : (
            /* Active Call Buttons */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', gap: '20px' }}>
                <button
                  type="button"
                  onClick={() => setIsMuted(!isMuted)}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: isMuted ? 'white' : 'rgba(255, 255, 255, 0.15)',
                    color: isMuted ? '#2B2533' : 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Mic size={20} />
                </button>
                <button
                  type="button"
                  onClick={() => setIsSpeaker(!isSpeaker)}
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '50%',
                    background: isSpeaker ? 'white' : 'rgba(255, 255, 255, 0.15)',
                    color: isSpeaker ? '#2B2533' : 'white',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Volume2 size={20} />
                </button>
              </div>

              {/* End Call Button */}
              <button
                type="button"
                onClick={handleDecline}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: '#FF3B30',
                  border: 'none',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  boxShadow: '0 8px 20px rgba(255, 59, 48, 0.4)'
                }}
              >
                <PhoneOff size={28} />
              </button>
            </div>
          )}

          {/* Quick Caller Customizer */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
            {['Mom 💕', 'Sarah (Bestie) 🌸', 'Dad 🛡️', 'Roommate 🏠'].map(name => (
              <button
                key={name}
                type="button"
                onClick={() => setCallerName(name)}
                style={{
                  background: callerName === name ? 'rgba(255, 158, 170, 0.4)' : 'rgba(255, 255, 255, 0.08)',
                  color: 'white',
                  border: 'none',
                  padding: '3px 8px',
                  borderRadius: '8px',
                  fontSize: '0.68rem',
                  cursor: 'pointer'
                }}
              >
                {name.split(' ')[0]}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
