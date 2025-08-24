"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    brand: "",
    images: [],
  });
  const [previewImages, setPreviewImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Handle image upload
  const handleImageChange = (files) => {
    const fileArray = Array.from(files);
    setForm({ ...form, images: fileArray });
    const previews = fileArray.map((file) => URL.createObjectURL(file));
    setPreviewImages(previews);
  };

  // Drag & Drop handlers
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleImageChange(e.dataTransfer.files);
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.images.length === 0) {
      toast.error("Please upload at least one image!");
      return;
    }

    const formData = new FormData();
    for (const key in form) {
      if (key === "images") {
        form.images.forEach((img) => formData.append("images", img));
      } else {
        formData.append(key, form[key]);
      }
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        toast.success("✅ Product added successfully!");
        setTimeout(() => {
          router.push("/products");
        }, 1500);
      } else {
        toast.error("❌ Failed to add product. Try again.");
      }
    } catch (error) {
      toast.error("⚠️ Error adding product.");
      console.error("Error adding product:", error);
    }
  };

  return (
    <div className="flex justify-center py-12 bg-gray-50 dark:bg-gray-900 min-h-screen px-4">
      <div className="w-full max-w-6xl p-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-8">
          Add New Product
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* LEFT COLUMN */}
          <div className="space-y-6">
            {/* Product Name */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                Description
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          {/* RIGHT COLUMN - IMAGE UPLOAD */}
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
              Upload Images
            </label>
            <div className="grid grid-cols-4 gap-4 ">
              <div
                className={`w-full border-2 border-dashed rounded-xl text-center cursor-pointer transition col-span-3 ${
                  dragOver ? "border-blue-500 bg-blue-50" : "border-gray-300"
                } dark:border-gray-600`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById("fileInput").click()}
              >
                <input
                  type="file"
                  id="fileInput"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageChange(e.target.files)}
                />
                <p className="text-gray-500 dark:text-gray-400">
                  Drag & drop images here, or click to select files
                </p>
              </div>

              <div className="flex flex-wrap gap-3 mt-4 col-span-1">
                {previewImages.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    className="w-full h-16 object-cover rounded-xl border dark:border-gray-600"
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Category */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Category
                </label>
                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Category</option>
                  <option value="electronics">Electronics</option>
                  <option value="clothing">Clothing</option>
                  <option value="home">Home & Kitchen</option>
                  <option value="sports">Sports</option>
                </select>
              </div>

              {/* Brand */}
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Brand
                </label>
                <input
                  type="text"
                  name="brand"
                  value={form.brand}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
            {/* Price & Stock */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Price ($)
                </label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  step="0.01"
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-8">
          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            Add Product
          </button>
        </div>
      </div>
    </div>
  );
}
