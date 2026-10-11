import NotFound from "@/components/card/NotFound";
import CategoryProducts from "@/components/card/CategoryProducts";
import { getCatagories, getProducts } from "@/lib/api";
import type { Category, MarqueeType } from "@/types/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const products: MarqueeType[] = await getProducts();
  const cats: Category[] = await getCatagories();

  const foundCat = cats.find((c) => c.slug === slug);
  const catProduct = products.filter((p) => p.category === slug);

  if (!foundCat || catProduct.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-[#f0f5f0] px-5 py-5 sm:px-0 sm:py-10">
      <div className="mx-auto flex w-full max-w-6xl items-center rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-3.5">
        <div className="mr-3 text-[40px]">{foundCat.icon}</div>

        <div className="flex flex-col">
          <span className="text-2xl font-bold">{foundCat.nameBn}</span>

          <span className="text-gray-600">
            {catProduct.length.toLocaleString("bn-BD")}টি পণ্যের আজকের দাম ও
            পরিবর্তন
          </span>
        </div>
      </div>

      <div className="mt-6">
        <CategoryProducts products={catProduct} />
      </div>
    </div>
  );
}
