import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import HangoutsPage from './pages/HangoutsPage';
import SafetyToolkitPage from './pages/SafetyToolkitPage';
import ProfilePage from './pages/ProfilePage';

import LocationDetailModal from './components/LocationDetailModal';
import HangoutPlannerModal from './components/HangoutPlannerModal';
import LiveTripModal from './components/LiveTripModal';
import FakeCallModal from './components/FakeCallModal';
import SosModal from './components/SosModal';
import ReportSafetyModal from './components/ReportSafetyModal';
import Toast from './components/Toast';

import { fetchLocations, fetchHangouts, fetchContacts, fetchProfile } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [perspective, setPerspective] = useState('women'); // 'women', 'men', 'all'

  // Data states
  const [locations, setLocations] = useState([]);
  const [hangouts, setHangouts] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modals & Active Trip State
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [planLocationTarget, setPlanLocationTarget] = useState(null);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [activeLiveTrip, setActiveLiveTrip] = useState(null);
  const [isFakeCallOpen, setIsFakeCallOpen] = useState(false);
  const [isSosOpen, setIsSosOpen] = useState(false);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (toastObj) => {
    setToast(toastObj);
  };

  // Initial load
  const refreshData = async () => {
    try {
      const [locRes, hangRes, conRes, profRes] = await Promise.all([
        fetchLocations(),
        fetchHangouts(),
        fetchContacts(),
        fetchProfile()
      ]);
      if (locRes.data) setLocations(locRes.data);
      if (hangRes.data) setHangouts(hangRes.data);
      if (conRes.data) setContacts(conRes.data);
      if (profRes.data) setProfile(profRes.data);
    } catch (err) {
      console.warn('Initial data load error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleOpenPlanHangout = (location = null) => {
    setPlanLocationTarget(location);
    setIsPlanModalOpen(true);
  };

  const handleHangoutCreated = (newHangout) => {
    setHangouts(prev => [newHangout, ...prev]);
    showToast({ type: 'success', message: '🌸 Safe Hangout scheduled! Trusted contacts notified.' });
  };

  const handleStartLiveTrip = (hangout) => {
    setActiveLiveTrip(hangout);
    showToast({ type: 'success', message: '🚀 Live Safe Journey started! Check-in timer active.' });
  };

  const handleLocationReviewSubmitted = (updatedLoc) => {
    setLocations(prev => prev.map(l => l.id === updatedLoc.id ? updatedLoc : l));
    setSelectedLocation(updatedLoc);
    showToast({ type: 'success', message: '✨ Thank you for submitting a safety tip for the community!' });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        perspective={perspective}
        setPerspective={setPerspective}
        onOpenSos={() => setIsSosOpen(true)}
        onOpenFakeCall={() => setIsFakeCallOpen(true)}
        activeTrip={activeLiveTrip}
      />

      {/* Main Content Area */}
      <main style={{ flex: 1, paddingBottom: activeLiveTrip ? '90px' : '40px' }}>
        {activeTab === 'explore' && (
          <HomePage
            locations={locations}
            perspective={perspective}
            setPerspective={setPerspective}
            onSelectLocation={(loc) => setSelectedLocation(loc)}
            onOpenPlanHangout={handleOpenPlanHangout}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'hangouts' && (
          <HangoutsPage
            hangouts={hangouts}
            locations={locations}
            onStartLiveTrip={handleStartLiveTrip}
            onOpenPlanHangout={handleOpenPlanHangout}
            onHangoutDeleted={() => refreshData()}
            onOpenLocationDetail={(loc) => setSelectedLocation(loc)}
          />
        )}

        {activeTab === 'toolkit' && (
          <SafetyToolkitPage
            onOpenFakeCall={() => setIsFakeCallOpen(true)}
            onOpenSos={() => setIsSosOpen(true)}
            onOpenReportModal={() => setIsReportModalOpen(true)}
          />
        )}

        {activeTab === 'profile' && (
          <ProfilePage
            profile={profile}
            contacts={contacts}
            onContactsUpdated={() => refreshData()}
            onProfileUpdated={() => refreshData()}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Floating Active Trip Status Bar (When Live Trip is Running) */}
      {activeLiveTrip && (
        <div className="bottom-safety-bar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem', animation: 'pulseGlow 2s infinite' }}>💖</span>
            <div>
              <strong style={{ fontSize: '0.86rem', color: '#B52B4E' }}>
                Active Trip: {activeLiveTrip.locationName}
              </strong>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                Safe Check-in Active • Circle Notified
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setActiveLiveTrip(activeLiveTrip)}
            className="btn-primary"
            style={{ padding: '7px 16px', fontSize: '0.8rem' }}
          >
            Open Live Tracker 📍
          </button>
        </div>
      )}

      {/* Modals */}
      {selectedLocation && (
        <LocationDetailModal
          location={selectedLocation}
          onClose={() => setSelectedLocation(null)}
          onOpenPlanHangout={handleOpenPlanHangout}
          onReviewSubmitted={handleLocationReviewSubmitted}
          perspective={perspective}
        />
      )}

      {isPlanModalOpen && (
        <HangoutPlannerModal
          location={planLocationTarget}
          locations={locations}
          onClose={() => {
            setIsPlanModalOpen(false);
            setPlanLocationTarget(null);
          }}
          onHangoutCreated={handleHangoutCreated}
          onStartLiveTrip={handleStartLiveTrip}
        />
      )}

      {activeLiveTrip && (
        <LiveTripModal
          hangout={activeLiveTrip}
          contacts={contacts}
          onClose={() => setActiveLiveTrip(null)}
          onHangoutCompleted={() => {
            refreshData();
          }}
          onOpenSos={() => setIsSosOpen(true)}
          onOpenFakeCall={() => setIsFakeCallOpen(true)}
        />
      )}

      {isFakeCallOpen && (
        <FakeCallModal
          defaultCaller="Mom 💕"
          onClose={() => setIsFakeCallOpen(false)}
        />
      )}

      {isSosOpen && (
        <SosModal
          activeLocation={selectedLocation || (locations[0] || null)}
          contacts={contacts}
          onClose={() => setIsSosOpen(false)}
        />
      )}

      {isReportModalOpen && (
        <ReportSafetyModal
          onClose={() => setIsReportModalOpen(false)}
          onReportSuccess={() => {
            showToast({ type: 'success', message: '🌸 Safety report submitted for moderation. Thank you!' });
            refreshData();
          }}
        />
      )}

      {/* Soft Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '24px 20px',
        borderTop: '1px solid rgba(255, 215, 225, 0.6)',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        background: 'rgba(255, 255, 255, 0.6)',
        backdropFilter: 'blur(8px)'
      }}>
        <p style={{ margin: '0 0 4px 0' }}>
          SafeHaven 🌸 • Empowering Safe Hangouts for Women & Men 💕
        </p>
        <p style={{ margin: 0, opacity: 0.8, fontSize: '0.75rem' }}>
          Built with soft pastel care, real-time safety indices, and trusted circle check-ins.
        </p>
      </footer>

    </div>
  );
}
