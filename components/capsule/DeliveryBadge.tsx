import { CapsuleStatus } from "@/types/capsule";

interface DeliveryBadgeProps {
  status: CapsuleStatus;
}

export default function DeliveryBadge({ status }: DeliveryBadgeProps) {
  const isDelivered = status === "delivered";

  return (
    <span
      className={`text-xs font-medium px-2 py-0.5 rounded whitespace-nowrap ${
        isDelivered
          ? "bg-green-100 text-green-700"
          : "bg-amber-100 text-amber-700"
      }`}
    >
      {isDelivered ? "Delivered" : "Locked"}
    </span>
  );
}
