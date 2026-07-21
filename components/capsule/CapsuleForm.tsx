"use client";

import { useRef, useState } from "react";
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

  async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let mediaUrl: string | undefined;

      if (type !== "text" && file) {
        mediaUrl = await uploadMedia(file);
      }

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

      toast.success("Capsule sealed.", {
        description: "It will be delivered on your chosen date.",
        position: "top-center",
      });

      resetForm();
    } catch (err) {
      toast.error("Something went wrong sealing your capsule.", {
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
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  const inputClass =
    "w-full rounded-md border px-3 py-2.5 text-[15px] bg-[var(--capsule-surface)] text-[var(--capsule-ink)] border-[var(--capsule-border)] placeholder:text-[var(--capsule-muted)] focus:outline-none focus:ring-2 focus:ring-[var(--capsule-accent)]/30 focus:border-[var(--capsule-accent)] transition-colors";

  const labelClass =
    "block text-sm font-medium mb-1.5 text-[var(--capsule-ink)]";

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl mx-auto rounded-xl border border-(--capsule-border) bg-(--capsule-bg) px-5 py-6 sm:px-8 sm:py-8"
    >
      {/* Section: Capsule */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-(--capsule-muted)">
          Capsule
        </h2>

        <div>
          <label className={labelClass}>Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="A name for this capsule"
            className={inputClass}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Type</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as CapsuleType)}
              className={inputClass}
            >
              <option value="text">Text</option>
              <option value="audio">Audio</option>
              <option value="video">Video</option>
              <option value="image">Image</option>
            </select>
          </div>

          {type !== "text" && (
            <div>
              <label className={labelClass}>Upload {type}</label>
              <input
                ref={fileInputRef}
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
                className={`${inputClass} cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-(--capsule-ink) file:text-(--capsule-bg) file:px-3 file:py-1.5 file:text-sm`}
              />
            </div>
          )}
        </div>

        <div>
          <label className={labelClass}>
            {type === "text" ? "Message" : "Caption"}
          </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={4}
            placeholder="What do you want to say?"
            className={`${inputClass} resize-none`}
          />
        </div>
      </div>

      <hr className="my-6 border-(--capsule-border)" />

      {/* Section: Delivery */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-(--capsule-muted)">
          Delivery
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Delivery date</label>
            <input
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Channel</label>
            <select
              value={channel}
              onChange={(e) => setChannel(e.target.value as DeliveryChannel)}
              className={inputClass}
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="push">Push</option>
            </select>
          </div>
        </div>

        <div>
          <label className={labelClass}>Recipient contact</label>
          <input
            value={recipientContact}
            onChange={(e) => setRecipientContact(e.target.value)}
            required
            placeholder="email@example.com or phone number"
            className={inputClass}
          />
        </div>
      </div>

      <hr className="my-6 border-(--capsule-border)" />

      {/* Section: Sender */}
      <div className="space-y-4">
        <h2 className="text-xs font-semibold tracking-widest uppercase text-(--capsule-muted)">
          Sender
        </h2>

        <div>
          <label className={labelClass}>Your name</label>
          <input
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            required
            className={inputClass}
          />
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="h-4 w-4 rounded accent-(--capsule-accent)"
          />
          <span className="text-sm text-(--capsule-ink)">
            Add to a public time-capsule wall
          </span>
        </label>

        {isPublic && (
          <div>
            <label className={labelClass}>Event tag</label>
            <input
              value={eventTag}
              onChange={(e) => setEventTag(e.target.value)}
              placeholder="e.g. school-2026, wedding-jane-tom"
              className={inputClass}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-7 w-full rounded-md bg-(--capsule-ink) text-(--capsule-bg) py-3 text-sm font-semibold tracking-wide uppercase transition-transform active:scale-[0.98] disabled:opacity-50 disabled:active:scale-100"
      >
        {isSubmitting ? "Sealing…" : "Seal Capsule"}
      </button>
    </form>
  );
}
