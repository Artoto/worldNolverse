// components/ui/ReadingView.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { themes } from "@/lib/Theme";
import { useTheme } from "../modals/ThemeProvider";
import { getChapterContent } from "@/lib/Chapters";

interface ReadingViewProps {
  chapter: {
    id: number;
    title: string;
    content: string;
  };
  productTitle: string;
  onClose: () => void;
}

const ReadingView: React.FC<ReadingViewProps> = ({
  chapter,
  productTitle,
  onClose,
}) => {
  const { activeTheme } = useTheme();
  const colors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;
  const [readingChapter, setReadingChapter] = useState<string | null>(null);
  // useEffect สำหรับป้องกันการคัดลอกและคลิกขวา
  useEffect(() => {
    handleReadChapter(chapter);
    const handleSelectStart = (e: Event) => e.preventDefault();
    const handleContextMenu = (e: Event) => e.preventDefault();

    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("contextmenu", handleContextMenu);

    window.addEventListener("resize", checkDevTools);
    window.addEventListener("load", checkDevTools);
    // Clean up event listeners เมื่อ Component ถูก unmount
    return () => {
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, [chapter]);

  const checkDevTools = () => {
    // Check for both width and height differences
    if (
      window.outerWidth - window.innerWidth > 100 ||
      window.outerHeight - window.innerHeight > 100
    ) {
      document.body.innerHTML = "<h1>การเข้าถึงไม่ได้รับอนุญาต!</h1>";
    }
  };

  const handleReadChapter = async (chapter: {
    id: number;
    title: string;
    content: string;
  }) => {
    try {
      // const res = await fetch(chapter.content); // ดึงจากไฟล์ JSON
      // if (!res.ok) throw new Error("ไม่สามารถโหลดเนื้อหาได้");
      // const data = await res.text();
      // setReadingChapter(data);

      const chapterContent = await getChapterContent(chapter.content);
      setReadingChapter(chapterContent);
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการโหลดบท");
    }
  };

  const slideInVariants: Variants = {
    hidden: { y: "100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100, damping: 15 },
    },
    exit: { y: "100vh", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <AnimatePresence>
      <motion.div
        className={`fixed inset-0 ${colors.bg} z-[90] overflow-y-auto p-4 md:p-8`}
        variants={slideInVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="max-w-4xl mx-auto py-8">
          <motion.button
            onClick={onClose}
            className={`hover:underline flex items-center mb-6 ${colors.text}`}
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
            กลับหน้ารายละเอียดนิยาย
          </motion.button>

          <motion.h1
            className={`text-3xl md:text-4xl font-extrabold ${colors.text} mb-3`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {productTitle} - {chapter.title}
          </motion.h1>
          <motion.div
            className={`text-3xl prose lg:prose-xl ${colors.text} leading-relaxed mt-8 p-4 md:p-6 ${colors.cardBg} rounded-lg shadow-inner max-w-6xl w-full `}
            style={{ userSelect: "none" }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <p className="whitespace-pre-wrap break-words">
              {!readingChapter ? "ไม่พบไฟล์." : readingChapter}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReadingView;
