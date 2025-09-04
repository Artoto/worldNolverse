export function isMobile(): boolean {
  if (typeof window !== "undefined") {
    return window.innerWidth <= 768;
  }
  return false; // คืนค่า false สำหรับการ render ฝั่ง server
}

export function isDesktop(): boolean {
  if (typeof window !== "undefined") {
    return window.innerWidth > 768;
  }
  return false; // คืนค่า false สำหรับการ render ฝั่ง server
}
