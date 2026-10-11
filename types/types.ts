export type Category = {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
};

export type FoundCatProps = {
  foundCat: Category;
};

export type MarqueeType = {
    id: number;
    slug: string;
    nameBn: string;
    category:string;
    change: {
        dir: "up" | "down" | "flat";
        pct: number;
    };
    image: string;
    unit: string;
    today: number
}

export type ProductCardProps = {
  product: MarqueeType;
};


export const unitTranslations: Record<string, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export const translateUnit = (unit: string): string =>
  unitTranslations[unit] ?? unit;