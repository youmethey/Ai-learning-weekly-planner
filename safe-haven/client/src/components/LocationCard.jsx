import React from 'react';
import { 
  Star, 
  Clock, 
  Sun, 
  Moon, 
  Users, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles, 
  MapPin,
  CalendarHeart
} from 'lucide-react';

export default function LocationCard({ 
  location, 
  onSelectLocation, 
  onOpenPlanHangout,
  perspective = 'women'
}) {
  const score = perspective === 'women' 
    ? location.genderSafety.womenScore 
    : perspective === 'men' 
      ? location.genderSafety.menScore 
      : location.safetyScore;

  const highlights = perspective === 'women'
    ? location.genderSafety.womenHighlights
    : perspective === 'men'
      ? location.genderSafety.menHighlights
      : [
          `💡 Lighting Score: ${location.riskIndicators.lightingRating}/5`,
          `🛡️ Police / Security: Level ${location.riskIndicators.policePatrolFrequency}/5`,
          `🚶 Walkability Score: ${location.riskIndicators.walkScore}/100`
        ];

  return (
    <div 
      className="glass-card glass-card-hover"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        cursor: 'pointer',
        position: 'relative'
      }}
      onClick={() => onSelectLocation(location)}
    >
      {/* Image Header with Badges */}
      <div style={{ position: 'relative', height: '170px', width: '100%', overflow: 'hidden' }}>
        <img 
          src={location.image} 
          alt={location.name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={e => e.currentTarget.style.transform = 'scale(1.0)'}
        />
        
        {/* Category Pill */}
        <span style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'rgba(255, 255, 255, 0.92)',
          backdropFilter: 'blur(8px)',
          color: '#5C3F8C',
          fontWeight: 700,
          fontSize: '0.75rem',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
        }}>
          {location.category}
        </span>

        {/* Safety Score Pill */}
        <span style={{
          position: 'absolute',
          top: '12px',
          right: '12px',
          background: 'linear-gradient(135deg, #62C498 0%, #34A853 100%)',
          color: 'white',
          fontWeight: 800,
          fontSize: '0.85rem',
          padding: '4px 10px',
          borderRadius: 'var(--radius-full)',
          boxShadow: '0 4px 12px rgba(52, 168, 83, 0.35)',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Star size={13} fill="white" />
          <span>{score.toFixed(1)} Safety</span>
        </span>

        {/* Neighborhood Pill */}
        <div style={{
          position: 'absolute',
          bottom: '10px',
          left: '12px',
          color: 'white',
          textShadow: '0 2px 6px rgba(0,0,0,0.7)',
          fontWeight: 600,
          fontSize: '0.8rem',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <MapPin size={13} />
          <span>{location.neighborhood}</span>
        </div>
      </div>

      {/* Card Content */}
      <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '10px' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          {location.name}
        </h3>

        {/* Safe Time Window Ribbon */}
        <div style={{
          background: 'var(--pastel-butter-light)',
          border: '1px solid var(--pastel-butter-soft)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.8rem',
          color: '#8A5D00'
        }}>
          <Clock size={15} color="#D97706" style={{ flexShrink: 0 }} />
          <span>
            <strong>Safest:</strong> {location.safeTimeWindows.safest}
          </span>
        </div>

        {/* Key Indicators Row */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(250, 245, 252, 0.8)',
          borderRadius: 'var(--radius-md)',
          padding: '8px 12px',
          fontSize: '0.78rem',
          color: 'var(--text-secondary)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sun size={13} color="#FF9EAA" />
            <span>Lighting: <strong>{location.riskIndicators.lightingRating}/5</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Users size={13} color="#B8A4E3" />
            <span>Crowd: <strong>{location.riskIndicators.crowdDensity >= 4 ? 'Lively' : 'Moderate'}</strong></span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldCheck size={13} color="#62C498" />
            <span>Harassment: <strong>{location.riskIndicators.harassmentRisk}</strong></span>
          </div>
        </div>

        {/* Highlight Bullet */}
        {highlights && highlights.length > 0 && (
          <div style={{
            fontSize: '0.79rem',
            color: 'var(--text-secondary)',
            background: 'var(--pastel-pink-light)',
            padding: '6px 10px',
            borderRadius: 'var(--radius-sm)',
            borderLeft: '3px solid var(--pastel-pink)',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}>
            {highlights[0]}
          </div>
        )}

        {/* Nearby Safe Havens snippet */}
        {location.safeHavenHubs && location.safeHavenHubs.length > 0 && (
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
            {location.safeHavenHubs.slice(0, 2).map((hub, i) => (
              <span key={i} style={{
                fontSize: '0.72rem',
                background: 'var(--pastel-mint-light)',
                color: '#1F7A4C',
                padding: '2px 8px',
                borderRadius: '8px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <span>{hub.icon}</span>
                <span>{hub.name.split(' ')[0]}</span>
                <span style={{ opacity: 0.8 }}>({hub.distance})</span>
              </span>
            ))}
          </div>
        )}

        {/* Card Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: 'auto',
          paddingTop: '8px'
        }}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectLocation(location);
            }}
            className="btn-secondary"
            style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem', justifyContent: 'center' }}
          >
            <span>Safety Details</span>
            <ChevronRight size={14} />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onOpenPlanHangout(location);
            }}
            className="btn-primary"
            style={{ flex: 1, padding: '8px 12px', fontSize: '0.82rem', justifyContent: 'center' }}
          >
            <CalendarHeart size={14} />
            <span>Plan Hangout</span>
          </button>
        </div>
      </div>
    </div>
  );
}
