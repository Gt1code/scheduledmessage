export type CapsuleType = "text" | "audio" | "video" | "image";
export type CapsuleStatus = "locked" | "delivered";
export type DeliveryChannel = "email" | "sms" | "push";

export interface Capsule {
  id: string;
  title: string;
  type: CapsuleType;
  content: string; // text body, or URL to uploaded media
  mediaUrl?: string;
  createdAt: string; // ISO date
  deliveryDate: string; // ISO date
  status: CapsuleStatus;
  channel: DeliveryChannel;
  recipientContact: string; // email or phone
  isPublic: boolean; // for wall display
  eventTag?: string; // "school-2026", "wedding-jane-tom"
  senderName: string;
}
