"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, SubmitEvent } from "react";
import { authClient } from "@/lib/auth-client";
import PasswordField from "@/components/PasswordFields";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);

    const form = new FormData(event.currentTarget);

    try {
      const result = await authClient.signIn.email({
        email: String(form.get("email") ?? "").trim(),
        password: String(form.get("password") ?? ""),
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "লগইন করা যায়নি।");
        return;
      }

      router.push("/");
      router.refresh();
    } catch {
      setError("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setPending(false);
    }
  }

  async function socialLogin(provider: "google" | "github") {
    setError("");
    setPending(true);

    try {
      const result = await authClient.signIn.social({
        provider,
        callbackURL: "/",
      });

      if (result.error) {
        setError(result.error.message || "লগইন করা যায়নি।");
        setPending(false);
      }
    } catch {
      setError("লগইন শুরু করা যায়নি। আবার চেষ্টা করুন।");
      setPending(false);
    }
  }

  return (
    <main
      lang="bn"
      className="flex min-h-[80vh] items-center justify-center bg-[#f0f5f1] px-4 py-8 text-[#202923]"
    >
      <section className="w-full max-w-89.25 rounded-2xl border border-[#e0e9e1] bg-[#fbfdfb] p-5">
        <h1 className="text-center text-2xl font-extrabold">সাইন ইন করুন</h1>
        <p className="mb-6 mt-1 text-center text-xs text-[#758078]">
          আপনার অ্যাকাউন্টে প্রবেশ করুন।
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium">
              ইমেইল
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              disabled={pending}
              placeholder="you@example.com"
              className="h-9 w-full rounded-lg border border-[#e0e9e1] bg-transparent px-3 text-xs outline-none focus:border-green-600"
            />
          </div>

          <div>
            <PasswordField
              id="password"
              name="password"
              label="পাসওয়ার্ড"
              placeholder="পাসওয়ার্ড দিন"
              autoComplete="new-password"
              required
              minLength={8}
              maxLength={128}
              disabled={pending}
            />
          </div>

          {error && (
            <p role="alert" className="text-xs text-red-600">
              {error}
            </p>
          )}

          <button
            disabled={pending}
            className="h-9 w-full rounded-lg bg-[#07883f] text-xs font-bold text-white hover:bg-[#067535] disabled:opacity-60"
          >
            {pending ? "অপেক্ষা করুন..." : "সাইন ইন করুন"}
          </button>
        </form>

        <div className="my-4 text-center text-xs text-[#758078]">অথবা</div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            disabled={pending}
            onClick={() => socialLogin("google")}
            className="flex h-8.75 items-center justify-center gap-1.5 rounded-lg border border-[#e0e9e1] px-2 text-[11px] font-semibold hover:bg-[#f0f5f1] disabled:opacity-60"
          >
            <GoogleIcon />
            Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={() => socialLogin("github")}
            className="flex h-8.75 items-center justify-center gap-1.5 rounded-lg border border-[#e0e9e1] px-2 text-[11px] font-semibold hover:bg-[#f0f5f1] disabled:opacity-60"
          >
            <GitHubIcon />
            GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="mt-5 text-center text-xs">
          অ্যাকাউন্ট নেই?{" "}
          <Link
            href="/signup"
            className="font-medium text-[#07883f] hover:underline"
          >
            অ্যাকাউন্ট তৈরি করুন
          </Link>
        </p>
      </section>
    </main>
  );
}
function GoogleIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 48 48"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path
        fill="#4285F4"
        d="M43.6 24.5c0-1.4-.1-2.8-.4-4.1H24v7.8h11a9.4 9.4 0 0 1-4.1 6.2v5.1h6.6c3.9-3.6 6.1-8.8 6.1-15Z"
      />
      <path
        fill="#34A853"
        d="M24 44c5.5 0 10.1-1.8 13.5-4.9l-6.6-5.1c-1.8 1.2-4 2-6.9 2-5.3 0-9.8-3.6-11.4-8.4H5.8v5.2A20 20 0 0 0 24 44Z"
      />
      <path
        fill="#FBBC05"
        d="M12.6 27.6a12 12 0 0 1 0-7.2v-5.2H5.8a20 20 0 0 0 0 17.6l6.8-5.2Z"
      />
      <path
        fill="#EA4335"
        d="M24 12c3 0 5.7 1 7.8 3.1l5.8-5.8C34.1 5.9 29.5 4 24 4A20 20 0 0 0 5.8 15.2l6.8 5.2C14.2 15.6 18.7 12 24 12Z"
      />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="h-3.5 w-3.5 shrink-0"
    >
      <path d="M12 .9a11.1 11.1 0 0 0-3.5 21.6c.6.1.8-.3.8-.6v-2.1c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.5 1.2-3.4-.1-.3-.5-1.6.1-3.3 0 0 1-.3 3.5 1.3a12 12 0 0 1 6.4 0c2.4-1.6 3.5-1.3 3.5-1.3.7 1.7.3 3 .1 3.3.8.9 1.2 2 1.2 3.4 0 4.8-2.9 5.9-5.6 6.2.4.4.8 1 .8 2.1v3.1c0 .3.2.7.8.6A11.1 11.1 0 0 0 12 .9Z" />
    </svg>
  );
}
