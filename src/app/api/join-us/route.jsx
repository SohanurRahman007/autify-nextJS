// src/app/api/join-us/route.jsx
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { message: "Email is required" },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db("ecomm_db"); // Make sure this is your correct database name

    // Insert the email into a "newsletter" or "subscribers" collection
    const result = await db.collection("subscribers").insertOne({
      email,
      subscribedAt: new Date(),
    });

    console.log(`New subscriber added with ID: ${result.insertedId}`);

    return NextResponse.json(
      { message: "Joined successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to add subscriber:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
