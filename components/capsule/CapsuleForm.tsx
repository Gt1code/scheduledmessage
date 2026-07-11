"use client";

import { useState, useRef } from "react";
import { createCapsule } from "@/lib/capsules";
import { CapsuleType, DeliveryChannel } from "@/types/capsule";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";

export default function CapsuleForm() {
  const [title, setTitle] = useState("");
  const [type, setType] = useState<CapsuleType>("text");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [channel, setChannel] = useState<DeliveryChannel>("email");
  const [recipientContact, setRecipientContact] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [eventTag, setEventTag] = useState("");
  const [senderName, setSenderName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function uploadMedia(file: File): Promise<string> {
    const fileExt = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${fileExt}`;

    const { error: uploadError } = await supabase.storage
      .from("capsule-media")
      .upload(fileName, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from("capsule-media")
      .getPublicUrl(fileName);

    return data.publicUrl;
  }

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setIsSubmitting(true);

    let mediaUrl: string | undefined;

    if (type !== "text" && file) {
      mediaUrl = await uploadMedia(file);
    }

    try {
      await createCapsule({
        title,
        type,
        content,
        mediaUrl,
        deliveryDate,
        channel,
        recipientContact,
        isPublic,
        eventTag: eventTag || undefined,
        senderName,
      });

      toast.success("Capsule scheduled!", {
        description: "It will be delivered on your chosen date.",
        position: "top-center",
      });

      resetForm();
    } catch (err) {
      toast.error("Something went wrong creating your capsule.", {
        position: "top-center",
      });
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  }

  function resetForm() {
    setTitle("");
    setContent("");
    setFile(null);
    setDeliveryDate("");
    setRecipientContact("");
    setIsPublic(false);
    setEventTag("");
    setSenderName("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 ">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as CapsuleType)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="text">Text</option>
          <option value="audio">Audio</option>
          <option value="video">Video</option>
          <option value="image">Image</option>
        </select>
      </div>

      {type !== "text" && (
        <div>
          <label className="block text-sm font-medium mb-1">
            Upload {type}
          </label>
          <input
            type="file"
            accept={
              type === "image"
                ? "image/*"
                : type === "video"
                  ? "video/*"
                  : "audio/*"
            }
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="w-full border rounded-md px-3 py-2 cursor-pointer"
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium mb-1">
          {type === "text" ? "Message" : "Caption"}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={4}
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Delivery Date</label>
        <input
          type="date"
          value={deliveryDate}
          onChange={(e) => setDeliveryDate(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Delivery Channel
        </label>
        <select
          value={channel}
          onChange={(e) => setChannel(e.target.value as DeliveryChannel)}
          className="w-full border rounded-md px-3 py-2"
        >
          <option value="email">Email</option>
          <option value="sms">SMS</option>
          <option value="push">Push</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Recipient Contact
        </label>
        <input
          value={recipientContact}
          onChange={(e) => setRecipientContact(e.target.value)}
          required
          placeholder="sundaygodstimegt1@gmail.com or phone number"
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Your Name</label>
        <input
          value={senderName}
          onChange={(e) => setSenderName(e.target.value)}
          required
          className="w-full border rounded-md px-3 py-2"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          id="isPublic"
        />
        <label htmlFor="isPublic" className="text-sm">
          Add to a public time-capsule wall
        </label>
      </div>

      {isPublic && (
        <div>
          <label className="block text-sm font-medium mb-1">Event Tag</label>
          <input
            value={eventTag}
            onChange={(e) => setEventTag(e.target.value)}
            placeholder="e.g. school-2026, wedding-jane-tom"
            className="w-full border rounded-md px-3 py-2"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black text-white rounded-md py-2 disabled:opacity-50"
      >
        {isSubmitting ? "Sealing..." : "Seal Capsule"}
      </button>
    </form>
  );
}
