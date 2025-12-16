// pages/user/Home.jsx
import { useState } from "react";
import HeroSection from "./HeroSection";
import ProductCard from "./ProductCard";



export default function Home() {
  const [products, setProducts] = useState([]);

  // Called whenever HeroSection adds/updates a product
  const handleProductAdded = (newProduct) => {
    setProducts((prev) => {
      const exists = prev.find((p) => p.id === newProduct.id);
      if (exists) return prev.map((p) => (p.id === newProduct.id ? newProduct : p));
      return [...prev, newProduct];
    });
  };

  return (
    <>
      {/* Section 1: HeroSection */}
      <HeroSection onAdded={handleProductAdded} />

      {/* Other sections */}
      <ProductCard products={products} />
    </>
  );
}
