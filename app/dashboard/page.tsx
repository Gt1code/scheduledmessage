import { getCapsules } from "@/lib/capsules";
import CapsuleDashboard from "@/components/capsule/CapsuleDashboard";
import Link from "next/link";
import { Plus } from "lucide-react";

const DashboardPage = async () => {
  const capsules = await getCapsules();

  return (
    <main className="w-full flex items-center justify-center mx-auto px-4 py-8">
      <div className="w-full p-6 max-w-4xl flex flex-col gap-6 items-center justify-center">
        <div className="flex justify-between items-center mb-6 w-full">
          <h1 className="text-2xl font-bold">My Capsules</h1>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-neutral-700 active:scale-[0.98]"
          >
            <Plus className="h-4 w-4" />
            Create New Capsule
          </Link>
        </div>

        <CapsuleDashboard initialCapsules={capsules} />
      </div>
    </main>
  );
};

export default DashboardPage;
