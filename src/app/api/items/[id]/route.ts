import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Item from "@/app/models/Item";

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
