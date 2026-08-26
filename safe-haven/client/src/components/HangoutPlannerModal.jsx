import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  UserCheck, 
  ShieldCheck, 
  BatteryCharging, 
  Share2, 
  Sparkles,
  CalendarHeart,
  Users
} from 'lucide-react';
import { createHangout, fetchContacts } from '../services/api';

export default function HangoutPlannerModal({ 
  location, 
  locations = [],
  onClose, 
  onHangoutCreated,
  onStartLiveTrip
}) {
  const [selectedLocationId, setSelectedLocationId] = useState(location?.id || locations[0]?.id || '');
  const [customLocationName, setCustomLocationName] = useState(location?.name || '');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [startTime, setStartTime] = useState('17:00');
  const [endTime, setEndTime] = useState('20:00');
  const [hangoutType, setHangoutType] = useState('Coffee & Chill 🌸');
  const [companionName, setCompanionName] = useState('Solo Explorer ✨');
  const [checkInInterval, setCheckInInterval] = useState(45);
  const [batteryAlert, setBatteryAlert] = useState(true);
  const [shareLocation, setShareLocation] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchContacts()
      .then(res => {
        const contactList = res.data || [];
        setContacts(contactList);
        // Default select primary contacts
        const primaryIds = contactList.filter(c => c.isPrimary).map(c => c.id);
        setSelectedContacts(primaryIds.length > 0 ? primaryIds : contactList.map(c => c.id));
      })
      .catch(err => console.warn('Could not load contacts:', err));
  }, []);

  const handleLocationChange = (locId) => {
    setSelectedLocationId(locId);
    const found = locations.find(l => l.id === locId);
    if (found) {
      setCustomLocationName(found.name);
    }
  };

  const toggleContact = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(cId => cId !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const handleSubmit = async (startLiveImmediately = false) => {
    if (!customLocationName.trim() || !date || !startTime) {
      alert('Please provide a place name, date, and start time.');
      return;
    }

    setIsSubmitting(true);
    try {
      const selectedLoc = locations.find(l => l.id === selectedLocationId);
      const hangoutPayload = {
        locationId: selectedLocationId || 'custom',
        locationName: selectedLoc ? selectedLoc.name : customLocationName,
        category: selectedLoc ? selectedLoc.category : 'General Outing',
        date,
        startTime,
        endTime,
        hangoutType,
        companionName: companionName || 'Solo',
        checkInIntervalMinutes: Number(checkInInterval),
        batteryAlertEnabled: batteryAlert,
        shareLocationEnabled: shareLocation,
        selectedContactIds: selectedContacts,
        notes
      };

      const res = await createHangout(hangoutPayload);
      const created = res.data;

      if (onHangoutCreated) onHangoutCreated(created);

      if (startLiveImmediately && onStartLiveTrip) {
        onStartLiveTrip(created);
      }
      onClose();
    } catch (err) {
      alert('Error scheduling hangout: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const hangoutTypes = [
    'Coffee & Chill 🌸',
    'Casual Dinner & Drinks 🍽️',
    'Solo Study & Boba 🧋',
    'Evening Walk & Sunset 🌿',
    'Indie Cinema / Concert 🎬',
    'Late Night Market & Food 🌮',
    'First Date Exploration ✨'
  ];

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid rgba(255, 215, 225, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #FFF0F5 0%, #F5EEFC 100%)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FFB6C1 0%, #B8A4E3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              boxShadow: '0 4px 10px rgba(255, 158, 170, 0.3)'
            }}>
              📅
            </div>
            <div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
                Plan Safe Hangout
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Set safe time windows & notify your trusted circle 💕
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

        {/* Form Body */}
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '18px', maxHeight: 'calc(85vh - 160px)', overflowY: 'auto' }}>
          
          {/* Destination Place */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-primary)' }}>
              🌸 Choose Place / Destination
            </label>
            <select
              value={selectedLocationId}
              onChange={e => handleLocationChange(e.target.value)}
              style={{ marginBottom: '8px' }}
            >
              {locations.map(loc => (
                <option key={loc.id} value={loc.id}>
                  {loc.name} ({loc.category} • ★{loc.safetyScore.toFixed(1)} Safety)
                </option>
              ))}
              <option value="custom">Other Custom Location...</option>
            </select>

            {selectedLocationId === 'custom' && (
              <input
                type="text"
                placeholder="Enter venue or place name"
                value={customLocationName}
                onChange={e => setCustomLocationName(e.target.value)}
              />
            )}
          </div>

          {/* Hangout Type & Companion */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                ✨ Hangout Type
              </label>
              <select value={hangoutType} onChange={e => setHangoutType(e.target.value)}>
                {hangoutTypes.map((t, idx) => (
                  <option key={idx} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                👥 Companion / Company
              </label>
              <input
                type="text"
                placeholder="Solo, Date with Liam, Besties, etc."
                value={companionName}
                onChange={e => setCompanionName(e.target.value)}
              />
            </div>
          </div>

          {/* Date & Time Window */}
          <div style={{
            background: 'var(--pastel-purple-light)',
            border: '1px solid var(--pastel-purple-soft)',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.88rem', fontWeight: 700, color: '#5C3F8C' }}>
              <Clock size={16} />
              <span>Safe Schedule & Time Window</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '10px' }}>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Date</span>
                <input 
                  type="date" 
                  value={date} 
                  onChange={e => setDate(e.target.value)} 
                  style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Start Time</span>
                <input 
                  type="time" 
                  value={startTime} 
                  onChange={e => setStartTime(e.target.value)} 
                  style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                />
              </div>
              <div>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>Est. Return</span>
                <input 
                  type="time" 
                  value={endTime} 
                  onChange={e => setEndTime(e.target.value)} 
                  style={{ padding: '8px 10px', fontSize: '0.85rem' }}
                />
              </div>
            </div>
          </div>

          {/* Safety Check-in Timer Cadence */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              ⏰ Safe Check-In Frequency
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
              {[
                { mins: 30, label: 'Every 30m' },
                { mins: 45, label: 'Every 45m' },
                { mins: 60, label: 'Every 1h' },
                { mins: 90, label: 'On Arrival' }
              ].map(opt => (
                <button
                  key={opt.mins}
                  type="button"
                  onClick={() => setCheckInInterval(opt.mins)}
                  style={{
                    background: checkInInterval === opt.mins ? 'var(--pastel-pink)' : 'white',
                    color: checkInInterval === opt.mins ? 'white' : 'var(--text-primary)',
                    border: '1.5px solid var(--pastel-pink-soft)',
                    padding: '8px 4px',
                    borderRadius: '12px',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Trusted Circle Contact Selection */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              💖 Trusted Contacts to Notify (Live Tracking & Check-ins)
            </label>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {contacts.length === 0 ? (
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>No contacts added yet. Add them in your Profile page!</p>
              ) : (
                contacts.map(contact => {
                  const isChecked = selectedContacts.includes(contact.id);
                  return (
                    <div
                      key={contact.id}
                      onClick={() => toggleContact(contact.id)}
                      style={{
                        background: isChecked ? 'var(--pastel-pink-light)' : 'white',
                        border: `1.5px solid ${isChecked ? 'var(--pastel-pink)' : 'var(--pastel-purple-soft)'}`,
                        borderRadius: '12px',
                        padding: '10px 14px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span style={{ fontSize: '1.3rem' }}>{contact.avatar || '🌸'}</span>
                        <div>
                          <strong style={{ fontSize: '0.88rem' }}>{contact.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginLeft: '8px' }}>
                            ({contact.relationship})
                          </span>
                        </div>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={isChecked} 
                        onChange={() => {}} 
                        style={{ accentColor: '#FF6B8B', width: '18px', height: '18px', cursor: 'pointer' }}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Safety Toggles */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input 
                type="checkbox" 
                checked={shareLocation} 
                onChange={e => setShareLocation(e.target.checked)}
                style={{ accentColor: '#62C498', width: '16px', height: '16px' }}
              />
              <span>📍 Share live location link with selected contacts during outing</span>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.85rem' }}>
              <input 
                type="checkbox" 
                checked={batteryAlert} 
                onChange={e => setBatteryAlert(e.target.checked)}
                style={{ accentColor: '#62C498', width: '16px', height: '16px' }}
              />
              <span>🔋 Low battery & arrival auto-notifications</span>
            </label>
          </div>

          {/* Notes */}
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              📝 Safety Notes / Outfit & Meeting Point
            </label>
            <input
              type="text"
              placeholder="e.g., Sitting at outdoor table near fountain, wearing pink cardigan"
              value={notes}
              onChange={e => setNotes(e.target.value)}
            />
          </div>

        </div>

        {/* Footer Actions */}
        <div style={{
          padding: '16px 24px',
          borderTop: '1px solid rgba(255, 215, 225, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(255, 255, 255, 0.96)',
          gap: '12px'
        }}>
          <button
            type="button"
            onClick={() => handleSubmit(false)}
            disabled={isSubmitting}
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <span>Save to Plans 📅</span>
          </button>

          <button
            type="button"
            onClick={() => handleSubmit(true)}
            disabled={isSubmitting}
            className="btn-primary"
            style={{ flex: 1.3, justifyContent: 'center' }}
          >
            <Sparkles size={16} />
            <span>Start Live Safe Trip 🚀</span>
          </button>
        </div>

      </div>
    </div>
  );
}
