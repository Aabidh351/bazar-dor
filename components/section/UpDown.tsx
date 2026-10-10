import { getProducts } from "@/lib/api";
import { MarqueeType } from "@/types/types";
import ProductCard from "../card/ProductCard";

const UpDown = async () => {
  const products: MarqueeType[] = await getProducts();

  const rise = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);
  const fall = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-3.25 py-4 text-[#263129] sm:px-5 sm:py-5 lg:px-3.25">
      <div className="mx-auto max-w-6xl space-y-9">
        <div>
          <div className="text-2xl font-bold text-center sm:text-start my-3 sm:my-5">
            <span className="text-red-700">▲</span>আজ দাম বেড়েছে
          </div>
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {rise.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-center sm:text-start my-3 sm:my-5">
            <span className="text-green-700">▼</span>আজ দাম কমেছে
          </div>
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {fall.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div>
          <div className="text-2xl font-bold text-center sm:text-start">
            সব পণ্য
          </div>
          <div className="text-md text-center sm:text-start py-3.5">
            মোট {products.length.toLocaleString("bn-Bn")}টি পণ্য দেখানো হচ্ছে
          </div>
          <div className="grid grid-col sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpDown;
