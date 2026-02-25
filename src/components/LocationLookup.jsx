import React, { useState } from 'react';
import { searchLocations } from '../services/weatherApi';
import { LocationIcon, SearchIcon, ArrowRightIcon } from './WeatherIcons';

const LocationLookup = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResults([]);
    setSelectedLocation(null);

    try {
      const data = await searchLocations(query);
      if (data.results && data.results.length > 0) {
        setResults(data.results);
      } else {
        setError('No locations found. Try a different search term.');
      }
    } catch (err) {
      setError(err.message || 'Failed to search locations');
    } finally {
      setLoading(false);
    }
  };

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  const getLocationTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'city':
        return '🏙️';
      case 'region':
      case 'administrative_area':
        return '🗺️';
      case 'country':
        return '🌍';
      case 'island':
        return '🏝️';
      case 'mountain':
        return '⛰️';
      case 'lake':
      case 'river':
        return '💧';
      default:
        return '📍';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Search Section */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 600 }}>
          Location Lookup
        </h3>
        <p style={{ margin: '0 0 20px', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Search for cities, regions, countries, or landmarks to get detailed location information including coordinates, timezone, and more.
        </p>

        <form onSubmit={handleSearch}>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: '250px', position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: '20px',
                  color: 'var(--text-tertiary)'
                }}
              >
                <SearchIcon />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for a location..."
                className="glass-input"
                style={{ paddingLeft: '48px', height: '52px' }}
              />
            </div>
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="glass-button"
              style={{ height: '52px' }}
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
        </form>

        {error && (
          <div
            style={{
              marginTop: '16px',
              padding: '12px 16px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#ef4444',
              fontSize: '0.9rem'
            }}
          >
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {results.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px'
            }}
          >
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
              Search Results ({results.length})
            </h3>
            <button
              onClick={() => {
                setResults([]);
                setSelectedLocation(null);
              }}
              className="glass-button secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Clear Results
            </button>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '16px'
            }}
          >
            {results.map((location, index) => (
              <div
                key={`${location.name}-${index}`}
                className="glass-card"
                onClick={() => setSelectedLocation(location)}
                style={{
                  padding: '20px',
                  cursor: 'pointer',
                  border: selectedLocation?.name === location.name 
                    ? '2px solid var(--accent-primary)' 
                    : '1px solid var(--glass-border)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'var(--glass-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.5rem',
                      flexShrink: 0
                    }}
                  >
                    {getFlagEmoji(location.country_code) || getLocationTypeIcon(location.type)}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <h4
                      style={{
                        margin: '0 0 4px',
                        fontSize: '1.1rem',
                        fontWeight: 600,
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                      }}
                    >
                      {location.name}
                    </h4>
                    <p
                      style={{
                        margin: 0,
                        fontSize: '0.85rem',
                        color: 'var(--text-tertiary)'
                      }}
                    >
                      {location.region && `${location.region}, `}{location.country}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        marginTop: '8px',
                        flexWrap: 'wrap'
                      }}
                    >
                      <span
                        style={{
                          padding: '2px 8px',
                          background: 'var(--glass-bg)',
                          borderRadius: '4px',
                          fontSize: '0.7rem',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          letterSpacing: '0.5px'
                        }}
                      >
                        {location.type || 'Location'}
                      </span>
                      {location.population && (
                        <span
                          style={{
                            padding: '2px 8px',
                            background: 'var(--glass-bg)',
                            borderRadius: '4px',
                            fontSize: '0.7rem',
                            color: 'var(--text-muted)'
                          }}
                        >
                          Pop: {(location.population / 1000000).toFixed(1)}M
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Coordinates Preview */}
                <div
                  style={{
                    marginTop: '16px',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--glass-border)',
                    display: 'flex',
                    gap: '16px',
                    fontSize: '0.8rem',
                    color: 'var(--text-tertiary)'
                  }}
                >
                  <span>Lat: {location.latitude?.toFixed(4) || location.lat?.toFixed(4)}</span>
                  <span>Lon: {location.longitude?.toFixed(4) || location.lon?.toFixed(4)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selected Location Details */}
      {selectedLocation && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: '24px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'var(--glass-bg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '2rem'
                }}
              >
                {getFlagEmoji(selectedLocation.country_code) || getLocationTypeIcon(selectedLocation.type)}
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
                  {selectedLocation.name}
                </h2>
                <p style={{ margin: '4px 0 0', color: 'var(--text-tertiary)' }}>
                  {selectedLocation.region && `${selectedLocation.region}, `}
                  {selectedLocation.country}
                </p>
              </div>
            </div>
          </div>

          {/* Location Details Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}
          >
            <DetailItem
              label="Coordinates"
              value={`${selectedLocation.latitude?.toFixed(6) || selectedLocation.lat?.toFixed(6)}, ${selectedLocation.longitude?.toFixed(6) || selectedLocation.lon?.toFixed(6)}`}
              icon={<LocationIcon />}
            />
            <DetailItem
              label="Timezone"
              value={selectedLocation.timezone_id || 'UTC'}
              subValue={selectedLocation.utc_offset !== undefined ? `UTC${selectedLocation.utc_offset >= 0 ? '+' : ''}${selectedLocation.utc_offset}` : undefined}
            />
            <DetailItem
              label="Country Code"
              value={selectedLocation.country_code || 'N/A'}
            />
            <DetailItem
              label="Location Type"
              value={selectedLocation.type || 'Unknown'}
              subValue={selectedLocation.population ? `Population: ${selectedLocation.population.toLocaleString()}` : undefined}
            />
            {selectedLocation.elevation && (
              <DetailItem
                label="Elevation"
                value={`${selectedLocation.elevation} meters`}
              />
            )}
            {selectedLocation.area && (
              <DetailItem
                label="Area"
                value={`${selectedLocation.area.toLocaleString()} km²`}
              />
            )}
          </div>

          {/* Actions */}
          <div
            style={{
              marginTop: '24px',
              paddingTop: '24px',
              borderTop: '1px solid var(--glass-border)',
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap'
            }}
          >
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${selectedLocation.latitude || selectedLocation.lat},${selectedLocation.longitude || selectedLocation.lon}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button"
              style={{ textDecoration: 'none', display: 'inline-flex' }}
            >
              View on Maps
              <span style={{ width: '16px', height: '16px', marginLeft: '8px' }}>
                <ArrowRightIcon />
              </span>
            </a>
            <button
              onClick={() => {
                const coords = `${selectedLocation.latitude || selectedLocation.lat},${selectedLocation.longitude || selectedLocation.lon}`;
                navigator.clipboard.writeText(coords);
              }}
              className="glass-button secondary"
            >
              Copy Coordinates
            </button>
          </div>
        </div>
      )}

      {/* Quick Tips */}
      {!results.length && !loading && (
        <div className="glass-card" style={{ padding: '24px' }}>
          <h4 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 600 }}>
            Search Tips
          </h4>
          <ul
            style={{
              margin: 0,
              paddingLeft: '20px',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              lineHeight: 1.8
            }}
          >
            <li>Search for city names like "London", "New York", or "Tokyo"</li>
            <li>Try region names like "California" or "Bavaria"</li>
            <li>Search for countries like "France" or "Brazil"</li>
            <li>Use coordinates for precise locations (e.g., "48.8566, 2.3522")</li>
            <li>Search for landmarks like "Eiffel Tower" or "Grand Canyon"</li>
          </ul>
        </div>
      )}
    </div>
  );
};

// Detail Item Component
const DetailItem = ({ label, value, subValue, icon }) => (
  <div
    style={{
      padding: '16px',
      background: 'var(--glass-bg)',
      borderRadius: '12px',
      border: '1px solid var(--glass-border)'
    }}
  >
    <p
      style={{
        fontSize: '0.75rem',
        color: 'var(--text-tertiary)',
        margin: '0 0 8px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}
    >
      {label}
    </p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      {icon && <div style={{ width: '20px', height: '20px', color: 'var(--text-tertiary)' }}>{icon}</div>}
      <p
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          margin: 0
        }}
      >
        {value}
      </p>
    </div>
    {subValue && (
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>
        {subValue}
      </p>
    )}
  </div>
);

export default LocationLookup;
