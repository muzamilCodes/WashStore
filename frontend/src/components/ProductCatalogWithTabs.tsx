import { useState, useEffect } from "react";
import ProductCard from "../molecules/ProductCard";
import type { Product } from "../types/Types";

interface ProductCatalogWithTabsProp {
  title: string;
  description: string;
  products: Product[];
  tabs: string[];
  onSelectProduct?: (product: Product) => void;
  onToast?: (message: string) => void;
}

const ProductCatalogWithTabs = ({
  title,
  description,
  products,
  tabs,
  onSelectProduct,
  onToast,
}: ProductCatalogWithTabsProp) => {
  const allTabs = ["All", ...tabs.filter((t) => t.toLowerCase() !== "all")];
  const [activeTab, setActiveTab] = useState<string>("All");
  const [filteredArr, setFilteredArr] = useState<Product[]>(products);

  useEffect(() => {
    handleTabs(activeTab);
  }, [products]);

  const handleTabs = (preference: string) => {
    setActiveTab(preference);

    if (preference.toLowerCase() === "all") {
      setFilteredArr(products);
      return;
    }

    const norm = preference.toLowerCase().replace(/s$/, ""); // e.g. "mobiles" -> "mobile"
    const filtered = products.filter((p) => {
      const cat = (p.category || "").toLowerCase();
      return cat.includes(norm) || norm.includes(cat);
    });

    setFilteredArr(filtered);
  };

  return (
    <section
      id="featured"
      style={{
        maxWidth: "1360px",
        margin: "40px auto 60px",
        padding: "40px 24px",
        backgroundColor: "#ffffff",
        borderRadius: "24px",
        border: "1px solid #e2e8f0",
        boxShadow: "0 10px 30px -10px rgba(0, 0, 0, 0.04)",
      }}
    >
      {/* Title & Description */}
      <div style={{ textAlign: "center", maxWidth: "680px", margin: "0 auto 32px" }}>
        <span
          style={{
            fontSize: "12px",
            fontWeight: 800,
            color: "#6366f1",
            textTransform: "uppercase",
            letterSpacing: "1px",
            display: "inline-block",
            marginBottom: "6px",
          }}
        >
          Curated Showcase
        </span>
        <h2
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: "#0f172a",
            marginBottom: "12px",
            letterSpacing: "-0.5px",
          }}
        >
          {title}
        </h2>
        <p style={{ fontSize: "15px", color: "#64748b", lineHeight: 1.6 }}>
          {description && !description.includes("dkfjh")
            ? description
            : "Explore our hand-picked collection of premium gadgets, high-performance electronics, and athletic gear tailored to elevate your daily routine."}
        </p>
      </div>

      {/* Tabs Navigation Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px",
          backgroundColor: "#f8fafc",
          padding: "10px 16px",
          borderRadius: "16px",
          border: "1px solid #e2e8f0",
          marginBottom: "28px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            flexWrap: "wrap",
            listStyleType: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {allTabs.map((tabElement) => {
            const isActive = activeTab.toLowerCase() === tabElement.toLowerCase();
            return (
              <button
                key={tabElement}
                onClick={() => handleTabs(tabElement)}
                style={{
                  padding: "8px 18px",
                  borderRadius: "999px",
                  fontSize: "13px",
                  fontWeight: isActive ? 700 : 600,
                  backgroundColor: isActive ? "#4f46e5" : "transparent",
                  color: isActive ? "#ffffff" : "#475569",
                  boxShadow: isActive ? "0 4px 12px rgba(79, 70, 229, 0.3)" : "none",
                  transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "#e2e8f0";
                    e.currentTarget.style.color = "#0f172a";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "#475569";
                  }
                }}
              >
                {tabElement}
              </button>
            );
          })}
        </div>

        <button
          style={{
            backgroundColor: "#ffffff",
            color: "#0f172a",
            border: "1px solid #cbd5e1",
            padding: "8px 20px",
            borderRadius: "999px",
            fontSize: "13px",
            fontWeight: 700,
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#4f46e5";
            e.currentTarget.style.color = "#4f46e5";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#cbd5e1";
            e.currentTarget.style.color = "#0f172a";
          }}
        >
          See more <span>→</span>
        </button>
      </div>

      {/* Filtered Products Card Grid */}
      <ProductCard products={filteredArr} onSelectProduct={onSelectProduct} onToast={onToast} />
    </section>
  );
};

export default ProductCatalogWithTabs;