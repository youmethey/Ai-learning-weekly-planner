import React from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  MapPin, 
  CalendarHeart, 
  ShieldCheck, 
  User, 
  HeartHandshake,
  PhoneCall
} from 'lucide-react';

export default function Navbar({ 
  activeTab, 
  setActiveTab, 
  perspective, 
  setPerspective,
  onOpenSos,
  onOpenFakeCall,
  activeTrip
}) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.88)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid rgba(255, 215, 225, 0.7)',
      boxShadow: '0 4px 20px rgba(255, 175, 190, 0.12)'
    }}>
      <div style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '12px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => setActiveTab('explore')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            cursor: 'pointer',
            textDecoration: 'none'
          }}
        >
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FFB6C1 0%, #B8A4E3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '22px',
            boxShadow: '0 4px 12px rgba(255, 158, 170, 0.4)'
          }}>
            🌸
          </div>
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 800,
                fontSize: '1.35rem',
                background: 'linear-gradient(135deg, #FF6B8B 0%, #7E57C2 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                SafeHaven
              </span>
              <span style={{
                fontSize: '0.68rem',
                fontWeight: 700,
                background: 'var(--pastel-mint-light)',
                color: '#1B6E44',
                padding: '2px 8px',
                borderRadius: '12px',
                border: '1px solid var(--pastel-mint-soft)'
              }}>
                SAFE & COZY
              </span>
            </div>
            <p style={{
              fontSize: '0.75rem',
              color: 'var(--text-secondary)',
              margin: 0,
              fontWeight: 500
            }}>
              Hangout Safety for Women & Men 💕
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(255, 240, 245, 0.75)',
          padding: '4px 6px',
          borderRadius: 'var(--radius-full)',
          border: '1px solid rgba(255, 205, 220, 0.6)'
        }}>
          {[
            { id: 'explore', label: 'Explore Map', icon: MapPin, emoji: '🗺️' },
            { id: 'hangouts', label: 'My Hangouts', icon: CalendarHeart, emoji: '📅' },
            { id: 'toolkit', label: 'Safety Toolkit', icon: ShieldCheck, emoji: '🛡️' },
            { id: 'profile', label: 'Profile & Circle', icon: User, emoji: '🌸' }
          ].map(tab => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  background: isActive 
                    ? 'white' 
                    : 'transparent',
                  color: isActive ? '#FF6B8B' : 'var(--text-secondary)',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: 'var(--radius-full)',
                  fontWeight: isActive ? 700 : 500,
                  fontSize: '0.88rem',
                  fontFamily: 'var(--font-heading)',
                  cursor: 'pointer',
                  boxShadow: isActive ? '0 4px 14px rgba(255, 158, 170, 0.25)' : 'none',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <span>{tab.emoji}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Quick Actions (Fake Call & SOS) */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          {/* Escape Fake Call shortcut */}
          <button
            onClick={onOpenFakeCall}
            title="Trigger an incoming fake call to excuse yourself"
            style={{
              background: 'var(--pastel-purple-light)',
              color: '#5C3F8C',
              border: '1px solid var(--pastel-purple-soft)',
              padding: '9px 15px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
          >
            <PhoneCall size={15} color="#5C3F8C" />
            <span>Fake Call 📞</span>
          </button>

          {/* SOS Emergency button */}
          <button
            onClick={onOpenSos}
            className="btn-sos"
            title="Instant SOS & Emergency Alert Dispatch"
            style={{
              fontSize: '0.88rem',
              padding: '9px 18px'
            }}
          >
            <ShieldAlert size={17} />
            <span>SOS Emergency</span>
          </button>
        </div>
      </div>
    </header>
  );
}
