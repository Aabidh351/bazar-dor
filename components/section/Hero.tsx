import Image from "next/image";
import Link from "next/link";
import TodaysDate from "../layout/TodaysDate";
import { Suspense } from "react";

export default function Hero() {
  return (
    <section className="bg-[#EFF5F0] px-4 py-6 sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col-reverse items-center justify-between gap-8 rounded-[24px] border border-[#DDE7DF] bg-[#FAFCFA] px-5 py-8 sm:px-8 md:flex-row md:px-10 md:py-10">
        <div className="w-full flex-1 text-center md:text-left">
          <span className="inline-block rounded-full bg-[#E0F2E5] px-3 py-1 text-sm font-medium text-[#05893E]">
            <Suspense fallback={<>তারিখ লোড হচ্ছে...</>}>
              <TodaysDate />
            </Suspense>
          </span>

          <h1 className="mt-3 text-2xl font-bold leading-tight tracking-tight text-[#202820] sm:text-3xl lg:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-[#68716A] sm:text-base">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#all-products"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#05893E] px-5 py-3 text-sm font-semibold text-white shadow-[0_3px_4px_rgba(5,137,62,0.3)] transition hover:bg-[#047735]"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        <div className="flex w-full shrink-0 items-center justify-center md:w-65 lg:w-75">
          <Image
            src="/bazar-hero.png"
            alt="বাজারের পণ্য ভর্তি একটি ঝুড়ি"
            width={300}
            height={240}
            priority
            className="w-50 h-auto object-contain sm:w-60 md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
