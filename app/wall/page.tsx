export const dynamic = "force-dynamic";

import { getAllPublicCapsules } from "@/lib/capsules";
import WallGrid from "@/components/wall/WallGrid";
import Link from "next/link";

export default async function AllWallsPage() {
  //   const capsules = await getAllPublicCapsules();

  let capsules;
  try {
    capsules = await getAllPublicCapsules();
  } catch (err) {
    console.error("Failed to load public capsules:", err);
    throw err; // still surface it, but now you'll see exactly what it was in your terminal
  }

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex gap-4 justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold mb-1">Public Time Capsule Wall</h1>
        <Link
          href="/dashboard"
          className="text-sm font-medium underline text-gray-700 hover:text-black"
        >
          View My Capsules
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Capsules shared across every event
      </p>

      <WallGrid capsules={capsules} />
    </main>
  );
}
