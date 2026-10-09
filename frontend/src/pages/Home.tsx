import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeaturedCategory from '../components/FeaturedCategory';
import HeroSection from '../components/HeroSection';
import ProductCatalog from '../components/ProductCatalog';
import type { AppDispatch, RootState } from '../redux/Store';
import { fetchFeaturedProducts, fetchOnSaleProducts } from '../redux/Actions/ProductActions';
import ProductCatalogWithTabs from '../components/ProductCatalogWithTabs';
import Footer from '../shared/Footer';
import CartDrawer from '../components/CartDrawer';
import WishlistDrawer from '../components/WishlistDrawer';
import CheckoutModal from '../components/CheckoutModal';
import OrderSuccessModal from '../components/OrderSuccessModal';
import ProductQuickViewModal from '../components/ProductQuickViewModal';
import Toast from '../components/Toast';
import { addToCart } from '../redux/Reducers/CartReducer';
import type { Product } from '../types/Types';

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchOnSaleProducts());
    dispatch(fetchFeaturedProducts());
  }, [dispatch]);

  const { featuredProducts, onSaleProducts } = useSelector((state: RootState) => state.products);
  const allCatalogProducts = [...featuredProducts, ...onSaleProducts];

  const handleAddToCart = (product: Product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
    setToastMessage(`Added ${quantity}x "${product.name.slice(0, 20)}..." to Cart! 🛍️`);
  };

  const handleBuyNow = (product: Product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
    setIsCheckoutOpen(true);
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', scrollBehavior: 'smooth' }}>
      {/* Toast Notification */}
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}

      {/* Hero Banner Section */}
      <div id="home">
        <HeroSection />
      </div>

      {/* Featured Categories Strip */}
      <div id="categories">
        <FeaturedCategory />
      </div>

      {/* On Sale Products Catalog with Flash Timer */}
      <div id="deals">
        <ProductCatalog
          products={onSaleProducts}
          heading="On Sale Products (Hot Deals)"
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToast={(msg) => setToastMessage(msg)}
        />
      </div>

      {/* Shop Section (Winter Clearance) */}
      <div id="shop">
        <ProductCatalog
          products={featuredProducts}
          heading="Winter Clearance & Sports Gear"
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToast={(msg) => setToastMessage(msg)}
        />
      </div>

      {/* Dynamic Tab Filtered Catalog */}
      <div id="featured">
        <ProductCatalogWithTabs
          title="Featured Collections"
          description="Browse top-rated Indian market electronics, laptops, flagship smartphones, and fitness gear."
          products={allCatalogProducts}
          tabs={["Mobiles", "Laptops", "Accessories", "Cameras", "Smart Watches", "Sports"]}
          onSelectProduct={(p) => setSelectedProduct(p)}
          onToast={(msg) => setToastMessage(msg)}
        />
      </div>

      {/* About Section */}
      <section
        id="about"
        style={{
          maxWidth: '1360px',
          margin: '60px auto 40px',
          padding: '50px 32px',
          borderRadius: '24px',
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)',
          color: '#ffffff',
          boxShadow: '0 20px 40px -15px rgba(30, 27, 75, 0.4)',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 40px' }}>
          <span
            style={{
              fontSize: '12px',
              fontWeight: 800,
              color: '#a5b4fc',
              textTransform: 'uppercase',
              letterSpacing: '1px',
            }}
          >
            About SwashStore
          </span>
          <h2 style={{ fontSize: '32px', fontWeight: 800, margin: '8px 0 16px', color: '#ffffff' }}>
            India’s Premium Tech & Sports Lifestyle Hub
          </h2>
          <p style={{ fontSize: '15px', color: '#cbd5e1', lineHeight: 1.7 }}>
            Founded to bring genuine high-end electronics, authentic athletic gear, and flagship wearables directly to your doorstep with instant INR payments, zero hidden fees, and lightning-fast dispatch.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '24px',
          }}
        >
          {[
            {
              icon: '🇮🇳',
              title: '100% Indian Pricing',
              desc: 'All items displayed in Indian Rupees (₹) with all taxes included.',
            },
            {
              icon: '🛡️',
              title: 'Brand Warranty',
              desc: 'Official 1-year manufacturer warranty with hassle-free replacements.',
            },
            {
              icon: '⚡',
              title: 'Fast Dispatch',
              desc: 'Orders processed and shipped within 24 hours across all Indian pin codes.',
            },
            {
              icon: '💳',
              title: 'Secure Payments',
              desc: 'UPI, Net Banking, Credit/Debit cards & Cash on Delivery supported.',
            },
          ].map((item) => (
            <div
              key={item.title}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                backdropFilter: 'blur(10px)',
                borderRadius: '16px',
                padding: '24px',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '12px' }}>{item.icon}</div>
              <h4 style={{ fontSize: '18px', fontWeight: 700, marginBottom: '6px', color: '#ffffff' }}>
                {item.title}
              </h4>
              <p style={{ fontSize: '13px', color: '#cbd5e1', lineHeight: 1.5 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Modern Store Footer */}
      <Footer />

      {/* Modals & Slide-overs */}
      <CartDrawer onCheckout={() => setIsCheckoutOpen(true)} />
      <WishlistDrawer onNotify={(msg) => setToastMessage(msg)} />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        onOrderSuccess={(ord) => setConfirmedOrder(ord)}
      />

      <OrderSuccessModal
        order={confirmedOrder}
        onClose={() => setConfirmedOrder(null)}
      />

      <ProductQuickViewModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />
    </div>
  );
};

export default Home;