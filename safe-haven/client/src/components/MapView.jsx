import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Shield, Sparkles, Clock, Star, MapPin, Navigation } from 'lucide-react';

// Custom Marker Creator using HTML DivIcon for reliable styling
function createCustomPin(emoji, score, isSelected) {
  const isHigh = score >= 4.8;
  const ringColor = isHigh ? '#62C498' : '#FF9EAA';
  
  return L.divIcon({
    className: 'custom-pastel-pin-container',
    html: `
      <div style="
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        background: white;
        border-radius: 50%;
        border: 3px solid ${isSelected ? '#B8A4E3' : ringColor};
        box-shadow: 0 8px 20px rgba(0,0,0,0.18);
        font-size: 20px;
        transform: ${isSelected ? 'scale(1.25)' : 'scale(1)'};
        transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
      ">
        ${emoji}
        <span style="
          position: absolute;
          bottom: -4px;
          right: -4px;
          background: ${ringColor};
          color: white;
          font-size: 10px;
          font-weight: 800;
          padding: 1px 4px;
          border-radius: 8px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        ">★${score.toFixed(1)}</span>
      </div>
    `,
    iconSize: [44, 44],
    iconAnchor: [22, 22],
    popupAnchor: [0, -24]
  });
}

function createSafeHubPin(hub) {
  return L.divIcon({
    className: 'custom-safehub-pin-container',
    html: `
      <div style="
        display: flex;
        align-items: center;
        justify-content: center;
        width: 30px;
        height: 30px;
        background: #E8F8F0;
        border-radius: 50%;
        border: 2px solid #62C498;
        box-shadow: 0 4px 10px rgba(98, 196, 152, 0.4);
        font-size: 14px;
      ">
        ${hub.icon}
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
    popupAnchor: [0, -18]
  });
}

export default function MapView({ 
  locations = [], 
  selectedLocation, 
  onSelectLocation, 
  onOpenPlanHangout,
  perspective = 'women'
}) {
  const [showSafeHubs, setShowSafeHubs] = useState(true);
  const [showSafetyAura, setShowSafetyAura] = useState(true);

  // Center coordinate defaults
  const defaultCenter = [40.7380, -73.9920];

  const getEmojiForCategory = (cat = '') => {
    const c = cat.toLowerCase();
    if (c.includes('cafe')) return '☕';
    if (c.includes('park') || c.includes('water')) return '🌿';
    if (c.includes('rooftop') || c.includes('dining')) return '✨';
    if (c.includes('dessert') || c.includes('boba')) return '🧋';
    if (c.includes('market') || c.includes('food')) return '🌮';
    if (c.includes('art') || c.includes('culture')) return '🎨';
    if (c.includes('book')) return '📚';
    if (c.includes('cinema') || c.includes('entertainment')) return '🎬';
    return '🌸';
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: 'var(--radius-lg)',
      overflow: 'hidden',
      boxShadow: 'var(--card-shadow)',
      border: '1px solid var(--card-border)',
      height: '520px',
      width: '100%'
    }}>
      {/* Map Layer Controls */}
      <div style={{
        position: 'absolute',
        top: '14px',
        right: '14px',
        zIndex: 500,
        background: 'rgba(255, 255, 255, 0.94)',
        backdropFilter: 'blur(12px)',
        padding: '8px 14px',
        borderRadius: 'var(--radius-full)',
        border: '1px solid rgba(255, 215, 225, 0.7)',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        fontSize: '0.82rem'
      }}>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showSafeHubs} 
            onChange={e => setShowSafeHubs(e.target.checked)}
            style={{ accentColor: '#FF6B8B' }}
          />
          <span>Safe Havens (💊/👮/🚇)</span>
        </label>
        <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
          <input 
            type="checkbox" 
            checked={showSafetyAura} 
            onChange={e => setShowSafetyAura(e.target.checked)}
            style={{ accentColor: '#62C498' }}
          />
          <span>Safety Halos 🟢</span>
        </label>
      </div>

      <MapContainer
        center={selectedLocation ? [selectedLocation.coordinates.lat, selectedLocation.coordinates.lng] : defaultCenter}
        zoom={13}
        scrollWheelZoom={true}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Safety Zone Circles */}
        {showSafetyAura && locations.map(loc => (
          <Circle
            key={`aura-${loc.id}`}
            center={[loc.coordinates.lat, loc.coordinates.lng]}
            radius={280}
            pathOptions={{
              color: '#62C498',
              fillColor: '#C2EED7',
              fillOpacity: 0.18,
              weight: 1.5,
              dashArray: '4, 6'
            }}
          />
        ))}

        {/* Location Markers */}
        {locations.map(loc => {
          const isSelected = selectedLocation?.id === loc.id;
          const score = perspective === 'women' 
            ? loc.genderSafety.womenScore 
            : perspective === 'men' 
              ? loc.genderSafety.menScore 
              : loc.safetyScore;

          return (
            <Marker
              key={loc.id}
              position={[loc.coordinates.lat, loc.coordinates.lng]}
              icon={createCustomPin(getEmojiForCategory(loc.category), score, isSelected)}
              eventHandlers={{
                click: () => onSelectLocation(loc)
              }}
            >
              <Popup>
                <div style={{ padding: '6px', minWidth: '220px', fontFamily: 'var(--font-body)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span style={{
                      fontSize: '0.72rem',
                      fontWeight: 700,
                      color: '#B52B4E',
                      background: 'var(--pastel-pink-light)',
                      padding: '2px 8px',
                      borderRadius: '10px'
                    }}>
                      {loc.category}
                    </span>
                    <span style={{
                      fontSize: '0.8rem',
                      fontWeight: 800,
                      color: '#1B6E44',
                      background: '#E8F8F0',
                      padding: '2px 6px',
                      borderRadius: '8px'
                    }}>
                      ★ {score.toFixed(1)}
                    </span>
                  </div>

                  <h4 style={{ fontSize: '0.98rem', fontWeight: 700, margin: '4px 0 6px 0', color: 'var(--text-primary)' }}>
                    {loc.name}
                  </h4>
                  
                  <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: '0 0 8px 0', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={13} color="#FF6B8B" />
                    <span>Safe Window: <strong>{loc.safeTimeWindows.safest}</strong></span>
                  </p>

                  <div style={{ display: 'flex', gap: '6px', marginTop: '10px' }}>
                    <button
                      onClick={() => onSelectLocation(loc)}
                      style={{
                        flex: 1,
                        background: 'var(--pastel-purple-light)',
                        color: '#5C3F8C',
                        border: '1px solid var(--pastel-purple-soft)',
                        padding: '6px 10px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Details 🔍
                    </button>
                    <button
                      onClick={() => onOpenPlanHangout(loc)}
                      style={{
                        flex: 1,
                        background: 'linear-gradient(135deg, #FF8DA0 0%, #B8A4E3 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '6px 10px',
                        borderRadius: '16px',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        cursor: 'pointer'
                      }}
                    >
                      Plan Outing 🌸
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {/* Nearby Safe Haven Hub Pins */}
        {showSafeHubs && locations.flatMap(loc => (loc.safeHavenHubs || []).map((hub, idx) => {
          // Offsets for nearby hubs visualization
          const hubLat = loc.coordinates.lat + ((idx + 1) * 0.0012) * (idx % 2 === 0 ? 1 : -1);
          const hubLng = loc.coordinates.lng + ((idx + 1) * 0.0012) * (idx % 2 === 0 ? -1 : 1);
          
          return (
            <Marker
              key={`hub-${loc.id}-${idx}`}
              position={[hubLat, hubLng]}
              icon={createSafeHubPin(hub)}
            >
              <Popup>
                <div style={{ padding: '4px', fontSize: '0.8rem', fontFamily: 'var(--font-body)' }}>
                  <div style={{ fontWeight: 700, color: '#1F7A4C', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span>{hub.icon}</span>
                    <span>{hub.name}</span>
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                    {hub.type} • {hub.distance}
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        }))}
      </MapContainer>
    </div>
  );
}
