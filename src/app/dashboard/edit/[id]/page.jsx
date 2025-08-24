"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

export default function EditProductPage({ params }) {
  const { id } = params;
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data.product);
      } catch (err) {
        toast.error("Could not load product data");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    const updatedProduct = {
      title: formData.get("title"),
      category: formData.get("category"),
      brand: formData.get("brand"),
      price: parseFloat(formData.get("price")),
      stock: parseInt(formData.get("stock")),
      images: [formData.get("image")],
    };

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      if (!res.ok) throw new Error("Failed to update product");

      toast.success("Product updated successfully");
      router.push("/dashboard/manage-products");
    } catch (err) {
      toast.error(err.message);
    }
  };

  if (loading)
    return (
      <div className="text-center py-10 text-gray-600">Loading product...</div>
    );

  return (
    <section className="container px-4 mx-auto py-6">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Edit Product
      </h2>

      <form
        onSubmit={handleUpdate}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow space-y-6"
      >
        {/* Product Info */}
        <fieldset className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
          <legend className="px-2 text-gray-700 dark:text-gray-300 font-medium">
            Product Info
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Title
              </label>
              <input
                type="text"
                name="title"
                defaultValue={product.name}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Category
              </label>
              <input
                type="text"
                name="category"
                defaultValue={product.category}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Brand
              </label>
              <input
                type="text"
                name="brand"
                defaultValue={product.brand}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                defaultValue={product.images?.[0]}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </fieldset>

        {/* Pricing & Stock */}
        <fieldset className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg">
          <legend className="px-2 text-gray-700 dark:text-gray-300 font-medium">
            Pricing & Stock
          </legend>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                defaultValue={product.price}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-600 dark:text-gray-300">
                Stock
              </label>
              <input
                type="number"
                name="stock"
                defaultValue={product.stock}
                className="w-full border border-gray-300 dark:border-gray-600 rounded p-2 focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>
        </fieldset>

        {/* Submit Button */}
        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
          >
            Update Product
          </button>
        </div>
      </form>
    </section>
  );
}
