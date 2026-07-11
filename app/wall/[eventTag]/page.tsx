import { getPublicCapsulesByEvent } from "@/lib/capsules";
import WallGrid from "@/components/wall/WallGrid";

interface WallPageProps {
  params: Promise<{ eventTag: string }>;
}

export default async function WallPage({ params }: WallPageProps) {
  const { eventTag } = await params;
  const capsules = await getPublicCapsulesByEvent(eventTag);

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-1">Time Capsule Wall</h1>
      <p className="text-sm text-gray-500 mb-6">
        {eventTag.replace(/-/g, " ")}
      </p>
      <WallGrid capsules={capsules} />
    </main>
  );
}
