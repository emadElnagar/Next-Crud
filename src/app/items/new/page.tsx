"use client";
import { Fragment, useState } from "react";
import axios from "axios";

export default function NewItemPage() {
  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await axios.post("/api/items", {
        name,
        content,
      });

      setMessage("Item created successfully");
      setName("");
      setContent("");
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Internal server error",
      );
    }

    setLoading(false);
  };
  return (
    <Fragment>
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
      {/* Success Message */}
      {message && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mt-4"
          role="alert"
        >
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline">{message}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg
              className="fill-current h-6 w-6 text-green-500"
              role="button"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <title>Close</title>
              <path
                d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0
              1.698z"
              />
            </svg>
          </span>
        </div>
      )}
      {/* Error Message */}
      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4"
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
    </Fragment>
  );
}
