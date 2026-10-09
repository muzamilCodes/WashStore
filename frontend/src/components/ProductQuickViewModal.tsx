import React, { useState } from 'react';
import type { Product } from '../types/Types';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onBuyNow: (product: Product, quantity: number) => void;
}

const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
}) => {
  const [qty, setQty] = useState(1);

  if (!product) return null;

  const rating = product.rating || 5;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '820px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.25)',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '32px',
          alignItems: 'center',
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#f1f5f9',
            border: 'none',
            fontSize: '16px',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 10,
          }}
        >
          ✕
        </button>

        {/* Product Image Gallery */}
        <div style={{ position: 'relative' }}>
          <div
            style={{
              width: '100%',
              height: '340px',
              borderRadius: '20px',
              backgroundColor: '#f8fafc',
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #e2e8f0',
            }}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
          </div>

          {product.onSale && (
            <span
              style={{
                position: 'absolute',
                top: '16px',
                left: '16px',
                background: 'linear-gradient(135deg, #ef4444 0%, #f43f5e 100%)',
                color: '#ffffff',
                padding: '4px 12px',
                borderRadius: '8px',
                fontSize: '11px',
                fontWeight: 800,
                letterSpacing: '1px',
                textTransform: 'uppercase',
              }}
            >
              Special Offer
            </span>
          )}
        </div>

        {/* Product Details & Actions */}
        <div>
          {/* Category & Rating */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {product.category || 'Lifestyle Gear'}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}>
              <span style={{ color: '#f59e0b' }}>{'★'.repeat(rating)}</span>
              <span style={{ color: '#64748b', fontSize: '12px', fontWeight: 600 }}>({product.sold * 3} Reviews)</span>
            </div>
          </div>

          {/* Title */}
          <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: '14px' }}>
            {product.name}
          </h2>

          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '20px' }}>
            <span style={{ fontSize: '28px', fontWeight: 800, color: '#4f46e5' }}>{product.price}</span>
            {product.oldPrice && (
              <span style={{ fontSize: '18px', textDecoration: 'line-through', color: '#94a3b8' }}>
                {product.oldPrice}
              </span>
            )}
            <span
              style={{
                backgroundColor: '#dcfce7',
                color: '#15803d',
                fontSize: '12px',
                fontWeight: 800,
                padding: '3px 8px',
                borderRadius: '6px',
              }}
            >
              Save Big
            </span>
          </div>

          {/* Highlights */}
          <div
            style={{
              backgroundColor: '#f8fafc',
              borderRadius: '14px',
              padding: '14px 16px',
              border: '1px solid #e2e8f0',
              marginBottom: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '12px',
              color: '#475569',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🚚</span> <span><strong>Free Express Delivery</strong> within 24-48 hours across India</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🛡️</span> <span><strong>1 Year Brand Warranty</strong> included with genuine certificate</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🔄</span> <span><strong>7-Day Easy Returns</strong> & hassle-free replacement</span>
            </div>
          </div>

          {/* Quantity Selector */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
            <span style={{ fontSize: '13px', fontWeight: 700, color: '#334155' }}>Quantity:</span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                backgroundColor: '#f1f5f9',
                borderRadius: '10px',
                padding: '4px 12px',
              }}
            >
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                style={{ background: 'none', fontSize: '16px', fontWeight: 800, color: '#334155' }}
              >
                -
              </button>
              <span style={{ fontSize: '15px', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                style={{ background: 'none', fontSize: '16px', fontWeight: 800, color: '#334155' }}
              >
                +
              </button>
            </div>
            <span style={{ fontSize: '12px', color: '#10b981', fontWeight: 700 }}>● In Stock</span>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              onClick={() => {
                onAddToCart(product, qty);
                onClose();
              }}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                cursor: 'pointer',
              }}
            >
              🛒 Add to Cart
            </button>

            <button
              onClick={() => {
                onBuyNow(product, qty);
                onClose();
              }}
              style={{
                flex: 1,
                padding: '14px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
                boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)',
                cursor: 'pointer',
              }}
            >
              ⚡ Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductQuickViewModal;
