import Link from "next/link";
import { notFound } from "next/navigation";
import { getSingleProduct } from "@/lib/api";
import type { Product } from "@/types/types";

const bnNumber = new Intl.NumberFormat("bn-BD", {
  maximumFractionDigits: 2,
});

const formatPrice = (value: number) => bnNumber.format(value);

const getAveragePrice = (min: number, max: number) => (min + max) / 2;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = (await getSingleProduct(slug)) as Product | null;

  if (!product) notFound();

  const marketAverages = product.markets.map((market) =>
    getAveragePrice(market.min, market.max),
  );

  const lowestPrice = Math.min(...marketAverages);
  const highestPrice = Math.max(...marketAverages);
  const averagePrice =
    marketAverages.reduce((sum, price) => sum + price, 0) /
    marketAverages.length;

  const changeColor =
    product.change.dir === "up"
      ? "text-red-600"
      : product.change.dir === "down"
        ? "text-green-600"
        : "text-gray-500";

  const changeIcon =
    product.change.dir === "up"
      ? "▲"
      : product.change.dir === "down"
        ? "▼"
        : "●";

  return (
    <main
      lang="bn"
      className="min-h-screen bg-[#f0f5f1] px-3 py-6 sm:py-0 sm:pt-6 sm:pb-20 text-[#202923] sm:px-6"
    >
      <div className="mx-auto max-w-211">
        <nav
          aria-label="Breadcrumb"
          className="mb-6 flex flex-wrap items-center gap-2.5 text-xs text-gray-600"
        >
          <Link href="/" className="hover:text-green-700">
            হোম
          </Link>
          <span>›</span>
          <Link
            href={`/category/${product.category}`}
            className="hover:text-green-700"
          >
            {product.categoryNameBn}
          </Link>
          <span>›</span>
          <span>{product.nameBn}</span>
        </nav>

        <section className="mb-4.5 flex flex-col items-stretch gap-4 rounded-[13px] border border-[#e1eae2] bg-[#fbfdfb] p-3.5 min-[480px]:flex-row min-[480px]:items-center min-[480px]:justify-between sm:min-h-32.5 sm:gap-5 sm:p-4">
          {" "}
          <div className="flex min-w-0 items-center gap-3">
            <div
              aria-hidden="true"
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[13px] bg-[#f0f5f1] text-2xl sm:h-15 sm:w-15 sm:text-[29px]"
            >
              {product.image}
            </div>

            <div className="min-w-0">
              <h1 className="text-base leading-snug font-bold wrap-break-word min-[480px]:text-lg sm:text-2xl">
                {" "}
                {product.nameBn}
              </h1>

              <p className="mt-1 text-[10px] text-[#69746c] sm:text-xs">
                প্রতি {product.unit === "kg" ? "কেজি" : product.unit} ·{" "}
                {product.categoryNameBn}
              </p>

              <p className="mt-2 text-[10px] sm:text-xs">
                গতকালের দাম: {formatPrice(product.yesterday)} টাকা
              </p>
            </div>
          </div>
          <div className="flex w-full flex-col items-center justify-center rounded-[13px] bg-[#f0f5f1] px-3 py-3 text-center min-[480px]:w-22 min-[480px]:min-w-22 min-[480px]:shrink-0 sm:self-stretch">
            {" "}
            <span className="text-[10px] text-gray-500">আজকের দাম</span>
            <strong className="text-[23px] leading-tight font-bold sm:text-[26px]">
              {formatPrice(product.today)}
            </strong>
            <span className="text-[10px] text-gray-500 sm:text-[11px]">
              টাকা / কেজি
            </span>
            <span className={`mt-1 text-[10px] font-bold ${changeColor}`}>
              {changeIcon} {formatPrice(product.change.pct)}%
            </span>
          </div>
        </section>

        <section className="rounded-[13px] border border-[#e1eae2] bg-[#fbfdfb] p-3.5 sm:p-3.75">
          <h2 className="mb-2.5 text-sm font-bold">দামের সারসংক্ষেপ</h2>

          <div className="grid grid-cols-1 gap-2 min-[480px]:grid-cols-2 lg:grid-cols-3 sm:gap-2.25">
            {" "}
            <SummaryCard
              label="সর্বনিম্ন দাম"
              price={lowestPrice}
              description="সারাদেশে কম বাজার দর"
              color="text-green-600"
            />
            <SummaryCard
              label="সর্বোচ্চ দাম"
              price={highestPrice}
              description="সারাদেশে বেশি বাজার দর"
              color="text-red-600"
            />
            <SummaryCard
              label="গড় দাম"
              price={averagePrice}
              description="বাজারগুলোর গড় হিসাবে"
              color="text-green-600"
            />
          </div>

          <h2 className="mt-5 mb-2.5 text-sm font-bold">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="overflow-x-auto rounded-[13px] border border-[#e1eae2]">
            <table className="w-full min-w-140 border-collapse text-[11px] sm:min-w-0 sm:text-xs">
              <thead>
                <tr className="bg-[#fbfdfb] text-[#707a73]">
                  <th className="px-3 py-3 text-left font-bold">বাজার</th>
                  <th className="px-3 py-3 text-left font-bold">বিভাগ</th>
                  <th className="px-3 py-3 text-right font-bold">সর্বনিম্ন</th>
                  <th className="px-3 py-3 text-right font-bold">সর্বোচ্চ</th>
                  <th className="px-3 py-3 text-right font-bold">গড়</th>
                </tr>
              </thead>
              <tbody>
                {product.markets.map((market, index) => {
                  const average = getAveragePrice(market.min, market.max);

                  return (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className={`border-t border-[#dce4dd] ${
                        index % 2 === 1 ? "bg-[#f0f5f1]" : "bg-[#fbfdfb]"
                      }`}
                    >
                      <td className="px-3 py-2.5 text-left">{market.market}</td>

                      <td className="px-3 py-2.5 text-left">
                        {market.division}
                      </td>

                      <td className="px-3 py-2.5 text-right">
                        {formatPrice(market.min)} টাকা
                      </td>

                      <td className="px-3 py-2.5 text-right">
                        {formatPrice(market.max)} টাকা
                      </td>

                      <td className="px-3 py-2.5 text-right font-bold">
                        {formatPrice(average)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  );
}

function SummaryCard({
  label,
  price,
  description,
  color,
}: {
  label: string;
  price: number;
  description: string;
  color: string;
}) {
  return (
    <article className="flex min-h-19.25 flex-col justify-center gap-0.75 rounded-[13px] border border-[#e1eae2] px-4 py-3">
      <span className="text-[10px]">{label}</span>

      <strong className={`text-base font-bold ${color}`}>
        {formatPrice(price)} টাকা
      </strong>

      <small className="text-[10px] text-[#647067]">{description}</small>
    </article>
  );
}
