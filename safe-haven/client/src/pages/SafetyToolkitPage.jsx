import React, { useState } from 'react';
import { 
  ShieldCheck, 
  PhoneCall, 
  ShieldAlert, 
  CheckSquare, 
  Square, 
  HelpCircle, 
  HeartHandshake, 
  Sun, 
  Moon, 
  Sparkles,
  Phone,
  AlertCircle,
  Lightbulb
} from 'lucide-react';

export default function SafetyToolkitPage({ 
  onOpenFakeCall, 
  onOpenSos,
  onOpenReportModal
}) {
  const [checklist, setChecklist] = useState([
    { id: 1, text: 'Phone battery is charged above 60% 🔋', done: true },
    { id: 2, text: 'Shared live location / hangout plan with a trusted contact 💕', done: true },
    { id: 3, text: 'Verified venue safe time window & night street lighting ⭐', done: false },
    { id: 4, text: 'Planned return transport (verified rideshare or well-lit metro station) 🚕', done: false },
    { id: 5, text: 'Added local emergency helpline numbers to quick dial 📞', done: true }
  ]);

  const toggleItem = (id) => {
    setChecklist(checklist.map(item => item.id === id ? { ...item, done: !item.done } : item));
  };

  const safetyTips = [
    {
      title: '🌸 Safe First Dates & Solo Cafes',
      tips: [
        'Always pick high-safety rated spots (★4.8+) with active staff and open glass storefronts.',
        'Use the "Ask for Angela" protocol at cafe counters if you ever feel uncomfortable.',
        'Set a 45-minute SafeHaven check-in timer so your bestie or mom knows you are having fun.'
      ],
      color: '#FF6B8B',
      bg: 'var(--pastel-pink-light)'
    },
    {
      title: '🛡️ Night Walk & Unfamiliar Area Confidence',
      tips: [
        'Stick to solar-lit main boulevards and avoid shortcuts through unlit alleys or rear parking.',
        'Keep one earbud out in unfamiliar neighborhoods to maintain situational awareness.',
        'Park vehicles in monitored CCTV zones and check the back seat before unlocking.'
      ],
      color: '#4B6CB7',
      bg: 'var(--pastel-sky-light)'
    },
    {
      title: '✨ Group Night Out & Drink Safety',
      tips: [
        'Never leave drinks unattended; ask venues for safety drink caps or test strips when needed.',
        'Designate a "Safety Buddy" in your group and confirm everyone makes it into their ride home.',
        'Trigger the SafeHaven Fake Call simulator if you need a graceful excuse to step out.'
      ],
      color: '#7E57C2',
      bg: 'var(--pastel-purple-light)'
    }
  ];

  return (
    <div style={{ maxWidth: '1080px', margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FAF4FC 50%, #F0F8FF 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        border: '1.5px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        <div style={{ maxWidth: '650px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', padding: '3px 12px', borderRadius: 'var(--radius-full)', marginBottom: '8px', border: '1px solid var(--pastel-pink-soft)' }}>
            <Sparkles size={14} color="#FF6B8B" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#B52B4E' }}>
              Your Personal Safety Superpower
            </span>
          </div>

          <h2 style={{ fontSize: '1.8rem', fontWeight: 800, margin: '0 0 8px 0', color: 'var(--text-primary)' }}>
            SafeHaven Toolkit & Reassurance Hub 🛡️🌸
          </h2>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.5 }}>
            Practical safety tools designed to give you peace of mind, graceful exit excuses, and instant emergency reassurance.
          </p>
        </div>

        <button
          onClick={onOpenReportModal}
          className="btn-secondary"
          style={{ padding: '10px 20px', fontSize: '0.88rem' }}
        >
          <span>Submit Community Safety Tip 🌸</span>
        </button>
      </div>

      {/* Main Interactive Utilities Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '20px' }}>
        
        {/* Fake Call Tool Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1.5px solid var(--pastel-purple-soft)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px',
              background: 'var(--pastel-purple-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              border: '1px solid var(--pastel-purple-soft)'
            }}>
              📞
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                Escape Fake Call Simulator
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Realistic ringing & voice dialogue to excuse yourself gracefully
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            Stuck in an awkward date, uncomfortable conversation, or want a believable reason to leave? Tap below to trigger a realistic incoming call from "Mom 💕" or "Bestie 🌸" with authentic audio speech synthesis!
          </p>

          <button
            type="button"
            onClick={onOpenFakeCall}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #B8A4E3 0%, #7E57C2 100%)',
              boxShadow: '0 6px 20px rgba(126, 87, 194, 0.35)',
              marginTop: 'auto',
              justifyContent: 'center'
            }}
          >
            <PhoneCall size={16} />
            <span>Launch Escape Fake Call 📞</span>
          </button>
        </div>

        {/* SOS Siren & Dispatch Card */}
        <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '14px', border: '1.5px solid #FFCCD5' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '46px',
              height: '46px',
              borderRadius: '16px',
              background: '#FFF0F3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '22px',
              border: '1px solid #FFB6C1'
            }}>
              🚨
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0, color: '#B52B4E' }}>
                SOS Siren & Emergency Dispatch
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                High-decibel audio siren & GPS emergency broadcast
              </p>
            </div>
          </div>

          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
            In an emergency? Trigger a loud audio siren to deter intruders and attract bystanders, or send an instant one-tap SOS payload containing your live GPS coordinates to your primary emergency contacts.
          </p>

          <button
            type="button"
            onClick={onOpenSos}
            className="btn-sos"
            style={{ marginTop: 'auto', justifyContent: 'center' }}
          >
            <ShieldAlert size={16} />
            <span>Open Emergency SOS Console</span>
          </button>
        </div>

      </div>

      {/* Pre-Outing Safe Checklist */}
      <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.4rem' }}>✅</span>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                Pre-Outing Safety Checklist
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Quick 30-second checklist before stepping out for a night or unfamiliar hangout
              </p>
            </div>
          </div>

          <span style={{
            background: 'var(--pastel-mint-light)',
            color: '#1F7A4C',
            fontWeight: 700,
            fontSize: '0.8rem',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--pastel-mint-soft)'
          }}>
            {checklist.filter(c => c.done).length} / {checklist.length} Completed 💕
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {checklist.map(item => (
            <div
              key={item.id}
              onClick={() => toggleItem(item.id)}
              style={{
                background: item.done ? 'var(--pastel-mint-light)' : 'white',
                border: `1.5px solid ${item.done ? 'var(--pastel-mint-soft)' : 'var(--pastel-purple-soft)'}`,
                borderRadius: '12px',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {item.done ? (
                <CheckSquare size={20} color="#1F7A4C" style={{ flexShrink: 0 }} />
              ) : (
                <Square size={20} color="#9C94A6" style={{ flexShrink: 0 }} />
              )}
              <span style={{
                fontSize: '0.9rem',
                fontWeight: 600,
                color: item.done ? '#1F7A4C' : 'var(--text-primary)',
                textDecoration: item.done ? 'line-through' : 'none',
                opacity: item.done ? 0.9 : 1
              }}>
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Tips & Confidence Cards */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <span style={{ fontSize: '1.3rem' }}>💡</span>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
            Curated Safety Guides for Women & Men
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))', gap: '18px' }}>
          {safetyTips.map((guide, idx) => (
            <div
              key={idx}
              style={{
                background: guide.bg,
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                border: `1.5px solid rgba(200, 180, 220, 0.4)`,
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: guide.color, margin: 0 }}>
                {guide.title}
              </h4>
              <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.84rem', color: 'var(--text-primary)', lineHeight: 1.45 }}>
                {guide.tips.map((tip, i) => (
                  <li key={i}>{tip}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 24/7 Helplines Strip */}
      <div style={{
        background: 'white',
        borderRadius: 'var(--radius-lg)',
        padding: '20px 24px',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)'
      }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span>📞 24/7 National Emergency & Safety Hotlines</span>
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          <div style={{ background: '#FFF0F3', padding: '12px', borderRadius: '12px', border: '1px solid #FFCCD5' }}>
            <strong style={{ fontSize: '0.88rem', color: '#B52B4E' }}>Police Emergency</strong>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#B52B4E' }}>911 / 100 / 112</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Immediate dispatch 24/7</div>
          </div>

          <div style={{ background: '#F5EEFC', padding: '12px', borderRadius: '12px', border: '1px solid #DFCCF1' }}>
            <strong style={{ fontSize: '0.88rem', color: '#5C3F8C' }}>Women's Helpline</strong>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#5C3F8C' }}>1091 / 181</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Confidential support & assistance</div>
          </div>

          <div style={{ background: '#E8F8F0', padding: '12px', borderRadius: '12px', border: '1px solid #C2EED7' }}>
            <strong style={{ fontSize: '0.88rem', color: '#1F7A4C' }}>Medical Ambulance</strong>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#1F7A4C' }}>911 / 102</div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>24/7 Emergency Medical Services</div>
          </div>
        </div>
      </div>

    </div>
  );
}
