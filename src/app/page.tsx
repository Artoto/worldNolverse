// app/page.tsx
"use client"; // เป็น Client Component เพราะมี interactive animations

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/component/ui/ProductCard";
import CategoryCard from "@/component/ui/CategoryCard";
import Navbar from "@/component/layout/Navbar"; // ใช้ Navbar ที่สร้างไว้
import { title } from "process";
import Carousel from "../component/ui/Carousel";

// ข้อมูลจำลอง (ในโลกจริงจะมาจาก API)
const heroProducts = [
  {
    id: "h1",
    title: "นิยายรักแรกพบ",
    author: "อับดุล",
    cover: "/img/books.png",
    description: "เรื่องราวความรักสุดโรแมนติกที่เริ่มต้นจากความบังเอิญ",
    slug: "love-at-first-sight",
    category: "Romantic",
    specifications: {
      episodes: {
        title: "รวมตอน",
        data: "50 ตอน",
      },
      price: {
        title: "ราคา",
        data: "2,000 บาท",
      },
      category: {
        title: "หมวดหมู่",
        data: "Romance",
      },
    },
  },
  {
    id: "h2",
    title: "ผจญภัยในโลกเวทมนตร์",
    author: "ลูกศิษย์คนเก่ง",
    cover: "/img/books.png",
    description: "การเดินทางของเด็กหนุ่มที่ค้นพบพลังวิเศษ",
    slug: "magic-world-adventure",
    category: "Fantasy",
    specifications: {
      episodes: {
        title: "รวมตอน",
        data: "50 ตอน",
      },
      price: {
        title: "ราคา",
        data: "2,000 บาท",
      },
      category: {
        title: "หมวดหมู่",
        data: "Romance",
      },
    },
  },
  {
    id: "h3",
    title: "สืบสวนคดีปริศนา",
    author: "ยอดนักสืบ",
    cover: "/img/books.png",
    description: "คดีฆาตกรรมซ่อนเงื่อนที่ต้องใช้ไหวพริบคลี่คลาย",
    slug: "mystery-case",
    category: "Mystery",
    specifications: {
      episodes: {
        title: "รวมตอน",
        data: "50 ตอน",
      },
      price: {
        title: "ราคา",
        data: "2,000 บาท",
      },
      category: {
        title: "หมวดหมู่",
        data: "Romance",
      },
    },
  },
];

const categoriesData = [
  {
    id: "c1",
    name: "แฟนตาซี",
    icon: "✨",
    products: heroProducts.filter((p) => p.category === "Fantasy").slice(0, 2),
  },
  {
    id: "c2",
    name: "โรแมนติก",
    icon: "❤️",
    products: heroProducts.filter((p) => p.category === "Romantic").slice(0, 2),
  },
  {
    id: "c3",
    name: "สืบสวน",
    icon: "🔍",
    products: heroProducts.filter((p) => p.category === "Mystery").slice(0, 2),
  },
  { id: "c4", name: "ไซไฟ", icon: "🚀", products: [] }, // ตัวอย่างหมวดที่ยังไม่มีนิยายใน hero
];

export default function HomePage() {
  const heroContainerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.5, // ให้แต่ละ Hero Item ค่อยๆ โผล่มา
      },
    },
  };

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
    <div className="min-h-screen">
      <Navbar />

      {/* Section 1: Hero Sliding Product */}
      <div className="carousel">
        {heroProducts && <Carousel items={heroProducts} />}
      </div>

      {/* Section 2: หมวดหมู่ของ Product */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-white flex  justify-center items-center">
        <div className="flex flex-col justify-center items-center gap-5 max-w-7xl w-full">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-800  text-center"
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
                className="inline-block px-10 py-5 bg-purple-600 text-white rounded-full font-bold text-xl shadow-lg hover:bg-purple-700 transition-colors"
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
      <footer className="p-6 bg-gray-800 text-white text-center ">
        &copy; {new Date().getFullYear()} NovelVerse by อับดุล & ลูกศิษย์คนเก่ง
      </footer>
    </div>
  );
}
