import React, { useState } from 'react';
import { 
  CalendarHeart, 
  Clock, 
  MapPin, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Trash2, 
  Plus, 
  Star,
  ShieldCheck,
  Share2
} from 'lucide-react';
import { deleteHangout, updateHangout } from '../services/api';

export default function HangoutsPage({ 
  hangouts = [], 
  onStartLiveTrip, 
  onOpenPlanHangout,
  onHangoutDeleted,
  onOpenLocationDetail,
  locations = []
}) {
  const [filterTab, setFilterTab] = useState('all'); // 'all', 'planned', 'completed'

  const filtered = hangouts.filter(h => {
    if (filterTab === 'planned') return h.status === 'planned' || h.status === 'active';
    if (filterTab === 'completed') return h.status === 'completed' || h.visited;
    return true;
  });

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this hangout plan?')) {
      try {
        await deleteHangout(id);
        if (onHangoutDeleted) onHangoutDeleted(id);
      } catch (err) {
        alert('Failed to delete: ' + err.message);
      }
    }
  };

  const handleMarkCompleted = async (h, e) => {
    e.stopPropagation();
    try {
      await updateHangout(h.id, { status: 'completed', visited: true, safetyRatingGiven: 5 });
      if (onHangoutDeleted) onHangoutDeleted();
    } catch (err) {
      alert('Error updating hangout: ' + err.message);
    }
  };

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Header Banner */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FAF4FC 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '24px 28px',
        border: '1.5px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF9EAA 0%, #B8A4E3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '24px',
            boxShadow: '0 4px 14px rgba(255, 158, 170, 0.4)'
          }}>
            📅
          </div>
          <div>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              My Hangouts & Visited Places 💖
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              Track your scheduled outings, live safety journeys, and past records
            </p>
          </div>
        </div>

        <button
          onClick={() => onOpenPlanHangout()}
          className="btn-primary"
          style={{ padding: '12px 24px', fontSize: '0.92rem' }}
        >
          <Plus size={18} />
          <span>Plan New Hangout 🌸</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div style={{ display: 'flex', gap: '8px' }}>
        {[
          { id: 'all', label: `All Outings (${hangouts.length})` },
          { id: 'planned', label: `Upcoming & Active (${hangouts.filter(h => h.status !== 'completed').length})` },
          { id: 'completed', label: `Visited Places (${hangouts.filter(h => h.status === 'completed' || h.visited).length})` }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setFilterTab(tab.id)}
            style={{
              background: filterTab === tab.id ? 'var(--pastel-pink)' : 'white',
              color: filterTab === tab.id ? 'white' : 'var(--text-secondary)',
              border: '1.5px solid var(--pastel-pink-soft)',
              padding: '8px 18px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 700,
              fontSize: '0.85rem',
              cursor: 'pointer',
              boxShadow: filterTab === tab.id ? '0 4px 12px rgba(255, 158, 170, 0.3)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Hangouts List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {filtered.length === 0 ? (
          <div style={{
            background: 'white',
            borderRadius: 'var(--radius-lg)',
            padding: '40px 20px',
            textAlign: 'center',
            border: '1px dashed var(--pastel-purple-soft)'
          }}>
            <div style={{ fontSize: '3rem', marginBottom: '8px' }}>🌸</div>
            <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 6px 0' }}>No hangouts found here</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
              Schedule your first safe hangout and share live updates with your trusted circle!
            </p>
            <button onClick={() => onOpenPlanHangout()} className="btn-primary">
              <Plus size={16} />
              <span>Plan an Outing Now</span>
            </button>
          </div>
        ) : (
          filtered.map(hangout => {
            const isCompleted = hangout.status === 'completed' || hangout.visited;
            const matchedLocation = locations.find(l => l.id === hangout.locationId);

            return (
              <div
                key={hangout.id}
                className="glass-card glass-card-hover"
                style={{
                  padding: '20px 24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '16px',
                  borderLeft: `5px solid ${isCompleted ? '#62C498' : '#FF9EAA'}`
                }}
              >
                {/* Left Info */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: '1 1 340px' }}>
                  <div style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '16px',
                    background: isCompleted ? 'var(--pastel-mint-light)' : 'var(--pastel-pink-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '22px',
                    border: `1px solid ${isCompleted ? 'var(--pastel-mint-soft)' : 'var(--pastel-pink-soft)'}`
                  }}>
                    {isCompleted ? '✨' : '🌸'}
                  </div>

                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
                        {hangout.locationName}
                      </h3>
                      <span style={{
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        background: isCompleted ? '#E8F8F0' : '#FFF0F3',
                        color: isCompleted ? '#1F7A4C' : '#B52B4E',
                        padding: '2px 8px',
                        borderRadius: '10px'
                      }}>
                        {isCompleted ? 'VISITED & SAFE' : 'PLANNED'}
                      </span>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={13} color="#FF6B8B" />
                        <span>{hangout.date} • {hangout.startTime} - {hangout.endTime || 'TBD'}</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Users size={13} color="#B8A4E3" />
                        <span>{hangout.companionName || 'Solo'} ({hangout.hangoutType})</span>
                      </span>
                      {hangout.checkInIntervalMinutes && (
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ShieldCheck size={13} color="#62C498" />
                          <span>Check-in: {hangout.checkInIntervalMinutes}m</span>
                        </span>
                      )}
                    </div>

                    {hangout.notes && (
                      <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '6px 0 0 0', fontStyle: 'italic' }}>
                        "{hangout.notes}"
                      </p>
                    )}
                  </div>
                </div>

                {/* Right Actions */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {matchedLocation && (
                    <button
                      type="button"
                      onClick={() => onOpenLocationDetail(matchedLocation)}
                      className="btn-secondary"
                      style={{ padding: '8px 14px', fontSize: '0.8rem' }}
                    >
                      <MapPin size={13} />
                      <span>View Spot</span>
                    </button>
                  )}

                  {!isCompleted ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onStartLiveTrip(hangout)}
                        className="btn-primary"
                        style={{ padding: '9px 18px', fontSize: '0.84rem' }}
                      >
                        <Play size={14} />
                        <span>Start Live Trip 🚀</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleMarkCompleted(hangout, e)}
                        className="btn-secondary"
                        style={{ padding: '8px 12px', fontSize: '0.8rem', color: '#1F7A4C', borderColor: 'var(--pastel-mint-soft)' }}
                        title="Mark as completed & safe"
                      >
                        <CheckCircle2 size={15} />
                      </button>
                    </>
                  ) : (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#E8F8F0', padding: '6px 12px', borderRadius: '12px', color: '#1B6E44', fontSize: '0.82rem', fontWeight: 700 }}>
                      <Star size={14} fill="#1B6E44" />
                      <span>5.0 Safe Outing</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => handleDelete(hangout.id, e)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      color: 'var(--text-muted)',
                      cursor: 'pointer',
                      padding: '6px',
                      borderRadius: '8px'
                    }}
                    title="Remove hangout"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
