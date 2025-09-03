// components/ui/CategoryCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { themes } from "@/lib/Theme";
import { useTheme } from "@/component/modals/ThemeProvider";

interface CategoryCardProps {
  category: {
    id: string;
    name: string;
    icon: string; // อาจจะเป็น Emoji หรือ URL รูปภาพ
    category: string;
    products: { id: string; title: string; cover: string }[]; // ตัวอย่างนิยายในหมวด
  };
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  const { activeTheme } = useTheme();
  const colors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;

  return (
    <motion.div
      className={`${colors.cardBg} rounded-lg shadow-lg p-6 flex flex-col items-center justify-center text-center cursor-pointer border ${colors.border}`}
      whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
      transition={{ type: "spring", stiffness: 300, damping: 10 }}
    >
      <Link
        href={`/categories?cat=${encodeURIComponent(category.category)}`}
        passHref
      >
        <div className="block w-full">
          {category.icon.startsWith("/") ? ( // ถ้า icon เป็น URL รูปภาพ
            <div className="relative w-16 h-16 mx-auto mb-4">
              <Image
                src={category.icon}
                alt={category.name}
                layout="fill"
                objectFit="contain"
              />
            </div>
          ) : (
            // ถ้า icon เป็น Emoji
            <div className="text-5xl mb-4">{category.icon}</div>
          )}
          <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
            {category.name}
          </h3>
          <p className={`text-sm ${colors.textSecondary}`}>
            {category.products.length} นิยาย
          </p>
        </div>
      </Link>
    </motion.div>
  );
};

export default CategoryCard;
