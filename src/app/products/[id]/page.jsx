// src/app/products/[id]/page.jsx
"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";

export default function ProductDetailsPage({ params }) {
  const { id } = params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`/api/products/${id}`);
        if (!response.ok) {
          throw new Error("Product not found");
        }
        const data = await response.json();
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
        notFound(); // Redirects to a 404 page
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="text-center py-10">Loading product details...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold">{product.name}</h1>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p className="mt-2 text-2xl font-semibold text-blue-600">
          ${product.price}
        </p>
      </div>
    </div>
  );
}
