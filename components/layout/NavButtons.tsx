import Link from "next/link";

const NavButtons = () => {
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
};

export default NavButtons;
