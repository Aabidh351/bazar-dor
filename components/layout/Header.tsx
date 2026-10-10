import Image from "next/image";
import { Suspense } from "react";
import TodaysDate from "./TodaysDate";
import NavLinks from "./NavLinks";

const Header = () => {
  return (
    <header className="mx-auto max-w-7xl w-full py-4 flex justify-between items-center">
      <div className="flex flex-col items-center justify-center gap-1 sm:flex-row sm:gap-2">
        <Image
          className="bg-green-700 p-2.5 rounded-xl"
          src="/logo-icon.png"
          alt="Bazar Dor"
          width={40}
          height={40}
          priority
        />
        <div className="flex flex-col items-center sm:items-start">
          <span className="text-2xl font-bold">বাজার দর</span>
          <Suspense fallback={<div>Loading Date...</div>}>
            <TodaysDate />
          </Suspense>
        </div>
      </div>
      <NavLinks />
    </header>
  );
};

export default Header;
