import Link from "next/link";
import CapsuleForm from "@/components/capsule/CapsuleForm";

export default function HomePage() {
  return (
    <main className="w-full flex items-center justify-center mx-auto  space-y-10">
      <div className="w-full p-6 max-w-3xl flex flex-col gap-6 items-center justify-center">
        <section className="text-center space-y-3">
          <h1 className="text-3xl sm:text-4xl font-bold">
            Scheduled Message Time Capsule
          </h1>
          <p className="text-gray-600">
            Seal a text, photo, audio, or video capsule and have it delivered
            exactly when you want to yourself, a friend, or a whole graduating
            class.
          </p>
          <div className="flex justify-center gap-3 pt-2 text-xl ">
            <Link href="/dashboard" className="underline text-gray-700">
              View My Capsules
            </Link>
          </div>
        </section>

        <section className="w-full border border-black p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Create a Capsule</h2>
          <CapsuleForm />
        </section>
      </div>
    </main>
  );
}
