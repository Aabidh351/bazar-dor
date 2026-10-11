"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/card/ProductCard";
import Sorting, { type SortOrder } from "@/components/card/Sorting";
import type { MarqueeType } from "@/types/types";

export default function CategoryProducts({
  products,
}: {
  products: MarqueeType[];
}) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("default");

  const sortedProducts = useMemo(() => {
    const result = [...products];

    if (sortOrder === "asc") {
      result.sort((a, b) => a.today - b.today);
    } else if (sortOrder === "desc") {
      result.sort((a, b) => b.today - a.today);
    }

    return result;
  }, [products, sortOrder]);

  return (
    <>
      <div className="mx-auto my-5 w-full max-w-6xl flex justify-between items-center">
        <span className=" text-gray-600">
          মোট {products.length.toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
        </span>
        <Sorting value={sortOrder} onChange={setSortOrder} />
      </div>

      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
        {sortedProducts.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
}
