import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/Store';
import { closeCart, updateQuantity, removeFromCart, clearCart } from '../redux/Reducers/CartReducer';

interface CartDrawerProps {
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ onCheckout }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, isOpen, totalAmount } = useSelector((state: RootState) => state.cart);
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  if (!isOpen) return null;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SWASH10' || promoCode.trim().toUpperCase() === 'WELCOME500') {
      const disc = Math.round(totalAmount * 0.1);
      setDiscount(disc);
      setPromoMessage(`🎉 Promo applied: ₹${disc.toLocaleString('en-IN')} off!`);
    } else {
      setDiscount(0);
      setPromoMessage('❌ Invalid promo code. Try SWASH10');
    }
  };

  const shipping = totalAmount >= 999 || totalAmount === 0 ? 0 : 99;
  const finalTotal = Math.max(0, totalAmount - discount + shipping);

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
        onClick={() => dispatch(closeCart())}
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

      {/* Slide-over Drawer Panel */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '460px',
          height: '100%',
          backgroundColor: '#ffffff',
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.2)',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1,
          animation: 'fadeIn 0.25s ease',
        }}
      >
        {/* Drawer Header */}
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
            <span style={{ fontSize: '22px' }}>🛍️</span>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>Shopping Cart</h3>
              <span style={{ fontSize: '12px', color: '#64748b' }}>
                {items.length} {items.length === 1 ? 'item' : 'items'}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {items.length > 0 && (
              <button
                onClick={() => dispatch(clearCart())}
                style={{
                  fontSize: '11px',
                  color: '#ef4444',
                  background: '#fee2e2',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  fontWeight: 700,
                }}
              >
                Clear
              </button>
            )}
            <button
              onClick={() => dispatch(closeCart())}
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
        </div>

        {/* Free Shipping Progress Indicator */}
        <div style={{ padding: '12px 24px', backgroundColor: '#eef2ff', borderBottom: '1px solid #e0e7ff' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, color: '#4338ca', marginBottom: '6px' }}>
            <span>
              {totalAmount >= 999
                ? '🎉 You unlocked FREE Delivery across India!'
                : `Add ₹${(999 - totalAmount).toLocaleString('en-IN')} more for FREE Delivery`}
            </span>
            <span>{Math.min(100, Math.round((totalAmount / 999) * 100))}%</span>
          </div>
          <div style={{ height: '6px', backgroundColor: '#c7d2fe', borderRadius: '999px', overflow: 'hidden' }}>
            <div
              style={{
                width: `${Math.min(100, (totalAmount / 999) * 100)}%`,
                height: '100%',
                backgroundColor: '#4f46e5',
                borderRadius: '999px',
                transition: 'width 0.3s ease',
              }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 24px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#64748b' }}>
              <span style={{ fontSize: '50px', display: 'block', marginBottom: '14px' }}>🛒</span>
              <h4 style={{ fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>Your cart is empty</h4>
              <p style={{ fontSize: '14px', color: '#94a3b8', margin: '8px 0 20px' }}>
                Looks like you haven't added anything to your cart yet.
              </p>
              <button
                onClick={() => dispatch(closeCart())}
                style={{
                  backgroundColor: '#4f46e5',
                  color: '#ffffff',
                  padding: '12px 24px',
                  borderRadius: '12px',
                  fontWeight: 700,
                  fontSize: '14px',
                }}
              >
                Start Shopping →
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    gap: '14px',
                    padding: '14px',
                    borderRadius: '14px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    style={{
                      width: '75px',
                      height: '75px',
                      objectFit: 'cover',
                      borderRadius: '10px',
                      backgroundColor: '#ffffff',
                    }}
                  />
                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                      <h5
                        style={{
                          fontSize: '13px',
                          fontWeight: 700,
                          color: '#0f172a',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                        }}
                      >
                        {item.name}
                      </h5>
                      <button
                        onClick={() => dispatch(removeFromCart(item.id))}
                        title="Remove"
                        style={{ background: 'none', color: '#94a3b8', fontSize: '14px', padding: '0 4px', cursor: 'pointer' }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ef4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#94a3b8')}
                      >
                        🗑️
                      </button>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '8px' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#4f46e5' }}>{item.price}</span>

                      {/* Quantity Controls */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          backgroundColor: '#ffffff',
                          border: '1px solid #cbd5e1',
                          borderRadius: '8px',
                          padding: '2px 8px',
                        }}
                      >
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
                          style={{ background: 'none', fontWeight: 800, fontSize: '14px', color: '#334155' }}
                        >
                          -
                        </button>
                        <span style={{ fontSize: '13px', fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                          style={{ background: 'none', fontWeight: 800, fontSize: '14px', color: '#334155' }}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Footer / Summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: '20px 24px',
              borderTop: '1px solid #e2e8f0',
              backgroundColor: '#f8fafc',
            }}
          >
            {/* Promo Code Input */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px' }}>
              <input
                type="text"
                placeholder="Promo Code (SWASH10)"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #cbd5e1',
                  fontSize: '13px',
                  textTransform: 'uppercase',
                }}
              />
              <button
                onClick={handleApplyPromo}
                style={{
                  padding: '10px 18px',
                  backgroundColor: '#1e293b',
                  color: '#ffffff',
                  borderRadius: '10px',
                  fontSize: '13px',
                  fontWeight: 700,
                }}
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <div
                style={{
                  fontSize: '12px',
                  fontWeight: 600,
                  color: discount > 0 ? '#10b981' : '#ef4444',
                  marginBottom: '12px',
                }}
              >
                {promoMessage}
              </div>
            )}

            {/* Price Breakdown */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px', color: '#64748b', marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Subtotal</span>
                <span style={{ fontWeight: 700, color: '#1e293b' }}>₹{totalAmount.toLocaleString('en-IN')}</span>
              </div>
              {discount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#10b981' }}>
                  <span>Promo Discount (10%)</span>
                  <span>-₹{discount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Delivery Charges</span>
                <span style={{ fontWeight: 700, color: shipping === 0 ? '#10b981' : '#1e293b' }}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '4px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '17px', fontWeight: 800, color: '#0f172a' }}>
                <span>Total Amount</span>
                <span style={{ color: '#4f46e5' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => {
                dispatch(closeCart());
                onCheckout();
              }}
              style={{
                width: '100%',
                padding: '14px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                fontSize: '15px',
                fontWeight: 800,
                boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
              }}
            >
              Proceed to Checkout <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDrawer;
