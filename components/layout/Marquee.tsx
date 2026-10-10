import { getProducts } from "@/lib/api";
import { MarqueeType, translateUnit } from "@/types/types";
import Marquee from "react-fast-marquee";

const MarqueeSec = async () => {
  const products: MarqueeType[] = await getProducts();
  return (
    <div className="py-3">
      <Marquee speed={200}>
        {products.map((product: MarqueeType) => (
          <div key={product.id} className="flex gap-2 mx-5">
            <span>{product.image}</span>
            <span>{product.nameBn}</span>
            <span>
              {product.today.toLocaleString("bn-Bn")} টাকা /{" "}
              {translateUnit(product.unit)}
            </span>
            <span
              className={`${
                product.change.dir === "up"
                  ? "text-red-700"
                  : product.change.dir === "down"
                    ? "text-green-700"
                    : "text-black"
              }`}
            >
              {product.change.dir === "up" ? (
                <span>▲</span>
              ) : product.change.dir === "down" ? (
                <span>▼</span>
              ) : (
                <span>➖</span>
              )}
              {product.change.pct.toLocaleString("bn-BD")}%
            </span>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default MarqueeSec;
