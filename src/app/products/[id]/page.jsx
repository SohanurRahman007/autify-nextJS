// app/products/[id]/page.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export default async function ProductDetail({ params }) {
  const { id } = params;

  const client = await clientPromise;
  const db = client.db("ecomm_db");
  const product = await db
    .collection("products")
    .findOne({ _id: new ObjectId(id) });

  if (!product) {
    return (
      <div className="text-center text-red-500 mt-20 text-xl font-semibold">
        Product not found
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10">
      <div className="overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
        {/* Main Product Image */}
        {product.images?.[0] && (
          <img
            className="object-cover w-full h-64"
            src={product.images[0]}
            alt={product.name}
          />
        )}

        <div className="p-6">
          {/* Product Name & Category */}
          <div className="mb-4">
            <span className="text-xs font-medium text-blue-600 uppercase dark:text-blue-400">
              {product.category}
            </span>
            <h1 className="mt-2 text-2xl font-semibold text-gray-800 dark:text-white">
              {product.name}
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {product.description}
            </p>
          </div>

          {/* Price and Brand */}
          <div className="mt-4 flex items-center justify-between">
            <span className="text-xl font-bold text-gray-800 dark:text-gray-200">
              ${product.price}
            </span>
            <span className="text-sm text-gray-600 dark:text-gray-300">
              Brand: {product.brand}
            </span>
          </div>

          {/* Stock Info */}
          <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Stock Available: {product.stock}
          </div>

          {/* Additional Images */}
          {product.images?.length > 1 && (
            <div className="flex flex-wrap mt-4 gap-3">
              {product.images.slice(1).map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`${product.name}-${idx}`}
                  className="w-24 h-24 object-cover rounded-lg border"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
