import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  Map, 
  Grid, 
  Sparkles, 
  ShieldCheck, 
  Clock, 
  Heart, 
  PlusCircle,
  MapPin,
  TrendingUp,
  Sun,
  Moon
} from 'lucide-react';
import MapView from '../components/MapView';
import LocationCard from '../components/LocationCard';
import GenderFilterToggle from '../components/GenderFilterToggle';

export default function HomePage({ 
  locations = [], 
  perspective, 
  setPerspective,
  onSelectLocation,
  onOpenPlanHangout,
  onOpenReportModal
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState('split'); // 'split', 'map', 'grid'
  const [minSafetyScore, setMinSafetyScore] = useState(0);

  const categories = [
    'All',
    'Cafe & Lounge',
    'Park & Waterfront',
    'Dessert & Boba',
    'Rooftop & Dining',
    'Bookstore & Tea',
    'Market & Street Food',
    'Art & Culture',
    'Entertainment & Cinema'
  ];

  // Filter locations
  const filteredLocations = useMemo(() => {
    return locations.filter(loc => {
      const matchQuery = 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (loc.tags && loc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchCategory = selectedCategory === 'All' || loc.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const score = perspective === 'women' 
        ? loc.genderSafety.womenScore 
        : perspective === 'men' 
          ? loc.genderSafety.menScore 
          : loc.safetyScore;

      const matchScore = score >= minSafetyScore;

      return matchQuery && matchCategory && matchScore;
    });
  }, [locations, searchQuery, selectedCategory, minSafetyScore, perspective]);

  return (
    <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '24px 20px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Hero Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(255, 240, 245, 0.95) 0%, rgba(245, 235, 252, 0.95) 50%, rgba(235, 245, 255, 0.95) 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '28px 32px',
        border: '1.5px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          fontSize: '110px',
          opacity: 0.15,
          userSelect: 'none',
          pointerEvents: 'none'
        }}>
          🌸
        </div>

        <div style={{ maxWidth: '720px', position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'white', padding: '4px 12px', borderRadius: 'var(--radius-full)', marginBottom: '12px', border: '1px solid var(--pastel-pink-soft)' }}>
            <Sparkles size={14} color="#FF6B8B" />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#B52B4E' }}>
              Hangout Confidently & Safely
            </span>
          </div>

          <h1 style={{ fontSize: '2.2rem', fontWeight: 800, lineHeight: 1.2, margin: '0 0 10px 0', color: 'var(--text-primary)' }}>
            Find Beautiful & Verified Safe Places for Every Hangout 🌸
          </h1>

          <p style={{ fontSize: '0.96rem', color: 'var(--text-secondary)', lineHeight: 1.5, margin: '0 0 20px 0' }}>
            Check verified safety ratings, street lighting, safe time windows, and nearby safe havens. Plan fun outings with automated check-in links for your trusted circle.
          </p>

          {/* Quick Stat Highlights */}
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.8)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 600 }}>
              <ShieldCheck size={16} color="#62C498" />
              <span>100% Verified Safe Zones</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.8)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Sun size={16} color="#F7C948" />
              <span>Safe Time Window Breakdown</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(255, 255, 255, 0.8)', padding: '6px 14px', borderRadius: 'var(--radius-full)', fontSize: '0.82rem', fontWeight: 600 }}>
              <Heart size={16} color="#FF9EAA" />
              <span>Live Circle Check-In</span>
            </div>
          </div>
        </div>
      </div>

      {/* Gender Safety Perspective Switcher */}
      <GenderFilterToggle perspective={perspective} setPerspective={setPerspective} />

      {/* Search & Filter Controls Bar */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        background: 'rgba(255, 255, 255, 0.92)',
        borderRadius: 'var(--radius-lg)',
        padding: '16px 20px',
        border: '1px solid var(--card-border)',
        boxShadow: 'var(--card-shadow)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '12px'
        }}>
          {/* Search Input */}
          <div style={{ position: 'relative', flex: '1 1 320px' }}>
            <Search size={18} color="#9C94A6" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search safe cafes, parks, dessert spots, bookstores, neighborhoods..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '40px', borderRadius: 'var(--radius-full)' }}
            />
          </div>

          {/* View Mode Toggle */}
          <div style={{ display: 'flex', gap: '6px', background: 'rgba(250, 240, 246, 0.8)', padding: '4px', borderRadius: 'var(--radius-full)' }}>
            <button
              onClick={() => setViewMode('split')}
              style={{
                background: viewMode === 'split' ? 'white' : 'transparent',
                color: viewMode === 'split' ? '#FF6B8B' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: viewMode === 'split' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Split View 🗺️
            </button>
            <button
              onClick={() => setViewMode('map')}
              style={{
                background: viewMode === 'map' ? 'white' : 'transparent',
                color: viewMode === 'map' ? '#FF6B8B' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: viewMode === 'map' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Map Only 📍
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'white' : 'transparent',
                color: viewMode === 'grid' ? '#FF6B8B' : 'var(--text-secondary)',
                border: 'none',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.82rem',
                fontWeight: 600,
                cursor: 'pointer',
                boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none'
              }}
            >
              Cards Grid 🎴
            </button>
          </div>

          {/* Add Community Report Button */}
          <button
            onClick={onOpenReportModal}
            className="btn-secondary"
            style={{ padding: '8px 16px', fontSize: '0.85rem' }}
          >
            <PlusCircle size={15} color="#FF6B8B" />
            <span>Contribute Safety Tip 🌸</span>
          </button>
        </div>

        {/* Category Filter Pills */}
        <div style={{
          display: 'flex',
          gap: '8px',
          overflowX: 'auto',
          paddingBottom: '4px',
          scrollbarWidth: 'none'
        }}>
          {categories.map(cat => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  background: isSelected ? 'linear-gradient(135deg, #FF9EAA 0%, #B8A4E3 100%)' : 'rgba(255, 255, 255, 0.9)',
                  color: isSelected ? 'white' : 'var(--text-secondary)',
                  border: isSelected ? 'none' : '1px solid var(--pastel-purple-soft)',
                  padding: '6px 14px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.82rem',
                  fontWeight: isSelected ? 700 : 500,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  boxShadow: isSelected ? '0 4px 12px rgba(255, 158, 170, 0.3)' : 'none',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Layout */}
      {viewMode === 'map' && (
        <div style={{ height: '620px' }}>
          <MapView
            locations={filteredLocations}
            onSelectLocation={onSelectLocation}
            onOpenPlanHangout={onOpenPlanHangout}
            perspective={perspective}
          />
        </div>
      )}

      {viewMode === 'grid' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
          gap: '20px'
        }}>
          {filteredLocations.map(loc => (
            <LocationCard
              key={loc.id}
              location={loc}
              onSelectLocation={onSelectLocation}
              onOpenPlanHangout={onOpenPlanHangout}
              perspective={perspective}
            />
          ))}
        </div>
      )}

      {viewMode === 'split' && (
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '24px',
          alignItems: 'start'
        }}>
          {/* Left Column: Interactive Map */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span>🗺️ Interactive Safety Map</span>
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Showing {filteredLocations.length} safe venues
              </span>
            </div>
            <MapView
              locations={filteredLocations}
              onSelectLocation={onSelectLocation}
              onOpenPlanHangout={onOpenPlanHangout}
              perspective={perspective}
            />
          </div>

          {/* Right Column: Venue Cards Feed */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>
                🌸 Top Rated Hangout Spots
              </h3>
              <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                Sorted by highest safety index
              </span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: '16px'
            }}>
              {filteredLocations.map(loc => (
                <LocationCard
                  key={loc.id}
                  location={loc}
                  onSelectLocation={onSelectLocation}
                  onOpenPlanHangout={onOpenPlanHangout}
                  perspective={perspective}
                />
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
