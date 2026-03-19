"use client";
import { useApp } from "@/context/AppContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WishlistPage() {
  const { user, wishlist = [], toggleWishlist } = useApp();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/login");
  }, [user, router]);

  if (!user) return null;

  const wishedProducts = products.filter((p) => wishlist.includes(p.id));

  return (
    <>
      <Navbar />
      <main style={{ background: "#FFFEF5", minHeight: "100vh", fontFamily: "var(--font-body)", padding: "48px 24px 80px" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>

          <div style={{ marginBottom: 36, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px,4vw,40px)", fontWeight: 800, color: "#0E2011", margin: "0 0 8px" }}>
                ❤️ My Wishlist
              </h1>
              <p style={{ color: "#888", fontSize: 14 }}>
                {wishedProducts.length === 0
                  ? "You haven't liked any products yet"
                  : `${wishedProducts.length} product${wishedProducts.length !== 1 ? "s" : ""} saved`}
              </p>
            </div>
            {wishedProducts.length > 0 && (
              <button onClick={() => wishedProducts.forEach((p) => toggleWishlist(p.id))}
                style={{ background: "#FFE4E6", border: "1px solid #FFCDD2", color: "#C62828", borderRadius: 10, padding: "10px 14px", fontWeight: 700, cursor: "pointer" }}>
                Clear all
              </button>
            )}
          </div>

          {wishedProducts.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <div style={{ width: 100, height: 100, background: "#FFE4E6", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 48, margin: "0 auto 24px" }}>🤍</div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: 22, color: "#0E2011", margin: "0 0 10px" }}>No items saved yet</h2>
              <p style={{ color: "#888", marginBottom: 28 }}>Tap the ♡ heart on any product to save it here.</p>
              <Link href="/products" className="tk-btn-cta" style={{ textDecoration: "none" }}>
                Browse Products
              </Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 22 }}>
              {wishedProducts.map((p) => (
                <div key={p.id} style={{ position: "relative" }}>
                  <ProductCard product={p} />
                  <button onClick={() => toggleWishlist(p.id)}
                    style={{ position: "absolute", top: 12, right: 12, background: "#FFF0F0", border: "1px solid #FFCDD2", borderRadius: 999, padding: "6px 10px", color: "#C62828", fontWeight: 700, cursor: "pointer" }}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
