import { ProductCardProps, translateUnit } from "@/types/types";

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <article className="min-w-0 rounded-2xl border border-[#dfe8df] bg-[#fbfdfb] p-3.75 transition-shadow duration-200 hover:shadow-md">
      <div className="flex items-center gap-3">
        <div className="flex h-11.5 w-11.5 shrink-0 items-center justify-center rounded-xl bg-[#f0f5f0] text-[25px]">
          <span role="img" aria-label={product.nameBn}>
            {product.image}
          </span>
        </div>

        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold leading-6 text-[#263129]">
            {product.nameBn}
          </h3>
          <p className="text-xs text-[#5e665f]">
            প্রতি {translateUnit(product.unit)}
          </p>
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-2">
        <div>
          <p className="text-xs leading-5 text-[#586159]">আজকের দাম</p>
          <p className="text-[17px] font-bold leading-6 text-[#253027]">
            {product.today.toLocaleString("bn-Bn")}{" "}
            <span className="text-[13px] font-medium">টাকা</span>
          </p>
        </div>

        <span
          className={`bg-[#f0f5f0] mb-0.5 inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[11px] font-semibold ${
            product.change.dir === "up"
              ? "text-[#ed3338]"
              : product.change.dir === "down"
                ? "text-[#119c55]"
                : ""
          }`}
        >
          <span aria-hidden="true">
            {product.change.dir === "up"
              ? "▲"
              : product.change.dir === "down"
                ? "▼"
                : "▬"}
          </span>
          {product.change.pct.toLocaleString("bn-Bn")}
          {"%"}
        </span>
      </div>
    </article>
  );
};

export default ProductCard;
