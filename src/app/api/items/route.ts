import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/mongodb";
import Item from "@/app/models/Item";

// Get all items
export async function GET() {
  await connectToDatabase();
  const items = await Item.find();
  return NextResponse.json(items);
}
