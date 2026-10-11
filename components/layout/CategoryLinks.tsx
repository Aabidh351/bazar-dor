"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Category } from "@/types/types";

interface CategoryLinkProps {
  category: Category;
}

export default function CategoryLink({ category }: CategoryLinkProps) {
  const pathname = usePathname();
  const targetHref = `/category/${category.slug}`;
  const isActive = pathname === targetHref;

  return (
    <Link href={targetHref} aria-current={isActive ? "page" : undefined}>
      <div className="flex">
        <div
          className={`${isActive ? "sm:bg-green-700" : ""} flex sm:gap-1.5 sm:py-2 sm:px-4 rounded-lg`}
        >
          <span className={`${isActive ? "bg-green-700 rounded-md" : ""}`}>
            {category.icon}
          </span>
          <span
            className={`invisible sm:visible transition-colors ${
              isActive ? "text-white" : "hover:text-green-700 text-gray-700"
            }`}
          >
            {category.nameBn}
          </span>
        </div>
      </div>
    </Link>
  );
}
