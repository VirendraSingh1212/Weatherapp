import React from 'react';

const Header = () => {
  return (
    <header
      style={{
        padding: '24px 0',
        marginBottom: '24px'
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
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)'
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M17.5 19c0-1.7-1.3-3-3-3c-1.1 0-2.1.6-2.6 1.5c-.5-.9-1.5-1.5-2.6-1.5c-1.7 0-3 1.3-3 3" />
              <path d="M17.5 19H22v-5.5c0-1.5-1-2.7-2.5-2.7c-1.2 0-2.2.8-2.5 2" />
              <path d="M2 19h4.5" />
              <path d="M6.5 19v-7.5c0-1.5 1-2.7 2.5-2.7c1.2 0 2.2.8 2.5 2" />
              <circle cx="12" cy="5" r="2.5" />
            </svg>
          </div>
          <div>
            <h1
              style={{
                margin: 0,
                fontSize: '1.5rem',
                fontWeight: 700,
                background: 'linear-gradient(135deg, var(--text-primary) 0%, var(--accent-secondary) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              WeatherStack Pro
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: '0.8rem',
                color: 'var(--text-tertiary)',
                letterSpacing: '0.5px'
              }}
            >
              Global Weather Intelligence Platform
            </p>
          </div>
        </div>

        {/* Navigation / Status */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'var(--glass-bg)',
              borderRadius: '20px',
              border: '1px solid var(--glass-border)'
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#10b981',
                animation: 'pulse 2s ease-in-out infinite'
              }}
            />
            <span
              style={{
                fontSize: '0.8rem',
                color: 'var(--text-secondary)'
              }}
            >
              API Connected
            </span>
          </div>

          <a
            href="https://weatherstack.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              padding: '8px 16px',
              background: 'var(--glass-bg)',
              border: '1px solid var(--glass-border)',
              borderRadius: '8px',
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: '0.85rem',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--glass-bg-hover)';
              e.currentTarget.style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'var(--glass-bg)';
              e.currentTarget.style.color = 'var(--text-secondary)';
            }}
          >
            Documentation
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;
