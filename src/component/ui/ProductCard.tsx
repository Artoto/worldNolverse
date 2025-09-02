// components/ui/ProductCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { List, HatGlasses } from "lucide-react";

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
  return (
    <motion.div
      className="bg-white  overflow-hidden cursor-pointer"
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Link href={`/products/${product.slug}`} passHref>
        <div className="flex justify-center items-start max-h-[100px]">
          <div className="relative w-[100px] h-[100px] bg-gray-200">
            <Image
              src={product.cover}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-110 !object-contain"
            />
          </div>
          <div className="px-3 flex flex-col items-start gap-3 w-[254px] md:w-[355px]">
            <h3 className="text-lg font-semibold text-gray-700 truncate">
              {product.title}
            </h3>
            <div className="flex justify-center items-start gap-3">
              <p className="text-sm text-gray-500 flex gap-2">
                <List size={18} /> {` ${product.episodes}`}
              </p>
              <p className="text-sm text-gray-500 flex gap-2">
                <HatGlasses size={18} /> {` ${product.episodes}`}
              </p>
            </div>
            <div className="flex justify-center items-start gap-3">
              <p className="text-sm text-gray-600 text-center border border-gray-300 rounded-lg p-1">
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
