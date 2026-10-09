import React, { useState, useEffect } from "react";
import ProductCard from "../molecules/ProductCard";
import type { Product } from "../types/Types";

interface ProductCatalogProps {
  products: Product[];
  heading: string;
  onSelectProduct?: (product: Product) => void;
  onToast?: (message: string) => void;
}

const ProductCatalog: React.FC<ProductCatalogProps> = ({ products, heading, onSelectProduct, onToast }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 7, minutes: 34, seconds: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const isSale = heading.toLowerCase().includes("sale");
  const isWinter = heading.toLowerCase().includes("winter");

  return (
    <section
      id="deals"
      style={{
        maxWidth: "1360px",
        margin: "40px auto",
        padding: "36px 24px",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Header Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          paddingBottom: "20px",
          borderBottom: "1px solid #f1f5f9",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
              {isSale && (
                <span
                  style={{
                    backgroundColor: "#fee2e2",
                    color: "#ef4444",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                  }}
                >
                  🔥 Limited Time
                </span>
              )}
              {isWinter && (
                <span
                  style={{
                    backgroundColor: "#e0f2fe",
                    color: "#0284c7",
                    fontSize: "11px",
                    fontWeight: 800,
                    padding: "3px 10px",
                    borderRadius: "999px",
                    textTransform: "uppercase",
                  }}
                >
                  ❄️ Clearance
                </span>
              )}
              <span style={{ fontSize: "12px", color: "#64748b", fontWeight: 600 }}>
                {products.length} Products Available
              </span>
            </div>

            <h2 style={{ fontSize: "28px", fontWeight: 800, color: "#0f172a" }}>{heading}</h2>
          </div>

          {/* Flash Deal Timer (if Sale) */}
          {isSale && (
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                backgroundColor: "#fff1f2",
                border: "1px solid #fecdd3",
                padding: "6px 14px",
                borderRadius: "12px",
              }}
            >
              <span style={{ fontSize: "14px" }}>⏳</span>
              <span style={{ fontSize: "12px", fontWeight: 700, color: "#be123c" }}>Ends in:</span>
              <span
                style={{
                  fontFamily: "monospace",
                  fontWeight: 800,
                  fontSize: "13px",
                  color: "#e11d48",
                  backgroundColor: "#ffffff",
                  padding: "2px 6px",
                  borderRadius: "6px",
                  border: "1px solid #fecdd3",
                }}
              >
                {String(timeLeft.hours).padStart(2, "0")}h : {String(timeLeft.minutes).padStart(2, "0")}m : {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          )}
        </div>

        <button
          style={{
            backgroundColor: "#0f172a",
            color: "#ffffff",
            padding: "10px 22px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#4f46e5";
            e.currentTarget.style.transform = "translateX(3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#0f172a";
            e.currentTarget.style.transform = "translateX(0)";
          }}
        >
          See All <span>→</span>
        </button>
      </div>

      {/* Product Cards */}
      <ProductCard products={products} onSelectProduct={onSelectProduct} onToast={onToast} />

      {/* Bottom Indicator Dots */}
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "6px", marginTop: "32px" }}>
        {products.slice(0, 5).map((_, i) => (
          <span
            key={i}
            style={{
              display: "inline-block",
              width: i === 0 ? "24px" : "8px",
              height: "8px",
              backgroundColor: i === 0 ? "#4f46e5" : "#cbd5e1",
              borderRadius: "999px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default ProductCatalog;