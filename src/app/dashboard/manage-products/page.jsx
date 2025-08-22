// src/app/dashboard/manage-products/page.jsx

import clientPromise from "@/lib/mongodb";
import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

// This function runs on the server to fetch data
async function getProducts() {
  try {
    const client = await clientPromise;
    const db = client.db("ecomm_db"); // Replace with your database name
    const products = await db.collection("products").find({}).toArray();
    // It's important to serialize the data because ObjectId is not a plain JSON object
    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Failed to fetch products for management:", error);
    return [];
  }
}

// This Server Action handles the deletion logic
async function deleteProduct(formData) {
  "use server";

  const productId = formData.get("id");

  try {
    const client = await clientPromise;
    const db = client.db("ecomm_db");

    // Deletes the product from the database
    await db.collection("products").deleteOne({ _id: new ObjectId(productId) });

    console.log(`Product with ID ${productId} deleted successfully.`);
  } catch (error) {
    console.error("Failed to delete product:", error);
  }

  // Revalidates the current page to reflect the change
  revalidatePath("/dashboard/manage-products");
}

// This is the main component for the page
export default async function ManageProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      {products.length === 0 ? (
        <p className="text-gray-500">
          No products found. Add some from the dashboard.
        </p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    ${product.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Link
                      href={`/dashboard/manage-products/${product._id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Edit
                    </Link>
                    {/* The form handles the delete action */}
                    <form action={deleteProduct} className="inline-block">
                      <input type="hidden" name="id" value={product._id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
