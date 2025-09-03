"use server";

import fs from "fs";
import path from "path";

export async function getChapterContent(
  pathUrl: string
): Promise<string | null> {
  const filePath = path.join(process.cwd(), "public", pathUrl);

  try {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    return fileContent;
  } catch (error) {
    console.error("Error reading file:", error);
    return null; // ส่งค่า null กลับไปหากเกิดข้อผิดพลาด
  }
}
