import React from 'react';
import { Sparkles, Shield, Heart, Info } from 'lucide-react';

export default function GenderFilterToggle({ perspective, setPerspective }) {
  const options = [
    {
      id: 'women',
      label: "Women's Safety 🌸",
      description: 'Prioritizes street lighting, harassment index, female staff, & safe cab stands',
      color: '#FF6B8B',
      bgColor: 'var(--pastel-pink-light)',
      borderColor: 'var(--pastel-pink-soft)'
    },
    {
      id: 'men',
      label: "Men's Safety 🛡️",
      description: 'Prioritizes nightlife brawl risks, ATM scams, secluded parking & vehicle safety',
      color: '#4B6CB7',
      bgColor: 'var(--pastel-sky-light)',
      borderColor: 'var(--pastel-sky-soft)'
    },
    {
      id: 'all',
      label: 'General Safety ✨',
      description: 'Balanced safety scores, emergency response times, & walking indices',
      color: '#7E57C2',
      bgColor: 'var(--pastel-purple-light)',
      borderColor: 'var(--pastel-purple-soft)'
    }
  ];

  const currentOption = options.find(o => o.id === perspective) || options[0];

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.92)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 20px',
      border: '1px solid var(--card-border)',
      boxShadow: 'var(--card-shadow)',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '10px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '1.2rem' }}>💖</span>
          <span style={{
            fontFamily: 'var(--font-heading)',
            fontWeight: 700,
            fontSize: '0.95rem',
            color: 'var(--text-primary)'
          }}>
            Safety Perspective Lens:
          </span>
        </div>

        {/* Perspective Buttons */}
        <div style={{
          display: 'flex',
          gap: '8px',
          background: 'rgba(250, 240, 246, 0.9)',
          padding: '4px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255, 215, 225, 0.6)'
        }}>
          {options.map(opt => {
            const isSelected = perspective === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => setPerspective(opt.id)}
                style={{
                  background: isSelected ? 'white' : 'transparent',
                  color: isSelected ? opt.color : 'var(--text-secondary)',
                  border: isSelected ? `1.5px solid ${opt.borderColor}` : '1.5px solid transparent',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: isSelected ? 700 : 500,
                  fontSize: '0.86rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  boxShadow: isSelected ? '0 4px 12px rgba(255, 150, 170, 0.2)' : 'none',
                  transition: 'all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)'
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Explainer Banner */}
      <div style={{
        background: currentOption.bgColor,
        border: `1px solid ${currentOption.borderColor}`,
        borderRadius: 'var(--radius-md)',
        padding: '8px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontSize: '0.82rem',
        color: 'var(--text-primary)',
        animation: 'fadeIn 0.25s ease'
      }}>
        <Info size={15} color={currentOption.color} style={{ flexShrink: 0 }} />
        <span>
          <strong>{currentOption.label.split(' ')[0]} Lens Active:</strong> {currentOption.description}
        </span>
      </div>
    </div>
  );
}
