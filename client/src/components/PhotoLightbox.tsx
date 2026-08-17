// Hearth & Paper: the lightbox keeps the gallery’s warm editorial tone while giving mobile visitors
// a deliberate, touch-first way to inspect real café photography closely.
import { useEffect, useRef, useState, type TouchEvent } from "react";
import { ArrowLeft, ArrowRight, Minus, Plus, RotateCcw, X } from "lucide-react";

type LightboxSlide = { title: string; caption: string; image: string; imageAlt: string };
type PhotoLightboxProps = { open: boolean; slide: LightboxSlide; onClose: () => void; onPrevious: () => void; onNext: () => void };

export default function PhotoLightbox({ open, slide, onClose, onPrevious, onNext }: PhotoLightboxProps) {
  const [scale, setScale] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const gesture = useRef({ startDistance: null as number | null, startScale: 1, lastX: null as number | null, lastY: null as number | null });

  const resetZoom = () => { setScale(1); setOffset({ x: 0, y: 0 }); };
  const zoomIn = () => setScale(current => Math.min(3.5, Number((current + 0.25).toFixed(2))));
  const zoomOut = () => { const next = Math.max(1, Number((scale - 0.25).toFixed(2))); setScale(next); if (next === 1) setOffset({ x: 0, y: 0 }); };
  const distanceBetweenTouches = (event: TouchEvent<HTMLDivElement>) => { const [first, second] = Array.from(event.touches); return first && second ? Math.hypot(second.clientX - first.clientX, second.clientY - first.clientY) : null; };
  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    if (event.touches.length === 2) {
      event.preventDefault();
      gesture.current.startDistance = distanceBetweenTouches(event);
      gesture.current.startScale = scale;
      gesture.current.lastX = null;
      gesture.current.lastY = null;
    } else if (event.touches.length === 1 && scale > 1) {
      gesture.current.lastX = event.touches[0].clientX;
      gesture.current.lastY = event.touches[0].clientY;
    }
  };
  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    const currentGesture = gesture.current;
    if (event.touches.length === 2 && currentGesture.startDistance) {
      event.preventDefault();
      const distance = distanceBetweenTouches(event);
      if (distance) {
        const nextScale = Math.min(3.5, Math.max(1, currentGesture.startScale * (distance / currentGesture.startDistance)));
        setScale(nextScale);
        if (nextScale <= 1.02) setOffset({ x: 0, y: 0 });
      }
    } else if (event.touches.length === 1 && scale > 1 && currentGesture.lastX !== null && currentGesture.lastY !== null) {
      event.preventDefault();
      const touch = event.touches[0];
      setOffset(current => ({ x: current.x + touch.clientX - currentGesture.lastX!, y: current.y + touch.clientY - currentGesture.lastY! }));
      currentGesture.lastX = touch.clientX;
      currentGesture.lastY = touch.clientY;
    }
  };
  const handleTouchEnd = () => { gesture.current.startDistance = null; gesture.current.lastX = null; gesture.current.lastY = null; };

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    return () => { document.removeEventListener("keydown", onKeyDown); document.body.style.overflow = ""; resetZoom(); };
  }, [open, onClose]);

  useEffect(() => { resetZoom(); }, [slide.image]);
  if (!open) return null;

  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#2d241f]/95 p-3 sm:p-6 md:p-10" role="dialog" aria-modal="true" aria-labelledby="gallery-lightbox-title" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="relative flex w-full max-w-6xl flex-col items-center">
      <button ref={closeButtonRef} type="button" onClick={onClose} aria-label="Close fullscreen photo" className="pressable absolute right-0 top-[-3.25rem] inline-flex h-11 w-11 items-center justify-center border border-[#fffaf2]/50 text-[#fffaf2] hover:bg-[#fffaf2]/10 rounded-full"><X className="h-5 w-5" /></button>
      <div className="relative flex max-h-[70vh] sm:max-h-[78vh] w-full items-center justify-center overflow-hidden" onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} onTouchCancel={handleTouchEnd} style={{ touchAction: "none" }}>
        <img src={slide.image} alt={slide.imageAlt} className="max-h-[70vh] sm:max-h-[78vh] max-w-full select-none object-contain" style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: "center center", transition: gesture.current.startDistance ? "none" : "transform 180ms cubic-bezier(0.23, 1, 0.32, 1)" }} draggable={false} />
      </div>
      <div className="mt-4 sm:mt-5 flex w-full flex-col sm:flex-row items-start sm:items-end justify-between gap-4 sm:gap-6 text-[#fffaf2]">
        <div>
          <p id="gallery-lightbox-title" className="font-display text-2xl sm:text-3xl">{slide.title}</p>
          <p className="mt-1 sm:mt-2 font-body text-xs sm:text-sm text-[#fffaf2]/75">{slide.caption}</p>
          <p className="mt-1 sm:mt-2 font-body text-[9px] sm:text-[10px] font-extrabold tracking-[0.14em] text-[#fffaf2]/60">PINCH TO ZOOM / DRAG TO PAN / {Math.round(scale * 100)}%</p>
        </div>
        <div className="flex flex-wrap shrink-0 items-center gap-1.5 sm:gap-2">
          <button type="button" onClick={zoomOut} aria-label="Zoom out" disabled={scale === 1} className="pressable inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border border-[#fffaf2]/50 hover:bg-[#fffaf2]/10 disabled:cursor-not-allowed disabled:opacity-40 rounded-md"><Minus className="h-4 w-4" /></button>
          <button type="button" onClick={resetZoom} aria-label="Reset photo zoom" className="pressable inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border border-[#fffaf2]/50 hover:bg-[#fffaf2]/10 rounded-md"><RotateCcw className="h-4 w-4" /></button>
          <button type="button" onClick={zoomIn} aria-label="Zoom in" disabled={scale === 3.5} className="pressable inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border border-[#fffaf2]/50 hover:bg-[#fffaf2]/10 disabled:cursor-not-allowed disabled:opacity-40 rounded-md"><Plus className="h-4 w-4" /></button>
          <button type="button" onClick={onPrevious} aria-label="Previous fullscreen photo" className="pressable ml-1 sm:ml-2 inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border border-[#fffaf2]/50 hover:bg-[#fffaf2]/10 rounded-md"><ArrowLeft className="h-4 w-4" /></button>
          <button type="button" onClick={onNext} aria-label="Next fullscreen photo" className="pressable inline-flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center border border-[#fffaf2]/50 hover:bg-[#fffaf2]/10 rounded-md"><ArrowRight className="h-4 w-4" /></button>
        </div>
      </div>
    </div>
  </div>;
}
