const heroProducts = [
  {
    id: "h1",
    title: "ตะลุยพิภพเทียนเยวียน",
    cover: "/img/books.png",
    description: "เรื่องราวความรักสุดโรแมนติกที่เริ่มต้นจากความบังเอิญ",
    slug: "exploring-the-heavenly-world",
    category: "Erotic",
    specifications: {
      episodes: {
        title: "รวมตอน",
        data: "50 ตอน",
      },
      price: {
        title: "ราคา",
        data: "2,000 บาท",
      },
      category: {
        title: "หมวดหมู่",
        data: "Erotic",
      },
    },
  },
];

const categoriesData = [
  {
    id: "c1",
    name: "แฟนตาซี",
    category: "Fantasy",
    icon: "✨",
    products: heroProducts.filter((p) => p.category === "Fantasy").slice(0, 2),
  },
  {
    id: "c2",
    name: "อีโรติก",
    category: "Erotic",
    icon: "❤️",
    products: heroProducts.filter((p) => p.category === "Erotic").slice(0, 2),
  },
  {
    id: "c3",
    name: "สืบสวน",
    category: "Mystery",
    icon: "🔍",
    products: heroProducts.filter((p) => p.category === "Mystery").slice(0, 2),
  },
  { id: "c4", name: "ไซไฟ", category: "Sci-Fi", icon: "🚀", products: [] }, // ตัวอย่างหมวดที่ยังไม่มีนิยายใน hero
];

const productData = {
  "exploring-the-heavenly-world": {
    id: "p1",
    title: "นิยายรักแรกพบ",
    author: "อับดุล",
    cover: "/img/S__9265156.jpg",
    readawriteUrl:
      "https://www.readawrite.com/a/fe625b8d7ce84cb5db7148e1160fccbf",
    shortDescription:
      "เรื่องราวความรักสุดโรแมนติกที่เริ่มต้นจากความบังเอิญที่ทำให้สองหัวใจมาบรรจบกัน ท่ามกลางบรรยากาศกรุงเทพฯ ที่อบอวลไปด้วยความทรงจำอันงดงาม.",
    chapters: [
      {
        id: 1,
        title: "บทที่ 1: การพบกันโดยบังเอิญ",
        isPaid: false,
        content: "/chapters/exploring-the-heavenly-world/1.text",
      },
      {
        id: 2,
        title: "บทที่ 2: สายตาที่สบกัน",
        isPaid: false,
        content: "/json/chapters/1.json",
      },
      {
        id: 3,
        title: "บทที่ 3: บทสนทนาแรก",
        isPaid: true,
        price: 10,
        content: "/json/chapters/1.json",
      },
      {
        id: 4,
        title: "บทที่ 4: ความรู้สึกที่ก่อตัว",
        isPaid: true,
        price: 15,
        content: "/json/chapters/1.json",
      },
      {
        id: 5,
        title: "บทที่ 5: เดทแรก",
        isPaid: false,
        content: "/json/chapters/1.json",
      },
      {
        id: 6,
        title: "บทที่ 6: คำสารภาพ",
        isPaid: true,
        price: 20,
        content: "/json/chapters/1.json",
      },
      {
        id: 7,
        title: "บทที่ 7: จุดเริ่มต้นใหม่",
        isPaid: false,
        content: "/json/chapters/1.json",
      },
      {
        id: 8,
        title: "บทที่ 8: ก้าวไปข้างหน้า",
        isPaid: true,
        price: 10,
        content: "/json/chapters/1.json",
      },
      {
        id: 9,
        title: "บทที่ 9: บทส่งท้าย",
        isPaid: true,
        price: 5,
        content: "/json/chapters/1.json",
      },
    ],
  },
};

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

export {
  heroProducts,
  categoriesData,
  allProducts,
  categoriesList,
  productData,
};
