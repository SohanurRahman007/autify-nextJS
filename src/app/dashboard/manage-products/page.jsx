"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import DeleteConfirmationModal from "@/components/DeleteConfirmationModal";
import { deleteProduct as deleteProductAction } from "./product-actions";

export default function ManageProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [productToDeleteId, setProductToDeleteId] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  console.log(products);

  const openModal = (productId) => {
    setProductToDeleteId(productId);
    setModalOpen(true);
  };

  const closeModal = () => {
    setProductToDeleteId(null);
    setModalOpen(false);
  };

  const handleDelete = async () => {
    if (productToDeleteId) {
      const result = await deleteProductAction(productToDeleteId);
      if (result.success) {
        setProducts(
          products.filter((product) => product._id !== productToDeleteId)
        );
      }
      closeModal();
    }
  };

  if (loading) {
    return (
      <div className="text-center py-10 text-gray-600">Loading products...</div>
    );
  }

  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Manage Products
        </h2>
        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
          {products.length} products
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="py-3.5 px-4 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Product
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Price
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Stock
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Category / Brand
                    </th>
                    <th className="px-4 py-3.5 text-sm font-normal text-left text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                  {products.map((product) => (
                    <tr key={product._id}>
                      {/* Product Image + Name */}
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <img
                            className="object-cover w-12 h-12 rounded-lg"
                            src={
                              product.images?.[0] || "/default-placeholder.png"
                            }
                            alt={product.name}
                          />
                          <div>
                            <h2 className="font-medium text-gray-800 dark:text-white">
                              {product.name}
                            </h2>
                            <p className="text-xs text-gray-500">
                              {product._id.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Price */}
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        ${product.price}
                      </td>

                      {/* Stock */}
                      <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
                        {product.stock > 0 ? (
                          <span className="text-green-600">
                            In Stock ({product.stock})
                          </span>
                        ) : (
                          <span className="text-red-500">Out of Stock</span>
                        )}
                      </td>

                      {/* Category & Brand */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-2">
                          <span className="px-3 py-1 text-xs text-indigo-500 rounded-full bg-indigo-100 dark:bg-gray-800">
                            {product.category}
                          </span>
                          <span className="px-3 py-1 text-xs text-blue-500 rounded-full bg-blue-100 dark:bg-gray-800">
                            {product.brand}
                          </span>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-4 py-4 text-sm whitespace-nowrap">
                        <div className="flex items-center gap-x-6">
                          <button
                            onClick={() => openModal(product._id)}
                            className="text-gray-500 hover:text-red-500"
                          >
                            Delete
                          </button>
                          <Link
                            href={`/dashboard/edit/${product._id}`}
                            className="text-gray-500 hover:text-yellow-500"
                          >
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={handleDelete}
      />
    </section>
  );
}
