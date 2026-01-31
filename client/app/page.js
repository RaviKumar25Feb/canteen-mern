import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      <div className="flex gap-4">
        <Link
          href="/students"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Students
        </Link>

        <Link
          href="/snacks"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Snacks
        </Link>
      </div>
    </div>
  );
}
