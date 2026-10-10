import Hero from "@/components/section/Hero";
import UpDown from "@/components/section/UpDown";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense
        fallback={
          <div className="flex min-h-50 items-center justify-center bg-[#EFF5F0]">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#dfe8df] border-t-green-600" />
          </div>
        }
      >
        <UpDown />
      </Suspense>
    </div>
  );
}
