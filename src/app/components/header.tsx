import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav className="bg-cyan-500 flex justify-between items-center p-4 text-white">
        <h1>Crud App</h1>
        <Link
          href="#_"
          className="inline-block px-5 py-2 mx-auto text-white bg-blue-600 rounded-full hover:bg-blue-700 md:mx-0"
        >
          New Item
        </Link>
      </nav>
    </header>
  );
}
