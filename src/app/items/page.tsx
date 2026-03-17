"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import { IoPencilSharp } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";
import Link from "next/link";

interface Item {
  _id: string | number;
  name: string;
  content: string;
}

export default function AllItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch all items
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const res = await axios.get("/api/items");
        setItems(res.data);
      } catch (err: unknown) {
        setError(
          (err as { response?: { data?: { message?: string } } }).response?.data
            ?.message || "Failed to fetch items",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);
  return (
    <div className="m-8">
      <h1 className="text-2xl text-center font-bold mb-4">All Items</h1>
      <p className="text-gray-600 text-center">
        This page will display all items.
      </p>
      {/* Loading */}
      {loading && <p className="text-center mt-4">Loading...</p>}
      {/* Error */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{error}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-red-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
            </svg>
          </span>
        </div>
      )}
      {/* Items list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        {items.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded shadow-md overflow-hidden"
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{item.name}</h2>
              <p className="text-gray-700">
                {item.content.length > 200
                  ? item.content.substring(0, 200) + "..."
                  : item.content}
              </p>
              <div className="flex justify-center mt-4">
                <Link href={`/items/${item._id}`}>
                  <FaEye title="View Details" className="cursor-pointer" />
                </Link>
                <Link href={`/items/${item._id}/update`}>
                  <IoPencilSharp title="Edit" className="mx-4 cursor-pointer" />
                </Link>
                <AiFillDelete title="Delete" className="cursor-pointer" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
