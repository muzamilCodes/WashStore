import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)',
        color: '#ffffff',
        padding: '70px 24px 60px',
      }}
    >
      {/* Decorative background blurs */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124, 58, 237, 0.35) 0%, rgba(79, 70, 229, 0) 70%)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '-15%',
          left: '10%',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(236, 72, 153, 0.2) 0%, rgba(79, 70, 229, 0) 70%)',
          pointerEvents: 'none',
        }}
      />

      <div
        style={{
          maxWidth: '1360px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          alignItems: 'center',
          gap: '50px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Left Column: Text & CTA */}
        <div>
          {/* Badge */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 16px',
              borderRadius: '999px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              marginBottom: '20px',
            }}
          >
            <span style={{ fontSize: '14px' }}>⚡</span>
            <span
              style={{
                fontSize: '12px',
                fontWeight: 700,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: '#a5b4fc',
              }}
            >
              Spring Season Sale • Up to 50% Off
            </span>
          </div>

          {/* Heading */}
          <h1
            style={{
              fontSize: 'clamp(36px, 5vw, 54px)',
              fontWeight: 800,
              lineHeight: 1.15,
              marginBottom: '20px',
              color: '#ffffff',
              letterSpacing: '-1px',
            }}
          >
            Next-Gen Tech &{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #c084fc 50%, #f472b6 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Premium Lifestyle
            </span>{' '}
            Essentials
          </h1>

          {/* Description */}
          <p
            style={{
              fontSize: '16px',
              color: '#cbd5e1',
              maxWidth: '520px',
              marginBottom: '32px',
              lineHeight: 1.6,
            }}
          >
            Discover curated top-tier gadgets, pro tennis gear, ultra-precision audio, and everyday tech designed to upgrade your lifestyle.
          </p>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', marginBottom: '40px' }}>
            <a
              href="#deals"
              style={{
                padding: '14px 32px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '15px',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 10px 25px -5px rgba(99, 102, 241, 0.5)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 15px 30px -5px rgba(99, 102, 241, 0.7)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 10px 25px -5px rgba(99, 102, 241, 0.5)';
              }}
            >
              Explore Deals →
            </a>

            <a
              href="#featured"
              style={{
                padding: '14px 28px',
                borderRadius: '12px',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                color: '#ffffff',
                fontWeight: 600,
                fontSize: '15px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              Browse Categories
            </a>
          </div>

          {/* Social Proof / Stats */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              paddingTop: '24px',
              borderTop: '1px solid rgba(255, 255, 255, 0.12)',
            }}
          >
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>50k+</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Happy Customers</div>
            </div>
            <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>4.9 ★</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Product Rating</div>
            </div>
            <div style={{ width: '1px', height: '30px', backgroundColor: 'rgba(255, 255, 255, 0.15)' }} />
            <div>
              <div style={{ fontSize: '22px', fontWeight: 800, color: '#ffffff' }}>24/7</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>VIP Support</div>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Card */}
        <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
          {/* Main Showcase Card */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '460px',
              borderRadius: '24px',
              padding: '24px',
              background: 'linear-gradient(145deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.03) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
            }}
          >
            {/* Top pill badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span
                style={{
                  backgroundColor: '#f43f5e',
                  color: '#ffffff',
                  fontSize: '11px',
                  fontWeight: 800,
                  padding: '4px 12px',
                  borderRadius: '999px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                }}
              >
                🔥 Featured Deal
              </span>
              <span style={{ fontSize: '13px', color: '#a5b4fc', fontWeight: 600 }}>Save ₹10,000 Today</span>
            </div>

            {/* Showcase Image */}
            <div
              style={{
                width: '100%',
                height: '240px',
                borderRadius: '16px',
                overflow: 'hidden',
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '18px',
              }}
            >
              <img
                src="https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80"
                alt="Apple Watch Ultra 2"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s',
                }}
              />
            </div>

            {/* Product Meta */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 600 }}>Smart Watches</div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: '#ffffff', margin: '4px 0 8px' }}>
                  Apple Watch Ultra 2 Titanium
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '22px', fontWeight: 800, color: '#38bdf8' }}>₹89,900</span>
                  <span style={{ fontSize: '15px', color: '#64748b', textDecoration: 'line-through' }}>₹99,900</span>
                </div>
              </div>

              <button
                style={{
                  padding: '10px 18px',
                  borderRadius: '10px',
                  backgroundColor: '#ffffff',
                  color: '#0f172a',
                  fontWeight: 700,
                  fontSize: '13px',
                  boxShadow: '0 4px 12px rgba(255, 255, 255, 0.2)',
                }}
              >
                Claim Deal
              </button>
            </div>
          </div>

          {/* Floating mini badge */}
          <div
            style={{
              position: 'absolute',
              bottom: '-15px',
              left: '-10px',
              padding: '10px 16px',
              borderRadius: '14px',
              backgroundColor: '#0f172a',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 10px 20px rgba(0, 0, 0, 0.4)',
            }}
          >
            <span style={{ fontSize: '20px' }}>📦</span>
            <div style={{ fontSize: '12px', lineHeight: 1.2 }}>
              <div style={{ fontWeight: 700 }}>Free Express Delivery</div>
              <div style={{ color: '#94a3b8', fontSize: '10px' }}>Orders shipped within 24 hours</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;