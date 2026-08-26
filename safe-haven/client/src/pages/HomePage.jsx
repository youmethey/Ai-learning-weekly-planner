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

  // Filter & Sort locations by highest safety score
  const filteredLocations = useMemo(() => {
    const list = locations.filter(loc => {
      const matchQuery = 
        loc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.neighborhood.toLowerCase().includes(searchQuery.toLowerCase()) ||
        loc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (loc.tags && loc.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchCategory = selectedCategory === 'All' || loc.category.toLowerCase().includes(selectedCategory.toLowerCase());

      const score = perspective === 'women' 
        ? (loc.genderSafety?.womenScore || loc.safetyScore) 
        : perspective === 'men' 
          ? (loc.genderSafety?.menScore || loc.safetyScore) 
          : loc.safetyScore;

      const matchScore = score >= minSafetyScore;

      return matchQuery && matchCategory && matchScore;
    });

    return list.sort((a, b) => {
      const scoreA = perspective === 'women' ? (a.genderSafety?.womenScore || a.safetyScore) : perspective === 'men' ? (a.genderSafety?.menScore || a.safetyScore) : a.safetyScore;
      const scoreB = perspective === 'women' ? (b.genderSafety?.womenScore || b.safetyScore) : perspective === 'men' ? (b.genderSafety?.menScore || b.safetyScore) : b.safetyScore;
      return scoreB - scoreA;
    });
  }, [locations, searchQuery, selectedCategory, minSafetyScore, perspective]);

  // Top 3 Recommended Places Spotlight
  const topRecommendedPlaces = useMemo(() => {
    return [...locations].sort((a, b) => {
      const scoreA = perspective === 'women' ? (a.genderSafety?.womenScore || a.safetyScore) : perspective === 'men' ? (a.genderSafety?.menScore || a.safetyScore) : a.safetyScore;
      const scoreB = perspective === 'women' ? (b.genderSafety?.womenScore || b.safetyScore) : perspective === 'men' ? (b.genderSafety?.menScore || b.safetyScore) : b.safetyScore;
      return scoreB - scoreA;
    }).slice(0, 3);
  }, [locations, perspective]);

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

      {/* Top Recommended Places Spotlight Section */}
      {topRecommendedPlaces.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
              <span>⭐ Top Recommended Places</span>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, background: 'var(--pastel-pink)', color: '#B52B4E', padding: '2px 10px', borderRadius: 'var(--radius-full)' }}>
                Highest Safety Index
              </span>
            </h2>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              Curated for {perspective === 'women' ? "Women's Safety 🌸" : perspective === 'men' ? "Men's Safety 🛡️" : "Everyone ✨"}
            </span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '16px'
          }}>
            {topRecommendedPlaces.map((loc, idx) => {
              const currentScore = perspective === 'women' 
                ? (loc.genderSafety?.womenScore || loc.safetyScore)
                : perspective === 'men' 
                  ? (loc.genderSafety?.menScore || loc.safetyScore)
                  : loc.safetyScore;

              return (
                <div
                  key={`top-${loc.id}`}
                  onClick={() => onSelectLocation(loc)}
                  style={{
                    background: 'white',
                    borderRadius: 'var(--radius-lg)',
                    border: '1.5px solid var(--card-border)',
                    boxShadow: 'var(--card-shadow)',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative'
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
                    e.currentTarget.style.borderColor = '#FF9EAA';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'var(--card-shadow)';
                    e.currentTarget.style.borderColor = 'var(--card-border)';
                  }}
                >
                  {/* Top Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    left: '12px',
                    zIndex: 2,
                    background: 'rgba(255, 255, 255, 0.95)',
                    backdropFilter: 'blur(6px)',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 800,
                    color: '#B52B4E',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}>
                    <span>#{idx + 1} Top Recommended</span>
                  </div>

                  {/* Score Pill */}
                  <div style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    zIndex: 2,
                    background: 'linear-gradient(135deg, #62C498 0%, #38A169 100%)',
                    color: 'white',
                    padding: '4px 10px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.8rem',
                    fontWeight: 800,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    boxShadow: '0 2px 8px rgba(56,161,105,0.3)'
                  }}>
                    <span>⭐ {currentScore}</span>
                  </div>

                  <div style={{ height: '140px', overflow: 'hidden', position: 'relative' }}>
                    <img
                      src={loc.image}
                      alt={loc.name}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>

                  <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                      <MapPin size={13} color="#FF6B8B" />
                      <span>{loc.neighborhood}</span>
                      <span>•</span>
                      <span>{loc.category}</span>
                    </div>

                    <h3 style={{ fontSize: '1.02rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)', lineHeight: 1.3 }}>
                      {loc.name}
                    </h3>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {perspective === 'women' ? loc.genderSafety?.womenSummary : perspective === 'men' ? loc.genderSafety?.menSummary : loc.safeTimeWindows?.safest}
                    </p>

                    <div style={{ marginTop: 'auto', paddingTop: '8px', display: 'flex', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectLocation(loc);
                        }}
                        className="btn-secondary"
                        style={{ flex: 1, padding: '6px 10px', fontSize: '0.78rem', justifyContent: 'center' }}
                      >
                        View Details
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenPlanHangout(loc);
                        }}
                        className="btn-primary"
                        style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                      >
                        Plan Hangout 🌸
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

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
