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
  if (req.method === "Get") {
    const items = await Item.find({});
    res.status(200).json(items);
  }
}
