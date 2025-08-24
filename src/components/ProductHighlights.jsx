"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductHighlights() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        // Sort by createdAt DESC and take latest 6
        const sortedProducts = data.products
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6);

        setProducts(sortedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="py-10 bg-gray-100 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-8 text-center">
          Latest Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <img
                className="w-full h-56 object-cover"
                src={
                  product.images && product.images.length > 0
                    ? product.images[0]
                    : "/placeholder.png"
                }
                alt={product.name}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {product.name}
                </h3>
                <p className="text-blue-600 dark:text-blue-400 font-bold mt-2">
                  ${product.price}
                </p>
                <Link href={`/products/${product._id}`}>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
