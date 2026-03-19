"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products as staticProducts } from "@/data/products";

const TAG_SECTIONS = [
  { tag: "Best Seller", emoji: "🏆", label: "Best Sellers"  },
  { tag: "New",         emoji: "✨", label: "New Arrivals"  },
  { tag: "Trending",    emoji: "🔥", label: "Trending Now"  },
  { tag: "Featured",    emoji: "⭐", label: "Featured"      },
];

export default function StorePage() {
  const [products, setProducts] = useState(staticProducts);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetch("/api/products")
      .then((r) => r.json())
      .then((d) => {
        if (!isMounted) return;
        if (Array.isArray(d.products) && d.products.length > 0) {
          setProducts(d.products);
        } else {
          setProducts(staticProducts);
        }
      })
      .catch(() => {
        if (!isMounted) return;
        setProducts(staticProducts);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });
    return () => { isMounted = false; };
  }, []);

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--tk-bg)", minHeight: "100vh", fontFamily: "var(--font-body)" }}>
        <section style={{ background: "linear-gradient(135deg,#1A472A 0%,#0E2011 55%,#1A5C2E 100%)", padding: "clamp(48px,10vw,90px) 16px clamp(70px,12vw,120px)", textAlign: "center" }}>
          <h1 style={{ fontFamily: "var(--font-display)", color: "#fff", fontSize: "clamp(28px,6vw,58px)", fontWeight: 800, margin: 0 }}>🌿 CoirCraft Storefront</h1>
          <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "clamp(13px,2.5vw,16px)", marginTop: 8 }}>Discover our curated collection of premium coconut coir goods</p>
        </section>

        {loading && (
          <div style={{ textAlign: "center", padding: 36, fontSize: 16, color: "#6c7b8f" }}>Loading products...</div>
        )}

        {!loading && TAG_SECTIONS.map(({ tag, emoji, label }) => {
          const tagProducts = products.filter((p) => p.tag === tag);
          if (!tagProducts.length) return null;
          return (
            <section key={tag} style={{ padding: "clamp(32px,6vw,56px) 0" }}>
              <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 22, flexWrap: "wrap", gap: 10 }}>
                  <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(18px,3vw,28px)", color: "#0E2011", margin: 0 }}>
                    {emoji} {label} • {tagProducts.length} item{tagProducts.length !== 1 ? "s" : ""}
                  </h2>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 22 }}>
                  {tagProducts.map((p) => <ProductCard key={p.id} product={p} />)}
                </div>
              </div>
            </section>
          );
        })}

        {!loading && products.length === 0 && (
          <div style={{ textAlign: "center", padding: 40, color: "#888" }}>No products available yet.</div>
        )}
      </main>
      <Footer />
    </>
  );
}
