"use client";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function UpdateItemPage() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  return (
    <div className="m-8">
      <h1 className="text-3xl text-heading text-center mb-4">
        Update Item Page
      </h1>
      <p className="text-center">
        This page will allow you to update an existing item. You can edit the
        name and content of the item and save the changes.
      </p>
      <form
        method="POST"
        className="max-w-md mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md"
      >
        <div className="mt-4">
          <label
            htmlFor="name"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Item name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none 
          focus:shadow-outline"
            placeholder="Item name"
            required
          />
        </div>
        <div className="mt-4">
          <label
            htmlFor="content"
            className="block mb-2.5 text-sm font-medium text-heading"
          >
            Item content
          </label>
          <textarea
            id="content"
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight 
          focus:outline-none focus:shadow-outline"
            placeholder="Item content"
          ></textarea>
        </div>

        <button
          type="submit"
          className="inline-block px-5 py-2 mx-auto mt-4 text-white bg-blue-600 rounded-full cursor-pointer
        hover:bg-blue-700 md:mx-0"
          disabled={loading}
        >
          {loading ? "Creating..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
