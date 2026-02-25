import React from 'react';
import { WeatherIcon, WindIcon, DropletIcon, PressureIcon, VisibilityIcon, UVIcon, ThermometerIcon } from './WeatherIcons';
import { formatDate, getUnitLabel } from '../services/weatherApi';

const CurrentWeather = ({ data, units = 'm' }) => {
  if (!data || !data.current) return null;

  const { current, location } = data;
  const unitLabels = getUnitLabel(units);

  const weatherDetails = [
    {
      icon: <WindIcon />,
      label: 'Wind',
      value: `${current.wind_speed} ${unitLabels.speed}`,
      subValue: current.wind_dir
    },
    {
      icon: <DropletIcon />,
      label: 'Humidity',
      value: `${current.humidity}%`,
      subValue: `Dew: ${current.dewpoint}${unitLabels.temp}`
    },
    {
      icon: <PressureIcon />,
      label: 'Pressure',
      value: `${current.pressure} ${unitLabels.pressure}`,
      subValue: current.pressure > 1013 ? 'Rising' : 'Falling'
    },
    {
      icon: <VisibilityIcon />,
      label: 'Visibility',
      value: `${current.visibility} km`,
      subValue: current.visibility > 10 ? 'Excellent' : 'Good'
    },
    {
      icon: <UVIcon />,
      label: 'UV Index',
      value: current.uv_index || 'N/A',
      subValue: getUVDescription(current.uv_index)
    },
    {
      icon: <ThermometerIcon />,
      label: 'Feels Like',
      value: `${current.feelslike}${unitLabels.temp}`,
      subValue: getFeelsLikeDiff(current.temperature, current.feelslike)
    }
  ];

  function getUVDescription(uv) {
    if (!uv && uv !== 0) return 'N/A';
    if (uv <= 2) return 'Low';
    if (uv <= 5) return 'Moderate';
    if (uv <= 7) return 'High';
    if (uv <= 10) return 'Very High';
    return 'Extreme';
  }

  function getFeelsLikeDiff(actual, feelsLike) {
    const diff = feelsLike - actual;
    if (Math.abs(diff) < 1) return 'Same';
    return diff > 0 ? `+${Math.round(diff)}° warmer` : `${Math.round(diff)}° cooler`;
  }

  const isDay = current.is_day === 'yes';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Main Weather Card */}
      <div className="glass-card" style={{ padding: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '24px'
          }}
        >
          {/* Location & Date */}
          <div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                margin: 0,
                marginBottom: '8px',
                color: 'var(--text-primary)'
              }}
            >
              {location.name}
            </h1>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--text-secondary)',
                margin: 0,
                marginBottom: '4px'
              }}
            >
              {location.region && `${location.region}, `}{location.country}
            </p>
            <p
              style={{
                fontSize: '0.875rem',
                color: 'var(--text-tertiary)',
                margin: 0
              }}
            >
              {formatDate(location.localtime, 'full')} • Local Time: {location.localtime.split(' ')[1]}
            </p>
          </div>

          {/* Weather Icon */}
          <div
            style={{
              width: '120px',
              height: '120px',
              animation: 'float 3s ease-in-out infinite'
            }}
          >
            <WeatherIcon
              code={current.weather_code}
              isDay={isDay}
              size={120}
            />
          </div>
        </div>

        {/* Temperature & Condition */}
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '16px',
            marginTop: '24px',
            marginBottom: '8px'
          }}
        >
          <span
            style={{
              fontSize: '5rem',
              fontWeight: 300,
              lineHeight: 1,
              background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {Math.round(current.temperature)}
          </span>
          <span
            style={{
              fontSize: '2rem',
              fontWeight: 300,
              color: 'var(--text-secondary)'
            }}
          >
            {unitLabels.temp}
          </span>
        </div>

        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-secondary)',
            margin: 0,
            marginBottom: '16px',
            textTransform: 'capitalize'
          }}
        >
          {current.weather_descriptions?.[0] || 'Unknown'}
        </p>

        {/* Additional Info */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
            flexWrap: 'wrap',
            paddingTop: '16px',
            borderTop: '1px solid var(--glass-border)'
          }}
        >
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            Lat: {location.lat}°
          </span>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            Lon: {location.lon}°
          </span>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            Timezone: {location.timezone_id}
          </span>
          <span style={{ color: 'var(--text-tertiary)', fontSize: '0.9rem' }}>
            UTC {location.utc_offset >= 0 ? '+' : ''}{location.utc_offset}
          </span>
        </div>
      </div>

      {/* Weather Details Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px'
        }}
      >
        {weatherDetails.map((detail, index) => (
          <div
            key={index}
            className="glass-card"
            style={{
              padding: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                flexShrink: 0
              }}
            >
              {detail.icon}
            </div>
            <div>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-tertiary)',
                  margin: 0,
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px'
                }}
              >
                {detail.label}
              </p>
              <p
                style={{
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  margin: 0,
                  marginBottom: '2px'
                }}
              >
                {detail.value}
              </p>
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--text-muted)',
                  margin: 0
                }}
              >
                {detail.subValue}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CurrentWeather;
