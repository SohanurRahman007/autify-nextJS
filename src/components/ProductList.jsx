// components/ProductList.jsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  if (loading)
    return <div className="text-center py-10">Loading products...</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 px-4 py-10">
      {products.map((product) => (
        <div
          key={product._id}
          className="flex flex-col items-center justify-center w-full mx-auto"
        >
          {/* Product Image */}
          <div
            className="w-full h-64  bg-center bg-cover rounded-lg shadow-md"
            style={{
              backgroundImage: `url(${
                product.images?.[0] || "/placeholder.png"
              })`,
            }}
          ></div>

          {/* Product Info Card */}
          <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800 text-center">
            <h3 className="py-2 font-bold tracking-wide text-gray-800 uppercase dark:text-white">
              {product.name || "Unnamed Product"}
            </h3>

            <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
              <span className="font-bold text-gray-800 dark:text-gray-200">
                ${product.price ?? 0}
              </span>
              <Link
                href={`/products/${product._id}`}
                className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none"
              >
                View More
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
