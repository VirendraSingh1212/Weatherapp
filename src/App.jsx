import { useState, useEffect, useCallback } from 'react';
import './index.css';

// Components
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterPanel';
import CurrentWeather from './components/CurrentWeather';
import ForecastWeather from './components/ForecastWeather';
import HistoricalWeather from './components/HistoricalWeather';
import MarineWeather from './components/MarineWeather';
import LocationLookup from './components/LocationLookup';

// Services
import { getCurrentWeather, getForecast } from './services/weatherApi';

function App() {
  // State
  const [searchQuery, setSearchQuery] = useState('New York');
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Filter State
  const [activeTab, setActiveTab] = useState('current');
  const [units, setUnits] = useState('m');
  const [forecastDays, setForecastDays] = useState(7);
  const [showFilters, setShowFilters] = useState(true);

  // Fetch current weather
  const fetchCurrentWeather = useCallback(async () => {
    if (!searchQuery) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getCurrentWeather(searchQuery, units);
      setCurrentWeather(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, units]);

  // Fetch forecast
  const fetchForecast = useCallback(async () => {
    if (!searchQuery) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const data = await getForecast(searchQuery, forecastDays, units);
      setForecastData(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch forecast data');
    } finally {
      setLoading(false);
    }
  }, [searchQuery, forecastDays, units]);

  // Initial load and when search/units change
  useEffect(() => {
    fetchCurrentWeather();
  }, [fetchCurrentWeather]);

  // Fetch forecast when tab is forecast or when dependencies change
  useEffect(() => {
    if (activeTab === 'forecast') {
      fetchForecast();
    }
  }, [activeTab, fetchForecast]);

  // Handle search
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  // Render content based on active tab
  const renderContent = () => {
    if (loading) {
      return (
        <div className="glass-card" style={{ padding: '60px', textAlign: 'center' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 20px',
              border: '3px solid var(--glass-border)',
              borderTopColor: 'var(--accent-primary)',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite'
            }}
          />
          <p style={{ color: 'var(--text-secondary)' }}>Loading weather data...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div
          className="glass-card"
          style={{
            padding: '40px',
            textAlign: 'center',
            border: '1px solid rgba(239, 68, 68, 0.3)',
            background: 'rgba(239, 68, 68, 0.05)'
          }}
        >
          <div
            style={{
              width: '48px',
              height: '48px',
              margin: '0 auto 16px',
              color: '#ef4444'
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h3 style={{ margin: '0 0 8px', color: '#ef4444' }}>Error Loading Data</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{error}</p>
          <button
            onClick={() => {
              setError(null);
              fetchCurrentWeather();
            }}
            className="glass-button"
            style={{ marginTop: '20px' }}
          >
            Try Again
          </button>
        </div>
      );
    }

    switch (activeTab) {
      case 'current':
        return currentWeather ? (
          <CurrentWeather data={currentWeather} units={units} />
        ) : null;
      
      case 'forecast':
        return forecastData ? (
          <ForecastWeather data={forecastData} units={units} />
        ) : null;
      
      case 'historical':
        return <HistoricalWeather location={searchQuery} units={units} />;
      
      case 'marine':
        return <MarineWeather location={searchQuery} units={units} />;
      
      case 'location':
        return <LocationLookup />;
      
      default:
        return null;
    }
  };

  return (
    <>
      {/* Background */}
      <div className="app-background" />
      
      {/* Main Container */}
      <div
        style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 24px',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Header />
        
        {/* Search Section */}
        <div style={{ marginBottom: '24px' }}>
          <SearchBar onSearch={handleSearch} initialValue={searchQuery} />
        </div>

        {/* Filters */}
        <div style={{ marginBottom: '24px' }}>
          <FilterPanel
            units={units}
            setUnits={setUnits}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            forecastDays={forecastDays}
            setForecastDays={setForecastDays}
            showFilters={showFilters}
            setShowFilters={setShowFilters}
          />
        </div>

        {/* Content */}
        <main style={{ flex: 1, paddingBottom: '40px' }}>
          {renderContent()}
        </main>

        {/* Footer */}
        <footer
          style={{
            padding: '24px 0',
            borderTop: '1px solid var(--glass-border)',
            marginTop: 'auto'
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '16px'
            }}
          >
            <p
              style={{
                margin: 0,
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}
            >
              Powered by Weatherstack API • Data provided by APILayer
            </p>
            <div
              style={{
                display: 'flex',
                gap: '16px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)'
              }}
            >
              <span>Current: {currentWeather?.current?.temperature !== undefined ? `${currentWeather.current.temperature}°` : '--'}</span>
              <span>•</span>
              <span>Humidity: {currentWeather?.current?.humidity !== undefined ? `${currentWeather.current.humidity}%` : '--'}</span>
              <span>•</span>
              <span>Wind: {currentWeather?.current?.wind_speed !== undefined ? `${currentWeather.current.wind_speed} km/h` : '--'}</span>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Styles for Loading Animation */}
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

export default App;
