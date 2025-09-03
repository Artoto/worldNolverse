// components/ui/ProductCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { List, HatGlasses } from "lucide-react";
import { themes } from "@/lib/Theme";
import { useTheme } from "../modals/ThemeProvider";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    cover: string;
    description: string;
    slug: string;
    category: string;
    episodes: number;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { activeTheme } = useTheme();
  const colors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;

  return (
    <motion.div
      className={`${colors.bg}  overflow-hidden cursor-pointer`}
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Link href={`/products/${product.slug}`} passHref>
        <div className="flex justify-center items-start max-h-[100px] md:max-h-[140px]">
          <div
            className={`relative w-[100px] h-[100px] md:w-[140px] md:h-[140px]  ${colors.cardBg}`}
          >
            <Image
              src={product.cover}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-110 !object-contain"
            />
          </div>
          <div className="px-3 flex flex-col items-start gap-2 md:gap-6 w-[254px] md:w-[355px]">
            <h3 className={`text-lg font-semibold ${colors.text} truncate`}>
              {product.title}
            </h3>
            <div className="flex justify-center items-start gap-3">
              <p className={`text-sm ${colors.text} flex gap-2`}>
                <List size={18} /> {` ${product.episodes}`}
              </p>
              <p className={`text-sm ${colors.text} flex gap-2`}>
                <HatGlasses size={18} /> {` ${product.episodes}`}
              </p>
            </div>
            <div className="flex justify-center items-start gap-3">
              <p
                className={`text-sm ${colors.text} text-center border ${colors.border} rounded-lg p-1`}
              >
                {product.category}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
