// src/app/dashboard/add-product/page.jsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";

export default async function AddProductPage() {
  const session = await getServerSession();

  if (!session) {
    redirect("/login");
  }

  const addProduct = async (formData) => {
    "use server";

    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));

    try {
      const client = await clientPromise;
      const db = client.db("ecomm_db");

      const newProduct = { name, description, price, createdAt: new Date() };
      await db.collection("products").insertOne(newProduct);

      console.log("Product added successfully:", newProduct);
      revalidatePath("/products"); // Revalidate the products page to show the new product
      redirect("/products");
    } catch (error) {
      console.error("Failed to add product:", error);
      // Handle error, e.g., redirect to an error page or show a toast
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 space-y-6 rounded-2xl bg-white shadow-md">
        <h1 className="text-2xl font-bold text-center">Add New Product</h1>

        <form action={addProduct} className="space-y-5">
          <div className="space-y-2 text-sm">
            <label htmlFor="name" className="block text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div className="space-y-2 text-sm">
            <label htmlFor="price" className="block text-gray-600">
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              step="0.01"
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded-lg bg-violet-600 text-white font-semibold hover:bg-violet-700"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}
