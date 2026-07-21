import { Capsule } from "@/types/capsule";
import { supabase } from "./supabase";

export async function checkAndDeliverCapsules(capsules: Capsule[]) {
  const now = new Date();
  //   check for locked capsules that are past their delivery date
  const due = capsules.filter(
    (c) => c.status === "locked" && new Date(c.deliveryDate) <= now,
  );

  if (due.length === 0) return [];

  const results = await Promise.allSettled(
    due.map((capsule) =>
      fetch("/api/deliver", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ capsule }),
      }),
    ),
  );

  results.forEach((result) => {
    if (result.status === "rejected") {
      // console.error(`Failed to send capsule "${due[i].title}":`, result.reason);
    }
  });

  //   then the status is updated to "delivered"
  const { error } = await supabase
    .from("capsules")
    .update({ status: "delivered" })
    .in(
      "id",
      due.map((c) => c.id),
    );

  if (error) throw error;

  return due;
}
