"use client";
import { useState } from "react";
import axios from "axios";

export default function NewItemPage() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await axios.post("/api/items", { name, content });
    if (response.status === 201) {
      alert("Item created successfully!");
      setName("");
      setContent("");
    } else {
      alert("Failed to create item: " + response.data.message);
    }
  };
  return (
    <form
      method="POST"
      onSubmit={handleSubmit}
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
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg 
          focus:ring-brand focus:border-brand block w-full px-2.5 py-2 shadow-xs"
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
          className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-lg 
          focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs "
        ></textarea>
      </div>

      <button
        type="submit"
        className="inline-block px-5 py-2 mx-auto mt-4 text-white bg-blue-600 rounded-full cursor-pointer
        hover:bg-blue-700 md:mx-0"
      >
        Submit
      </button>
    </form>
  );
}
