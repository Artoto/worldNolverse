// app/profile/page.tsx
"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import Navbar from "@/component/layout/Navbar";
import Link from "next/link";

export default function ProfilePage() {
  const [userRole, setUserRole] = useState<"reader" | "writer">("reader"); // 'reader' or 'writer'
  const [coins, setCoins] = useState(100); // เหรียญจำลอง
  const [topUpAmount, setTopUpAmount] = useState(100); // จำนวนเงินที่ต้องการเติม

  const handleTopUp = () => {
    // จำลองการเติมเงิน 1:1
    if (topUpAmount <= 0) {
      alert("กรุณาป้อนจำนวนเงินที่ถูกต้อง");
      return;
    }
    setCoins((prevCoins) => prevCoins + topUpAmount);
    alert(`เติมเงิน ${topUpAmount} บาท ได้ ${topUpAmount} เหรียญ!`);
    setTopUpAmount(100); // รีเซ็ตจำนวนเงิน
  };

  const profileVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 80, damping: 10 },
    },
  };

  const buttonVariants: Variants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const readerProfile = (
    <motion.div
      variants={profileVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        ข้อมูลผู้อ่าน
      </h2>
      <p className="text-lg md:text-xl mb-2 text-gray-700">
        ชื่อผู้ใช้:{" "}
        <span className="font-semibold text-purple-600">Reader123</span>
      </p>
      <p className="text-lg md:text-xl mb-4 text-gray-700">
        เหรียญคงเหลือ: <span className="font-bold text-green-600">{coins}</span>{" "}
        เหรียญ
      </p>

      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 mt-8">
        เติมเงิน
      </h3>
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
        <input
          type="number"
          min="10"
          step="10"
          value={topUpAmount}
          onChange={(e) => setTopUpAmount(parseInt(e.target.value) || 0)}
          className="p-3 border border-gray-300 rounded-lg w-full sm:w-32 text-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <span className="text-lg md:text-xl text-gray-700 whitespace-nowrap">
          บาท = <span className="font-bold text-green-600">{topUpAmount}</span>{" "}
          เหรียญ
        </span>
        <motion.button
          onClick={handleTopUp}
          className="w-full sm:w-auto px-6 py-3 bg-green-500 text-white rounded-lg font-bold text-lg hover:bg-green-600 transition-colors"
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          เติมเงิน
        </motion.button>
      </div>

      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 mt-8">
        นิยายที่ปลดล็อคแล้ว
      </h3>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>นิยายรักแรกพบ (บทที่ 3, 4)</li>
        <li>ผจญภัยในโลกเวทมนตร์ (บทที่ 2)</li>
        {/* ในโลกจริง: ดึงรายการนิยายที่ปลดล็อคจากสถานะผู้ใช้ */}
      </ul>
    </motion.div>
  );

  const writerProfile = (
    <motion.div
      variants={profileVariants}
      initial="hidden"
      animate="visible"
      className="bg-white p-6 md:p-8 rounded-lg shadow-md border border-gray-100"
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
        ข้อมูลนักเขียน
      </h2>
      <p className="text-lg md:text-xl mb-2 text-gray-700">
        ชื่อผู้ใช้:{" "}
        <span className="font-semibold text-purple-600">อับดุลสุดหล่อ</span>
      </p>
      <p className="text-lg md:text-xl mb-4 text-gray-700">
        ยอดนิยาย: <span className="font-bold text-purple-600">5</span> เรื่อง
      </p>
      <p className="text-lg md:text-xl mb-4 text-gray-700">
        รายได้รวมจากเหรียญ:{" "}
        <span className="font-bold text-green-600">1,500</span> เหรียญ
      </p>

      <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-3 mt-8">
        นิยายของคุณ
      </h3>
      <ul className="list-disc pl-5 text-gray-700 space-y-2">
        <li>นิยายรักแรกพบ</li>
        <li>ความลับของอับดุล</li>
        <li>ผจญภัยในโลกเวทมนตร์</li>
        {/* ในโลกจริง: ดึงรายการนิยายที่เขียนจากฐานข้อมูล */}
      </ul>
      <motion.button
        className="mt-6 px-6 py-3 bg-blue-500 text-white rounded-lg font-bold text-lg hover:bg-blue-600 transition-colors"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
      >
        เพิ่มนิยายใหม่
      </motion.button>
    </motion.div>
  );

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
          โปรไฟล์ผู้ใช้งาน
        </motion.h1>

        <motion.div
          className="flex justify-center mb-8 space-x-4 p-4 bg-white rounded-xl shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <motion.button
            onClick={() => setUserRole("reader")}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              userRole === "reader"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            ผู้อ่าน
          </motion.button>
          <motion.button
            onClick={() => setUserRole("writer")}
            className={`px-6 py-3 rounded-lg font-bold transition-colors ${
              userRole === "writer"
                ? "bg-purple-600 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            นักเขียน
          </motion.button>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {userRole === "reader" ? readerProfile : writerProfile}
        </div>
      </div>
    </div>
  );
}
