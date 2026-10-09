import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavbarProps {
  username?: string;
  profilePic?: string;
}

const Navbar: React.FC<NavbarProps> = ({ username, profilePic }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '#home' },
    { name: 'Shop', path: '#shop' },
    { name: 'Featured', path: '#featured' },
    { name: 'Deals', path: '#deals' },
    { name: 'About', path: '#about' },
  ];

  const displayName = username && username.trim() !== '' ? username : 'Guest';

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    if (path.startsWith('#')) {
      e.preventDefault();
      if (location.pathname !== '/') {
        window.location.href = '/' + path;
        return;
      }
      const el = document.querySelector(path);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: '#ffffff', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)' }}>
      {/* Top Banner Bar with INR details */}
      <div
        style={{
          background: 'linear-gradient(90deg, #3730a3 0%, #4f46e5 50%, #7c3aed 100%)',
          color: '#ffffff',
          fontSize: '12px',
          fontWeight: 500,
          padding: '7px 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          letterSpacing: '0.3px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ backgroundColor: '#f43f5e', padding: '2px 8px', borderRadius: '12px', fontSize: '10px', fontWeight: 700, textTransform: 'uppercase' }}>Flash Sale</span>
          <span>⚡ Up to 50% off top gadgets & sports • Free delivery on orders over ₹999 across India!</span>
          <a
            href="#deals"
            onClick={(e) => handleNavClick(e, '#deals')}
            style={{ opacity: 0.95, textDecoration: 'underline', cursor: 'pointer', marginLeft: '6px', fontWeight: 700, color: '#fef08a' }}
          >
            Shop Now →
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      <nav
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          padding: '14px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        {/* Brand Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              fontSize: '22px',
              fontWeight: 800,
              boxShadow: '0 6px 14px rgba(79, 70, 229, 0.35)',
            }}
          >
            ⚡
          </div>
          <div>
            <span
              style={{
                fontSize: '22px',
                fontWeight: 800,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(135deg, #1e1b4b 0%, #4338ca 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                lineHeight: 1,
              }}
            >
              SwashStore
            </span>
            <span style={{ fontSize: '10px', color: '#94a3b8', fontWeight: 600, letterSpacing: '1px', textTransform: 'uppercase' }}>
              India • In INR (₹)
            </span>
          </div>
        </Link>

        {/* Navigation Links with Smooth Scroll Handlers */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.path}
              onClick={(e) => handleNavClick(e, link.path)}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#334155',
                transition: 'color 0.2s, transform 0.2s',
                position: 'relative',
                padding: '6px 0',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#4f46e5')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#334155')}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Search Bar */}
        <div
          style={{
            flex: '1',
            maxWidth: '360px',
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#f1f5f9',
            borderRadius: '999px',
            padding: '8px 16px',
            gap: '10px',
            border: '1px solid transparent',
            transition: 'all 0.2s',
          }}
          onFocusCapture={(e) => (e.currentTarget.style.borderColor = '#6366f1')}
          onBlurCapture={(e) => (e.currentTarget.style.borderColor = 'transparent')}
        >
          <span style={{ color: '#94a3b8', fontSize: '16px' }}>🔍</span>
          <input
            type="text"
            placeholder="Search phones, laptops, watches in ₹..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              border: 'none',
              background: 'transparent',
              width: '100%',
              fontSize: '13px',
              color: '#1e293b',
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', color: '#94a3b8', fontSize: '12px' }}
            >
              ✕
            </button>
          )}
        </div>

        {/* Right Actions: Currency Pill, Wishlist, Cart & User Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          {/* Currency indicator badge */}
          <span
            style={{
              backgroundColor: '#e0e7ff',
              color: '#4338ca',
              fontSize: '11px',
              fontWeight: 800,
              padding: '4px 10px',
              borderRadius: '999px',
              border: '1px solid #c7d2fe',
            }}
          >
            ₹ INR
          </span>

          {/* Wishlist Button */}
          <a
            href="#featured"
            onClick={(e) => handleNavClick(e, '#featured')}
            title="Wishlist"
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#fee2e2')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
          >
            🤍
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#f43f5e',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              3
            </span>
          </a>

          {/* Cart Button */}
          <a
            href="#deals"
            onClick={(e) => handleNavClick(e, '#deals')}
            title="Cart"
            style={{
              position: 'relative',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              transition: 'background 0.2s',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e7ff')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
          >
            🛍️
            <span
              style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                backgroundColor: '#4f46e5',
                color: '#fff',
                fontSize: '10px',
                fontWeight: 700,
                width: '18px',
                height: '18px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              2
            </span>
          </a>

          {/* Divider */}
          <div style={{ width: '1px', height: '28px', backgroundColor: '#e2e8f0' }} />

          {/* User Profile Pill */}
          <Link
            to="/user/login"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px 6px 8px',
              borderRadius: '999px',
              backgroundColor: '#f8fafc',
              border: '1px solid #e2e8f0',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#c7d2fe';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e2e8f0';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <div style={{ position: 'relative' }}>
              <img
                src={profilePic}
                alt={displayName}
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  display: 'block',
                  border: '2px solid #6366f1',
                }}
              />
              <span
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '0',
                  width: '9px',
                  height: '9px',
                  backgroundColor: '#10b981',
                  borderRadius: '50%',
                  border: '1.5px solid #fff',
                }}
              />
            </div>
            <div style={{ textAlign: 'left', lineHeight: 1.2 }}>
              <span style={{ fontSize: '10px', color: '#94a3b8', display: 'block' }}>Welcome</span>
              <span style={{ fontSize: '13px', fontWeight: 700, color: '#1e293b' }}>
                {displayName}
              </span>
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;