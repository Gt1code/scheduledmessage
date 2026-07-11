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
    <main className="max-w-5xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6 w-full">
        <h1 className="text-2xl font-bold mb-1">Time Capsule Wall</h1>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-700 active:scale-[0.98]"
        >
          View My Capsules
        </Link>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        {eventTag.replace(/-/g, " ")}
      </p>
      <WallGrid capsules={capsules} />
    </main>
  );
}
