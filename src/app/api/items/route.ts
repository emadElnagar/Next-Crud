import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Item from "@/app/models/Item";

// Get all items
export async function GET() {
  await connectToDatabase();
  const items = await Item.find();
  return NextResponse.json(items);
}

// Create a new item
export async function POST(req: NextRequest) {
  await connectToDatabase();
  try {
    const { name, content } = await req.json();
    if (!name || !content) {
      return NextResponse.json(
        { message: "Name and content are required" },
        { status: 400 },
      );
    }
    const nameExists = await Item.findOne({ name });
    if (nameExists) {
      return NextResponse.json(
        { message: "Item name already exists" },
        { status: 400 },
      );
    }
    const newItem = new Item({ name, content });
    await newItem.save();
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(message);
  }
}
