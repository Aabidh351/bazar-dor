import { getCatagories } from "@/lib/api";
import { Category } from "@/types/types";
import Link from "next/link";

const NavLinks = async () => {
  const catagories: Category[] = await getCatagories();
  return (
    <div className="max-w-7xl mx-auto sm:mx-36 py-3 sm:py-5 flex items-start justify-start gap-2 sm:gap-8 md:gap-10">
      {catagories.map((catagory: Category) => (
        <Link href={`/category/${catagory.slug}`} key={catagory.id}>
          <div className="flex sm:gap-1.5">
            <span>{catagory.icon}</span>
            <span className="invisible sm:visible hover:text-green-700">
              {catagory.nameBn}
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
