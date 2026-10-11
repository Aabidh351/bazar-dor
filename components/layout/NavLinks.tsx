// components/NavLinks.tsx
import { getCatagories } from "@/lib/api";
import { Category } from "@/types/types";
import CategoryLink from "./CategoryLinks";

const NavLinks = async () => {
  const catagories: Category[] = await getCatagories();

  return (
    <div className="max-w-7xl mx-auto sm:mx-36 py-1 sm:py-3 flex items-center sm:items-start justify-start gap-2 sm:gap-8 md:gap-10">
      {catagories.map((catagory: Category) => (
        <CategoryLink key={catagory.id} category={catagory} />
      ))}
    </div>
  );
};

export default NavLinks;
