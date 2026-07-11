# Scheduled Message Time Capsule

A web app for sending time-locked messages to the future. Create a text, image, audio, or video "capsule," pick a delivery date, and it gets automatically emailed to the recipient once that date arrives.

## Tech Stack

- **Next.js (App Router)** + TypeScript
- **Tailwind CSS**
- **Supabase** — Postgres database, Row Level Security, and file storage
- **Resend** — transactional email delivery

## Features

- Create capsules with text, image, audio, or video content
- Drag-and-drop calendar to schedule/reschedule delivery dates
- Automatic email delivery once a capsule's date is reached
- Dashboard to track locked vs. delivered capsules

## Folder Structure

```
app/
  page.tsx                       Landing page — capsule creation form
  dashboard/
    page.tsx                     "My Capsules" dashboard
  wall/
    [eventTag]/
      page.tsx                   Public time-capsule wall
  api/
    deliver/
      route.ts                   Server route — sends delivery emails via Resend

components/
  capsule/
    CapsuleForm.tsx               Capsule creation form (incl. media upload)
    CapsuleDashboard.tsx          Dashboard state, filters, delivery check
    CapsuleCard.tsx               Single capsule display (owner view)
    DeliveryBadge.tsx             Locked/Delivered status pill
    DateScheduler.tsx             Drag-and-drop delivery date calendar
  wall/
    WallGrid.tsx                  Public wall grid layout
    WallCapsuleCard.tsx           Public capsule display (gated by delivery status)

lib/
  supabase.ts                     Supabase client setup
  capsules.ts                     Capsule CRUD + camelCase/snake_case mapping
  delivery.ts                     Checks due capsules, triggers email, marks delivered

types/
  capsule.ts                      Shared Capsule types
```

## Setup

1. Create a Supabase project and run the schema (table, storage bucket, RLS policies)
2. Create a Resend account and get an API key
3. Add environment variables to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=
   NEXT_PUBLIC_SUPABASE_ANON_KEY=
   RESEND_API_KEY=
   ```
4. Install dependencies and run the dev server:
   ```
   npm install
   npm run dev
   ```

## Known Limitations

- Delivery emails are checked and sent when the dashboard loads, not via a real background scheduler (no cron job yet)
- RLS policies are open for demo purposes and not tied to real user authentication
- Only email delivery is implemented; SMS and push are defined in the schema but not yet implemented
