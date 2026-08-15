// Hearth & Paper: a real-photo gallery with touch navigation, editorial captions, and a menu-linked dish slide.
import { useRef, useState, type TouchEvent } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ArrowUpRight, Expand } from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import PhotoLightbox from "@/components/PhotoLightbox";

const cafeInterior = "/images/diwash_hero.png";
const cafeCounter = "/images/diwash_counter.png";
const featuredCoffee = "/images/crafted_espresso.png";
const windowCorner = "/images/cozy_window_table.png";
const serviceImg = "/images/cafe_hospitality.png";
const pastryImg = "/images/bakery_pastry.png";

const gallerySlides = [
  { title: "The room", caption: "Morning light across the communal table, with copper details close at hand.", meta: "Interior / morning light", image: cafeInterior, imageAlt: "Diwash's Café sunlit interior with wooden counter and copper accents", tone: "bg-[#dfcfbb]" },
  { title: "Window nook", caption: "A quiet corner by the window with warm coffee, fresh pastry, and soft morning light.", meta: "Seating / cozy window table", image: windowCorner, imageAlt: "Cozy window table with plush seating, coffee cup, and fresh pastry", tone: "bg-[#e8dad0]" },
  { title: "Warm Hospitality", caption: "Attentive service bringing freshly poured drinks and warm plates directly to your table.", meta: "Service / warm welcome", image: serviceImg, imageAlt: "Barista serving fresh coffee to guests at a café table", tone: "bg-[#f2e6d8]" },
  { title: "Crafted Coffee", caption: "Slowly brewed espresso with velvety micro-foam, prepared with precision and care.", meta: "Coffee / freshly poured", image: featuredCoffee, imageAlt: "Artisanal espresso cup with smooth latte art on a wooden table", tone: "bg-[#efe0d0]", link: "/menu" },
  { title: "Fresh Bakery", caption: "Golden croissants, tarts, and orchard fruit galettes baked fresh every morning.", meta: "Food / made to share", image: pastryImg, imageAlt: "Golden croissants and fresh fruit pastry on ceramic plates", tone: "bg-[#d8e0d0]", link: "/menu" },
];

export default function GalleryCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const activeSlide = gallerySlides[activeIndex];
  const previous = () => setActiveIndex(index => (index - 1 + gallerySlides.length) % gallerySlides.length);
  const next = () => setActiveIndex(index => (index + 1) % gallerySlides.length);
  const onTouchStart = (event: TouchEvent<HTMLDivElement>) => { touchStartX.current = event.changedTouches[0]?.clientX ?? null; };
  const onTouchEnd = (event: TouchEvent<HTMLDivElement>) => { const start = touchStartX.current; touchStartX.current = null; if (start === null) return; const distance = (event.changedTouches[0]?.clientX ?? start) - start; if (Math.abs(distance) < 48) return; if (distance < 0) next(); else previous(); };

  return <section className="bg-[#efe4d4] py-20 md:py-28">
    <div className="container grid gap-12 md:grid-cols-[0.75fr_1.25fr] md:items-center"><SectionIntro eyebrow="01 / THE GALLERY" title="A room worth lingering in." body="Real moments from the café, ready to browse with a swipe or a click." /><div>
      <div className="relative" role="region" aria-roledescription="carousel" aria-label="Copper Kettle photo gallery" tabIndex={0} onKeyDown={event => { if (event.key === "ArrowLeft") previous(); if (event.key === "ArrowRight") next(); }} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} onTouchCancel={() => { touchStartX.current = null; }}>
        <div className={`relative min-h-[340px] overflow-hidden border border-[#cbb9a4] ${activeSlide.tone} shadow-[0_16px_35px_rgba(86,61,43,0.1)]`} aria-live="polite"><img src={activeSlide.image} alt={activeSlide.imageAlt} className="absolute inset-0 h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#2d241f]/75 via-[#2d241f]/5 to-[#2d241f]/10" /><button type="button" onClick={() => setLightboxOpen(true)} aria-label={`View ${activeSlide.title} photo fullscreen`} className="absolute right-6 top-6 z-20 inline-flex items-center gap-2 border border-[#fffaf2]/70 bg-[#2d241f]/45 px-3 py-2 font-body text-[10px] font-extrabold tracking-[0.14em] text-[#fffaf2] backdrop-blur-sm transition-colors hover:bg-[#2d241f]/70"><Expand className="h-3.5 w-3.5" /> VIEW PHOTO</button><div className="relative flex min-h-[340px] flex-col justify-between p-6 md:p-8"><div className="flex items-start justify-between gap-4"><span className="font-body text-[9px] font-extrabold tracking-[0.2em] text-[#fffaf2]">GALLERY / {String(activeIndex + 1).padStart(2, "0")}</span><span className="font-body text-[10px] font-bold text-[#fffaf2]">{activeIndex + 1} / {gallerySlides.length}</span></div><div className="max-w-lg"><p className="font-display text-5xl leading-none text-[#fffaf2] md:text-6xl">{activeSlide.title}</p><p className="mt-4 max-w-md font-body text-sm leading-6 text-[#fffaf2]/90">{activeSlide.caption}</p>{activeSlide.link ? <Link href={activeSlide.link} className="editorial-link mt-6 inline-flex items-center font-body text-xs font-extrabold tracking-[0.14em] text-[#fffaf2]">SEE THE MENU <ArrowUpRight className="ml-2 h-4 w-4" /></Link> : <p className="mt-6 font-body text-[10px] font-extrabold tracking-[0.18em] text-[#fffaf2]">{activeSlide.meta}</p>}</div></div></div>
        <div className="mt-5 flex items-center justify-between gap-5"><p className="font-body text-[10px] font-extrabold tracking-[0.18em] text-[#77665a]">{activeSlide.meta}</p><div className="flex items-center gap-2"><button type="button" onClick={previous} aria-label="Previous gallery image" className="pressable inline-flex h-10 w-10 items-center justify-center border border-[#b65e3c]/45 text-[#b65e3c] hover:bg-[#fffaf2]"><ArrowLeft className="h-4 w-4" /></button><div className="flex items-center gap-1.5" aria-label="Choose gallery image">{gallerySlides.map((slide, index) => <button key={slide.title} type="button" onClick={() => setActiveIndex(index)} aria-label={`Show ${slide.title}`} aria-current={activeIndex === index ? "true" : undefined} className={`h-2.5 w-2.5 rounded-full border transition-colors ${activeIndex === index ? "border-[#b65e3c] bg-[#b65e3c]" : "border-[#b65e3c]/55 bg-transparent"}`} />)}</div><button type="button" onClick={next} aria-label="Next gallery image" className="pressable inline-flex h-10 w-10 items-center justify-center border border-[#b65e3c]/45 text-[#b65e3c] hover:bg-[#fffaf2]"><ArrowRight className="h-4 w-4" /></button></div></div>
      </div>
    </div></div>
    <div className="container mt-12 flex items-center gap-3 border-t border-[#cbb9a4] pt-5"><span className="h-2 w-2 rounded-full bg-[#b65e3c]" /><p className="font-body text-[10px] font-extrabold tracking-[0.2em] text-[#77665a]">SWIPE OR OPEN A PHOTO FOR A CLOSER LOOK</p></div>
    <PhotoLightbox open={lightboxOpen} slide={activeSlide} onClose={() => setLightboxOpen(false)} onPrevious={previous} onNext={next} />
  </section>;
}
