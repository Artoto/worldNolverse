// components/layout/Navbar.tsx
"use client"; // สำหรับ Client Component ใน App Router

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import ThemeSelector from "../ui/ThemeSelector";
import { themes } from "@/lib/Theme";
import { useTheme } from "@/component/modals/ThemeProvider";
import { usePathname } from "next/navigation";

const Navbar: React.FC = () => {
  const { activeTheme } = useTheme();
  const [classHome, setClassHome] = useState<string>("");
  const [classEbooks, setClassEbooks] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const colors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;
  const pathName = usePathname();

  useEffect(() => {
    if (pathName) {
      setTimeout(() => {
        setIsLoading(true);
      }, 500);
      if (
        pathName === "/" ||
        pathName === "/categories" ||
        pathName === "/products"
      ) {
        setClassHome(`font-semibold text-lg text-purple-600`);
      } else {
        setClassHome(`font-semibold text-lg ${colors.textNavbar}`);
      }

      if (pathName === "/ebooks") {
        setClassHome(`font-semibold text-lg text-purple-600`);
      } else {
        setClassEbooks(`font-semibold text-lg ${colors.textNavbar}`);
      }
    } else {
      setClassHome(`font-semibold text-lg ${colors.textNavbar}`);
      setClassEbooks(`font-semibold text-lg ${colors.textNavbar}`);
    }
  }, [pathName]);

  // useEffect(() => {
  //   console.log("classHome", classHome);
  //   console.log("classEbooks", classEbooks);
  // }, [classHome, classEbooks]);

  return (
    <>
      {isLoading && (
        <div className="fixed inset-0 bg-black opacity-50 z-[70]">
          <div className="flex justify-center items-center h-full">
            <div className="w-8 h-8 bg-gray-400"></div>
          </div>
        </div>
      )}
      <motion.nav
        className="bg-transparent backdrop-blur-lg backdrop-saturate-100 p-0 md:p-4 sticky top-0 z-50 w-full"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 10 }}
      >
        <div className="hidden container mx-auto md:flex justify-between items-center max-w-7xl w-full">
          <div className="space-x-4">
            <Link href="/" passHref>
              <motion.span
                className={`font-semibold text-2xl ${colors.textNavbar} ${
                  pathName === "/" ? "!text-purple-600" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                นิยาย
              </motion.span>
            </Link>
            <Link href="/ebooks" passHref>
              <motion.span
                className={`font-semibold text-2xl ${colors.textNavbar} ${
                  pathName === "/ebooks" ? "!text-purple-600" : ""
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                E-books
              </motion.span>
            </Link>
          </div>
          <Link href="/" passHref>
            <motion.span
              className="text-4xl font-bold text-purple-600 cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              worldNolverse
            </motion.span>
          </Link>
          <div className="space-x-4">
            <ThemeSelector />
          </div>
        </div>
        <div className="md:hidden container mx-auto flex flex-col justify-between items-center max-w-7xl w-full">
          <div className="flex justify-between items-center  w-full p-2 md:p-0">
            <Link href="/" passHref>
              <motion.span
                className="text-xl font-bold text-purple-600 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                worldNolverse
              </motion.span>
            </Link>
            <ThemeSelector />
          </div>
          <div
            className={`flex justify-start gap-3 items-center w-full border-t border-solid py-4 ${colors.border} px-2 md:px-0`}
          >
            <Link href="/" passHref>
              <motion.span
                className={classHome}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                นิยาย
              </motion.span>
            </Link>
            <Link href="/ebooks" passHref>
              <motion.span
                className={classEbooks}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                E-books
              </motion.span>
            </Link>
          </div>
        </div>
      </motion.nav>
    </>
  );
};

export default Navbar;
