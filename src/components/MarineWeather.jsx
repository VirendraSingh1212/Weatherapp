import React, { useState } from 'react';
import { getMarineWeather, getUnitLabel } from '../services/weatherApi';
import { WaveIcon, WindIcon, ThermometerIcon, CompassIcon, DropletIcon, SunIcon } from './WeatherIcons';

const MarineWeather = ({ location, units = 'm' }) => {
  const [marineData, setMarineData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coordinates, setCoordinates] = useState({ lat: '', lon: '' });

  const unitLabels = getUnitLabel(units);

  // Predefined popular marine locations
  const popularLocations = [
    { name: 'Miami Beach, FL', lat: 25.79, lon: -80.13 },
    { name: 'San Francisco Bay', lat: 37.80, lon: -122.47 },
    { name: 'Cape Cod, MA', lat: 41.67, lon: -70.28 },
    { name: 'San Diego, CA', lat: 32.72, lon: -117.16 },
    { name: 'Key West, FL', lat: 24.55, lon: -81.80 },
    { name: 'Seattle, WA', lat: 47.61, lon: -122.33 },
    { name: 'Honolulu, HI', lat: 21.31, lon: -157.86 },
    { name: 'Sydney Harbour', lat: -33.87, lon: 151.21 }
  ];

  const fetchMarineData = async (lat, lon) => {
    const query = lat && lon ? `${lat},${lon}` : location;
    if (!query) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getMarineWeather(query, units);
      setMarineData(data);
      if (lat && lon) {
        setCoordinates({ lat, lon });
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch marine data. Note: Marine data requires coordinates.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomCoordinates = () => {
    if (coordinates.lat && coordinates.lon) {
      fetchMarineData(parseFloat(coordinates.lat), parseFloat(coordinates.lon));
    }
  };

  // Extract marine data from response
  const getMarineInfo = () => {
    if (!marineData || !marineData.current) return null;
    
    // Marine data is often embedded in the current weather response
    // or may have specific marine fields
    const current = marineData.current;
    
    return {
      waterTemp: current.water_temperature || current.temperature,
      waveHeight: current.wave_height,
      wavePeriod: current.wave_period,
      waveDirection: current.wave_direction,
      swellHeight: current.swell_height,
      swellPeriod: current.swell_period,
      swellDirection: current.swell_direction,
      windWaveHeight: current.wind_wave_height,
      windWavePeriod: current.wind_wave_period,
      windWaveDirection: current.wind_wave_direction,
      windSpeed: current.wind_speed,
      windDirection: current.wind_dir,
      visibility: current.visibility,
      cloudcover: current.cloudcover,
      uvIndex: current.uv_index
    };
  };

  const marineInfo = getMarineInfo();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Location Selection */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 600 }}>
          Marine Weather Locations
        </h3>

        {/* Popular Locations */}
        <p style={{ margin: '0 0 12px', fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
          Quick Select:
        </p>
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '24px'
          }}
        >
          {popularLocations.map((loc) => (
            <button
              key={loc.name}
              onClick={() => fetchMarineData(loc.lat, loc.lon)}
              className="glass-button secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              {loc.name}
            </button>
          ))}
        </div>

        {/* Custom Coordinates */}
        <div style={{ marginTop: '20px' }}>
          <p style={{ margin: '0 0 12px', fontSize: '0.875rem', color: 'var(--text-tertiary)' }}>
            Or enter custom coordinates:
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Latitude
              </label>
              <input
                type="number"
                step="0.01"
                value={coordinates.lat}
                onChange={(e) => setCoordinates({ ...coordinates, lat: e.target.value })}
                placeholder="e.g., 25.79"
                className="glass-input"
                style={{ height: '44px' }}
              />
            </div>
            <div style={{ flex: 1, minWidth: '140px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '0.75rem',
                  color: 'var(--text-tertiary)',
                  marginBottom: '6px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                Longitude
              </label>
              <input
                type="number"
                step="0.01"
                value={coordinates.lon}
                onChange={(e) => setCoordinates({ ...coordinates, lon: e.target.value })}
                placeholder="e.g., -80.13"
                className="glass-input"
                style={{ height: '44px' }}
              />
            </div>
            <button
              onClick={handleCustomCoordinates}
              disabled={!coordinates.lat || !coordinates.lon || loading}
              className="glass-button"
              style={{ height: '44px' }}
            >
              {loading ? 'Loading...' : 'Get Marine Data'}
            </button>
          </div>
        </div>

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

      {/* Marine Data Display */}
      {marineData && marineData.current && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Location Header */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
              <div style={{ width: '64px', height: '64px' }}>
                <WaveIcon />
              </div>
              <div>
                <h2 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 600 }}>
                  Marine Conditions
                </h2>
                <p style={{ margin: '4px 0 0', color: 'var(--text-tertiary)' }}>
                  {marineData.location?.name || 'Custom Location'} • 
                  Lat: {marineData.location?.lat || coordinates.lat}°, 
                  Lon: {marineData.location?.lon || coordinates.lon}°
                </p>
              </div>
            </div>
          </div>

          {/* Marine Metrics Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '16px'
            }}
          >
            {/* Water Temperature */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px' }}>
                  <ThermometerIcon color="#06b6d4" />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Water Temperature
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 600, margin: '4px 0', color: '#06b6d4' }}>
                    {marineInfo?.waterTemp || marineData.current.temperature}{unitLabels.temp}
                  </p>
                </div>
              </div>
            </div>

            {/* Wave Height */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px' }}>
                  <WaveIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Wave Height
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 600, margin: '4px 0' }}>
                    {marineInfo?.waveHeight || 'N/A'}
                  </p>
                  {marineInfo?.wavePeriod && (
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                      Period: {marineInfo.wavePeriod}s
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Wind */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px' }}>
                  <WindIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Wind Speed
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 600, margin: '4px 0' }}>
                    {marineData.current.wind_speed} {unitLabels.speed}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Direction: {marineData.current.wind_dir}
                  </p>
                </div>
              </div>
            </div>

            {/* Visibility */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px' }}>
                  <CompassIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Visibility
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 600, margin: '4px 0' }}>
                    {marineData.current.visibility} km
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    {marineData.current.visibility > 10 ? 'Excellent' : marineData.current.visibility > 5 ? 'Good' : 'Fair'}
                  </p>
                </div>
              </div>
            </div>

            {/* Cloud Cover */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px' }}>
                  <SunIcon color="#fbbf24" />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Cloud Cover
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 600, margin: '4px 0' }}>
                    {marineData.current.cloudcover}%
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    UV Index: {marineData.current.uv_index}
                  </p>
                </div>
              </div>
            </div>

            {/* Humidity */}
            <div className="glass-card" style={{ padding: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px' }}>
                  <DropletIcon />
                </div>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    Humidity
                  </p>
                  <p style={{ fontSize: '1.75rem', fontWeight: 600, margin: '4px 0' }}>
                    {marineData.current.humidity}%
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
                    Pressure: {marineData.current.pressure} mb
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Marine Safety Info */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 600 }}>
              Marine Safety Information
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '16px'
              }}
            >
              <div
                style={{
                  padding: '16px',
                  background: 'var(--glass-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: '0 0 8px' }}>
                  Sea Condition
                </p>
                <p style={{ fontSize: '1rem', fontWeight: 500, margin: 0 }}>
                  {getSeaCondition(marineInfo?.waveHeight || 0)}
                </p>
              </div>
              <div
                style={{
                  padding: '16px',
                  background: 'var(--glass-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: '0 0 8px' }}>
                  Boating Recommendation
                </p>
                <p style={{ fontSize: '1rem', fontWeight: 500, margin: 0 }}>
                  {getBoatingRecommendation(marineData.current.wind_speed, marineInfo?.waveHeight || 0)}
                </p>
              </div>
              <div
                style={{
                  padding: '16px',
                  background: 'var(--glass-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--glass-border)'
                }}
              >
                <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: '0 0 8px' }}>
                  Swimming Conditions
                </p>
                <p style={{ fontSize: '1rem', fontWeight: 500, margin: 0 }}>
                  {getSwimmingConditions(marineInfo?.waveHeight || 0, marineData.current.wind_speed)}
                </p>
              </div>
            </div>
          </div>

          {/* Weather Description */}
          <div className="glass-card" style={{ padding: '24px' }}>
            <h4 style={{ margin: '0 0 12px', fontSize: '1rem', fontWeight: 600 }}>
              Current Conditions
            </h4>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.6 }}>
              {marineData.current.weather_descriptions?.[0] || 'Clear conditions'} with 
              winds at {marineData.current.wind_speed} {unitLabels.speed} from the {marineData.current.wind_dir}.
              Visibility is {marineData.current.visibility} km.
              {marineInfo?.waterTemp && ` Water temperature is ${marineInfo.waterTemp}${unitLabels.temp}.`}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

// Helper functions for marine conditions
function getSeaCondition(waveHeight) {
  if (waveHeight === undefined || waveHeight === null) return 'Data unavailable';
  if (waveHeight < 0.5) return 'Calm - Smooth sea surface';
  if (waveHeight < 1.25) return 'Slight - Small wavelets';
  if (waveHeight < 2.5) return 'Moderate - Small waves';
  if (waveHeight < 4) return 'Rough - Moderate waves';
  return 'Very Rough - Large waves';
}

function getBoatingRecommendation(windSpeed, waveHeight) {
  if (windSpeed < 10 && waveHeight < 0.5) return 'Excellent - Ideal conditions';
  if (windSpeed < 15 && waveHeight < 1) return 'Good - Favorable conditions';
  if (windSpeed < 20 && waveHeight < 1.5) return 'Fair - Caution advised';
  if (windSpeed < 25 && waveHeight < 2) return 'Poor - Small craft advisory';
  return 'Dangerous - Avoid boating';
}

function getSwimmingConditions(waveHeight, windSpeed) {
  if (waveHeight < 0.3 && windSpeed < 10) return 'Excellent - Perfect for swimming';
  if (waveHeight < 0.6 && windSpeed < 15) return 'Good - Suitable for swimming';
  if (waveHeight < 1 && windSpeed < 20) return 'Fair - Caution for inexperienced swimmers';
  return 'Poor - Not recommended for swimming';
}

export default MarineWeather;
