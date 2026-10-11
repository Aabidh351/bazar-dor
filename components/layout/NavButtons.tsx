"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { authToasts } from "@/lib/toast";

const NavButtons = () => {
  const { data: session, isPending } = authClient.useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        authToasts.signInFailed();
        console.error("Sign out failed:", error.message);
        return;
      }
      authToasts.signOutSuccess();
      setMenuOpen(false);
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed:", error);
    } finally {
      setIsSigningOut(false);
    }
  }

  const user = session?.user;

  if (isPending) {
    return (
      <div
        className="h-9 w-30 animate-pulse rounded-lg bg-gray-100"
        aria-label="লোড হচ্ছে"
      >
        লোড হচ্ছে...
      </div>
    );
  }

  if (!user) {
    return (
      <div>
        <Link
          href="/sign-in"
          className="font-bold hover:text-green-700 active:translate-y-0.5 active:shadow-sm"
        >
          সাইন ইন
        </Link>

        <Link
          href="/sign-up"
          className="border border-[#08783A] bg-[#05893E] rounded-xl font-bold text-white py-2 px-4 ml-2 md:ml-5 shadow-[0_7px_6px_rgba(5,137,62,0.35)] transition-all duration-200 hover:bg-[#047735] active:translate-y-0.5 active:shadow-sm"
        >
          সাইন আপ
        </Link>
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="flex max-w-52 items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-gray-100"
      >
        {user.image ? (
          <Image
            src={user.image}
            alt=""
            width={32}
            height={32}
            className="h-8 w-8 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 font-semibold text-green-800">
            {(user.name || user.email || "?").charAt(0).toUpperCase()}
          </span>
        )}

        <span className="truncate text-sm font-medium">
          {user.name || user.email}
        </span>

        <svg
          aria-hidden="true"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`h-4 w-4 shrink-0 text-gray-500 transition ${
            menuOpen ? "rotate-180" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M5.2 7.5a.75.75 0 011.06 0L10 11.19l3.74-3.69a.75.75 0 111.05 1.07l-4.26 4.2a.75.75 0 01-1.05 0l-4.27-4.2a.75.75 0 010-1.07z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {menuOpen && (
        <>
          <button
            type="button"
            aria-label="মেনু বন্ধ করুন"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setMenuOpen(false)}
          />

          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg"
          >
            <div className="border-b border-gray-100 px-2 pb-3">
              <p className="truncate text-sm font-semibold">{user.name}</p>
              <p className="truncate text-xs text-gray-500">{user.email}</p>
            </div>

            <Link
              href="/dashboard"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center gap-2 rounded-lg px-2 py-2.5 text-sm text-gray-700 hover:bg-gray-50"
            >
              <span aria-hidden="true">👤</span>
              আমার প্রোফাইল
            </Link>

            <button
              type="button"
              role="menuitem"
              disabled={isSigningOut}
              onClick={handleSignOut}
              className="flex w-full items-center gap-2 rounded-lg px-2 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 disabled:opacity-60"
            >
              <span aria-hidden="true">↪</span>
              {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default NavButtons;
