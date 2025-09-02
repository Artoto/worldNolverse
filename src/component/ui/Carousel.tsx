"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { themes } from "@/lib/Theme";
import { useTheme } from "@/component/modals/ThemeProvider";

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

  const carouselRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const unAcceptClickRef = useRef<NodeJS.Timeout | null>(null);

  const showSlider = (type: "next" | "prev"): void => {
    if (isAnimating) return;

    setIsAnimating(true);

    const carousel = carouselRef.current;
    const listHTML = listRef.current;

    if (!carousel || !listHTML) return;

    carousel.classList.remove("next", "prev");
    const items = listHTML.querySelectorAll(".item") as NodeListOf<HTMLElement>;

    if (type === "next" && items.length > 0) {
      listHTML.appendChild(items[0]);
      carousel.classList.add("next");
    } else if (type === "prev" && items.length > 0) {
      listHTML.prepend(items[items.length - 1]);
      carousel.classList.add("prev");
    }

    if (unAcceptClickRef.current) {
      clearTimeout(unAcceptClickRef.current);
    }

    unAcceptClickRef.current = setTimeout(() => {
      setIsAnimating(false);
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
      <div className="list md:block hidden" ref={listRef}>
        {items.map((item: CarouselSubProps) => (
          <div className="item  hidden sm:hidden md:block" key={item.id}>
            <Image
              src={item.cover}
              alt={item.title}
              width={900}
              height={1000}
            />
            <div className="introduce">
              <div className={`title ${colors.text}`}>{item.category}</div>
              <div className={`topic ${colors.text}`}>{item.title}</div>
              <div className={`des ${colors.text}`}>{item.description}</div>
              <button
                className={`seeMore border-b border-solid ${colors.border} ${colors.textSee} ${colors.button}`}
                onClick={handleSeeMore}
                type="button"
              >
                SEE MORE &#8599;
              </button>
            </div>
            <div className="detail">
              <div className={`title ${colors.text}`}>{item.title}</div>
              <div className={`des text-lg ${colors.text}`}>
                {item.description}
              </div>
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
      <div className="list md:hidden block" ref={listRef}>
        {items.map((item: CarouselSubProps) => (
          <div
            className="item  flex flex-col justify-center items-center"
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
              <div className={`title ${colors.text}`}>{item.category}</div>
              <div className={`topic ${colors.text}`}>{item.title}</div>
              <div className={`des ${colors.text}`}>{item.description}</div>
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
              <div className={`title ${colors.text}`}>{item.title}</div>
              <div className={`des text-lg ${colors.text}`}>
                {item.description}
              </div>
              <div
                className={`specifications !mt-2 !mb-2 text-lg border-t border-solid ${colors.border} ${colors.text}`}
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
      <div className={`arrows ${colors.text}`}>
        <button
          id="prev"
          className={`border border-solid ${colors.border}`}
          onClick={handlePrevClick}
          disabled={isAnimating}
          type="button"
        >
          &lt;
        </button>
        <button
          id="next"
          className={`border border-solid ${colors.border}`}
          onClick={handleNextClick}
          disabled={isAnimating}
          type="button"
        >
          &gt;
        </button>
        <button id="back" onClick={handleBack} type="button">
          See All &#8599;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
