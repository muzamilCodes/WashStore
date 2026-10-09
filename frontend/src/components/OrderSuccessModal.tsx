import React from 'react';

interface OrderSuccessModalProps {
  order: any;
  onClose: () => void;
}

const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 99999,
        backgroundColor: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(6px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        animation: 'fadeIn 0.25s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: '#ffffff',
          borderRadius: '28px',
          padding: '40px 32px',
          textAlign: 'center',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.3)',
          position: 'relative',
        }}
      >
        {/* Animated Celebration Icon */}
        <div
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: '#d1fae5',
            color: '#10b981',
            fontSize: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            boxShadow: '0 10px 25px rgba(16, 185, 129, 0.25)',
          }}
        >
          ✓
        </div>

        <span
          style={{
            backgroundColor: '#dbeafe',
            color: '#1e40af',
            fontSize: '11px',
            fontWeight: 800,
            padding: '4px 12px',
            borderRadius: '999px',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Payment Verified
        </span>

        <h2 style={{ fontSize: '26px', fontWeight: 800, color: '#0f172a', margin: '12px 0 8px' }}>
          Thank You! Your Order is Placed
        </h2>

        <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '24px' }}>
          We've received your order and will dispatch it within 24 hours. A tracking link has been sent to your registered mobile and email.
        </p>

        {/* Order Details Card */}
        <div
          style={{
            backgroundColor: '#f8fafc',
            borderRadius: '16px',
            padding: '20px',
            border: '1px solid #e2e8f0',
            textAlign: 'left',
            fontSize: '13px',
            marginBottom: '28px',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#64748b' }}>Order ID:</span>
            <span style={{ fontWeight: 800, color: '#0f172a', fontFamily: 'monospace' }}>
              {order.orderId || 'ORD-98421'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#64748b' }}>Total Paid:</span>
            <span style={{ fontWeight: 800, color: '#10b981', fontSize: '15px' }}>
              {order.totalAmount}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#64748b' }}>Payment Method:</span>
            <span style={{ fontWeight: 700, color: '#1e293b' }}>
              {order.paymentMethod || 'UPI Express'}
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#64748b' }}>Estimated Delivery:</span>
            <span style={{ fontWeight: 700, color: '#4f46e5' }}>
              In 2-3 Business Days
            </span>
          </div>

          <div style={{ height: '1px', backgroundColor: '#e2e8f0', margin: '10px 0' }} />

          <div>
            <span style={{ color: '#64748b', display: 'block', marginBottom: '2px' }}>Shipping Address:</span>
            <span style={{ fontWeight: 600, color: '#334155', fontSize: '12px' }}>
              {order.shippingAddress}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => {
              alert(`Invoice for Order ${order.orderId || 'ORD-98421'} generated in Indian Rupees (₹)!`);
            }}
            style={{
              flex: 1,
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: '#f1f5f9',
              color: '#334155',
              fontSize: '14px',
              fontWeight: 700,
              border: '1px solid #cbd5e1',
            }}
          >
            📄 Invoice
          </button>

          <button
            onClick={onClose}
            style={{
              flex: 2,
              padding: '12px',
              borderRadius: '12px',
              backgroundColor: '#4f46e5',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 700,
              boxShadow: '0 8px 20px rgba(79, 70, 229, 0.35)',
            }}
          >
            Continue Shopping →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessModal;
