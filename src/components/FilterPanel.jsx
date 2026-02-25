import React from 'react';
import { FilterIcon } from './WeatherIcons';

const FilterPanel = ({ 
  units, 
  setUnits, 
  activeTab, 
  setActiveTab,
  forecastDays,
  setForecastDays,
  showFilters,
  setShowFilters 
}) => {
  const tabs = [
    { id: 'current', label: 'Current', description: 'Real-time weather' },
    { id: 'forecast', label: 'Forecast', description: 'Up to 14 days' },
    { id: 'historical', label: 'Historical', description: 'Past weather data' },
    { id: 'marine', label: 'Marine', description: 'Ocean conditions' },
    { id: 'location', label: 'Location', description: 'Search places' }
  ];

  const unitOptions = [
    { value: 'm', label: 'Metric', description: '°C, km/h, mm' },
    { value: 'f', label: 'Imperial', description: '°F, mph, in' },
    { value: 's', label: 'Scientific', description: 'K, km/h, mm' }
  ];

  const forecastDayOptions = [3, 5, 7, 10, 14];

  return (
    <div className="glass-card" style={{ padding: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap',
          gap: '12px'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '24px', height: '24px', color: 'var(--text-secondary)' }}>
            <FilterIcon />
          </div>
          <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
            Filters & Settings
          </h3>
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="glass-button secondary"
          style={{ padding: '8px 16px', fontSize: '0.85rem' }}
        >
          {showFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {showFilters && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Tab Selection */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600
              }}
            >
              Weather Data Type
            </label>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                gap: '8px'
              }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    border: activeTab === tab.id 
                      ? '2px solid var(--accent-primary)' 
                      : '1px solid var(--glass-border)',
                    background: activeTab === tab.id 
                      ? 'var(--glass-bg-hover)' 
                      : 'var(--glass-bg)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <p
                    style={{
                      margin: '0 0 4px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      color: activeTab === tab.id 
                        ? 'var(--text-primary)' 
                        : 'var(--text-secondary)'
                    }}
                  >
                    {tab.label}
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.75rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    {tab.description}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Unit Selection */}
          <div>
            <label
              style={{
                display: 'block',
                fontSize: '0.75rem',
                color: 'var(--text-tertiary)',
                marginBottom: '12px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                fontWeight: 600
              }}
            >
              Units
            </label>
            <div className="tab-nav" style={{ width: '100%' }}>
              {unitOptions.map((option) => (
                <button
                  key={option.value}
                  className={`tab-button ${units === option.value ? 'active' : ''}`}
                  onClick={() => setUnits(option.value)}
                  style={{ flex: 1 }}
                >
                  {option.label}
                </button>
              ))}
            </div>
            <p
              style={{
                margin: '8px 0 0',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}
            >
              {unitOptions.find(o => o.value === units)?.description}
            </p>
          </div>

          {/* Forecast Days (only show when forecast tab is active) */}
          {activeTab === 'forecast' && (
            <div>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  fontWeight: 600
                }}
              >
                Forecast Days
              </label>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {forecastDayOptions.map((days) => (
                  <button
                    key={days}
                    onClick={() => setForecastDays(days)}
                    style={{
                      padding: '10px 20px',
                      borderRadius: '8px',
                      border: forecastDays === days 
                        ? '2px solid var(--accent-primary)' 
                        : '1px solid var(--glass-border)',
                      background: forecastDays === days 
                        ? 'var(--glass-bg-hover)' 
                        : 'var(--glass-bg)',
                      color: forecastDays === days 
                        ? 'var(--text-primary)' 
                        : 'var(--text-secondary)',
                      cursor: 'pointer',
                      fontWeight: forecastDays === days ? 600 : 400,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {days} Days
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Info Box */}
          <div
            style={{
              padding: '16px',
              background: 'rgba(99, 102, 241, 0.1)',
              borderRadius: '12px',
              border: '1px solid rgba(99, 102, 241, 0.2)'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '0.85rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.6
              }}
            >
              <strong style={{ color: 'var(--accent-primary)' }}>Pro Tip:</strong>{' '}
              {activeTab === 'current' && 'Current weather shows real-time conditions including temperature, humidity, wind, and visibility.'}
              {activeTab === 'forecast' && `Forecast provides weather predictions for the next ${forecastDays} days with hourly breakdowns.`}
              {activeTab === 'historical' && 'Historical data lets you look back at past weather conditions for any date up to 1 year ago.'}
              {activeTab === 'marine' && 'Marine weather provides ocean conditions including wave height, water temperature, and visibility.'}
              {activeTab === 'location' && 'Location lookup helps you find coordinates, timezone, and detailed information about any place.'}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
