// app/api/products/[id]/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("ecomm_db");
    const product = await db
      .collection("products")
      .findOne({ _id: new ObjectId(id) });

    if (!product)
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );

    return NextResponse.json({ product });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const data = await req.json();
  try {
    const client = await clientPromise;
    const db = client.db("ecomm_db");

    await db
      .collection("products")
      .updateOne({ _id: new ObjectId(id) }, { $set: data });

    return NextResponse.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  const { id } = params;
  try {
    const client = await clientPromise;
    const db = client.db("ecomm_db");
    await db.collection("products").deleteOne({ _id: new ObjectId(id) });

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Failed to delete product" },
      { status: 500 }
    );
  }
}
