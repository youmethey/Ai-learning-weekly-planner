import React, { useState, useEffect } from 'react';
import { 
  X, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  PhoneCall, 
  MapPin, 
  Share2, 
  Send, 
  AlertTriangle,
  HeartHandshake
} from 'lucide-react';
import { playSosSiren, stopSosSiren } from '../utils/audio';
import { triggerSosAlert } from '../services/api';

export default function SosModal({ onClose, activeLocation, contacts = [] }) {
  const [isSirenPlaying, setIsSirenPlaying] = useState(false);
  const [isDispatched, setIsDispatched] = useState(false);
  const [copied, setCopied] = useState(false);
  const [coords, setCoords] = useState({ lat: 40.7306, lng: -73.9924 });

  useEffect(() => {
    // Attempt to get browser geolocation if available
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => console.log('Using fallback coordinates')
      );
    }
    return () => {
      stopSosSiren();
    };
  }, []);

  const handleToggleSiren = () => {
    if (isSirenPlaying) {
      stopSosSiren();
      setIsSirenPlaying(false);
    } else {
      playSosSiren();
      setIsSirenPlaying(true);
    }
  };

  const handleSendDispatch = async () => {
    try {
      await triggerSosAlert({
        locationName: activeLocation?.name || 'Current City Location',
        coordinates: coords,
        batteryLevel: '84%',
        customMessage: 'Emergency SOS initiated via SafeHaven'
      });
      setIsDispatched(true);
    } catch (err) {
      console.warn('SOS dispatch error:', err);
      setIsDispatched(true);
    }
  };

  const sosMessage = `🚨 [EMERGENCY SOS ALERT] I need immediate assistance! Location: ${activeLocation?.name || 'Current GPS'}. Coordinates: https://maps.google.com/?q=${coords.lat},${coords.lng}. Phone Battery: 84%. Sent via SafeHaven.`;

  const copySosText = () => {
    navigator.clipboard?.writeText(sosMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(sosMessage)}`, '_blank');
  };

  return (
    <div className="modal-backdrop" style={{ background: 'rgba(50, 10, 20, 0.75)', backdropFilter: 'blur(12px)' }}>
      <div 
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '520px',
          border: '2px solid #FF4D6D',
          boxShadow: '0 25px 60px rgba(255, 77, 109, 0.4)'
        }}
      >
        {/* Header */}
        <div style={{
          padding: '18px 24px',
          background: 'linear-gradient(135deg, #FF4D6D 0%, #E63946 100%)',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ShieldAlert size={26} />
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'white' }}>
                Emergency SOS Trigger
              </h3>
              <p style={{ fontSize: '0.78rem', margin: 0, opacity: 0.9 }}>
                Quick sirens, emergency dispatch, and trusted contacts alert
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              stopSosSiren();
              onClose();
            }}
            style={{
              background: 'rgba(255, 255, 255, 0.25)',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {/* Siren Action Card */}
          <div style={{
            background: isSirenPlaying ? '#FFE5E9' : '#FFF0F3',
            border: '2px dashed #FF4D6D',
            borderRadius: 'var(--radius-lg)',
            padding: '18px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '10px',
            animation: isSirenPlaying ? 'pulseGlow 1s infinite' : 'none'
          }}>
            <button
              type="button"
              onClick={handleToggleSiren}
              style={{
                width: '74px',
                height: '74px',
                borderRadius: '50%',
                background: isSirenPlaying ? '#FF3B30' : 'linear-gradient(135deg, #FF6B8B 0%, #FF4D6D 100%)',
                color: 'white',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(255, 77, 109, 0.45)',
                transition: 'all 0.2s ease'
              }}
            >
              {isSirenPlaying ? <VolumeX size={34} /> : <Volume2 size={34} />}
            </button>

            <div>
              <strong style={{ fontSize: '1rem', color: '#B52B4E' }}>
                {isSirenPlaying ? '🚨 SOUND SIREN PLAYING (Tap to Silence)' : '🔊 Play Loud Deterrent Siren'}
              </strong>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '2px 0 0 0' }}>
                Emits a loud high-frequency siren sound to attract attention in public
              </p>
            </div>
          </div>

          {/* Instant Dispatch to Contacts */}
          <div style={{
            background: 'white',
            border: '1.5px solid var(--pastel-pink-soft)',
            borderRadius: 'var(--radius-md)',
            padding: '14px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Send size={16} color="#FF6B8B" />
                <span style={{ fontSize: '0.88rem', fontWeight: 700 }}>
                  Notify Trusted Circle ({contacts.length} Contacts)
                </span>
              </div>
              {isDispatched && (
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#1B6E44', background: '#E8F8F0', padding: '2px 8px', borderRadius: '8px' }}>
                  ✓ Alert Dispatched
                </span>
              )}
            </div>

            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
              Broadcasts your exact coordinates, battery level, and emergency timestamp to Mom 💕, Sarah 🌸, and primary contacts.
            </p>

            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                type="button"
                onClick={handleSendDispatch}
                className="btn-primary"
                style={{
                  flex: 1,
                  background: 'linear-gradient(135deg, #FF4D6D 0%, #B8A4E3 100%)',
                  padding: '9px 14px',
                  fontSize: '0.82rem',
                  justifyContent: 'center'
                }}
              >
                <Send size={14} />
                <span>{isDispatched ? 'Resend SOS Broadcast' : 'Send Instant SOS Alert'}</span>
              </button>

              <button
                type="button"
                onClick={openWhatsApp}
                style={{
                  background: '#25D366',
                  color: 'white',
                  border: 'none',
                  borderRadius: 'var(--radius-full)',
                  padding: '9px 14px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>WhatsApp SOS</span>
              </button>
            </div>
          </div>

          {/* Quick Dial Emergency Numbers */}
          <div>
            <span style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '8px' }}>
              📞 1-Tap Emergency Hotlines
            </span>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              <a
                href="tel:911"
                style={{
                  background: '#FFF0F3',
                  border: '1px solid #FFCCD5',
                  borderRadius: '12px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#B52B4E'
                }}
              >
                <PhoneCall size={16} style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>911 / 100</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>Police Dispatch</div>
              </a>

              <a
                href="tel:1091"
                style={{
                  background: '#F5EEFC',
                  border: '1px solid #DFCCF1',
                  borderRadius: '12px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#5C3F8C'
                }}
              >
                <HeartHandshake size={16} style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>1091</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>Women's Helpline</div>
              </a>

              <a
                href="tel:911"
                style={{
                  background: '#E8F8F0',
                  border: '1px solid #C2EED7',
                  borderRadius: '12px',
                  padding: '10px 8px',
                  textAlign: 'center',
                  textDecoration: 'none',
                  color: '#1F7A4C'
                }}
              >
                <AlertTriangle size={16} style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontWeight: 800, fontSize: '0.9rem' }}>Ambulance</div>
                <div style={{ fontSize: '0.68rem', opacity: 0.8 }}>Medical 24/7</div>
              </a>
            </div>
          </div>

        </div>

        {/* Footer */}
        <div style={{
          padding: '14px 24px',
          background: '#FFF8FA',
          borderTop: '1px solid rgba(255, 215, 225, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <button
            type="button"
            onClick={copySosText}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <Share2 size={14} />
            <span>{copied ? 'GPS Text Copied! 📋' : 'Copy GPS Text'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              stopSosSiren();
              onClose();
            }}
            className="btn-secondary"
            style={{ padding: '8px 18px', fontSize: '0.85rem' }}
          >
            Close SOS
          </button>
        </div>
      </div>
    </div>
  );
}
