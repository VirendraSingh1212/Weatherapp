// Use environment variable for API key, fallback to hardcoded for development
const API_KEY = import.meta.env.VITE_WEATHERSTACK_API_KEY || 'fd2e1dab64862c77bd1e60f96a6678e8';

// Detect if we're in production (Vercel) or development
const isProduction = import.meta.env.PROD;

// In production, use the Vercel serverless proxy
// In development, call the API directly
const BASE_URL = isProduction ? '/api/weather' : 'http://api.weatherstack.com';

// Helper function to make API requests
const fetchWeatherData = async (endpoint, params = {}) => {
  let url;
  
  if (isProduction) {
    // Use Vercel serverless proxy
    const queryParams = new URLSearchParams({
      endpoint,
      ...params
    });
    url = `${BASE_URL}?${queryParams}`;
  } else {
    // Direct API call for development
    const queryParams = new URLSearchParams({
      access_key: API_KEY,
      ...params
    });
    url = `${BASE_URL}/${endpoint}?${queryParams}`;
  }
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.info || 'Weather API error');
    }
    
    return data;
  } catch (error) {
    console.error('Weather API Error:', error);
    throw error;
  }
};

// Get current weather for a location
export const getCurrentWeather = async (query, units = 'm') => {
  return fetchWeatherData('current', {
    query,
    units
  });
};

// Get weather forecast
export const getForecast = async (query, days = 7, units = 'm') => {
  return fetchWeatherData('forecast', {
    query,
    forecast_days: days,
    units,
    hourly: 1
  });
};

// Get historical weather data
export const getHistoricalWeather = async (query, historicalDate, units = 'm') => {
  return fetchWeatherData('historical', {
    query,
    historical_date: historicalDate,
    units,
    hourly: 1
  });
};

// Get marine weather data
export const getMarineWeather = async (query, units = 'm') => {
  return fetchWeatherData('marine', {
    query,
    units
  });
};

// Location autocomplete/search
export const searchLocations = async (query) => {
  return fetchWeatherData('locations', {
    query
  });
};

// Get weather for multiple locations (bulk request)
export const getBulkWeather = async (queries, units = 'm') => {
  const queryString = queries.join(';');
  return fetchWeatherData('current', {
    query: queryString,
    units
  });
};

// Helper to get weather icon based on code
export const getWeatherIcon = (code, isDay = true) => {
  // Weather condition codes from Weatherstack
  const iconMap = {
    // Sunny/Clear
    113: { day: 'sun', night: 'moon', color: '#fbbf24' },
    // Partly cloudy
    116: { day: 'cloud-sun', night: 'cloud-moon', color: '#94a3b8' },
    // Cloudy
    119: { day: 'cloud', night: 'cloud', color: '#94a3b8' },
    // Overcast
    122: { day: 'cloud', night: 'cloud', color: '#64748b' },
    // Mist/Fog
    143: { day: 'fog', night: 'fog', color: '#94a3b8' },
    // Patchy rain
    176: { day: 'cloud-rain', night: 'cloud-rain', color: '#60a5fa' },
    179: { day: 'cloud-snow', night: 'cloud-snow', color: '#e2e8f0' },
    // Thundery
    200: { day: 'cloud-lightning', night: 'cloud-lightning', color: '#a78bfa' },
    // Rain
    266: { day: 'cloud-rain', night: 'cloud-rain', color: '#60a5fa' },
    281: { day: 'cloud-rain', night: 'cloud-rain', color: '#60a5fa' },
    284: { day: 'cloud-rain', night: 'cloud-rain', color: '#60a5fa' },
    293: { day: 'cloud-rain', night: 'cloud-rain', color: '#60a5fa' },
    296: { day: 'cloud-rain', night: 'cloud-rain', color: '#60a5fa' },
    299: { day: 'cloud-rain', night: 'cloud-rain', color: '#60a5fa' },
    302: { day: 'cloud-rain', night: 'cloud-rain', color: '#3b82f6' },
    305: { day: 'cloud-rain', night: 'cloud-rain', color: '#3b82f6' },
    308: { day: 'cloud-rain', night: 'cloud-rain', color: '#2563eb' },
    // Snow
    227: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    230: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    323: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    326: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    329: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    332: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    335: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    338: { day: 'snowflake', night: 'snowflake', color: '#e2e8f0' },
    // Sleet
    182: { day: 'cloud-sleet', night: 'cloud-sleet', color: '#94a3b8' },
    185: { day: 'cloud-sleet', night: 'cloud-sleet', color: '#94a3b8' },
    281: { day: 'cloud-sleet', night: 'cloud-sleet', color: '#94a3b8' },
    284: { day: 'cloud-sleet', night: 'cloud-sleet', color: '#94a3b8' },
    // Hail/Thunder
    185: { day: 'cloud-hail', night: 'cloud-hail', color: '#a78bfa' },
    386: { day: 'cloud-lightning', night: 'cloud-lightning', color: '#a78bfa' },
    389: { day: 'cloud-lightning', night: 'cloud-lightning', color: '#a78bfa' },
    392: { day: 'cloud-lightning', night: 'cloud-lightning', color: '#a78bfa' },
    395: { day: 'cloud-lightning', night: 'cloud-lightning', color: '#a78bfa' },
  };
  
  const iconData = iconMap[code] || { day: 'cloud', night: 'cloud', color: '#94a3b8' };
  return {
    icon: isDay ? iconData.day : iconData.night,
    color: iconData.color
  };
};

// Format date helper
export const formatDate = (dateString, format = 'full') => {
  const date = new Date(dateString);
  const options = {
    full: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' },
    short: { weekday: 'short', month: 'short', day: 'numeric' },
    time: { hour: '2-digit', minute: '2-digit' },
    day: { weekday: 'short' }
  };
  
  return date.toLocaleDateString('en-US', options[format] || options.full);
};

// Convert temperature between units
export const convertTemp = (temp, fromUnit, toUnit) => {
  if (fromUnit === toUnit) return temp;
  
  let celsius;
  // Convert to Celsius first
  if (fromUnit === 'f') {
    celsius = (temp - 32) * 5 / 9;
  } else if (fromUnit === 's') {
    celsius = temp; // Scientific is Kelvin, but weatherstack uses metric as base
  } else {
    celsius = temp;
  }
  
  // Convert from Celsius to target
  if (toUnit === 'f') {
    return Math.round(celsius * 9 / 5 + 32);
  } else if (toUnit === 's') {
    return Math.round(celsius + 273.15);
  }
  
  return Math.round(celsius);
};

// Get unit label
export const getUnitLabel = (unit) => {
  const labels = {
    m: { temp: '°C', speed: 'km/h', pressure: 'mb', precip: 'mm' },
    f: { temp: '°F', speed: 'mph', pressure: 'mb', precip: 'in' },
    s: { temp: 'K', speed: 'km/h', pressure: 'mb', precip: 'mm' }
  };
  return labels[unit] || labels.m;
};
