import React from 'react';

interface CategoryItem {
  name: string;
  count: string;
  icon: string;
  color: string;
  bg: string;
}

const categories: CategoryItem[] = [
  { name: 'Mobiles', count: '120+ Items', icon: '📱', color: '#4f46e5', bg: '#eef2ff' },
  { name: 'Laptops', count: '85+ Items', icon: '💻', color: '#0ea5e9', bg: '#f0f9ff' },
  { name: 'Accessories', count: '240+ Items', icon: '🎧', color: '#8b5cf6', bg: '#f5f3ff' },
  { name: 'Cameras', count: '65+ Items', icon: '📷', color: '#ec4899', bg: '#fdf2f8' },
  { name: 'Smart Watches', count: '90+ Items', icon: '⌚', color: '#f59e0b', bg: '#fffbeb' },
  { name: 'Sports & Fitness', count: '140+ Items', icon: '🎾', color: '#10b981', bg: '#ecfdf5' },
];

const FeaturedCategory: React.FC = () => {
  return (
    <section style={{ maxWidth: '1360px', margin: '40px auto 20px', padding: '0 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '24px' }}>
        <div>
          <span style={{ fontSize: '12px', fontWeight: 700, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
            Departments
          </span>
          <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#0f172a', marginTop: '4px' }}>
            Featured Categories
          </h2>
        </div>
        <a
          href="#categories"
          style={{
            fontSize: '14px',
            fontWeight: 700,
            color: '#4f46e5',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
        >
          All Departments →
        </a>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '16px',
        }}
      >
        {categories.map((cat) => (
          <div
            key={cat.name}
            onClick={() => {
              const el = document.querySelector('#featured');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              padding: '20px 16px',
              border: '1px solid #e2e8f0',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              cursor: 'pointer',
              transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 2px 6px rgba(0,0,0,0.02)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = '0 12px 24px -6px rgba(79, 70, 229, 0.12)';
              e.currentTarget.style.borderColor = '#c7d2fe';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 2px 6px rgba(0,0,0,0.02)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '12px',
                backgroundColor: cat.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                flexShrink: 0,
              }}
            >
              {cat.icon}
            </div>
            <div>
              <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '2px' }}>
                {cat.name}
              </h4>
              <span style={{ fontSize: '12px', color: '#94a3b8', fontWeight: 500 }}>
                {cat.count}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedCategory;