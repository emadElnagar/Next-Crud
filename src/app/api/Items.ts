import type { NextApiRequest, NextApiResponse } from "next";
import connectToDatabase from "../lib/mongodb";
import Item, { ItemI } from "../models/Item";

type Data = { message: string } | ItemI[] | ItemI;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  // Connect database
  await connectToDatabase();

  // Get all items
  if (req.method === "GET") {
    const items = await Item.find({});
    res.status(200).json(items);
  }

  // Create a new item
  else if (req.method === "POST") {
    try {
      const { name, content } = req.body;
      if (!name || !content) {
        return res
          .status(400)
          .json({ message: "Name and content are required" });
      }
      const newItem = await Item.create({
        name,
        content,
      });
      res.status(201).json(newItem);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Internal server error";
      return res.status(500).json({ message });
    }
  }
}
