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
    return <div className="text-center text-red-500">Product not found</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 border rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <p className="text-lg font-semibold mb-4">Price: ${product.price}</p>
      {product.image && (
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover rounded-lg"
        />
      )}
    </div>
  );
}
