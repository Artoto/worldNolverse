// components/layout/Navbar.tsx
"use client"; // สำหรับ Client Component ใน App Router

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const Navbar: React.FC = () => {
  const [theme, setTheme] = useState("dark");

  console.log(
    "document.documentElement.dataset.theme",
    document.documentElement.dataset.theme
  );
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.dataset.theme = newTheme;
  };
  return (
    <motion.nav
      className="bg-transparent backdrop-blur-lg backdrop-saturate-100 p-4 sticky top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 10 }}
    >
      <div className="container mx-auto flex justify-between items-center max-w-7xl w-full">
        <div className="space-x-4">
          <Link href="/categories" passHref>
            <motion.span
              className="font-semibold text-2xl text-gray-600 hover:text-purple-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              นิยาย
            </motion.span>
          </Link>
          <Link href="/profile" passHref>
            <motion.span
              className="font-semibold text-2xl text-gray-600 hover:text-purple-600 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              E-books
            </motion.span>
          </Link>
        </div>
        <Link href="/" passHref>
          <motion.span
            className="text-4xl font-bold text-gray-800 cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            novelVerse
          </motion.span>
        </Link>
      </div>
    </motion.nav>
  );
};

export default Navbar;
