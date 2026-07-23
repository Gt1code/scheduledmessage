"use client";

import { useEffect, useState, useRef } from "react";
import { Capsule } from "@/types/capsule";
import { getCapsules } from "@/lib/capsules";
import { checkAndDeliverCapsules } from "@/lib/delivery";
import CapsuleCard from "./CapsuleCard";
import DateScheduler from "./DateScheduler";
import { toast } from "sonner";

type Filter = "all" | "locked" | "delivered";

interface CapsuleDashboardProps {
  initialCapsules: Capsule[];
}

export default function CapsuleDashboard({
  initialCapsules,
}: CapsuleDashboardProps) {
  const [capsules, setCapsules] = useState(initialCapsules);
  const [filter, setFilter] = useState<Filter>("all");
  const hasCheckedDelivery = useRef(false);

  async function refresh() {
    const fresh = await getCapsules();
    setCapsules(fresh);
  }

  useEffect(() => {
    if (hasCheckedDelivery.current) return;
    hasCheckedDelivery.current = true;

    checkAndDeliverCapsules(initialCapsules).then((delivered) => {
      if (delivered.length > 0) {
        delivered.forEach((eachCapsule) =>
          toast.success(`"${eachCapsule.title}" has been delivered!`, {
            position: "top-center",
          }),
        );
        refresh();
      }
    });
  }, []);

  // lengths of each filter
  const counts: Record<Filter, number> = {
    all: capsules.length,
    locked: capsules.filter((c) => c.status === "locked").length,
    delivered: capsules.filter((c) => c.status === "delivered").length,
  };

  const filtered = capsules.filter(
    (eachCapsule) => filter === "all" || eachCapsule.status === filter,
  );

  return (
    <div className="space-y-8 w-full">
      <div className="flex gap-2">
        {(["all", "locked", "delivered"] as Filter[]).map((filt) => (
          <button
            key={filt}
            onClick={() => setFilter(filt)}
            className={`px-3 py-1.5 cursor-pointer rounded-md text-sm font-medium border transition-colors ${
              filter === filt
                ? "bg-black text-white border-black"
                : "bg-white text-black border-gray-300"
            }`}
          >
            {filt[0].toUpperCase() + filt.slice(1)} ({counts[filt]})
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 ? (
          <p className="text-sm text-gray-500 col-span-full">
            No capsules here yet.
          </p>
        ) : (
          filtered.map((capsule) => (
            <CapsuleCard key={capsule.id} capsule={capsule} />
          ))
        )}
      </div>

      <section>
        <DateScheduler capsules={capsules} onUpdate={refresh} />
      </section>
    </div>
  );
}
