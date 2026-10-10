import { getCatagories } from "@/lib/api";
import { Category } from "@/types/types";
import Link from "next/link";

const NavLinks = async () => {
  const catagories = await getCatagories();
  console.log("Nav Link data: ", catagories);

  return (
    <div className="max-w-7xl mx-auto sm:mx-36 py-3 flex items-start justify-start gap-10">
      {catagories.map((catagory: Category) => (
        <Link href={`/category/${catagory.slug}`} key={catagory.id}>
          <div className="flex gap-1.5">
            <span>{catagory.icon}</span>
            <span className="invisible sm:visible">{catagory.nameBn}</span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NavLinks;
