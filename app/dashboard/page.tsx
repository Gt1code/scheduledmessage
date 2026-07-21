export const dynamic = "force-dynamic";

import { getCapsules } from "@/lib/capsules";
import CapsuleDashboard from "@/components/capsule/CapsuleDashboard";
import Link from "next/link";
import { Plus } from "lucide-react";

const DashboardPage = async () => {
  const capsules = await getCapsules();

  return (
    <main className="w-full min-h-screen bg-[var(--capsule-bg)] flex justify-center px-4 py-8 sm:py-10">
      <div className="w-full max-w-4xl flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-[var(--capsule-ink)]">
            My Capsules
          </h1>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href="/wall"
              className="text-sm font-medium text-center text-[var(--capsule-ink)] underline underline-offset-4 decoration-[var(--capsule-border)] hover:decoration-[var(--capsule-ink)] transition-colors py-2 sm:py-0"
            >
              View public wall →
            </Link>

            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-[var(--capsule-ink)] px-5 py-2.5 text-sm font-medium text-[var(--capsule-bg)] transition-transform active:scale-[0.98] hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Create new capsule
            </Link>
          </div>
        </div>

        <CapsuleDashboard initialCapsules={capsules} />
      </div>
    </main>
  );
};

export default DashboardPage;
