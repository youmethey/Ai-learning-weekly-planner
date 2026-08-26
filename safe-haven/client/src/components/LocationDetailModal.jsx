import React, { useState } from 'react';
import { 
  X, 
  Star, 
  Clock, 
  Sun, 
  Moon, 
  Users, 
  ShieldCheck, 
  ShieldAlert, 
  MapPin, 
  CalendarHeart, 
  Send, 
  Heart, 
  Info,
  Navigation,
  MessageCircle
} from 'lucide-react';
import { submitLocationReview } from '../services/api';

export default function LocationDetailModal({ 
  location, 
  onClose, 
  onOpenPlanHangout,
  onReviewSubmitted,
  perspective = 'women'
}) {
  const [activeGenderTab, setActiveGenderTab] = useState(perspective);
  const [tipComment, setTipComment] = useState('');
  const [tipAuthor, setTipAuthor] = useState('');
  const [tipRating, setTipRating] = useState(5);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState(false);

  if (!location) return null;

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!tipComment.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await submitLocationReview(location.id, {
        author: tipAuthor.trim() || 'Safe Explorer 🌸',
        comment: tipComment.trim(),
        rating: tipRating,
        avatar: activeGenderTab === 'men' ? '🛡️' : '🌸'
      });
      setReviewSuccess(true);
      setTipComment('');
      if (onReviewSubmitted) onReviewSubmitted(res.data);
      setTimeout(() => setReviewSuccess(false), 3000);
    } catch (err) {
      alert('Could not submit review: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentGenderData = activeGenderTab === 'men' 
    ? {
        score: location.genderSafety.menScore,
        summary: location.genderSafety.menSummary,
        highlights: location.genderSafety.menHighlights,
        color: '#4B6CB7',
        title: "Men's Safety Perspective 🛡️"
      }
    : {
        score: location.genderSafety.womenScore,
        summary: location.genderSafety.womenSummary,
        highlights: location.genderSafety.womenHighlights,
        color: '#FF6B8B',
        title: "Women's Safety Perspective 🌸"
      };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '680px', padding: '0', overflow: 'hidden' }}
      >
        {/* Modal Banner Image */}
        <div style={{ position: 'relative', height: '220px', width: '100%' }}>
          <img 
            src={location.image} 
            alt={location.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)'
          }} />

          {/* Close Button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: 'rgba(255, 255, 255, 0.9)',
              border: 'none',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            <X size={18} color="#2B2533" />
          </button>

          {/* Location Title & Badges Overlay */}
          <div style={{
            position: 'absolute',
            bottom: '16px',
            left: '20px',
            right: '20px',
            color: 'white'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '6px' }}>
              <span style={{
                background: 'rgba(255, 255, 255, 0.92)',
                color: '#5C3F8C',
                fontWeight: 700,
                fontSize: '0.75rem',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)'
              }}>
                {location.category}
              </span>
              <span style={{
                background: '#62C498',
                color: 'white',
                fontWeight: 800,
                fontSize: '0.78rem',
                padding: '3px 10px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                ★ {location.safetyScore.toFixed(1)} Safety Index
              </span>
            </div>
            <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'white', margin: 0 }}>
              {location.name}
            </h2>
            <p style={{ fontSize: '0.84rem', opacity: 0.9, margin: '2px 0 0 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <MapPin size={13} />
              <span>{location.address}</span>
            </p>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: 'calc(85vh - 220px)', overflowY: 'auto' }}>
          
          {/* Safe Time Windows Detailed Block */}
          <div style={{
            background: 'var(--pastel-butter-light)',
            border: '1.5px solid var(--pastel-butter-soft)',
            borderRadius: 'var(--radius-md)',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="#D97706" />
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#8A5D00', margin: 0 }}>
                  Safe Time Windows & Night Safety
                </h4>
              </div>
              <span style={{
                background: '#FDE68A',
                color: '#92400E',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 8px',
                borderRadius: '8px'
              }}>
                Day: {location.safeTimeWindows.daySafetyLevel} • Night: {location.safeTimeWindows.nightSafetyLevel}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', fontSize: '0.85rem' }}>
              <div>
                <span style={{ color: '#78350F', fontWeight: 600 }}>🌟 Safest Recommended Window:</span>
                <p style={{ fontWeight: 700, color: '#1B6E44', margin: '2px 0' }}>{location.safeTimeWindows.safest}</p>
              </div>
              <div>
                <span style={{ color: '#78350F', fontWeight: 600 }}>⚠️ Caution Window:</span>
                <p style={{ fontWeight: 600, color: '#B45309', margin: '2px 0' }}>{location.safeTimeWindows.caution}</p>
              </div>
            </div>

            <div style={{
              background: 'rgba(255, 255, 255, 0.75)',
              borderRadius: '8px',
              padding: '8px 12px',
              fontSize: '0.8rem',
              color: '#78350F'
            }}>
              💡 <strong>Travel Advice:</strong> {location.safeTimeWindows.recommendedDeparture} (Peak crowd: {location.safeTimeWindows.peakCrowdHours})
            </div>
          </div>

          {/* Gender-Specific Safety Perspectives Toggle & Details */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, margin: 0 }}>
                Gender Safety Insights
              </h4>
              <div style={{ display: 'flex', gap: '6px', background: 'rgba(245, 235, 250, 0.8)', padding: '3px', borderRadius: 'var(--radius-full)' }}>
                <button
                  type="button"
                  onClick={() => setActiveGenderTab('women')}
                  style={{
                    background: activeGenderTab === 'women' ? 'white' : 'transparent',
                    color: activeGenderTab === 'women' ? '#FF6B8B' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: activeGenderTab === 'women' ? '0 2px 8px rgba(255,150,170,0.3)' : 'none'
                  }}
                >
                  Women's Lens 🌸
                </button>
                <button
                  type="button"
                  onClick={() => setActiveGenderTab('men')}
                  style={{
                    background: activeGenderTab === 'men' ? 'white' : 'transparent',
                    color: activeGenderTab === 'men' ? '#4B6CB7' : 'var(--text-secondary)',
                    border: 'none',
                    padding: '4px 12px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    boxShadow: activeGenderTab === 'men' ? '0 2px 8px rgba(75,108,183,0.3)' : 'none'
                  }}
                >
                  Men's Lens 🛡️
                </button>
              </div>
            </div>

            <div style={{
              background: activeGenderTab === 'women' ? 'var(--pastel-pink-light)' : 'var(--pastel-sky-light)',
              border: `1.5px solid ${activeGenderTab === 'women' ? 'var(--pastel-pink-soft)' : 'var(--pastel-sky-soft)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h5 style={{ fontSize: '0.95rem', fontWeight: 700, color: currentGenderData.color, margin: 0 }}>
                  {currentGenderData.title}
                </h5>
                <span style={{
                  background: 'white',
                  color: currentGenderData.color,
                  fontWeight: 800,
                  fontSize: '0.82rem',
                  padding: '2px 8px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
                }}>
                  ★ {currentGenderData.score.toFixed(1)} / 5.0
                </span>
              </div>

              <p style={{ fontSize: '0.84rem', color: 'var(--text-primary)', margin: 0, lineHeight: 1.4 }}>
                {currentGenderData.summary}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '4px' }}>
                {currentGenderData.highlights.map((item, idx) => (
                  <div key={idx} style={{
                    fontSize: '0.8rem',
                    color: 'var(--text-secondary)',
                    background: 'rgba(255, 255, 255, 0.85)',
                    padding: '6px 10px',
                    borderRadius: '8px'
                  }}>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Indicators Grid */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '12px' }}>
              Safety Ratings & Risk Indicators
            </h4>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
              gap: '10px'
            }}>
              <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #F0E6F5', textAlign: 'center' }}>
                <Sun size={18} color="#FF9EAA" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Street Lighting</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{location.riskIndicators.lightingRating}/5 ⭐</div>
              </div>

              <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #F0E6F5', textAlign: 'center' }}>
                <Users size={18} color="#B8A4E3" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Crowd Level</div>
                <div style={{ fontWeight: 800, fontSize: '0.95rem' }}>{location.riskIndicators.crowdDensity}/5 ⭐</div>
              </div>

              <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #F0E6F5', textAlign: 'center' }}>
                <ShieldCheck size={18} color="#62C498" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Theft Risk</div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem', color: '#1B6E44' }}>{location.riskIndicators.theftRisk}</div>
              </div>

              <div style={{ background: 'white', padding: '10px', borderRadius: '12px', border: '1px solid #F0E6F5', textAlign: 'center' }}>
                <Clock size={18} color="#70B8E8" style={{ margin: '0 auto 4px auto' }} />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>Emergency Response</div>
                <div style={{ fontWeight: 800, fontSize: '0.92rem' }}>~{location.riskIndicators.emergencyResponseTimeMin} mins</div>
              </div>
            </div>
          </div>

          {/* Safe Haven Hotspots Nearby */}
          {location.safeHavenHubs && location.safeHavenHubs.length > 0 && (
            <div>
              <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>
                Nearby Safe Haven Hotspots 🟢
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px' }}>
                {location.safeHavenHubs.map((hub, idx) => (
                  <div key={idx} style={{
                    background: 'var(--pastel-mint-light)',
                    border: '1px solid var(--pastel-mint-soft)',
                    borderRadius: '12px',
                    padding: '10px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}>
                    <span style={{ fontSize: '1.4rem' }}>{hub.icon}</span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#1F7A4C' }}>{hub.name}</div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>{hub.type} • {hub.distance}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Community Tips & Verified Reviews */}
          <div>
            <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '10px' }}>
              Community Safety Reviews 💬
            </h4>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
              {(location.communityTips || []).map((tip, idx) => (
                <div key={idx} style={{
                  background: 'white',
                  borderRadius: '12px',
                  padding: '10px 14px',
                  border: '1px solid rgba(220, 200, 235, 0.6)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span>{tip.avatar || '🌸'}</span>
                      <strong style={{ fontSize: '0.85rem' }}>{tip.author}</strong>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>• {tip.date}</span>
                    </div>
                    <span style={{ color: '#F59E0B', fontSize: '0.8rem', fontWeight: 700 }}>
                      {'★'.repeat(Math.round(tip.rating || 5))}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0 }}>
                    {tip.comment}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Add Review Form */}
            <form onSubmit={handleSubmitReview} style={{
              background: 'rgba(255, 245, 248, 0.75)',
              borderRadius: '12px',
              padding: '12px 14px',
              border: '1px dashed var(--pastel-pink)',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#B52B4E' }}>
                  Share your safety tip for this spot:
                </span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Rating:</span>
                  <select 
                    value={tipRating} 
                    onChange={e => setTipRating(Number(e.target.value))}
                    style={{ width: 'auto', padding: '2px 8px', fontSize: '0.8rem', borderRadius: '8px' }}
                  >
                    <option value={5}>5 ★ (Super Safe)</option>
                    <option value={4}>4 ★ (Safe)</option>
                    <option value={3}>3 ★ (Moderate)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="Your Name (e.g. Maya S. 🌸)"
                  value={tipAuthor}
                  onChange={e => setTipAuthor(e.target.value)}
                  style={{ width: '35%', fontSize: '0.8rem', padding: '8px 10px' }}
                />
                <input
                  type="text"
                  placeholder="Add tips (e.g., 'Great lighting on north side, staff is helpful!')"
                  value={tipComment}
                  onChange={e => setTipComment(e.target.value)}
                  style={{ flex: 1, fontSize: '0.8rem', padding: '8px 10px' }}
                />
                <button
                  type="submit"
                  disabled={isSubmitting || !tipComment.trim()}
                  className="btn-primary"
                  style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                >
                  <Send size={14} />
                  <span>Post</span>
                </button>
              </div>
              {reviewSuccess && (
                <span style={{ fontSize: '0.75rem', color: '#1B6E44', fontWeight: 600 }}>
                  ✨ Safety tip added! Thank you for protecting fellow explorers!
                </span>
              )}
            </form>
          </div>

        </div>

        {/* Footer with Main Call to Action */}
        <div style={{
          padding: '16px 24px',
          background: 'rgba(255, 255, 255, 0.96)',
          borderTop: '1px solid rgba(255, 220, 230, 0.8)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px'
        }}>
          <button
            type="button"
            onClick={onClose}
            className="btn-secondary"
            style={{ padding: '10px 20px', fontSize: '0.9rem' }}
          >
            Close
          </button>
          
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenPlanHangout(location);
            }}
            className="btn-primary"
            style={{ padding: '11px 28px', fontSize: '0.95rem' }}
          >
            <CalendarHeart size={16} />
            <span>Plan Hangout Here 💕</span>
          </button>
        </div>
      </div>
    </div>
  );
}
