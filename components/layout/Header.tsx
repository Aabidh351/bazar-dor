import Image from "next/image";
import { Suspense } from "react";
import TodaysDate from "./TodaysDate";
import NavButtons from "./NavButtons";
import Link from "next/link";

const Header = () => {
  return (
    <header className="px-2 md:px-0 md:mx-auto max-w-7xl w-full py-4 flex justify-between items-center">
      <Link href="/">
        <div className="flex gap-1 items-center">
          <Image
            className="bg-green-700 p-2.5 w-10 h-10 rounded-xl"
            src="/logo-icon.png"
            alt="Bazar Dor"
            width={40}
            height={40}
            priority
          />
          <div className="flex flex-col">
            <span className="text-xl md:text-2xl font-bold">বাজার দর</span>
            <Suspense fallback={<div>Loading Date...</div>}>
              <TodaysDate />
            </Suspense>
          </div>
        </div>
      </Link>
      <NavButtons />
    </header>
  );
};

export default Header;
