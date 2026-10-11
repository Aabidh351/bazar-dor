import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-[#EFF5F0] px-4 py-12">
      <div className="w-full max-w-xl rounded-3xl border border-[#DDE7DF] bg-[#FAFCFA] px-6 py-12 text-center shadow-sm sm:px-12">
        <div className="mx-auto mb-6 flex justify-center">
          <Image
            src="/sad.png"
            alt="পাতা খুঁজে পাওয়া যায়নি"
            width={110}
            height={90}
            className="h-24 w-auto object-contain sm:w-52"
            priority
          />
        </div>

        <p className="text-sm font-semibold tracking-widest text-[#05893E]">
          ৪০৪ — পৃষ্ঠা পাওয়া যায়নি
        </p>

        <h1 className="mt-4 text-3xl font-bold text-[#202820] sm:text-4xl">
          ওহ! এখানে কিছু নেই!
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#68716A] sm:text-base">
          দুঃখিত, আপনি যে পৃষ্ঠাটি খুঁজছেন সেটি পাওয়া যায়নি। হয়তো ঠিকানাটি ভুল,
          অথবা পৃষ্ঠাটি সরিয়ে ফেলা হয়েছে। চলুন, আবার বাজারের মূল পাতায় ফিরে যাই।
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-[#05893E] px-6 py-3 font-semibold text-white shadow-[0_3px_4px_rgba(5,137,62,0.25)] transition-colors hover:bg-[#047735] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E]"
        >
          <span aria-hidden="true">←</span>
          হোম পেজে ফিরে যান
        </Link>
      </div>
    </main>
  );
}
