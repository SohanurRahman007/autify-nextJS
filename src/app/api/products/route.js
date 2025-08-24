// src/app/api/products/route.js
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import clientPromise from "@/lib/mongodb";

export const runtime = "nodejs";

// GET /api/products
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("ecomm_db");

    const products = await db.collection("products").find({}).toArray();
    return NextResponse.json({ products });
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// POST /api/products
export async function POST(req) {
  try {
    const formData = await req.formData();

    // Extract fields
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price") || 0);
    const stock = parseInt(formData.get("stock") || 0, 10);
    const category = formData.get("category");
    const brand = formData.get("brand");

    // Extract files
    const files = formData.getAll("images"); // FileList
    const uploadedImages = [];

    const uploadDir = path.join(process.cwd(), "/public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    for (const file of files) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const filePath = path.join(uploadDir, file.name);
      await fs.promises.writeFile(filePath, buffer);
      uploadedImages.push(`/uploads/${file.name}`);
    }

    const newProduct = {
      name,
      description,
      price,
      stock,
      category,
      brand,
      images: uploadedImages,
      createdAt: new Date(),
    };

    const client = await clientPromise;
    const db = client.db("ecomm_db");

    const result = await db.collection("products").insertOne(newProduct);

    return NextResponse.json(
      { message: "Product added", id: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
