"use client";

import { useEffect, useState } from "react";
import { Capsule } from "@/types/capsule";
import DeliveryBadge from "./DeliveryBadge";

interface CapsuleCardProps {
  capsule: Capsule;
}

export default function CapsuleCard({ capsule }: CapsuleCardProps) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  const daysLeft = Math.ceil(
    (new Date(capsule.deliveryDate).getTime() - now) / (1000 * 60 * 60 * 24),
  );

  return (
    <div className="border rounded-lg p-4 space-y-2 bg-white flex flex-col gap-1">
      <div className="flex justify-between items-start gap-2">
        <h3 className="font-semibold truncate">{capsule.title}</h3>
        <DeliveryBadge status={capsule.status} />
      </div>

      {capsule.type === "image" && capsule.mediaUrl && (
        <img
          src={capsule.mediaUrl}
          alt={capsule.title}
          width={400}
          height={200}
          className="w-full h-40 object-cover rounded-md"
        />
      )}

      {capsule.type === "video" && capsule.mediaUrl && (
        <video src={capsule.mediaUrl} controls className="w-full rounded-md" />
      )}

      {capsule.type === "audio" && capsule.mediaUrl && (
        <audio src={capsule.mediaUrl} controls className="w-full" />
      )}

      <p className="text-sm text-gray-600 line-clamp-2 flex-1">
        {capsule.content}
      </p>

      <div className="flex justify-between text-xs text-gray-500 pt-2">
        <span>{capsule.type}</span>

        <span>
          {capsule.status === "locked"
            ? daysLeft > 0
              ? `${daysLeft} day${daysLeft === 1 ? "" : "s"} left`
              : "Delivered"
            : new Date(capsule.deliveryDate).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
