import { Capsule } from "@/types/capsule";
import SafeImage from "./SafeImage";
import { Lock } from "lucide-react";

interface WallCapsuleCardProps {
  capsule: Capsule;
}

export default function WallCapsuleCard({ capsule }: WallCapsuleCardProps) {
  const isRevealed = capsule.status === "delivered";

  return (
    <div className="border flex flex-col rounded-lg p-4 bg-white space-y-2">
      <div className="flex justify-between items-start gap-2">
        <div className="min-w-0">
          <h3 className="font-semibold truncate">{capsule.title}</h3>
          {capsule.eventTag && (
            <span className="text-xs text-gray-400">
              {capsule.eventTag.replace(/-/g, " ")}
            </span>
          )}
        </div>

        {!isRevealed && (
          <span className="text-xs text-gray-400 uppercase tracking-wide shrink-0">
            {capsule.type}
          </span>
        )}
      </div>

      {!isRevealed && (
        <div className="w-full h-40 rounded-md bg-gray-100 flex items-center justify-center">
          <Lock className="h-10 w-10 text-gray-400" />
        </div>
      )}

      {isRevealed && capsule.type === "image" && capsule.mediaUrl && (
        <SafeImage
          src={capsule.mediaUrl}
          alt={capsule.title}
          className="w-full h-40 object-cover rounded-md"
        />
      )}

      {isRevealed && capsule.type === "video" && capsule.mediaUrl && (
        <video
          src={capsule.mediaUrl}
          controls
          preload="metadata"
          className="w-full h-40 rounded-md object-cover"
        />
      )}

      {isRevealed && capsule.type === "audio" && capsule.mediaUrl && (
        <audio src={capsule.mediaUrl} controls className="w-full" />
      )}

      <p className="text-sm flex-1 text-gray-600 line-clamp-3">
        {isRevealed ? capsule.content : "This capsule is still sealed."}
      </p>

      <div className="flex justify-between text-xs text-gray-500 pt-2">
        <span>From {capsule.senderName}</span>
        <span>
          {isRevealed
            ? new Date(capsule.deliveryDate).toLocaleDateString()
            : `Sealed till ${new Date(capsule.deliveryDate).toLocaleDateString()}`}
        </span>
      </div>
    </div>
  );
}
