import type { Metadata } from "next";
import { Toaster } from "sonner";
import { Noto_Serif_Bengali } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import NavLinks from "@/components/layout/NavLinks";
import { Suspense } from "react";
import MarqueeSec from "@/components/layout/Marquee";
import Footer from "@/components/layout/Footer";

const NotoSerifBengali = Noto_Serif_Bengali({
  subsets: ["latin", "bengali"],
});

export const metadata: Metadata = {
  title: "বাজার দর",
  description: "Developed by Aabidh351",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${NotoSerifBengali.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <hr className="border-0 border-t border-gray-200" />
        <Suspense
          fallback={
            <div className="text-center py-3 sm:py-5">
              ক্যাটাগরি লোড হচ্ছে...
            </div>
          }
        >
          <NavLinks />
        </Suspense>
        <hr className="border-0 border-t border-gray-200" />
        <Suspense
          fallback={
            <div className="h-8 w-8 block mx-auto animate-spin rounded-full border-4 border-green-700 border-t-transparent"></div>
          }
        >
          <MarqueeSec />
        </Suspense>
        <hr className="border-0 border-t border-gray-200" />
        {children}
        <Toaster position="top-center" richColors closeButton duration={4000} />
        <Footer />
      </body>
    </html>
  );
}
