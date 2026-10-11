"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { authToasts } from "@/lib/toast";

type ProfileDashboardProps = {
  user: {
    name: string;
    email: string;
    image?: string | null;
  };
};

export default function ProfileDashboard({ user }: ProfileDashboardProps) {
  const router = useRouter();

  const [name, setName] = useState(user.name ?? "");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const handleUpdate: React.ComponentProps<"form">["onSubmit"] = async (
    event,
  ) => {
    if (!event) return;
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setIsError(true);
      setMessage("আপনার নাম লিখুন।");
      return;
    }

    if (trimmedName.length > 100) {
      setIsError(true);
      setMessage("নাম ১০০ অক্ষরের মধ্যে হতে হবে।");
      return;
    }

    setIsUpdating(true);
    setMessage("");
    setIsError(false);

    try {
      const { error } = await authClient.updateUser({
        name: trimmedName,
      });

      if (error) {
        setIsError(true);
        setMessage(error.message || "নাম আপডেট করা যায়নি।");
        return;
      }
      authToasts.updateSuccess();

      setName(trimmedName);
      setMessage("আপনার নাম সফলভাবে আপডেট হয়েছে।");
      router.refresh();
    } catch {
      setIsError(true);
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsUpdating(false);
    }
  };

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        authToasts.signOutFailed();
        setIsError(true);
        setMessage("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }
      authToasts.signOutSuccess();
      router.replace("/");
      router.refresh();
    } catch {
      setIsError(true);
      setMessage("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile section */}
      <section className="rounded-2xl border border-[#e0e9e1] bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            {user.image ? (
              <Image
                src={user.image}
                alt=""
                width={64}
                height={64}
                className="h-16 w-16 shrink-0 rounded-full border border-[#e0e9e1] object-cover"
              />
            ) : (
              <div
                aria-hidden="true"
                className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#e0f2e5] text-xl font-bold text-[#08783A]"
              >
                {(user.name || user.email || "?").charAt(0).toUpperCase()}
              </div>
            )}

            <div className="min-w-0">
              <h2 className="truncate text-lg font-bold text-[#202820]">
                {user.name || "নাম দেওয়া হয়নি"}
              </h2>
              <p className="mt-1 break-all text-sm text-gray-600">
                {user.email}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            disabled={isSigningOut}
            className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-xl border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.8}
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10 17l5-5-5-5m5 5H3m9-9h5a2 2 0 012 2v14a2 2 0 01-2 2h-5"
              />
            </svg>
            {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
          </button>
        </div>
      </section>

      {/* Update section */}
      <section className="rounded-2xl border border-[#e0e9e1] bg-white p-5 sm:p-6">
        <h2 className="text-lg font-bold text-[#202820]">তথ্য</h2>

        <form onSubmit={handleUpdate} className="mt-5">
          <label
            htmlFor="profile-name"
            className="mb-2 block text-sm font-semibold text-[#202820]"
          >
            নাম
          </label>

          <input
            id="profile-name"
            name="name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={100}
            required
            autoComplete="name"
            placeholder="আপনার নাম লিখুন"
            className="w-full rounded-xl border border-[#d5e2d7] bg-white px-4 py-3 text-sm text-[#202820] outline-none transition placeholder:text-gray-400 focus:border-[#05893E] focus:ring-2 focus:ring-[#05893E]/15"
          />

          {message && (
            <p
              role="status"
              aria-live="polite"
              className={`mt-3 text-sm ${
                isError ? "text-red-600" : "text-[#08783A]"
              }`}
            >
              {message}
            </p>
          )}

          <div className="mt-5 flex justify-end">
            <button
              type="submit"
              disabled={isUpdating || name.trim() === user.name}
              className="rounded-xl border border-[#08783A] bg-[#05893E] px-6 py-2.5 text-sm font-bold text-white shadow-[0_5px_5px_rgba(5,137,62,0.2)] transition-all duration-200 hover:bg-[#047735] active:translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isUpdating ? "আপডেট হচ্ছে..." : "আপডেট"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
