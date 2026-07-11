import { Capsule } from "@/types/capsule";
import WallCapsuleCard from "./WallCapsuleCard";

interface WallGridProps {
  capsules: Capsule[];
}

export default function WallGrid({ capsules }: WallGridProps) {
  if (capsules.length === 0) {
    return (
      <p className="text-sm text-gray-500">
        No public capsules for this event yet.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {capsules.map((capsule) => (
        <WallCapsuleCard key={capsule.id} capsule={capsule} />
      ))}
    </div>
  );
}
