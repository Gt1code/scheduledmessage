export const dynamic = "force-dynamic";

import { getPublicCapsulesByEvent } from "@/lib/capsules";
import WallGrid from "@/components/wall/WallGrid";
import Link from "next/link";

interface WallPageProps {
  params: Promise<{ eventTag: string }>;
}

export default async function WallPage({ params }: WallPageProps) {
  const { eventTag } = await params;
  const capsules = await getPublicCapsulesByEvent(eventTag);

  return (
    <main className="w-full min-h-screen bg-(--capsule-bg) flex justify-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-5xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold tracking-widest uppercase text-(--capsule-muted)">
              {eventTag.replace(/-/g, " ")}
            </span>
            <h1 className="text-2xl font-bold text-(--capsule-ink) mt-0.5">
              Time Capsule Wall
            </h1>
          </div>

          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-md bg-(--capsule-ink) px-5 py-2.5 text-sm font-medium text-(--capsule-bg) transition-transform active:scale-[0.98] hover:opacity-90"
          >
            View my capsules
          </Link>
        </div>

        <WallGrid capsules={capsules} />
      </div>
    </main>
  );
}
