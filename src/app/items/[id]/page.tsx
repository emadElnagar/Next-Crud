import axios from "axios";
import { notFound } from "next/navigation";

interface Item {
  data: {
    _id: string;
    name: string;
    content: string;
  };
}

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getItem(id: string): Promise<Item | null> {
  const response = await axios.get(`http://localhost:3000/api/items/${id}`);

  // Item not found
  if (response.status === 404) {
    return null;
  }

  // Failed to fetch item
  if (response.status !== 200) {
    throw new Error(response.data?.message || "Failed to fetch item");
  }

  return response.data;
}

export default async function SingleItemPage({ params }: PageProps) {
  const item = await getItem((await params).id);

  if (!item) {
    notFound();
  }
  console.log("Fetched item:", item);
  return (
    <div>
      <h1>{item.data.name}</h1>
      <p>{item.data.content}</p>
    </div>
  );
}
