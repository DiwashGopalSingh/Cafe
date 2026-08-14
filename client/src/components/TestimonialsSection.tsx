import React, { useState, useEffect, useRef } from "react";
import { Star, Quote, ArrowLeft, ArrowRight } from "lucide-react";
import SectionIntro from "./SectionIntro";

interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  dish?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "The single best slow-morning espresso in the neighborhood. You can taste the intention in every cup and the cardamom galette is unmatched.",
    author: "Elena Rostova",
    role: "Local Architect & Morning Regular",
    rating: 5,
    date: "August 2026",
    dish: "Diwash's House Espresso",
  },
  {
    id: 2,
    quote: "A rare café where the quiet space is as refined as the pour-overs. It’s our team's favorite spot for honest, unhurried conversations.",
    author: "Julian Vance",
    role: "Editorial Director, Hearth Magazine",
    rating: 5,
    date: "July 2026",
    dish: "Slow Drip Filter Coffee",
  },
  {
    id: 3,
    quote: "The Orchard Toast with whipped ricotta and warm honey is pure comfort. Diwash's Café feels like a well-kept neighborhood secret.",
    author: "Sophie Chen",
    role: "Food & Travel Writer",
    rating: 5,
    date: "August 2026",
    dish: "The Orchard Toast",
  },
  {
    id: 4,
    quote: "Their signature Cardamom & Honey Latte is out of this world. The warm copper tones and soothing playlist make it the best morning sanctuary.",
    author: "Aarav Sharma",
    role: "Regular & Coffee Lover",
    rating: 5,
    date: "August 2026",
    dish: "Cardamom & Honey Latte",
  },
  {
    id: 5,
    quote: "Flaky wild mushroom tart paired with single-origin filter coffee. The attention to texture, temperature, and flavor balance is remarkable.",
    author: "Marcus Thorne",
    role: "Culinary Critic & Chef",
    rating: 5,
    date: "August 2026",
    dish: "Wild Mushroom Tart",
  },
  {
    id: 6,
    quote: "Stunning aesthetic, warm service, and incredible cold brew with floating sea salt cream. Bhagwati Tole-3 has a real gem now.",
    author: "Priya Patel",
    role: "Interior Design Consultant",
    rating: 5,
    date: "August 2026",
    dish: "Cold Brew & Salted Cream",
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto slide leftwards every 3.5 seconds when not hovered
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = (e.changedTouches[0]?.clientX ?? 0) - touchStartX.current;
    if (Math.abs(diff) > 40) {
      if (diff < 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  return (
    <section className="bg-[#fffaf2] py-20 md:py-28 border-b border-[#dfd3c3] overflow-hidden">
      <div className="container">
        <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
          <SectionIntro
            eyebrow="05 / KIND WORDS"
            title="What the morning crowd says."
            body="From early risers seeking a focused espresso to long afternoon conversations, we're grateful for the people who make this room special."
          />
          <div className="flex flex-wrap items-center gap-4 justify-between md:justify-end">
            <div className="flex items-center gap-1.5 bg-[#f6f0e6] px-4 py-2.5 rounded-full border border-[#cbb9a4]">
              <div className="flex text-[#b65e3c]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="font-body text-xs font-bold text-[#2d241f] ml-1">4.9 / 5.0</span>
              <span className="font-body text-[10px] text-[#77665a]">(240+ Reviews)</span>
            </div>

            {/* Carousel controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prevSlide}
                aria-label="Previous review"
                className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#b65e3c]/45 text-[#b65e3c] hover:bg-[#b65e3c] hover:text-[#fff9ef] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={nextSlide}
                aria-label="Next review"
                className="pressable inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#b65e3c]/45 text-[#b65e3c] hover:bg-[#b65e3c] hover:text-[#fff9ef] transition-colors"
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Sliding Carousel Container */}
        <div
          className="mt-14 overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <div
            className="flex transition-transform duration-700 ease-out gap-6"
            style={{
              transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1))}%)`,
            }}
          >
            {testimonials.map((t) => (
              <div
                key={t.id}
                className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] shrink-0 paper-surface relative flex flex-col justify-between border border-[#dfd3c3] p-7 transition-all duration-300 hover:shadow-[0_16px_35px_rgba(86,61,43,0.1)] hover:-translate-y-1"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <Quote className="h-7 w-7 text-[#b65e3c]/35" />
                    {t.dish && (
                      <span className="font-body text-[9px] font-bold tracking-[0.12em] text-[#b65e3c] bg-[#e9e0d2]/70 px-2.5 py-1 rounded-full border border-[#cbb9a4]/60">
                        {t.dish}
                      </span>
                    )}
                  </div>
                  <div className="flex text-[#b65e3c] mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="h-3.5 w-3.5 fill-current" />
                    ))}
                  </div>
                  <p className="font-body text-sm leading-6 text-[#49382e] italic">
                    "{t.quote}"
                  </p>
                </div>
                <div className="mt-8 border-t border-[#dfd3c3] pt-4 flex items-center justify-between">
                  <div>
                    <p className="font-body text-xs font-bold text-[#2d241f]">{t.author}</p>
                    <p className="font-body text-[11px] text-[#77665a]">{t.role}</p>
                  </div>
                  <span className="font-body text-[9px] font-semibold text-[#a18d7b]">{t.date}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="mt-8 flex justify-center items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                aria-label={`Go to slide ${index + 1}`}
                className={`h-2.5 rounded-full transition-all duration-300 ${
                  currentIndex === index
                    ? "w-8 bg-[#b65e3c]"
                    : "w-2.5 bg-[#cbb9a4]/60 hover:bg-[#b65e3c]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
