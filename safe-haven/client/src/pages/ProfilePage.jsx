import React, { useState } from 'react';
import { 
  User, 
  ShieldCheck, 
  Award, 
  Heart, 
  Phone, 
  Mail, 
  Plus, 
  Trash2, 
  Edit3, 
  Sparkles, 
  Check, 
  X,
  Settings,
  Bell
} from 'lucide-react';
import { createContact, deleteContact, updateContact, updateProfile } from '../services/api';

export default function ProfilePage({ 
  profile, 
  contacts = [], 
  onContactsUpdated,
  onProfileUpdated,
  onShowToast
}) {
  const [showAddContact, setShowAddContact] = useState(false);
  const [newContactName, setNewContactName] = useState('');
  const [newContactPhone, setNewContactPhone] = useState('');
  const [newContactEmail, setNewContactEmail] = useState('');
  const [newContactRel, setNewContactRel] = useState('Best Friend');
  const [newContactAvatar, setNewContactAvatar] = useState('🌸');
  const [newContactIsPrimary, setNewContactIsPrimary] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleAddContact = async (e) => {
    e.preventDefault();
    if (!newContactName.trim() || !newContactPhone.trim()) {
      alert('Please enter at least a name and phone number.');
      return;
    }

    setIsSaving(true);
    try {
      await createContact({
        name: newContactName.trim(),
        phone: newContactPhone.trim(),
        email: newContactEmail.trim(),
        relationship: newContactRel,
        avatar: newContactAvatar,
        isPrimary: newContactIsPrimary
      });
      if (onContactsUpdated) onContactsUpdated();
      if (onShowToast) onShowToast({ type: 'success', message: 'Trusted contact added to safety circle 💕' });
      setShowAddContact(false);
      setNewContactName('');
      setNewContactPhone('');
      setNewContactEmail('');
    } catch (err) {
      alert('Could not add contact: ' + err.message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Remove this trusted contact?')) {
      try {
        await deleteContact(id);
        if (onContactsUpdated) onContactsUpdated();
        if (onShowToast) onShowToast({ type: 'info', message: 'Contact removed from circle' });
      } catch (err) {
        alert('Could not delete contact: ' + err.message);
      }
    }
  };

  const handleTogglePrimary = async (contact) => {
    try {
      await updateContact(contact.id, { isPrimary: !contact.isPrimary });
      if (onContactsUpdated) onContactsUpdated();
    } catch (err) {
      console.warn('Update contact error:', err);
    }
  };

  const avatarOptions = ['🌸', '💖', '👩‍👧', '🛡️', '✨', '🏠', '👯‍♀️', '🌟'];

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '28px 20px', display: 'flex', flexDirection: 'column', gap: '28px' }}>
      
      {/* Profile Header Card */}
      <div style={{
        background: 'linear-gradient(135deg, #FFF0F5 0%, #FAF4FC 50%, #F3F8FC 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        border: '1.5px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #FF9EAA 0%, #B8A4E3 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '38px',
            boxShadow: '0 8px 20px rgba(255, 158, 170, 0.4)',
            border: '4px solid white'
          }}>
            {profile?.avatar || '🌸'}
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
              <h2 style={{ fontSize: '1.65rem', fontWeight: 800, margin: 0 }}>
                {profile?.name || 'Aria Sterling'}
              </h2>
              <span style={{
                background: 'var(--pastel-mint-light)',
                color: '#1F7A4C',
                fontSize: '0.75rem',
                fontWeight: 700,
                padding: '2px 10px',
                borderRadius: 'var(--radius-full)',
                border: '1px solid var(--pastel-mint-soft)'
              }}>
                VERIFIED EXPLORER 🌸
              </span>
            </div>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
              {profile?.email || 'aria.sterling@safehaven.app'} • {profile?.phone || '+1 (555) 901-2345'}
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'flex', gap: '14px' }}>
          <div style={{ background: 'white', padding: '12px 18px', borderRadius: '16px', border: '1px solid #F0E6F5', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#FF6B8B' }}>
              {profile?.safeHangoutsCompleted || 8}
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Safe Hangouts</div>
          </div>

          <div style={{ background: 'white', padding: '12px 18px', borderRadius: '16px', border: '1px solid #F0E6F5', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#7E57C2' }}>
              {profile?.safetyStreakDays || 14}d
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Safety Streak</div>
          </div>

          <div style={{ background: 'white', padding: '12px 18px', borderRadius: '16px', border: '1px solid #F0E6F5', textAlign: 'center', boxShadow: '0 4px 12px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: '#1B6E44' }}>
              {profile?.safetyScore || 98}%
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Confidence Index</div>
          </div>
        </div>
      </div>

      {/* Safety Badges & Milestones */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
          <Award size={22} color="#FF6B8B" />
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0 }}>
            Safety Badges & Milestones 🌟
          </h3>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
          {(profile?.badges || []).map(badge => (
            <div
              key={badge.id}
              style={{
                background: 'linear-gradient(135deg, #FFF6F8 0%, #FAF4FC 100%)',
                border: '1.5px solid var(--pastel-pink-soft)',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
            >
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '22px',
                boxShadow: '0 4px 10px rgba(0,0,0,0.08)'
              }}>
                {badge.icon || '🌸'}
              </div>

              <div>
                <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)', display: 'block' }}>
                  {badge.name}
                </strong>
                <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: '2px 0 0 0', lineHeight: 1.3 }}>
                  {badge.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trusted Safety Circle / Contacts Manager */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Heart size={20} color="#FF6B8B" fill="#FF6B8B" />
              <span>Trusted Contacts Circle 💕</span>
            </h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: 0 }}>
              People who receive your live location links, check-ins, and emergency SOS alerts
            </p>
          </div>

          <button
            onClick={() => setShowAddContact(!showAddContact)}
            className="btn-primary"
            style={{ padding: '9px 18px', fontSize: '0.85rem' }}
          >
            <Plus size={16} />
            <span>Add Trusted Contact</span>
          </button>
        </div>

        {/* Add Contact Form Drawer */}
        {showAddContact && (
          <form onSubmit={handleAddContact} style={{
            background: 'linear-gradient(135deg, #FFF0F5 0%, #F5EEFC 100%)',
            border: '2px solid var(--pastel-pink-soft)',
            borderRadius: 'var(--radius-md)',
            padding: '20px',
            marginBottom: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            animation: 'fadeIn 0.25s ease'
          }}>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0, color: '#B52B4E' }}>
              🌸 New Trusted Safety Contact
            </h4>

            {/* Avatar Selector */}
            <div>
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>Choose Icon</span>
              <div style={{ display: 'flex', gap: '8px' }}>
                {avatarOptions.map(av => (
                  <button
                    key={av}
                    type="button"
                    onClick={() => setNewContactAvatar(av)}
                    style={{
                      width: '38px',
                      height: '38px',
                      borderRadius: '50%',
                      background: newContactAvatar === av ? 'var(--pastel-pink)' : 'white',
                      border: '1.5px solid var(--pastel-pink-soft)',
                      fontSize: '18px',
                      cursor: 'pointer'
                    }}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', gap: '10px' }}>
              <div>
                <input
                  type="text"
                  placeholder="Full Name (e.g. Mom, Sarah)"
                  value={newContactName}
                  onChange={e => setNewContactName(e.target.value)}
                  required
                />
              </div>

              <div>
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={newContactPhone}
                  onChange={e => setNewContactPhone(e.target.value)}
                  required
                />
              </div>

              <div>
                <select value={newContactRel} onChange={e => setNewContactRel(e.target.value)}>
                  <option value="Parent">Parent 👩‍👧</option>
                  <option value="Best Friend">Best Friend 🌸</option>
                  <option value="Partner">Partner 💖</option>
                  <option value="Sibling">Sibling 👯‍♀️</option>
                  <option value="Roommate">Roommate 🏠</option>
                  <option value="Colleague">Colleague ✨</option>
                </select>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={newContactIsPrimary}
                  onChange={e => setNewContactIsPrimary(e.target.checked)}
                  style={{ accentColor: '#FF6B8B' }}
                />
                <span>Set as Primary SOS Emergency Contact (Auto-notified on all trips)</span>
              </label>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="button" onClick={() => setShowAddContact(false)} className="btn-secondary" style={{ padding: '8px 16px' }}>
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="btn-primary" style={{ padding: '8px 20px' }}>
                  Save Contact 💕
                </button>
              </div>
            </div>
          </form>
        )}

        {/* Contacts List */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '12px' }}>
          {contacts.map(contact => (
            <div
              key={contact.id}
              style={{
                background: contact.isPrimary ? 'var(--pastel-pink-light)' : 'white',
                border: `1.5px solid ${contact.isPrimary ? 'var(--pastel-pink-soft)' : 'var(--pastel-purple-soft)'}`,
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '50%',
                  background: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '22px',
                  boxShadow: '0 3px 10px rgba(0,0,0,0.06)'
                }}>
                  {contact.avatar || '💖'}
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <strong style={{ fontSize: '0.95rem' }}>{contact.name}</strong>
                    {contact.isPrimary && (
                      <span style={{ fontSize: '0.65rem', background: '#FF4D6D', color: 'white', padding: '1px 6px', borderRadius: '8px', fontWeight: 800 }}>
                        PRIMARY SOS
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    {contact.relationship} • {contact.phone}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '6px' }}>
                <button
                  type="button"
                  onClick={() => handleTogglePrimary(contact)}
                  style={{
                    background: 'white',
                    border: '1px solid #DFCCF1',
                    borderRadius: '8px',
                    padding: '6px',
                    cursor: 'pointer',
                    color: contact.isPrimary ? '#FF4D6D' : '#9C94A6'
                  }}
                  title={contact.isPrimary ? 'Remove as primary' : 'Set as primary SOS'}
                >
                  <Heart size={15} fill={contact.isPrimary ? '#FF4D6D' : 'none'} />
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteContact(contact.id)}
                  style={{
                    background: 'white',
                    border: '1px solid #DFCCF1',
                    borderRadius: '8px',
                    padding: '6px',
                    cursor: 'pointer',
                    color: 'var(--text-muted)'
                  }}
                  title="Delete contact"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
