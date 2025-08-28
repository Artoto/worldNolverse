// components/ui/ReadingView.tsx
"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";

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
  // useEffect สำหรับป้องกันการคัดลอกและคลิกขวา
  useEffect(() => {
    const handleSelectStart = (e: Event) => e.preventDefault();
    const handleContextMenu = (e: Event) => e.preventDefault();

    document.addEventListener("selectstart", handleSelectStart);
    document.addEventListener("contextmenu", handleContextMenu);

    // Clean up event listeners เมื่อ Component ถูก unmount
    return () => {
      document.removeEventListener("selectstart", handleSelectStart);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  }, []);

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
        className="fixed inset-0 bg-white z-[90] overflow-y-auto p-4 md:p-8"
        variants={slideInVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="max-w-4xl mx-auto py-8">
          <motion.button
            onClick={onClose}
            className="text-blue-600 hover:underline flex items-center mb-6"
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
            className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            {productTitle} - {chapter.title}
          </motion.h1>

          <motion.div
            className="prose lg:prose-xl text-gray-800 leading-relaxed mt-8 p-4 md:p-6 bg-gray-50 rounded-lg shadow-inner"
            style={{ userSelect: "none" }} // สไตล์นี้จะป้องกันการเลือกข้อความได้ดีขึ้น
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {/* ในโลกจริง เนื้อหาควรถูก sanitize เพื่อป้องกัน XSS */}
            <p>{chapter.content}</p>
            <br />
            <p>
              นี่คือเนื้อหาจำลองของบทที่ {chapter.id} ของนิยาย {productTitle}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse
              cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
              cupidatat non proident, sunt in culpa qui officia deserunt mollit
              anim id est laborum.
            </p>
            <p>
              Curabitur pretium tincidunt lacus. Nulla gravida orci a odio.
              Nullam varius, turpis et commodo pharetra, est eros bibendum elit,
              nec luctus magna felis sit amet lectus. Vestibulum ante ipsum
              primis in faucibus orci luctus et ultrices posuere cubilia Curae;
              Morbi lacinia molestie dui. Praesent blandit dolor eu enim.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReadingView;
