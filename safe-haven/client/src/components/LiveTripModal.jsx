import React, { useState, useEffect } from 'react';
import { 
  X, 
  Heart, 
  ShieldCheck, 
  Clock, 
  Battery, 
  MapPin, 
  Share2, 
  PhoneCall, 
  ShieldAlert, 
  Sparkles,
  CheckCircle2,
  Navigation
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { checkInHangout, updateHangout } from '../services/api';

export default function LiveTripModal({ 
  hangout, 
  onClose, 
  onHangoutCompleted,
  onOpenSos,
  onOpenFakeCall,
  contacts = []
}) {
  const [secondsRemaining, setSecondsRemaining] = useState((hangout?.checkInIntervalMinutes || 45) * 60);
  const [tripStatus, setTripStatus] = useState(hangout?.status === 'completed' ? 'completed' : 'active');
  const [lastCheckInTime, setLastCheckInTime] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [checkInCount, setCheckInCount] = useState(1);
  const [batteryLevel, setBatteryLevel] = useState(88);
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [simulatedCopied, setSimulatedCopied] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (tripStatus === 'completed') return;

    const timer = setInterval(() => {
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          return (hangout?.checkInIntervalMinutes || 45) * 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [tripStatus, hangout]);

  const formatTimer = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    try {
      if (hangout?.id) {
        await checkInHangout(hangout.id);
      }
      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setLastCheckInTime(timeStr);
      setCheckInCount(c => c + 1);
      setSecondsRemaining((hangout?.checkInIntervalMinutes || 45) * 60);

      // Cute mini confetti burst
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#FF9EAA', '#B8A4E3', '#62C498', '#FBE49B']
      });
    } catch (err) {
      console.warn('Check-in network sync error:', err);
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCompleteTrip = async () => {
    try {
      if (hangout?.id) {
        await updateHangout(hangout.id, {
          status: 'completed',
          visited: true,
          safetyRatingGiven: 5
        });
      }
      setTripStatus('completed');
      if (onHangoutCompleted) onHangoutCompleted();

      // Big celebratory pastel confetti!
      confetti({
        particleCount: 100,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF9EAA', '#B8A4E3', '#62C498', '#FBE49B', '#70B8E8']
      });
    } catch (err) {
      console.warn('Trip completion error:', err);
    }
  };

  const notifiedContacts = contacts.filter(c => (hangout?.selectedContactIds || []).includes(c.id));

  const liveShareUrl = `https://safehaven.app/live/${hangout?.id || 'demo-trip-772'}`;

  const copyLiveLink = () => {
    navigator.clipboard?.writeText(liveShareUrl);
    setSimulatedCopied(true);
    setTimeout(() => setSimulatedCopied(false), 2500);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '600px', border: '2px solid var(--pastel-pink-soft)' }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          background: tripStatus === 'completed' 
            ? 'linear-gradient(135deg, #E8F8F0 0%, #FAF4FC 100%)' 
            : 'linear-gradient(135deg, #FFF0F5 0%, #F5EEFC 100%)',
          borderBottom: '1px solid rgba(255, 215, 225, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: tripStatus === 'completed' ? '#62C498' : 'linear-gradient(135deg, #FF8DA0 0%, #B8A4E3 100%)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 12px rgba(255, 158, 170, 0.4)'
            }}>
              {tripStatus === 'completed' ? '✨' : '💖'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                  {tripStatus === 'completed' ? 'Journey Completed Safely! 🌸' : 'Live Safe Journey Active'}
                </h3>
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  background: tripStatus === 'completed' ? 'var(--pastel-mint-light)' : '#FFE5EC',
                  color: tripStatus === 'completed' ? '#1F7A4C' : '#B52B4E',
                  padding: '2px 8px',
                  borderRadius: '10px'
                }}>
                  {tripStatus === 'completed' ? 'COMPLETED' : 'LIVE TRACKING'}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
                {hangout?.locationName || 'Bloom & Bean Cafe'} • {hangout?.hangoutType || 'Outing'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '34px',
              height: '34px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={18} color="#2B2533" />
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          
          {tripStatus !== 'completed' ? (
            <>
              {/* Big Check-in Timer Card */}
              <div style={{
                background: 'linear-gradient(135deg, #FFF6F8 0%, #F6F0FC 100%)',
                border: '2px solid var(--pastel-pink-soft)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                textAlign: 'center',
                boxShadow: '0 8px 25px rgba(255, 158, 170, 0.15)'
              }}>
                <span style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  Next Safe Check-In Due In
                </span>
                
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '3rem',
                  fontWeight: 800,
                  color: '#FF6B8B',
                  letterSpacing: '2px',
                  margin: '4px 0 10px 0'
                }}>
                  {formatTimer(secondsRemaining)}
                </div>

                {/* Main Check-In Button */}
                <button
                  type="button"
                  onClick={handleCheckIn}
                  disabled={isCheckingIn}
                  className="btn-primary"
                  style={{
                    padding: '14px 32px',
                    fontSize: '1.05rem',
                    borderRadius: 'var(--radius-full)',
                    background: 'linear-gradient(135deg, #FF6B8B 0%, #7E57C2 100%)',
                    boxShadow: '0 8px 25px rgba(255, 107, 139, 0.4)'
                  }}
                >
                  <Heart size={20} fill="white" />
                  <span>I'm Safe & Having Fun 💕</span>
                </button>

                <div style={{ marginTop: '12px', fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                  ✨ Last check-in recorded at <strong>{lastCheckInTime}</strong> ({checkInCount} check-ins logged today)
                </div>
              </div>

              {/* Status Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #F0E6F5', textAlign: 'center' }}>
                  <MapPin size={16} color="#FF6B8B" style={{ margin: '0 auto 2px auto' }} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>GPS Status</div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#1B6E44' }}>🟢 Broadcasting</div>
                </div>

                <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #F0E6F5', textAlign: 'center' }}>
                  <Battery size={16} color="#62C498" style={{ margin: '0 auto 2px auto' }} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Phone Battery</div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{batteryLevel}% (Good)</div>
                </div>

                <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #F0E6F5', textAlign: 'center' }}>
                  <Clock size={16} color="#B8A4E3" style={{ margin: '0 auto 2px auto' }} />
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Target Return</div>
                  <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{hangout?.endTime || '21:00'}</div>
                </div>
              </div>

              {/* Trusted Circle Notification Status */}
              <div style={{
                background: 'var(--pastel-mint-light)',
                border: '1px solid var(--pastel-mint-soft)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <ShieldCheck size={22} color="#1F7A4C" />
                  <div>
                    <strong style={{ fontSize: '0.85rem', color: '#1F7A4C' }}>
                      {notifiedContacts.length > 0 ? `${notifiedContacts.length} Contacts Receiving Live Updates` : 'Trusted Circle Notified'}
                    </strong>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                      {notifiedContacts.map(c => c.name).join(', ') || 'Mom 💕, Sarah 🌸'}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={copyLiveLink}
                  style={{
                    background: 'white',
                    color: '#1F7A4C',
                    border: '1px solid var(--pastel-mint-soft)',
                    padding: '6px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  <Share2 size={13} />
                  <span>{simulatedCopied ? 'Link Copied! ✨' : 'Share Link'}</span>
                </button>
              </div>

              {/* Instant Escape & Safety Tools */}
              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="button"
                  onClick={onOpenFakeCall}
                  style={{
                    flex: 1,
                    background: 'var(--pastel-purple-light)',
                    color: '#5C3F8C',
                    border: '1.5px solid var(--pastel-purple-soft)',
                    padding: '10px 14px',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <PhoneCall size={16} />
                  <span>Need an Excuse? Trigger Fake Call</span>
                </button>

                <button
                  type="button"
                  onClick={onOpenSos}
                  className="btn-sos"
                  style={{ flex: 1, justifyContent: 'center', fontSize: '0.85rem', padding: '10px 14px' }}
                >
                  <ShieldAlert size={16} />
                  <span>SOS Siren & Dispatch</span>
                </button>
              </div>
            </>
          ) : (
            /* Completed View */
            <div style={{ textAlign: 'center', padding: '20px 10px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
              <div style={{ fontSize: '3.5rem' }}>🌸🎉</div>
              <h4 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                You're Back Home Safe!
              </h4>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', maxWidth: '400px' }}>
                Your trusted contacts have been notified of your safe arrival. This hangout has been recorded in your profile history!
              </p>

              <div style={{
                background: 'var(--pastel-butter-light)',
                border: '1px solid var(--pastel-butter-soft)',
                borderRadius: '12px',
                padding: '12px 20px',
                fontSize: '0.85rem',
                color: '#8A5D00',
                fontWeight: 700
              }}>
                🌟 +50 Safety Points Earned! 🌸 Safety Badge Progress Updated
              </div>
            </div>
          )}

        </div>

        {/* Footer */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 215, 225, 0.7)',
          background: 'rgba(255, 255, 255, 0.96)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.88rem' }}
          >
            {tripStatus === 'completed' ? 'Close' : 'Minimize Tracker'}
          </button>

          {tripStatus !== 'completed' && (
            <button
              type="button"
              onClick={handleCompleteTrip}
              className="btn-primary"
              style={{
                background: 'linear-gradient(135deg, #62C498 0%, #34A853 100%)',
                boxShadow: '0 4px 15px rgba(52, 168, 83, 0.35)',
                fontSize: '0.88rem'
              }}
            >
              <CheckCircle2 size={16} />
              <span>Arrived Home & End Trip ✨</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
