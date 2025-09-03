// app/products/[slug]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/component/layout/Navbar";
import PaymentModal from "@/component/modals/PaymentModal";
import ReadingView from "@/component/ui/ReadingView";
import { useParams } from "next/navigation";
import { productData } from "@/lib/Data";
import { useRouter } from "next/navigation";
import { themes } from "@/lib/Theme";
import { useTheme } from "@/component/modals/ThemeProvider";

export default function ProductDetailPage() {
  const params = useParams();
  const { slug } = params;
  const product = productData[slug as keyof typeof productData];
  const { activeTheme } = useTheme();
  const colors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;

  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const chaptersPerPage = 5; // แสดง 5 ตอนต่อหน้า
  const totalPages = product
    ? Math.ceil(product.chapters.length / chaptersPerPage)
    : 0;

  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedChapterForPayment, setSelectedChapterForPayment] = useState<
    (typeof product.chapters)[0] | null
  >(null);
  const [readingChapter, setReadingChapter] = useState<
    (typeof product.chapters)[0] | null
  >(null);

  // จำลองสถานะผู้ใช้และเหรียญ (ในโลกจริงจะดึงจาก Context API หรือ State Management ทั่วโลก)
  const [unlockedChapters, setUnlockedChapters] = useState<{
    [key: number]: boolean;
  }>({}); // { chapterId: true/false }

  // โหลดสถานะการปลดล็อคจาก LocalStorage เมื่อ Component โหลด
  useEffect(() => {
    if (product) {
      const storedUnlocked = JSON.parse(
        localStorage.getItem(`unlocked_chapters_${product.id}`) || "{}"
      );
      setUnlockedChapters(storedUnlocked);
    }
  }, [product]);

  if (!product) {
    return (
      <div
        className={`min-h-screen ${colors.bg} flex flex-col items-center justify-center p-8`}
      >
        <Navbar />
        <div className="min-h-screen flex flex-col justify-center items-center p-8 my-auto">
          <h1 className={`text-4xl font-bold ${colors.text} mb-4`}>
            ไม่พบหน้านิยายนี้
          </h1>
          <Link href="/" passHref>
            <div
              className={`${colors.textButton} ${colors.button} hover:underline`}
            >
              กลับหน้าแรก
            </div>
          </Link>
        </div>
      </div>
    );
  }

  const indexOfLastChapter = currentPage * chaptersPerPage;
  const indexOfFirstChapter = indexOfLastChapter - chaptersPerPage;
  const currentChapters = product.chapters.slice(
    indexOfFirstChapter,
    indexOfLastChapter
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleReadChapter = (chapter: (typeof product.chapters)[0]) => {
    if (chapter.isPaid) {
      setSelectedChapterForPayment(chapter);
      setIsPaymentModalOpen(true);
    } else {
      setReadingChapter(chapter); // เปิดหน้าอ่านนิยาย
    }
  };

  const handleConfirmPayment = () => {
    router.push(product.readawriteUrl);
  };

  const productDetailVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10,
        staggerChildren: 0.1,
      },
    },
  };

  const chapterItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className={`min-h-screen ${colors.bg}`}>
      <Navbar />

      <div className="container mx-auto py-12 px-4 flex justify-center items-center">
        <div className="max-w-7xl w-full flex flex-col justify-center items-center gap-3">
          {/* ปุ่มย้อนกลับ */}
          <Link
            className="flex justify-start items-center w-full"
            href="/categories"
            passHref
          >
            <motion.div
              className={`${colors.text} hover:underline flex items-center`}
              whileHover={{ x: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              กลับหมวดหมู่นิยาย
            </motion.div>
          </Link>

          <motion.div
            className={`${colors.cardBg} border ${colors.border} rounded-lg shadow-xl overflow-hidden md:flex flex-col md:flex-row`}
            variants={productDetailVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Hero ปก Product */}
            <motion.div
              className="md:w-1/3 flex-shrink-0 relative h-72 md:h-auto"
              variants={{
                hidden: { opacity: 0, x: -50 },
                visible: { opacity: 1, x: 0 },
              }}
            >
              <Image
                src={product.cover}
                alt={product.title}
                layout="fill"
                objectFit="cover"
                priority // โหลดภาพนี้ก่อน
              />
            </motion.div>

            <div className="md:w-2/3 p-6 md:p-8">
              {/* ชื่อ Product */}
              <motion.h1
                className={`text-3xl md:text-4xl font-extrabold ${colors.text} mb-2`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {product.title}
              </motion.h1>
              <motion.p
                className={`text-lg ${colors.text} mb-4`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                โดย {product.author}
              </motion.p>

              {/* รายละเอียดสั้นๆ */}
              <motion.p
                className={`leading-relaxed mb-8 text-base md:text-lg ${colors.text}`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                {product.shortDescription}
              </motion.p>

              <motion.h2
                className={`text-2xl font-bold ${colors.text} mb-4`}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                สารบัญ
              </motion.h2>

              {/* List ตอนนิยาย */}
              <motion.ul
                className="space-y-3"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.05 },
                  },
                }}
              >
                {currentChapters.map((chapter) => (
                  <motion.li
                    key={chapter.id}
                    className={`flex items-center justify-between p-4 rounded-lg transition-colors duration-200 ease-in-out
                    ${
                      chapter.isPaid && !unlockedChapters[chapter.id]
                        ? "bg-yellow-50 border border-yellow-200 text-yellow-800 cursor-pointer hover:bg-yellow-100"
                        : `bg-gray-50 border ${colors.border} hover:bg-gray-100 cursor-pointer`
                    }`}
                    variants={chapterItemVariants}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0px 5px 10px rgba(0,0,0,0.05)",
                    }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleReadChapter(chapter)}
                  >
                    <span className="font-medium text-gray-800">
                      {chapter.title}
                    </span>
                    {chapter.isPaid && (
                      <span className="text-yellow-600 font-bold flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 mr-1 text-yellow-500"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2a8 8 0 100 16 8 8 0 000-16zM4 10a6 6 0 1112 0 6 6 0 01-12 0zm10 2a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {chapter.price} เหรียญ
                      </span>
                    )}
                  </motion.li>
                ))}
              </motion.ul>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-6 space-x-2">
                  {[...Array(totalPages)].map((_, index) => (
                    <motion.button
                      key={index}
                      onClick={() => paginate(index + 1)}
                      className={`px-4 py-2 rounded-lg font-bold transition-colors ${
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
          </motion.div>
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        chapterTitle={selectedChapterForPayment?.title || ""}
        onConfirm={handleConfirmPayment}
      />

      {/* Reading View */}
      {readingChapter && (
        <ReadingView
          chapter={readingChapter}
          productTitle={product.title}
          onClose={() => setReadingChapter(null)}
        />
      )}
    </div>
  );
}
