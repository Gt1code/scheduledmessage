"use client";

import { useState } from "react";
import { Capsule } from "@/types/capsule";
import { updateCapsuleDate } from "@/lib/capsules";
import { MoveRight, MoveLeft } from "lucide-react";

interface DateSchedulerProps {
  capsules: Capsule[];
  onUpdate: () => void;
}

// get all the days in a month
function getMonthDays(year: number, month: number) {
  const days: Date[] = [];
  const date = new Date(year, month, 1);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}

export default function DateScheduler({
  capsules,
  onUpdate,
}: DateSchedulerProps) {
  const today = new Date();
  const [viewDate, setViewDate] = useState(today);
  const days = getMonthDays(viewDate.getFullYear(), viewDate.getMonth());

  // For each rendered calendar cell, this filters the full capsules array down to only the ones whose deliveryDate falls on that specific day
  function capsulesForDay(day: Date) {
    return capsules.filter(
      (c) => new Date(c.deliveryDate).toDateString() === day.toDateString(),
    );
  }

  function handleDrop(e: React.DragEvent, day: Date) {
    e.preventDefault();
    const capsuleId = e.dataTransfer.getData("capsuleId");
    if (!capsuleId) return;
    updateCapsuleDate(capsuleId, day.toISOString()).then(onUpdate);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          className="flex items-center justify-center p-2"
          onClick={() =>
            setViewDate(
              new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1),
            )
          }
        >
          <MoveLeft className="h-4 w-4" strokeWidth={2.3} />
        </button>
        <span className="font-semibold">
          {viewDate.toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <button
          className="flex items-center justify-center p-2"
          onClick={() =>
            setViewDate(
              new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1),
            )
          }
        >
          <MoveRight className="h-4 w-4" strokeWidth={2.3} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1">
        {days.map((day) => (
          <div
            key={day.toISOString()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, day)}
            className="border rounded-md p-2 min-h-20 text-xs"
          >
            <div className="font-medium">{day.getDate()}</div>

            {capsulesForDay(day).map((c) => (
              <div
                key={c.id}
                draggable
                onDragStart={(e) => e.dataTransfer.setData("capsuleId", c.id)}
                className={`${c.status === "delivered" ? "bg-green-100" : "bg-amber-100"} mt-1  rounded px-1 py-0.5 cursor-move truncate`}
              >
                {c.title}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
