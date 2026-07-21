import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

function buildMediaHtml(capsule: any): string {
  if (!capsule.mediaUrl) return "";

  switch (capsule.type) {
    case "image":
      return `
        <div style="margin: 16px 0;">
          <img
            src="${capsule.mediaUrl}"
            alt="${capsule.title}"
            style="max-width: 100%; border-radius: 8px; display: block;"
          />
        </div>
      `;

    case "video":
      return `
        <div style="margin: 16px 0; text-align: center;">
          <a
            href="${capsule.mediaUrl}"
            style="display: inline-block; padding: 12px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 6px;"
          >
            Watch your video capsule
          </a>
        </div>
      `;

    case "audio":
      return `
        <div style="margin: 16px 0; text-align: center;">
          <a
            href="${capsule.mediaUrl}"
            style="display: inline-block; padding: 12px 20px; background: #000; color: #fff; text-decoration: none; border-radius: 6px;"
          >
            Listen to your audio capsule
          </a>
        </div>
      `;

    default:
      return "";
  }
}

export async function POST(request: Request) {
  const { capsule } = await request.json();

  if (capsule.channel !== "email") {
    return NextResponse.json({ skipped: true });
  }

  const mediaHtml = buildMediaHtml(capsule);

  const { error } = await resend.emails.send({
    from: "Time Capsule <onboarding@resend.dev>",
    to: capsule.recipientContact,
    subject: `${capsule.title}`,
    html: `
      <h2>${capsule.title}</h2>
      <div>
        ${mediaHtml}
      </div>
      <p>${capsule.content}</p>
      <p style="color:#888; font-size:12px;">
        Sent by ${capsule.senderName} via Time Capsule
      </p>
    `,
  });

  if (error) {
    // console.error("Resend error:", error);
    return NextResponse.json({ error }, { status: 500 });
  }

  return NextResponse.json({ sent: true });
}
