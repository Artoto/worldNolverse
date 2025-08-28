// components/modals/PaymentModal.tsx
"use client";

import React from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import Link from "next/link";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  chapterTitle: string;
  price: number;
  userCoins: number;
  onConfirm: () => void;
}

const PaymentModal: React.FC<PaymentModalProps> = ({
  isOpen,
  onClose,
  chapterTitle,
  price,
  userCoins,
  onConfirm,
}) => {
  const modalVariants: Variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: "spring", stiffness: 200, damping: 20 },
    },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } },
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[100]"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={onClose} // ปิดเมื่อคลิกนอก Modal
        >
          <motion.div
            className="bg-white rounded-lg p-8 w-11/12 max-w-md shadow-2xl text-center"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()} // ป้องกัน event bubbling
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              ปลดล็อค {chapterTitle}
            </h2>
            <p className="text-gray-700 mb-2">
              บทนี้ต้องใช้{" "}
              <span className="font-bold text-purple-600">{price}</span> เหรียญ
            </p>
            <p className="text-gray-700 mb-6">
              เหรียญคงเหลือ:{" "}
              <span className="font-bold text-green-600">{userCoins}</span>{" "}
              เหรียญ
            </p>

            {userCoins >= price ? (
              <motion.button
                onClick={onConfirm}
                className="w-full px-6 py-3 bg-purple-600 text-white rounded-lg font-bold text-lg hover:bg-purple-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ยืนยันการปลดล็อค
              </motion.button>
            ) : (
              <div>
                <p className="text-red-500 font-semibold mb-4">
                  เหรียญไม่พอ กรุณาเติมเงิน
                </p>
                <Link href="/profile" legacyBehavior>
                  <motion.a
                    className="inline-block w-full px-6 py-3 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    ไปหน้าเติมเงิน
                  </motion.a>
                </Link>
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-4 text-gray-500 hover:text-gray-700 text-sm"
            >
              ยกเลิก
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentModal;
