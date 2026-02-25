import React, { useState, useEffect, useRef, useCallback } from 'react';
import { searchLocations } from '../services/weatherApi';
import { SearchIcon, LocationIcon, CloseIcon } from './WeatherIcons';

const SearchBar = ({ onSearch, initialValue = '' }) => {
  const [query, setQuery] = useState(initialValue);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState(() => {
    const saved = localStorage.getItem('recentSearches');
    return saved ? JSON.parse(saved) : [];
  });
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceTimer = useRef(null);

  // Save recent searches to localStorage
  useEffect(() => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Debounced search for suggestions
  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      const data = await searchLocations(searchQuery);
      if (data.results) {
        setSuggestions(data.results.slice(0, 5));
      } else {
        setSuggestions([]);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      setSuggestions([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    setShowSuggestions(true);

    // Clear existing timer
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Set new timer
    debounceTimer.current = setTimeout(() => {
      fetchSuggestions(value);
    }, 300);
  };

  const handleSearch = (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    onSearch(searchQuery);
    setQuery(searchQuery);
    setShowSuggestions(false);
    
    // Add to recent searches
    setRecentSearches(prev => {
      const filtered = prev.filter(s => s.toLowerCase() !== searchQuery.toLowerCase());
      return [searchQuery, ...filtered].slice(0, 5);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(query);
  };

  const handleSuggestionClick = (suggestion) => {
    const locationName = suggestion.name;
    handleSearch(locationName);
  };

  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
    inputRef.current?.focus();
  };

  const removeRecentSearch = (e, searchToRemove) => {
    e.stopPropagation();
    setRecentSearches(prev => prev.filter(s => s !== searchToRemove));
  };

  const getFlagEmoji = (countryCode) => {
    if (!countryCode) return '';
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };

  return (
    <div ref={containerRef} style={{ position: 'relative', width: '100%' }}>
      <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
        <div
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <div
            style={{
              position: 'absolute',
              left: '16px',
              width: '20px',
              height: '20px',
              color: 'var(--text-tertiary)',
              zIndex: 1
            }}
          >
            <SearchIcon />
          </div>
          
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setShowSuggestions(true)}
            placeholder="Search for a city, region, or coordinates..."
            className="glass-input"
            style={{
              paddingLeft: '48px',
              paddingRight: query ? '48px' : '16px',
              height: '52px',
              fontSize: '1rem'
            }}
          />
          
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              style={{
                position: 'absolute',
                right: '16px',
                width: '20px',
                height: '20px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-tertiary)',
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div
          className="glass-card"
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 100,
            maxHeight: '400px',
            overflowY: 'auto',
            padding: '8px 0'
          }}
        >
          {isLoading ? (
            <div
              style={{
                padding: '16px 20px',
                color: 'var(--text-tertiary)',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}
            >
              Searching locations...
            </div>
          ) : suggestions.length > 0 ? (
            <>
              <div
                style={{
                  padding: '8px 20px',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text-muted)'
                }}
              >
                Suggestions
              </div>
              {suggestions.map((suggestion, index) => (
                <button
                  key={`${suggestion.name}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                    color: 'var(--text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--glass-bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--glass-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.2rem'
                    }}
                  >
                    {getFlagEmoji(suggestion.country_code)}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>
                      {suggestion.name}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
                      {suggestion.region}{suggestion.region ? ', ' : ''}{suggestion.country}
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-muted)' }}>
                    <LocationIcon />
                  </div>
                </button>
              ))}
            </>
          ) : query.length >= 2 ? (
            <div
              style={{
                padding: '16px 20px',
                color: 'var(--text-tertiary)',
                textAlign: 'center',
                fontSize: '0.9rem'
              }}
            >
              No locations found
            </div>
          ) : null}

          {/* Recent Searches */}
          {!query && recentSearches.length > 0 && (
            <>
              <div
                style={{
                  padding: '8px 20px',
                  marginTop: suggestions.length > 0 ? '8px' : 0,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  color: 'var(--text-muted)'
                }}
              >
                Recent Searches
              </div>
              {recentSearches.map((search, index) => (
                <button
                  key={search}
                  onClick={() => handleSearch(search)}
                  style={{
                    width: '100%',
                    padding: '12px 20px',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    textAlign: 'left',
                    transition: 'background 0.15s ease',
                    color: 'var(--text-primary)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'var(--glass-bg-hover)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      background: 'var(--glass-bg)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-tertiary)'
                    }}
                  >
                    <ClockIcon />
                  </div>
                  <div style={{ flex: 1, fontWeight: 500, fontSize: '0.95rem' }}>
                    {search}
                  </div>
                  <button
                    onClick={(e) => removeRecentSearch(e, search)}
                    style={{
                      width: '24px',
                      height: '24px',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      padding: 0,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '4px'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--glass-bg)';
                      e.currentTarget.style.color = 'var(--text-secondary)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--text-muted)';
                    }}
                  >
                    <CloseIcon />
                  </button>
                </button>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

// Clock icon component for recent searches
const ClockIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

export default SearchBar;
