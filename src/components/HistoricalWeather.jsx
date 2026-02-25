import React, { useState } from 'react';
import { getHistoricalWeather, formatDate, getUnitLabel } from '../services/weatherApi';
import { WeatherIcon, CalendarIcon, ThermometerIcon, DropletIcon, WindIcon } from './WeatherIcons';

const HistoricalWeather = ({ location, units = 'm' }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [comparisonData, setComparisonData] = useState([]);

  const unitLabels = getUnitLabel(units);

  // Calculate max date (yesterday) and min date (1 year ago for free tier)
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  const maxDate = yesterday.toISOString().split('T')[0];

  const oneYearAgo = new Date(today);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);
  const minDate = oneYearAgo.toISOString().split('T')[0];

  const fetchHistoricalData = async () => {
    if (!location || !selectedDate) return;

    setLoading(true);
    setError(null);

    try {
      const data = await getHistoricalWeather(location, selectedDate, units);
      setHistoricalData(data);
      
      // Add to comparison if not already present
      setComparisonData(prev => {
        const exists = prev.find(d => d.historical?.date === selectedDate);
        if (!exists && prev.length < 5) {
          return [...prev, data];
        }
        return prev;
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch historical data');
    } finally {
      setLoading(false);
    }
  };

  const removeFromComparison = (dateToRemove) => {
    setComparisonData(prev => prev.filter(d => d.historical?.date !== dateToRemove));
  };

  const clearComparison = () => {
    setComparisonData([]);
  };

  // Generate quick date options
  const quickDates = [
    { label: 'Yesterday', days: 1 },
    { label: 'Last Week', days: 7 },
    { label: 'Last Month', days: 30 },
    { label: '3 Months Ago', days: 90 },
    { label: '6 Months Ago', days: 180 },
    { label: '1 Year Ago', days: 365 }
  ];

  const setQuickDate = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    setSelectedDate(date.toISOString().split('T')[0]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Date Selection */}
      <div className="glass-card" style={{ padding: '24px' }}>
        <h3 style={{ margin: '0 0 20px', fontSize: '1.1rem', fontWeight: 600 }}>
          Select Historical Date
        </h3>

        {/* Quick Date Buttons */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
            marginBottom: '20px'
          }}
        >
          {quickDates.map((option) => (
            <button
              key={option.label}
              onClick={() => setQuickDate(option.days)}
              className="glass-button secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              {option.label}
            </button>
          ))}
        </div>

        {/* Date Input */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
          <div style={{ flex: 1, minWidth: '200px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
                marginBottom: '8px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              Date
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={minDate}
              max={maxDate}
              className="glass-input"
              style={{ height: '48px' }}
            />
          </div>
          <button
            onClick={fetchHistoricalData}
            disabled={!selectedDate || loading}
            className="glass-button"
            style={{ height: '48px' }}
          >
            {loading ? 'Loading...' : 'Fetch Data'}
          </button>
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

      {/* Current Historical Data */}
      {historicalData && historicalData.historical && (
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
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                Historical Weather
              </h3>
              <p style={{ margin: '4px 0 0', color: 'var(--text-tertiary)' }}>
                {formatDate(historicalData.historical.date, 'full')}
              </p>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 16px',
                background: 'var(--glass-bg)',
                borderRadius: '20px',
                fontSize: '0.875rem',
                color: 'var(--text-secondary)'
              }}
            >
              <div style={{ width: '16px', height: '16px' }}>
                <CalendarIcon />
              </div>
              {historicalData.historical.date}
            </div>
          </div>

          {/* Historical Summary */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '16px',
              marginBottom: '24px'
            }}
          >
            <div
              style={{
                padding: '20px',
                background: 'var(--glass-bg)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '32px', height: '32px', margin: '0 auto 8px' }}>
                <ThermometerIcon />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>Avg Temp</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0' }}>
                {historicalData.historical.avgtemp}{unitLabels.temp}
              </p>
            </div>
            <div
              style={{
                padding: '20px',
                background: 'var(--glass-bg)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '32px', height: '32px', margin: '0 auto 8px', color: '#ef4444' }}>
                <ThermometerIcon color="#ef4444" />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>Max Temp</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0', color: '#ef4444' }}>
                {historicalData.historical.maxtemp}{unitLabels.temp}
              </p>
            </div>
            <div
              style={{
                padding: '20px',
                background: 'var(--glass-bg)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '32px', height: '32px', margin: '0 auto 8px', color: '#60a5fa' }}>
                <ThermometerIcon color="#60a5fa" />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>Min Temp</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0', color: '#60a5fa' }}>
                {historicalData.historical.mintemp}{unitLabels.temp}
              </p>
            </div>
            <div
              style={{
                padding: '20px',
                background: 'var(--glass-bg)',
                borderRadius: '12px',
                textAlign: 'center'
              }}
            >
              <div style={{ width: '32px', height: '32px', margin: '0 auto 8px' }}>
                <DropletIcon />
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>Total Rain</p>
              <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0' }}>
                {historicalData.historical.totalprecip || 0} {unitLabels.precip}
              </p>
            </div>
          </div>

          {/* Hourly Data Table */}
          <h4 style={{ margin: '0 0 16px', fontSize: '1rem', fontWeight: 600 }}>
            Hourly Breakdown
          </h4>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Time</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Condition</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Temp</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Feels</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Wind</th>
                  <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Humidity</th>
                </tr>
              </thead>
              <tbody>
                {historicalData.historical.hourly?.map((hour, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>
                      {hour.time}
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>
                      <div style={{ width: '32px', height: '32px', margin: '0 auto' }}>
                        <WeatherIcon
                          code={hour.weather_code}
                          isDay={hour.is_day === 'yes'}
                          size={32}
                        />
                      </div>
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center', fontWeight: 600 }}>
                      {Math.round(hour.temperature)}°
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                      {Math.round(hour.feelslike)}°
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                      {hour.wind_speed} {unitLabels.speed}
                    </td>
                    <td style={{ padding: '12px 8px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                      {hour.humidity}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Comparison Section */}
      {comparisonData.length > 0 && (
        <div className="glass-card" style={{ padding: '24px' }}>
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
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600 }}>
              Date Comparison ({comparisonData.length} dates)
            </h3>
            <button
              onClick={clearComparison}
              className="glass-button secondary"
              style={{ padding: '8px 16px', fontSize: '0.85rem' }}
            >
              Clear All
            </button>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Date</th>
                  <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Avg</th>
                  <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Max</th>
                  <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Min</th>
                  <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Rain</th>
                  <th style={{ textAlign: 'center', padding: '12px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Action</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((data) => (
                  <tr key={data.historical.date} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <td style={{ padding: '12px', color: 'var(--text-secondary)' }}>
                      {formatDate(data.historical.date, 'short')}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', fontWeight: 500 }}>
                      {data.historical.avgtemp}°
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#ef4444' }}>
                      {data.historical.maxtemp}°
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: '#60a5fa' }}>
                      {data.historical.mintemp}°
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                      {data.historical.totalprecip || 0} {unitLabels.precip}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'center' }}>
                      <button
                        onClick={() => removeFromComparison(data.historical.date)}
                        style={{
                          padding: '4px 12px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          borderRadius: '4px',
                          color: '#ef4444',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HistoricalWeather;
