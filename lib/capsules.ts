import { supabase } from "./supabase";
import { Capsule } from "@/types/capsule";

function toCapsule(row: any): Capsule {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    content: row.content,
    mediaUrl: row.media_url,
    createdAt: row.created_at,
    deliveryDate: row.delivery_date,
    status: row.status,
    channel: row.channel,
    recipientContact: row.recipient_contact,
    isPublic: row.is_public,
    eventTag: row.event_tag,
    senderName: row.sender_name,
  };
}

export async function createCapsule(
  capsule: Omit<Capsule, "id" | "createdAt" | "status">,
) {
  const { data, error } = await supabase
    .from("capsules")
    .insert({
      title: capsule.title,
      type: capsule.type,
      content: capsule.content,
      media_url: capsule.mediaUrl,
      delivery_date: capsule.deliveryDate,
      status: "locked",
      channel: capsule.channel,
      recipient_contact: capsule.recipientContact,
      is_public: capsule.isPublic,
      event_tag: capsule.eventTag,
      sender_name: capsule.senderName,
    })
    .select()
    .single();

  if (error) throw error;
  return data as Capsule;
}

export async function getCapsules() {
  const { data, error } = await supabase
    .from("capsules")
    .select("*")
    .order("delivery_date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(toCapsule);
}

export async function getAllPublicCapsules() {
  const { data, error } = await supabase
    .from("capsules")
    .select("*")
    .eq("is_public", true)
    .order("delivery_date", { ascending: true });

  if (error) throw error;
  return (data ?? []).map(toCapsule);
}

export async function getPublicCapsulesByEvent(eventTag: string) {
  const { data, error } = await supabase
    .from("capsules")
    .select("*")
    .eq("event_tag", eventTag)
    .eq("is_public", true);

  if (error) throw error;
  return (data ?? []).map(toCapsule);
}

export async function updateCapsuleDate(id: string, newDate: string) {
  const { error } = await supabase
    .from("capsules")
    .update({ delivery_date: newDate })
    .eq("id", id);

  if (error) throw error;
}
