import Link from "next/link";
import CapsuleForm from "@/components/capsule/CapsuleForm";

export default function HomePage() {
  return (
    <main className="w-full min-h-screen bg-[var(--capsule-bg)] flex items-start sm:items-center justify-center px-4 py-10 sm:py-16">
      <div className="w-full max-w-xl flex flex-col gap-8 items-center">
        <section className="text-center space-y-4">
          {/* <span className="text-xs font-semibold tracking-widest uppercase text-[var(--capsule-muted)]">
            Time Capsule
          </span> */}
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--capsule-ink)] tracking-tight">
            SCHEDULED MESSAGE TIME CAPSULE
          </h1>
          <p className="text-[var(--capsule-muted)] text-[15px] sm:text-base max-w-md mx-auto leading-relaxed">
            Seal a text, photo, audio, or video capsule and have it delivered
            exactly when you want to yourself, a friend, or a whole graduating
            class.
          </p>
          <div className="pt-1">
            <Link
              href="/dashboard"
              className="text-sm font-medium text-[var(--capsule-ink)] underline underline-offset-4 decoration-[var(--capsule-border)] hover:decoration-[var(--capsule-ink)] transition-colors"
            >
              View my capsules →
            </Link>
          </div>
        </section>

        <section className="w-full">
          <CapsuleForm />
        </section>
      </div>
    </main>
  );
}
