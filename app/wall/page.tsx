export const dynamic = "force-dynamic";

import { getAllPublicCapsules } from "@/lib/capsules";
import WallGrid from "@/components/wall/WallGrid";
import Link from "next/link";

export default async function AllWallsPage() {
  let capsules;
  try {
    capsules = await getAllPublicCapsules();
  } catch (err) {
    console.error("Failed to load public capsules:", err);
    throw err;
  }

  return (
    <main className="w-full min-h-screen bg-(--capsule-bg) flex justify-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-(--capsule-ink)">
              Public Time Capsule Wall
            </h1>
            <p className="text-sm text-(--capsule-muted) mt-0.5">
              Capsules shared across every event
            </p>
          </div>

          <Link
            href="/dashboard"
            className="text-sm font-medium text-(--capsule-ink) underline underline-offset-4 decoration-(--capsule-border) hover:decoration-(--capsule-ink) transition-colors"
          >
            View my capsules →
          </Link>
        </div>

        <WallGrid capsules={capsules} />
      </div>
    </main>
  );
}
