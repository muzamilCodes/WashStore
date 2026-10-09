import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/Store';
import { closeWishlist, removeFromWishlist } from '../redux/Reducers/WishlistReducer';
import { addToCart, openCart } from '../redux/Reducers/CartReducer';
import type { Product } from '../types/Types';

interface WishlistDrawerProps {
  onNotify: (msg: string) => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ onNotify }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isOpen } = useSelector((state: RootState) => state.wishlist);

  if (!isOpen) return null;

  const handleMoveToCart = (p: Product) => {
    dispatch(addToCart({ product: p, quantity: 1 }));
    dispatch(removeFromWishlist(p.id));
    onNotify(`Moved "${p.name.slice(0, 20)}..." to Cart! 🛍️`);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={() => dispatch(closeWishlist())}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          animation: 'fadeIn 0.2s ease',
        }}
      />

      {/* Slide-over Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          animation: 'fadeIn 0.25s ease',
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #e2e8f0',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f8fafc',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '22px' }}>❤️</span>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>My Wishlist</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {items.length} {items.length === 1 ? 'saved item' : 'saved items'}
              </span>
            </div>
          </div>

          <button
            onClick={() => dispatch(closeWishlist())}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: '#ffffff',
              border: '1px solid #cbd5e1',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#64748b',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        {/* Content List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <span style={{ fontSize: '50px', display: 'block', marginBottom: '14px' }}>🤍</span>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Your wishlist is empty</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '8px 0 20px' }}>
                Save items you like by clicking the heart icon on any product card!
              </p>
              <button
                onClick={() => dispatch(closeWishlist())}
                style={{
                  backgroundColor: '#0f172a',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                Discover Items →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((p) => (
                <div
                  key={p.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    borderRadius: '14px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: '70px',
                      height: '70px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      backgroundColor: '#ffffff',
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <h5
                      style={{
                        fontSize: '13px',
                        fontWeight: 700,
                        color: '#0f172a',
                        lineHeight: 1.3,
                        marginBottom: '6px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {p.name}
                    </h5>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#0f172a' }}>{p.price}</span>
                      {p.oldPrice && (
                        <span style={{ fontSize: '12px', textDecoration: 'line-through', color: '#94a3b8' }}>
                          {p.oldPrice}
                        </span>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleMoveToCart(p)}
                        style={{
                          backgroundColor: '#4f46e5',
                          color: '#ffffff',
                          padding: '6px 12px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        Move to Cart 🛒
                      </button>
                      <button
                        onClick={() => dispatch(removeFromWishlist(p.id))}
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#ef4444',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          fontSize: '12px',
                          fontWeight: 700,
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div style={{ padding: '16px 24px', borderTop: '1px solid #e2e8f0', backgroundColor: '#f8fafc' }}>
            <button
              onClick={() => {
                items.forEach((p) => dispatch(addToCart({ product: p, quantity: 1 })));
                dispatch(closeWishlist());
                dispatch(openCart());
                onNotify('Added all wishlist items to Cart! 🛍️');
              }}
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '12px',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '14px',
              }}
            >
              Add All to Cart →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistDrawer;
