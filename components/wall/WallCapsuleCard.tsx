import { Capsule } from "@/types/capsule";

interface WallCapsuleCardProps {
  capsule: Capsule;
}

export default function WallCapsuleCard({ capsule }: WallCapsuleCardProps) {
  const isRevealed = capsule.status === "delivered";

  return (
    <div className="border rounded-lg p-4 bg-white space-y-2">
      <h3 className="font-semibold truncate">{capsule.title}</h3>

      {isRevealed && capsule.type === "image" && capsule.mediaUrl && (
        <img
          src={capsule.mediaUrl}
          alt={capsule.title}
          className="w-full h-40 object-cover rounded-md"
        />
      )}

      {isRevealed && capsule.type === "video" && capsule.mediaUrl && (
        <video src={capsule.mediaUrl} controls className="w-full rounded-md" />
      )}

      {isRevealed && capsule.type === "audio" && capsule.mediaUrl && (
        <audio src={capsule.mediaUrl} controls className="w-full" />
      )}

      <p className="text-sm text-gray-600 line-clamp-3">
        {isRevealed ? capsule.content : "This capsule is still sealed."}
      </p>

      <div className="flex justify-between text-xs text-gray-500 pt-2">
        <span>From {capsule.senderName}</span>
        <span>
          {isRevealed
            ? new Date(capsule.deliveryDate).toLocaleDateString()
            : "Sealed"}
        </span>
      </div>
    </div>
  );
}
