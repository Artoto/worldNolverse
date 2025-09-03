// app/page.tsx
"use client"; // เป็น Client Component เพราะมี interactive animations

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import CategoryCard from "@/component/ui/CategoryCard";
import Navbar from "@/component/layout/Navbar";
import Carousel from "../component/ui/Carousel";
import { themes } from "@/lib/Theme";
import { useTheme } from "@/component/modals/ThemeProvider";
import { heroProducts, categoriesData } from "@/lib/Data";

export default function HomePage() {
  const { activeTheme } = useTheme();
  const colors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;

  const categoryContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // ให้แต่ละ Category Card ค่อยๆ โผล่มา
      },
    },
  };

  const categoryItemVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 100, damping: 12 },
    },
  };

  return (
    <div className={`min-h-screen ${colors.bg}`}>
      <Navbar />

      {/* Section 1: Hero Sliding Product */}
      <div className="carousel">
        {heroProducts && <Carousel items={heroProducts} />}
      </div>

      {/* Section 2: หมวดหมู่ของ Product */}
      <section
        className={`py-12 md:py-20 px-4 md:px-8 ${colors.cardBg} flex  justify-center items-center`}
      >
        <div className="flex flex-col justify-center items-center gap-5 max-w-7xl w-full">
          <motion.h2
            className={`text-3xl md:text-4xl font-bold ${colors.text} text-center`}
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
          >
            สำรวจหมวดหมู่นิยาย
          </motion.h2>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
            variants={categoryContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
          >
            {categoriesData.map((category) => (
              <motion.div key={category.id} variants={categoryItemVariants}>
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center mt-16">
            <Link href="/categories" passHref>
              <motion.span
                className={`inline-block px-10 py-5 ${colors.button} ${colors.textButton} border ${colors.border} rounded-full font-bold text-xl shadow-lg transition-colors`}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 10px 20px rgba(0,0,0,0.15)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{ y: [0, -5, 0] }} // ปุ่มกระเด้งเล็กน้อย
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: "easeInOut",
                  delay: 1,
                }}
              >
                ดูนิยายทั้งหมด
              </motion.span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (สร้างเป็น Component แยกได้เช่นกัน) */}
      <footer
        className={`p-6 ${colors.cardBg} ${colors.text} border-t ${colors.border} text-center`}
      >
        &copy; {new Date().getFullYear()} worldNolverse by Arthit All Rights
        Reserved.
      </footer>
    </div>
  );
}
