import { toast } from "sonner";

export const authToasts = {
  signInSuccess: () =>
    toast.success("সাইন ইন সফল হয়েছে!"),

  signInFailed: () =>
    toast.error("সাইন ইন ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"),

  signUpSuccess: () =>
    toast.success("সাইন আপ সফল হয়েছে!"),

  signUpFailed: () =>
    toast.error("সাইন আপ ব্যর্থ হয়েছে। আবার চেষ্টা করুন।"),

  signOutSuccess: () =>
    toast.success("সাইন আউট সফল হয়েছে!"),

  signOutFailed: () =>
    toast.error("সাইন আউট করা যায়নি। আবার চেষ্টা করুন।"),

    updateSuccess: () =>
    toast.success("তথ্য সফলভাবে আপডেট হয়েছে!"),

    accessFailed: () =>
    toast.error("পেইজটি দেখতে আগে সাইন ইন করুন।"),
};