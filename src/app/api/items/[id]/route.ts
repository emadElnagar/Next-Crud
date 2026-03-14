import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Item from "@/app/models/Item";
import mongoose from "mongoose";

// Get single item
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    await connectToDatabase();

    const { id } = await params;

    // Validate ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ message: "Invalid item id" }, { status: 400 });
    }

    const item = await Item.findById(id).select("-__v").lean();

    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }

    return NextResponse.json({ data: item }, { status: 200 });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json({ message }, { status: 500 });
  }
}

// Update an item by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectToDatabase();
  try {
    const { id } = params;
    const { name, content } = await req.json();
    if (!name || !content) {
      return NextResponse.json(
        { message: "Name and content are required" },
        { status: 400 },
      );
    }
    const item = await Item.findById(id);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    const nameExists = await Item.findOne({ name, _id: { $ne: id } });
    if (nameExists) {
      return NextResponse.json(
        { message: "Item name already exists" },
        { status: 400 },
      );
    }
    item.name = name;
    item.content = content;
    await item.save();
    return NextResponse.json(item);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(message);
  }
}

// Delete an item
export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } },
) {
  await connectToDatabase();
  try {
    const { id } = params;
    const item = await Item.findByIdAndDelete(id);
    if (!item) {
      return NextResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";
    return NextResponse.json(message);
  }
}
