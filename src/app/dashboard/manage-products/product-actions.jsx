// src/app/dashboard/manage-products/product-actions.jsx
"use server";

import { revalidatePath } from "next/cache";
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

export async function deleteProduct(productId) {
  try {
    const client = await clientPromise;
    const db = client.db("ecomm_db");

    const result = await db
      .collection("products")
      .deleteOne({ _id: new ObjectId(productId) });

    if (result.deletedCount === 0) {
      console.error("No product found to delete.");
      return { success: false, message: "Product not found." };
    }

    revalidatePath("/dashboard/manage-products");
    console.log(`Product with ID ${productId} deleted successfully.`);
    return { success: true, message: "Product deleted successfully." };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, message: "Internal Server Error." };
  }
}
