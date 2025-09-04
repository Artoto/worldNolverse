"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { themes } from "@/lib/Theme";
import { useTheme } from "@/component/modals/ThemeProvider";
import { isMobile, isDesktop } from "@/lib/DeviceCheck";
import CustomText from "../modals/CustomText";

interface Specifications {
  episodes: {
    title: string;
    data: string;
  };
  price: {
    title: string;
    data: string;
  };
  category: {
    title: string;
    data: string;
  };
}

interface CarouselSubProps {
  id: string;
  title: string;
  cover: string;
  coverBg: string;
  description: string;
  slug: string;
  category: string;
  specifications: Specifications;
}

interface CarouselProps {
  items: CarouselSubProps[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  const { activeTheme } = useTheme();
  const colors =
    themes[activeTheme as keyof typeof themes]?.colors || themes.light.colors;

  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [isAnimating, setIsAnimating] = useState<boolean>(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const [isDesktopView, setIsDesktopView] = useState(false);

  const carouselRef = useRef<HTMLDivElement>(null);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const unAcceptClickRef = useRef<NodeJS.Timeout | null>(null);
  let activeItems = 1;
  const [activeItemState, setActiveItemState] = useState<number>(2);

  useEffect(() => {
    // ฟังก์ชันสำหรับอัปเดตสถานะ
    const handleResize = () => {
      setIsMobileView(isMobile());
      setIsDesktopView(isDesktop());
    };

    // ตั้งค่าสถานะเริ่มต้นเมื่อคอมโพเนนต์ถูกโหลดครั้งแรก
    handleResize();

    // เพิ่ม event listener เพื่อตรวจจับการเปลี่ยนขนาดหน้าจอ
    window.addEventListener("resize", handleResize);

    // ทำความสะอาด event listener เมื่อคอมโพเนนต์ unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []); // [] ทำให้ useEffect รันแค่ครั้งเดียว

  const showSlider = (type: "next" | "prev") => {
    const carousel = carouselRef.current;
    const listHTML = listRef.current;
    const nextButton = nextButtonRef.current;
    const prevButton = prevButtonRef.current;

    if (!carousel || !listHTML || !nextButton || !prevButton) return;

    nextButton.style.pointerEvents = "none";
    prevButton.style.pointerEvents = "none";

    carousel.classList.remove("next", "prev");
    let items = document.querySelectorAll(".carousel .list .item");

    if (type === "next") {
      const itemsList = items[activeItemState];
      console.log(itemsList, items);
      listHTML.appendChild(items[0]);
      carousel.classList.add("next");
      setActiveItemState((prev) => (prev + 1 > items.length ? 1 : prev + 1));
    } else {
      listHTML.prepend(items[items.length - 1]);
      carousel.classList.add("prev");
      setActiveItemState((prev) => (prev - 1 < 1 ? items.length : prev - 1));
    }

    if (unAcceptClickRef.current) {
      clearTimeout(unAcceptClickRef.current);
    }

    unAcceptClickRef.current = setTimeout(() => {
      nextButton.style.pointerEvents = "auto";
      prevButton.style.pointerEvents = "auto";
    }, 2000);
  };

  const handleSeeMore = (): void => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.classList.remove("next", "prev");
      carousel.classList.add("showDetail");
    }
    setShowDetail(true);
  };

  const handleBack = (): void => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.classList.remove("showDetail");
    }
    setShowDetail(false);
  };

  const handleNextClick = (): void => {
    showSlider("next");
  };

  const handlePrevClick = (): void => {
    showSlider("prev");
  };

  useEffect(() => {
    return () => {
      if (unAcceptClickRef.current) {
        clearTimeout(unAcceptClickRef.current);
      }
    };
  }, []);

  return (
    <div className="carousel" ref={carouselRef}>
      {!isMobileView ? (
        <div className="list" ref={listRef}>
          {items.map((item: CarouselSubProps) => (
            <div className="item" key={item.id}>
              <Image
                src={item.cover}
                alt={item.title}
                width={900}
                height={1000}
              />
              <div className="introduce">
                <CustomText
                  text={item.category}
                  textClass={`title ${colors.text}`}
                  maxChars={14}
                />
                <CustomText
                  text={item.title}
                  textClass={`topic ${colors.text}`}
                  maxChars={12}
                />
                <CustomText
                  text={item.description}
                  textClass={`des ${colors.text}`}
                  maxChars={100}
                />
                <button
                  className={`seeMore border-b border-solid ${colors.border} ${colors.textSee} ${colors.button}`}
                  onClick={handleSeeMore}
                  type="button"
                >
                  SEE MORE &#8599;
                </button>
              </div>
              <div className="detail">
                <CustomText
                  text={item.title}
                  textClass={`title ${colors.text}`}
                  maxChars={14}
                />
                <CustomText
                  text={item.description}
                  textClass={`des text-lg ${colors.text}`}
                  maxChars={100}
                />
                <div
                  className={`specifications text-lg border-t border-solid ${colors.border} ${colors.text}`}
                >
                  <div>
                    <p>{item.specifications.episodes.title}</p>
                    <p>{item.specifications.episodes.data}</p>
                  </div>
                  {item.category === "E-books" && (
                    <div>
                      <p>{item.specifications.price.title}</p>
                      <p>{item.specifications.price.data}</p>
                    </div>
                  )}

                  <div>
                    <p>{item.specifications.category.title}</p>
                    <p>{item.specifications.category.data}</p>
                  </div>
                </div>
                <div className={`checkout`}>
                  <Link href="/checkout" passHref>
                    <button
                      className={`${colors.textButton} rounded-md border ${colors.border} ${colors.button}`}
                      type="button"
                    >
                      Click For Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="list md:hidden block" ref={listRef}>
          {items.map((item: CarouselSubProps) => (
            <div
              className="item  flex flex-col justify-center items-center gap-3"
              key={`mobile-${item.id}`}
            >
              <Image
                className="!relative !left-0 !top-0 mobile-transform"
                src={item.cover}
                alt={item.title}
                width={900}
                height={1000}
              />
              <div
                className={`${
                  showDetail ? "hidden " : "block "
                } introduce !relative !left-0 !top-0 mobile-transform !w-full`}
              >
                <CustomText
                  text={item.category}
                  textClass={`title ${colors.text}`}
                  maxChars={14}
                />
                <CustomText
                  text={item.title}
                  textClass={`topic ${colors.text}`}
                  maxChars={18}
                />
                <CustomText
                  text={item.description}
                  textClass={`des ${colors.text}`}
                  maxChars={100}
                />
                <button
                  className={`seeMore border-b border-solid ${colors.border} ${colors.textSee} ${colors.button}`}
                  onClick={handleSeeMore}
                  type="button"
                >
                  SEE MORE &#8599;
                </button>
              </div>
              <div
                className={`${
                  showDetail ? "block " : "hidden "
                } detail !relative !left-0 !top-0 mobile-transform !w-full`}
              >
                <CustomText
                  text={item.title}
                  textClass={`title ${colors.text}`}
                  maxChars={27}
                />
                <CustomText
                  text={item.description}
                  textClass={`des text-lg ${colors.text}`}
                  maxChars={91}
                />
                <div
                  className={`specifications !mt-2 !mb-2 text-lg border-t border-solid ${colors.border} ${colors.text}`}
                >
                  <div>
                    <p>{item.specifications.episodes.title}</p>
                    <CustomText
                      text={item.specifications.episodes.data}
                      textClass=""
                      maxChars={18}
                    />
                  </div>
                  {item.category === "E-books" && (
                    <div>
                      <p>{item.specifications.price.title}</p>
                      <p>{item.specifications.price.data}</p>
                    </div>
                  )}

                  <div>
                    <p>{item.specifications.category.title}</p>
                    <p>{item.specifications.category.data}</p>
                  </div>
                </div>
                <div className={`checkout`}>
                  <Link href="/checkout" passHref>
                    <button
                      className={`${colors.textSee} rounded-md border ${colors.border} ${colors.button}`}
                      type="button"
                    >
                      Click For Detail
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className={`arrows ${colors.text}`}>
        <button
          ref={prevButtonRef}
          id="prev"
          className={`border border-solid ${colors.border}`}
          onClick={handlePrevClick}
          disabled={isAnimating}
          type="button"
        >
          &lt;
        </button>
        <button
          ref={nextButtonRef}
          id="next"
          className={`border border-solid ${colors.border}`}
          onClick={handleNextClick}
          disabled={isAnimating}
          type="button"
        >
          &gt;
        </button>
        <button
          id="back"
          className={showDetail ? "block" : "hidden"}
          onClick={handleBack}
          type="button"
        >
          See All &#8599;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
