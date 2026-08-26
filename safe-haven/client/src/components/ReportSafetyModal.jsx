import React, { useState } from 'react';
import { X, Send, ShieldCheck, Sun, AlertCircle, HeartHandshake, Sparkles } from 'lucide-react';
import { submitSafetyReport } from '../services/api';

export default function ReportSafetyModal({ onClose, onReportSuccess }) {
  const [locationName, setLocationName] = useState('');
  const [address, setAddress] = useState('');
  const [reportType, setReportType] = useState('positive_review');
  const [safetyCategory, setSafetyCategory] = useState('Street Lighting');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!locationName.trim() || !description.trim()) {
      alert('Please enter a location name and description.');
      return;
    }
    setIsSubmitting(true);
    try {
      await submitSafetyReport({
        locationName: locationName.trim(),
        address: address.trim(),
        reportType,
        safetyCategory,
        description: description.trim(),
        severity: reportType === 'harassment_warning' ? 'warning' : 'info'
      });
      if (onReportSuccess) onReportSuccess();
      onClose();
    } catch (err) {
      alert('Failed to submit report: ' + err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div 
        className="modal-container"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: '540px' }}
      >
        <div style={{
          padding: '20px 24px',
          background: 'linear-gradient(135deg, #FFF0F5 0%, #F5EEFC 100%)',
          borderBottom: '1px solid rgba(255, 215, 225, 0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #FF9EAA 0%, #B8A4E3 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>
              🤝
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
                Community Safety Report 🌸
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0 }}>
                Help keep our hangout spaces safe and welcoming
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'white',
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
          >
            <X size={16} color="#2B2533" />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              📍 Location / Venue Name
            </label>
            <input
              type="text"
              placeholder="e.g., Riverside Walk North / Moonlit Boba Cafe"
              value={locationName}
              onChange={e => setLocationName(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                📋 Report Type
              </label>
              <select value={reportType} onChange={e => setReportType(e.target.value)}>
                <option value="positive_review">🌸 Safe Space Praise / Tip</option>
                <option value="lighting_update">💡 Street Lighting Update</option>
                <option value="safe_haven_suggestion">🏪 Safe Haven Suggestion</option>
                <option value="harassment_warning">⚠️ Caution / Harassment Alert</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
                🏷️ Safety Category
              </label>
              <select value={safetyCategory} onChange={e => setSafetyCategory(e.target.value)}>
                <option value="Street Lighting">Street Lighting & Visibility</option>
                <option value="Female Staff / Atmosphere">Female Staff / Welcoming Atmosphere</option>
                <option value="Late Night Transport">Late Night Taxi & Metro Transit</option>
                <option value="Crowd & Security">Crowd Density & Security Presence</option>
                <option value="Men Night Safety">Men's Safe Parking & Night Safety</option>
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.86rem', fontWeight: 700, marginBottom: '6px' }}>
              💬 Details & Community Advice
            </label>
            <textarea
              rows={4}
              placeholder="Describe what you observed (e.g. 'Street lamps are now fully working on the east pathway, very safe for late-night walks!')"
              value={description}
              onChange={e => setDescription(e.target.value)}
              required
            />
          </div>

          <div style={{
            background: 'var(--pastel-mint-light)',
            border: '1px solid var(--pastel-mint-soft)',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '0.78rem',
            color: '#1F7A4C',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Sparkles size={16} />
            <span>Reports are verified by community marshals to keep safe ratings accurate! 💕</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
            <button type="button" onClick={onClose} className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary" style={{ flex: 1.5, justifyContent: 'center' }}>
              <Send size={15} />
              <span>Submit Safety Report 🌸</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
