// app/categories/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/component/ui/ProductCard";
import Navbar from "@/component/layout/Navbar";
import { useRouter, useSearchParams } from "next/navigation"; // ใช้ hook จาก Next.js 13+
import Link from "next/link";

// ข้อมูลจำลองนิยายทั้งหมด (ในโลกจริงจะดึงจาก API)
const allProducts = [
  {
    id: "p1",
    title: "ตะลุยพิภพเทียนเยวียน",
    cover: "/img/S__9265156.jpg",
    description:
      "หลี่ เฟยหรง นักมวยหนุ่มอนาคตไกล ชีวิตกำลังรุ่งโรจน์ แต่แล้วกลับถูกรถชนตายเพราะช่วยเด็ก ทำให้วิญญาณเขาทะลุมิติไปยังโลกยุทธภพที่ผู้คนให้ความสำคัญกับความแข็งแกร่ง แต่เขากลับได้อยู่ในร่างขององค์ชายไร้ค่า",
    category: "Erotic",
    slug: "exploring-the-heavenly-world",
    episodes: 21,
  },
];

const categoriesList = ["ทั้งหมด", "Erotic", "Fantasy", "Mystery", "Sci-Fi"]; // หมวดหมู่ทั้งหมด

export default function CategoriesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("cat") || "ทั้งหมด";

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // แสดง 8 ชิ้นต่อหน้า

  // Effect สำหรับ Sync URL Parameter กับ State
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  // กรองสินค้าตาม Search Term และ Category
  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "ทั้งหมด" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // คำนวณ Pagination
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1); // เมื่อเปลี่ยนหมวดหมู่ ให้กลับไปหน้าแรก
    // อัปเดต URL เพื่อให้สามารถแชร์ลิงก์ได้
    router.push(`/categories?cat=${encodeURIComponent(category)}`, {
      scroll: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto py-12 px-4">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 text-center"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          คลังนิยายทั้งหมด
        </motion.h1>

        {/* Search and Filter */}
        <motion.div
          className="mb-10 flex flex-col md:flex-row gap-4 items-center justify-center p-4 bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <input
            type="text"
            placeholder="ค้นหานิยาย หรือนักเขียน..."
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-1/2 text-gray-700"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-full md:w-auto bg-white text-gray-700"
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            {categoriesList.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {/* Product List */}
        {currentProducts.length === 0 ? (
          <motion.div
            className="text-center text-xl text-gray-600 py-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ไม่พบผลงานนิยายที่ตรงกับการค้นหา
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            {currentProducts.map((product) => (
              <motion.div key={product.id} variants={itemVariants}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <motion.button
                key={index}
                onClick={() => paginate(index + 1)}
                className={`px-5 py-3 rounded-lg font-bold transition-colors ${
                  currentPage === index + 1
                    ? "bg-purple-600 text-white shadow-md"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {index + 1}
              </motion.button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
