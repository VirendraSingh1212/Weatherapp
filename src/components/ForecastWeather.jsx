import React, { useState } from 'react';
import { WeatherIcon, DropletIcon, WindIcon, ThermometerIcon } from './WeatherIcons';
import { formatDate, getUnitLabel } from '../services/weatherApi';

const ForecastWeather = ({ data, units = 'm' }) => {
  const [selectedDay, setSelectedDay] = useState(null);
  const [viewMode, setViewMode] = useState('daily'); // 'daily' or 'hourly'

  if (!data || !data.forecast) {
    return (
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>No forecast data available</p>
      </div>
    );
  }

  const { forecast, location } = data;
  const unitLabels = getUnitLabel(units);

  // Convert forecast object to array and sort by date
  const forecastDays = Object.entries(forecast)
    .map(([date, dayData]) => ({
      date,
      ...dayData
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (forecastDays.length === 0) {
    return (
      <div className="glass-card" style={{ padding: '40px', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-tertiary)' }}>No forecast days available</p>
      </div>
    );
  }

  const activeDay = selectedDay || forecastDays[0];

  // Get hourly data for the selected day
  const hourlyData = activeDay.hourly || [];

  // Calculate summary statistics
  const avgTemp = Math.round(
    forecastDays.reduce((sum, day) => sum + day.avgtemp, 0) / forecastDays.length
  );
  const maxTemp = Math.max(...forecastDays.map(day => day.maxtemp));
  const minTemp = Math.min(...forecastDays.map(day => day.mintemp));
  const totalPrecip = forecastDays.reduce((sum, day) => sum + (day.totalprecip || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Summary Stats */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '16px'
        }}
      >
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', margin: '0 auto 8px' }}>
            <ThermometerIcon />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>Avg Temp</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0' }}>
            {avgTemp}{unitLabels.temp}
          </p>
        </div>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', margin: '0 auto 8px', color: '#ef4444' }}>
            <ThermometerIcon color="#ef4444" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>High</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0', color: '#ef4444' }}>
            {maxTemp}{unitLabels.temp}
          </p>
        </div>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', margin: '0 auto 8px', color: '#60a5fa' }}>
            <ThermometerIcon color="#60a5fa" />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>Low</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0', color: '#60a5fa' }}>
            {minTemp}{unitLabels.temp}
          </p>
        </div>
        <div className="glass-card" style={{ padding: '20px', textAlign: 'center' }}>
          <div style={{ width: '32px', height: '32px', margin: '0 auto 8px' }}>
            <DropletIcon />
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)', margin: 0 }}>Total Rain</p>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, margin: '4px 0' }}>
            {totalPrecip.toFixed(1)}{unitLabels.precip}
          </p>
        </div>
      </div>

      {/* View Mode Toggle */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className="tab-nav">
          <button
            className={`tab-button ${viewMode === 'daily' ? 'active' : ''}`}
            onClick={() => setViewMode('daily')}
          >
            Daily Overview
          </button>
          <button
            className={`tab-button ${viewMode === 'hourly' ? 'active' : ''}`}
            onClick={() => setViewMode('hourly')}
          >
            Hourly Details
          </button>
        </div>
      </div>

      {viewMode === 'daily' ? (
        /* Daily Forecast Cards */
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
            gap: '16px'
          }}
        >
          {forecastDays.map((day) => (
            <div
              key={day.date}
              className="glass-card"
              onClick={() => {
                setSelectedDay(day);
                setViewMode('hourly');
              }}
              style={{
                padding: '20px',
                cursor: 'pointer',
                textAlign: 'center',
                border: selectedDay?.date === day.date 
                  ? '2px solid var(--accent-primary)' 
                  : '1px solid var(--glass-border)'
              }}
            >
              <p
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: 'var(--text-secondary)',
                  margin: 0,
                  marginBottom: '12px'
                }}
              >
                {formatDate(day.date, 'day')}
              </p>
              <p
                style={{
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  margin: 0,
                  marginBottom: '12px'
                }}
              >
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </p>
              
              <div style={{ width: '56px', height: '56px', margin: '0 auto 12px' }}>
                <WeatherIcon
                  code={day.hourly?.[12]?.weather_code || 113}
                  isDay={true}
                  size={56}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: '12px',
                  marginBottom: '12px'
                }}
              >
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {Math.round(day.maxtemp)}°
                </span>
                <span style={{ color: 'var(--text-tertiary)' }}>
                  {Math.round(day.mintemp)}°
                </span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                  fontSize: '0.8rem',
                  color: 'var(--text-tertiary)'
                }}
              >
                <div style={{ width: '14px', height: '14px' }}>
                  <DropletIcon />
                </div>
                {day.totalprecip || 0} {unitLabels.precip}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Hourly Forecast for Selected Day */
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
            <div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>
                Hourly Forecast
              </h3>
              <p style={{ margin: '4px 0 0', color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
                {formatDate(activeDay.date, 'full')}
              </p>
            </div>
            <button
              className="glass-button secondary"
              onClick={() => setViewMode('daily')}
              style={{ padding: '8px 16px', fontSize: '0.875rem' }}
            >
              Back to Daily
            </button>
          </div>

          {/* Day Selector */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '20px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}
          >
            {forecastDays.map((day) => (
              <button
                key={day.date}
                onClick={() => setSelectedDay(day)}
                style={{
                  padding: '8px 16px',
                  borderRadius: '20px',
                  border: 'none',
                  background: activeDay.date === day.date 
                    ? 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)' 
                    : 'var(--glass-bg)',
                  color: activeDay.date === day.date ? 'white' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  fontSize: '0.875rem',
                  fontWeight: 500,
                  whiteSpace: 'nowrap',
                  border: activeDay.date === day.date 
                    ? 'none' 
                    : '1px solid var(--glass-border)'
                }}
              >
                {formatDate(day.date, 'day')}
              </button>
            ))}
          </div>

          {/* Hourly Data */}
          <div
            style={{
              display: 'flex',
              gap: '12px',
              overflowX: 'auto',
              paddingBottom: '8px'
            }}
          >
            {hourlyData.length > 0 ? (
              hourlyData.map((hour, index) => (
                <div
                  key={index}
                  style={{
                    minWidth: '80px',
                    padding: '16px 12px',
                    background: 'var(--glass-bg)',
                    borderRadius: '12px',
                    textAlign: 'center',
                    border: '1px solid var(--glass-border)'
                  }}
                >
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: 'var(--text-tertiary)',
                      margin: 0,
                      marginBottom: '8px'
                    }}
                  >
                    {hour.time}
                  </p>
                  <div style={{ width: '40px', height: '40px', margin: '0 auto 8px' }}>
                    <WeatherIcon
                      code={hour.weather_code}
                      isDay={hour.is_day === 'yes'}
                      size={40}
                    />
                  </div>
                  <p
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      color: 'var(--text-primary)',
                      margin: 0,
                      marginBottom: '8px'
                    }}
                  >
                    {Math.round(hour.temperature)}°
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '2px',
                      fontSize: '0.7rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <div style={{ width: '10px', height: '10px' }}>
                      <DropletIcon />
                    </div>
                    {hour.precip || 0}%
                  </div>
                </div>
              ))
            ) : (
              <p style={{ color: 'var(--text-tertiary)', padding: '20px' }}>
                Hourly data not available for this day
              </p>
            )}
          </div>

          {/* Hourly Details Table */}
          {hourlyData.length > 0 && (
            <div style={{ marginTop: '24px', overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                    <th style={{ textAlign: 'left', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Time</th>
                    <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Temp</th>
                    <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Feels</th>
                    <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Wind</th>
                    <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Humidity</th>
                    <th style={{ textAlign: 'center', padding: '12px 8px', color: 'var(--text-tertiary)', fontWeight: 500 }}>Precip</th>
                  </tr>
                </thead>
                <tbody>
                  {hourlyData.slice(0, 12).map((hour, index) => (
                    <tr key={index} style={{ borderBottom: '1px solid var(--glass-border)' }}>
                      <td style={{ padding: '12px 8px', color: 'var(--text-secondary)' }}>{hour.time}</td>
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
                      <td style={{ padding: '12px 8px', textAlign: 'center', color: 'var(--text-tertiary)' }}>
                        {hour.precip || 0}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ForecastWeather;
