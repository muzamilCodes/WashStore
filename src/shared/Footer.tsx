import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer
      style={{
        backgroundColor: '#0f172a',
        color: '#94a3b8',
        padding: '60px 24px 30px',
        borderTop: '1px solid #1e293b',
        marginTop: '60px',
      }}
    >
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          paddingBottom: '50px',
          borderBottom: '1px solid #1e293b',
        }}
      >
        {/* Brand Info */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '10px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: 800,
              }}
            >
              ⚡
            </div>
            <span style={{ fontSize: '20px', fontWeight: 800, color: '#ffffff' }}>SwashStore</span>
          </div>
          <p style={{ fontSize: '14px', lineHeight: 1.6, color: '#64748b', marginBottom: '20px' }}>
            Your premium destination for high-end electronics, athletic essentials, and curated modern tech.
          </p>
          <div style={{ display: 'flex', gap: '12px' }}>
            {['Twitter', 'Instagram', 'GitHub', 'LinkedIn'].map((platform) => (
              <span
                key={platform}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '8px',
                  backgroundColor: '#1e293b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  color: '#cbd5e1',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#4f46e5')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1e293b')}
              >
                {platform[0]}
              </span>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Shop & Browse</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><a href="#deals" style={{ color: '#94a3b8' }}>On Sale Deals</a></li>
            <li><a href="#featured" style={{ color: '#94a3b8' }}>Featured Electronics</a></li>
            <li><a href="#categories" style={{ color: '#94a3b8' }}>Smart Wearables</a></li>
            <li><a href="#categories" style={{ color: '#94a3b8' }}>Athletic Equipment</a></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Customer Support</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14px' }}>
            <li><a href="#" style={{ color: '#94a3b8' }}>Track Your Order</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Shipping Policy</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>Returns & Exchanges</a></li>
            <li><a href="#" style={{ color: '#94a3b8' }}>FAQ & Help Center</a></li>
          </ul>
        </div>

        {/* Newsletter Subscription */}
        <div>
          <h4 style={{ color: '#ffffff', fontSize: '15px', fontWeight: 700, marginBottom: '16px' }}>Stay In The Loop</h4>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '14px' }}>
            Subscribe to get special discounts, free giveaways, and once-in-a-lifetime deals.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <input
              type="email"
              placeholder="Enter your email"
              style={{
                backgroundColor: '#1e293b',
                border: '1px solid #334155',
                color: '#ffffff',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                flex: 1,
              }}
            />
            <button
              style={{
                backgroundColor: '#4f46e5',
                color: '#ffffff',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 700,
              }}
            >
              Join
            </button>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '13px',
        }}
      >
        <p>© 2026 SwashStore. All rights reserved. Designed with modern aesthetics.</p>
        <div style={{ display: 'flex', gap: '20px' }}>
          <a href="#" style={{ color: '#64748b' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#64748b' }}>Terms of Service</a>
          <a href="#" style={{ color: '#64748b' }}>Cookie Settings</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
