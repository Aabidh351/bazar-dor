"use client";

import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AuthRedirectToast() {
  const searchParams = useSearchParams();

  if (searchParams.get("reason") === "auth-required") {
    toast.error("পেইজটি দেখতে আগে সাইন ইন করুন।", {
      id: "auth-required",
    });
  }

  return null;
}
