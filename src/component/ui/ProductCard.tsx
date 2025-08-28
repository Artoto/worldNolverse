// components/ui/ProductCard.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  product: {
    id: string;
    title: string;
    author: string;
    cover: string;
    description: string;
    slug: string;
    category: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer border border-gray-100"
      whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Link href={`/products/${product.slug}`} legacyBehavior>
        <a className="block">
          <div className="relative w-full h-48 bg-gray-200">
            <Image
              src={product.cover}
              alt={product.title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 ease-in-out hover:scale-110"
            />
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold text-gray-800 truncate">
              {product.title}
            </h3>
            <p className="text-sm text-gray-600">{product.author}</p>
            <p className="text-xs text-gray-500 mt-2 line-clamp-2">
              {product.description}
            </p>
          </div>
        </a>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
