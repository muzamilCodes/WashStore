import React, { useState } from 'react';
import type { Product } from '../types/Types';

interface ProductCardProps {
  products: Product[];
}

const ProductCard: React.FC<ProductCardProps> = ({ products }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [addedCart, setAddedCart] = useState<number[]>([]);

  const toggleWishlist = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleAddToCart = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    setAddedCart((prev) => [...prev, id]);
    setTimeout(() => {
      setAddedCart((prev) => prev.filter((item) => item !== id));
    }, 2000);
  };

  if (!products || products.length === 0) {
    return (
      <div
        style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: '#64748b',
          backgroundColor: '#ffffff',
          borderRadius: '16px',
          border: '1px dashed #cbd5e1',
          margin: '20px 0',
        }}
      >
        <span style={{ fontSize: '36px', display: 'block', marginBottom: '10px' }}>📦</span>
        <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#334155' }}>No products found</h3>
        <p style={{ fontSize: '14px', color: '#94a3b8' }}>Try choosing another category or filter.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
        gap: '24px',
        marginTop: '24px',
      }}
    >
      {products.map((p: Product) => {
        const isWishlisted = wishlist.includes(p.id);
        const isAdded = addedCart.includes(p.id);
        const rating = p.rating || 4;

        return (
          <div
            key={p.id}
            style={{
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '16px',
              border: '1px solid #e2e8f0',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)';
              e.currentTarget.style.boxShadow = '0 20px 30px -10px rgba(0, 0, 0, 0.1)';
              e.currentTarget.style.borderColor = '#c7d2fe';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.03)';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            {/* Top Badges & Wishlist Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                position: 'absolute',
                top: '16px',
                left: '16px',
                right: '16px',
                zIndex: 2,
              }}
            >
              <div>
                {p.onSale && (
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
                      color: '#ffffff',
                      borderRadius: '8px',
                      padding: '4px 10px',
                      fontSize: '11px',
                      fontWeight: 800,
                      letterSpacing: '0.5px',
                      textTransform: 'uppercase',
                      boxShadow: '0 4px 10px rgba(239, 68, 68, 0.3)',
                    }}
                  >
                    Sale
                  </span>
                )}
              </div>

              <button
                onClick={(e) => toggleWishlist(e, p.id)}
                title="Wishlist"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: isWishlisted ? '#fee2e2' : '#ffffff',
                  border: '1px solid #e2e8f0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  boxShadow: '0 2px 6px rgba(0,0,0,0.06)',
                  transition: 'all 0.2s',
                }}
              >
                {isWishlisted ? '❤️' : '🤍'}
              </button>
            </div>

            {/* Product Image */}
            <div
              style={{
                width: '100%',
                height: '190px',
                borderRadius: '14px',
                backgroundColor: '#f8fafc',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '14px',
                position: 'relative',
              }}
            >
              <img
                src={p.image}
                alt={p.name}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1.0)')}
              />
            </div>

            {/* Product Info */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Category / Rating */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#6366f1',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  {p.category || 'Gear'}
                </span>

                {/* Rating Stars */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '2px', fontSize: '12px' }}>
                  <span style={{ color: '#f59e0b' }}>{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                  <span style={{ color: '#94a3b8', fontSize: '11px', marginLeft: '3px' }}>({rating}.0)</span>
                </div>
              </div>

              {/* Title */}
              <h4
                style={{
                  fontWeight: 700,
                  fontSize: '15px',
                  color: '#1e293b',
                  lineHeight: 1.35,
                  minHeight: '40px',
                  marginBottom: '10px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
                title={p.name}
              >
                {p.name}
              </h4>

              {/* Price & Discounts */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginBottom: '12px' }}>
                <span style={{ fontWeight: 800, fontSize: '18px', color: '#0f172a' }}>{p.price}</span>
                {p.oldPrice && (
                  <span
                    style={{
                      textDecoration: 'line-through',
                      color: '#94a3b8',
                      fontSize: '13px',
                      fontWeight: 500,
                    }}
                  >
                    {p.oldPrice}
                  </span>
                )}
              </div>

              {/* Sold & Stock Progress */}
              <div style={{ marginBottom: '14px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#64748b', fontWeight: 600, marginBottom: '4px' }}>
                  <span>Sold: {p.sold}</span>
                  <span style={{ color: '#10b981' }}>In Stock</span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '5px',
                    borderRadius: '999px',
                    backgroundColor: '#e2e8f0',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      width: `${Math.min(100, Math.max(25, (p.sold / 200) * 100))}%`,
                      height: '100%',
                      background: 'linear-gradient(90deg, #4f46e5 0%, #0ea5e9 100%)',
                      borderRadius: '999px',
                    }}
                  />
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => handleAddToCart(e, p.id)}
                style={{
                  width: '100%',
                  padding: '10px',
                  borderRadius: '12px',
                  backgroundColor: isAdded ? '#10b981' : '#0f172a',
                  color: '#ffffff',
                  fontWeight: 700,
                  fontSize: '13px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  transition: 'all 0.2s',
                  boxShadow: isAdded ? '0 4px 12px rgba(16, 185, 129, 0.3)' : 'none',
                }}
                onMouseEnter={(e) => {
                  if (!isAdded) {
                    e.currentTarget.style.backgroundColor = '#4f46e5';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(79, 70, 229, 0.3)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isAdded) {
                    e.currentTarget.style.backgroundColor = '#0f172a';
                    e.currentTarget.style.boxShadow = 'none';
                  }
                }}
              >
                {isAdded ? '✓ Added to Cart' : '🛒 Add to Cart'}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProductCard;