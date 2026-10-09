import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/Store';
import { clearCart } from '../redux/Reducers/CartReducer';
import { axiosInstance } from '../utils/axiosInstance';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderSuccess: (order: any) => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onOrderSuccess }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, totalAmount } = useSelector((state: RootState) => state.cart);
  const user = useSelector((state: RootState) => state.loggedInUser);

  const [form, setForm] = useState({
    name: user?.username || 'Alex Johnson',
    phone: '+91 9876543210',
    address: '42, Connaught Place, Inner Circle',
    city: 'New Delhi',
    state: 'Delhi',
    pincode: '110001',
    paymentMethod: 'UPI',
    upiId: 'alex@okhdfcbank',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const shipping = totalAmount >= 999 || totalAmount === 0 ? 0 : 99;
  const finalTotal = totalAmount + shipping;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const orderData = {
      items: items.map((it) => ({
        id: it.id,
        name: it.name,
        price: it.price,
        quantity: it.quantity,
      })),
      shippingAddress: `${form.address}, ${form.city}, ${form.state} - ${form.pincode} (Recipient: ${form.name}, Tel: ${form.phone})`,
      paymentMethod: form.paymentMethod === 'UPI' ? `UPI (${form.upiId})` : form.paymentMethod,
    };

    try {
      // Send to backend
      const res = await axiosInstance.post('/api/order/create', orderData);
      const createdOrder = res.data?.payload || {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        totalAmount: `₹${finalTotal.toLocaleString('en-IN')}`,
        items,
        paymentMethod: form.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        createdAt: new Date().toISOString(),
      };

      dispatch(clearCart());
      setIsSubmitting(false);
      onClose();
      onOrderSuccess(createdOrder);
    } catch (_) {
      // Fallback local order
      const mockOrder = {
        orderId: 'ORD-' + Math.floor(100000 + Math.random() * 900000),
        totalAmount: `₹${finalTotal.toLocaleString('en-IN')}`,
        items,
        paymentMethod: form.paymentMethod,
        shippingAddress: orderData.shippingAddress,
        createdAt: new Date().toISOString(),
      };
      dispatch(clearCart());
      setIsSubmitting(false);
      onClose();
      onOrderSuccess(mockOrder);
    }
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
        backgroundColor: 'rgba(15, 23, 42, 0.7)',
        backdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '680px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          padding: '32px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          position: 'relative',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 800, color: '#6366f1', textTransform: 'uppercase', letterSpacing: '1px' }}>
              🇮🇳 India Express Checkout
            </span>
            <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#0f172a' }}>Delivery & Payment Details</h2>
          </div>
          <button
            onClick={onClose}
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: '#f1f5f9',
              border: 'none',
              fontSize: '16px',
              color: '#64748b',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Address Fields */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span> Shipping Address
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', marginBottom: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Mobile Number (+91)
                </label>
                <input
                  type="text"
                  required
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '14px' }}>
              <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                Street Address, Flat / House No., Landmark
              </label>
              <input
                type="text"
                required
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  City
                </label>
                <input
                  type="text"
                  required
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  State
                </label>
                <input
                  type="text"
                  required
                  value={form.state}
                  onChange={(e) => setForm({ ...form, state: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '4px' }}>
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  value={form.pincode}
                  onChange={(e) => setForm({ ...form, pincode: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            </div>
          </div>

          {/* Payment Methods */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '15px', fontWeight: 700, color: '#1e293b', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💳</span> Payment Method
            </h4>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', marginBottom: '16px' }}>
              {[
                { id: 'UPI', label: 'UPI / QR', icon: '⚡' },
                { id: 'Card', label: 'Card', icon: '💳' },
                { id: 'NetBanking', label: 'Net Banking', icon: '🏦' },
                { id: 'COD', label: 'Cash on Delivery', icon: '💵' },
              ].map((m) => {
                const selected = form.paymentMethod === m.id;
                return (
                  <div
                    key={m.id}
                    onClick={() => setForm({ ...form, paymentMethod: m.id })}
                    style={{
                      padding: '12px 8px',
                      borderRadius: '12px',
                      border: selected ? '2px solid #4f46e5' : '1px solid #cbd5e1',
                      backgroundColor: selected ? '#eef2ff' : '#ffffff',
                      textAlign: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '20px', marginBottom: '4px' }}>{m.icon}</div>
                    <div style={{ fontSize: '12px', fontWeight: 700, color: selected ? '#4f46e5' : '#334155' }}>
                      {m.label}
                    </div>
                  </div>
                );
              })}
            </div>

            {form.paymentMethod === 'UPI' && (
              <div style={{ padding: '14px', backgroundColor: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#475569', marginBottom: '6px' }}>
                  Enter UPI ID (Google Pay, PhonePe, Paytm, BHIM)
                </label>
                <input
                  type="text"
                  placeholder="e.g. mobile@upi or username@okhdfcbank"
                  value={form.upiId}
                  onChange={(e) => setForm({ ...form, upiId: e.target.value })}
                  style={{ width: '100%', padding: '10px 14px', borderRadius: '8px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                />
              </div>
            )}
          </div>

          {/* Order Summary Line */}
          <div style={{ padding: '16px', backgroundColor: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0', marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
              <span>Items ({items.length})</span>
              <span>₹{totalAmount.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', color: '#64748b', marginBottom: '6px' }}>
              <span>Express Delivery across India</span>
              <span style={{ color: '#10b981', fontWeight: 700 }}>FREE</span>
            </div>
            <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '8px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '18px', fontWeight: 800, color: '#0f172a' }}>
              <span>Payable Amount</span>
              <span style={{ color: '#4f46e5' }}>₹{finalTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '14px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: 800,
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)',
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              opacity: isSubmitting ? 0.7 : 1,
            }}
          >
            {isSubmitting ? 'Processing Order...' : `Complete Order • ₹${finalTotal.toLocaleString('en-IN')}`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;
