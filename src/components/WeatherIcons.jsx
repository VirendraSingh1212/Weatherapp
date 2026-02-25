import React from 'react';

const iconStyle = {
  width: '100%',
  height: '100%',
  display: 'block'
};

export const SunIcon = ({ color = '#fbbf24' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <circle cx="32" cy="32" r="14" fill={color} />
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      <line x1="32" y1="4" x2="32" y2="12" />
      <line x1="32" y1="52" x2="32" y2="60" />
      <line x1="4" y1="32" x2="12" y2="32" />
      <line x1="52" y1="32" x2="60" y2="32" />
      <line x1="12.2" y1="12.2" x2="17.8" y2="17.8" />
      <line x1="46.2" y1="46.2" x2="51.8" y2="51.8" />
      <line x1="12.2" y1="51.8" x2="17.8" y2="46.2" />
      <line x1="46.2" y1="17.8" x2="51.8" y2="12.2" />
    </g>
  </svg>
);

export const MoonIcon = ({ color = '#e2e8f0' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M46 36.5C46 47.8 36.8 57 25.5 57 23.5 57 21.5 56.7 19.7 56.2 26.5 53.2 31 46.5 31 38.8 31 29.2 24.3 21.2 15.3 19.5 17.2 14.8 22 11.5 27.5 11.5 38.8 11.5 46 22.7 46 36.5Z"
      fill={color}
    />
  </svg>
);

export const CloudIcon = ({ color = '#94a3b8' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M48 46H16C11.6 46 8 42.4 8 38C8 34.2 10.7 31.1 14.3 30.3C14.9 24.3 20 19.5 26 19.5C29.3 19.5 32.3 20.9 34.4 23.1C36.3 21.4 38.8 20.5 41.5 20.5C47.9 20.5 53.2 25.5 53.5 31.8C57.1 32.6 60 35.7 60 39.5C60 43.1 56.9 46 53 46H48Z"
      fill={color}
      opacity="0.9"
    />
  </svg>
);

export const CloudSunIcon = ({ sunColor = '#fbbf24', cloudColor = '#94a3b8' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <circle cx="22" cy="22" r="10" fill={sunColor} />
    <g stroke={sunColor} strokeWidth="2" strokeLinecap="round">
      <line x1="22" y1="4" x2="22" y2="8" />
      <line x1="22" y1="36" x2="22" y2="40" />
      <line x1="4" y1="22" x2="8" y2="22" />
      <line x1="36" y1="22" x2="40" y2="22" />
    </g>
    <path
      d="M50 48H24C20.7 48 18 45.3 18 42C18 39.2 20 36.8 22.7 36.2C23.2 31.8 26.8 28.2 31.2 28.2C33.6 28.2 35.8 29.2 37.4 30.8C38.8 29.5 40.6 28.8 42.5 28.8C47.3 28.8 51.2 32.5 51.4 37.2C54 37.8 56 40.2 56 43C56 45.8 53.3 48 50 48Z"
      fill={cloudColor}
    />
  </svg>
);

export const CloudMoonIcon = ({ moonColor = '#e2e8f0', cloudColor = '#94a3b8' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M24 24C24 32.8 17.3 40 8.5 40 7.2 40 5.9 39.8 4.7 39.5 9.3 37.5 12.3 32.8 12.3 27.5 12.3 21.2 7.8 15.8 1.5 14.5 2.8 11.2 6 9 10 9 17.2 9 24 15.8 24 24Z"
      fill={moonColor}
    />
    <path
      d="M54 46H28C24.7 46 22 43.3 22 40C22 37.2 24 34.8 26.7 34.2C27.2 29.8 30.8 26.2 35.2 26.2C37.6 26.2 39.8 27.2 41.4 28.8C42.8 27.5 44.6 26.8 46.5 26.8C51.3 26.8 55.2 30.5 55.4 35.2C58 35.8 60 38.2 60 41C60 43.8 57.3 46 54 46Z"
      fill={cloudColor}
    />
  </svg>
);

export const RainIcon = ({ cloudColor = '#64748b', rainColor = '#60a5fa' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M48 36H16C11.6 36 8 32.4 8 28C8 24.2 10.7 21.1 14.3 20.3C14.9 14.3 20 9.5 26 9.5C29.3 9.5 32.3 10.9 34.4 13.1C36.3 11.4 38.8 10.5 41.5 10.5C47.9 10.5 53.2 15.5 53.5 21.8C57.1 22.6 60 25.7 60 29.5C60 33.1 56.9 36 53 36H48Z"
      fill={cloudColor}
    />
    <g stroke={rainColor} strokeWidth="2.5" strokeLinecap="round">
      <line x1="20" y1="42" x2="17" y2="52">
        <animate attributeName="y1" values="42;46;42" dur="1s" repeatCount="indefinite" />
        <animate attributeName="y2" values="52;56;52" dur="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
      </line>
      <line x1="32" y1="42" x2="29" y2="52">
        <animate attributeName="y1" values="42;46;42" dur="1s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="y2" values="52;56;52" dur="1s" begin="0.3s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="1s" begin="0.3s" repeatCount="indefinite" />
      </line>
      <line x1="44" y1="42" x2="41" y2="52">
        <animate attributeName="y1" values="42;46;42" dur="1s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="y2" values="52;56;52" dur="1s" begin="0.6s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="1s" begin="0.6s" repeatCount="indefinite" />
      </line>
    </g>
  </svg>
);

export const SnowIcon = ({ color = '#e2e8f0' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M48 36H16C11.6 36 8 32.4 8 28C8 24.2 10.7 21.1 14.3 20.3C14.9 14.3 20 9.5 26 9.5C29.3 9.5 32.3 10.9 34.4 13.1C36.3 11.4 38.8 10.5 41.5 10.5C47.9 10.5 53.2 15.5 53.5 21.8C57.1 22.6 60 25.7 60 29.5C60 33.1 56.9 36 53 36H48Z"
      fill="#64748b"
    />
    <g fill={color}>
      <circle cx="20" cy="46" r="2.5">
        <animate attributeName="cy" values="42;54;42" dur="2s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="2s" repeatCount="indefinite" />
      </circle>
      <circle cx="32" cy="48" r="2.5">
        <animate attributeName="cy" values="44;56;44" dur="2s" begin="0.5s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </circle>
      <circle cx="44" cy="46" r="2.5">
        <animate attributeName="cy" values="42;54;42" dur="2s" begin="1s" repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0;1" dur="2s" begin="1s" repeatCount="indefinite" />
      </circle>
    </g>
  </svg>
);

export const LightningIcon = ({ cloudColor = '#64748b', boltColor = '#fbbf24' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M48 34H16C11.6 34 8 30.4 8 26C8 22.2 10.7 19.1 14.3 18.3C14.9 12.3 20 7.5 26 7.5C29.3 7.5 32.3 8.9 34.4 11.1C36.3 9.4 38.8 8.5 41.5 8.5C47.9 8.5 53.2 13.5 53.5 19.8C57.1 20.6 60 23.7 60 27.5C60 31.1 56.9 34 53 34H48Z"
      fill={cloudColor}
    />
    <path
      d="M34 32L24 46H32L28 58L42 42H32L34 32Z"
      fill={boltColor}
    >
      <animate attributeName="opacity" values="1;0.3;1" dur="0.5s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const FogIcon = ({ color = '#94a3b8' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      <line x1="8" y1="20" x2="56" y2="20" opacity="0.6" />
      <line x1="12" y1="28" x2="52" y2="28" opacity="0.8" />
      <line x1="8" y1="36" x2="56" y2="36" />
      <line x1="12" y1="44" x2="52" y2="44" opacity="0.8" />
      <line x1="8" y1="52" x2="56" y2="52" opacity="0.6" />
    </g>
  </svg>
);

export const WindIcon = ({ color = '#94a3b8' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <g stroke={color} strokeWidth="3" strokeLinecap="round" fill="none">
      <path d="M8 24H40C45.5 24 50 28.5 50 34C50 39.5 45.5 44 40 44">
        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" repeatCount="indefinite" />
      </path>
      <path d="M8 36H32C35.3 36 38 38.7 38 42C38 45.3 35.3 48 32 48">
        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" begin="0.5s" repeatCount="indefinite" />
      </path>
      <path d="M8 48H24C26.2 48 28 49.8 28 52C28 54.2 26.2 56 24 56">
        <animate attributeName="stroke-dasharray" values="0,100;100,0" dur="2s" begin="1s" repeatCount="indefinite" />
      </path>
    </g>
  </svg>
);

export const DropletIcon = ({ color = '#60a5fa' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M32 8C32 8 16 28 16 40C16 48.8 23.2 56 32 56C40.8 56 48 48.8 48 40C48 28 32 8 32 8Z"
      fill={color}
      opacity="0.8"
    />
  </svg>
);

export const ThermometerIcon = ({ color = '#ef4444' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <rect x="24" y="8" width="16" height="40" rx="8" fill="none" stroke={color} strokeWidth="3" />
    <circle cx="32" cy="48" r="12" fill={color} />
    <rect x="28" y="16" width="8" height="24" rx="4" fill={color} />
  </svg>
);

export const PressureIcon = ({ color = '#94a3b8' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <circle cx="32" cy="32" r="24" fill="none" stroke={color} strokeWidth="3" />
    <line x1="32" y1="32" x2="32" y2="16" stroke={color} strokeWidth="3" strokeLinecap="round">
      <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="4s" repeatCount="indefinite" />
    </line>
    <circle cx="32" cy="32" r="4" fill={color} />
  </svg>
);

export const VisibilityIcon = ({ color = '#10b981' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M32 16C20 16 10 24 6 32C10 40 20 48 32 48C44 48 54 40 58 32C54 24 44 16 32 16Z"
      fill="none"
      stroke={color}
      strokeWidth="3"
    />
    <circle cx="32" cy="32" r="10" fill="none" stroke={color} strokeWidth="3" />
    <circle cx="32" cy="32" r="4" fill={color} />
  </svg>
);

export const UVIcon = ({ color = '#f59e0b' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <circle cx="32" cy="32" r="12" fill={color} />
    <g stroke={color} strokeWidth="3" strokeLinecap="round">
      <line x1="32" y1="8" x2="32" y2="14" />
      <line x1="32" y1="50" x2="32" y2="56" />
      <line x1="8" y1="32" x2="14" y2="32" />
      <line x1="50" y1="32" x2="56" y2="32" />
      <line x1="14.1" y1="14.1" x2="18.4" y2="18.4" />
      <line x1="45.6" y1="45.6" x2="49.9" y2="49.9" />
      <line x1="14.1" y1="49.9" x2="18.4" y2="45.6" />
      <line x1="45.6" y1="18.4" x2="49.9" y2="14.1" />
    </g>
  </svg>
);

export const SearchIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

export const LocationIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const CalendarIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);

export const ClockIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export const ArrowRightIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);

export const FilterIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

export const MenuIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
);

export const CloseIcon = ({ color = 'currentColor' }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={iconStyle}>
    <path d="M18 6 6 18" />
    <path d="m6 6 12 12" />
  </svg>
);

export const WaveIcon = ({ color = '#06b6d4' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M4 32C12 24 20 40 28 32C36 24 44 40 52 32C60 24 68 40 76 32"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    >
      <animate attributeName="d" 
        values="M4 32C12 24 20 40 28 32C36 24 44 40 52 32C60 24 68 40 76 32;
                M4 32C12 40 20 24 28 32C36 40 44 24 52 32C60 40 68 24 76 32;
                M4 32C12 24 20 40 28 32C36 24 44 40 52 32C60 24 68 40 76 32"
        dur="3s"
        repeatCount="indefinite"
      />
    </path>
    <path
      d="M4 44C12 36 20 52 28 44C36 36 44 52 52 44C60 36 68 52 76 44"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
      opacity="0.6"
    >
      <animate attributeName="d" 
        values="M4 44C12 36 20 52 28 44C36 36 44 52 52 44C60 36 68 52 76 44;
                M4 44C12 52 20 36 28 44C36 52 44 36 52 44C60 52 68 36 76 44;
                M4 44C12 36 20 52 28 44C36 36 44 52 52 44C60 36 68 52 76 44"
        dur="3s"
        begin="0.5s"
        repeatCount="indefinite"
      />
    </path>
  </svg>
);

export const CompassIcon = ({ color = '#10b981' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <circle cx="32" cy="32" r="28" fill="none" stroke={color} strokeWidth="3" />
    <path
      d="M32 8L36 20H28L32 8Z"
      fill={color}
    />
    <path
      d="M32 56L28 44H36L32 56Z"
      fill={color}
      opacity="0.5"
    />
    <path
      d="M42 32L20 42L24 32L20 22L42 32Z"
      fill={color}
    >
      <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite" />
    </path>
  </svg>
);

export const HumidityIcon = ({ color = '#60a5fa' }) => (
  <svg viewBox="0 0 64 64" style={iconStyle}>
    <path
      d="M32 8C32 8 16 28 16 40C16 48.8 23.2 56 32 56C40.8 56 48 48.8 48 40C48 28 32 8 32 8Z"
      fill={color}
      opacity="0.3"
    />
    <path
      d="M32 16C32 16 22 30 22 38C22 44.6 26.4 50 32 50"
      fill="none"
      stroke={color}
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

// Weather icon mapper component
export const WeatherIcon = ({ code, isDay = true, size = 64 }) => {
  const iconMap = {
    113: isDay ? SunIcon : MoonIcon,
    116: isDay ? CloudSunIcon : CloudMoonIcon,
    119: CloudIcon,
    122: CloudIcon,
    143: FogIcon,
    176: RainIcon,
    179: SnowIcon,
    200: LightningIcon,
    266: RainIcon,
    281: RainIcon,
    284: RainIcon,
    293: RainIcon,
    296: RainIcon,
    299: RainIcon,
    302: RainIcon,
    305: RainIcon,
    308: RainIcon,
    227: SnowIcon,
    230: SnowIcon,
    323: SnowIcon,
    326: SnowIcon,
    329: SnowIcon,
    332: SnowIcon,
    335: SnowIcon,
    338: SnowIcon,
    182: RainIcon,
    185: RainIcon,
    386: LightningIcon,
    389: LightningIcon,
    392: LightningIcon,
    395: LightningIcon,
  };
  
  const IconComponent = iconMap[code] || CloudIcon;
  
  return (
    <div style={{ width: size, height: size }}>
      <IconComponent />
    </div>
  );
};

export default WeatherIcon;
