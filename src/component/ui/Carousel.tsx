"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

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
  author: string;
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
      <div className="list" ref={listRef}>
        {items.map((item: CarouselSubProps) => (
          <div className="item" key={item.id}>
            <Image src={item.cover} alt={item.title} width={400} height={500} />
            <div className="introduce">
              <div className="title">{item.category}</div>
              <div className="topic">{item.title}</div>
              <div className="des">{item.description}</div>
              <button className="seeMore" onClick={handleSeeMore} type="button">
                SEE MORE &#8599;
              </button>
            </div>
            <div className="detail">
              <div className="title">{item.title}</div>
              <div className="des">{item.description}</div>
              <div className="specifications">
                <div>
                  <p>นามปากกา</p>
                  <p>{item.author}</p>
                </div>
                <div>
                  <p>{item.specifications.episodes.title}</p>
                  <p>{item.specifications.episodes.data}</p>
                </div>
                <div>
                  <p>{item.specifications.price.title}</p>
                  <p>{item.specifications.price.data}</p>
                </div>
                <div>
                  <p>{item.specifications.category.title}</p>
                  <p>{item.specifications.category.data}</p>
                </div>
              </div>
              <div className="checkout">
                {/* <button type="button">ADD TO CART</button>
                <button type="button">CHECKOUT</button> */}
                <Link href="/checkout" passHref>
                  <button type="button">CHECKOUT</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="arrows">
        <button
          id="prev"
          onClick={handlePrevClick}
          disabled={isAnimating}
          type="button"
        >
          &lt;
        </button>
        <button
          id="next"
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
