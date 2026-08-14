// Hearth & Paper: the fallback page keeps the same paper-and-ink voice and provides a clear route back to the café.
import { ArrowUpRight } from "lucide-react";
import { Link } from "wouter";

export default function NotFound() {
  return <div className="container flex min-h-[70vh] items-center"><div className="max-w-xl"><p className="font-body text-[10px] font-extrabold tracking-[0.3em] text-[#b65e3c]">PAGE / 404</p><h1 className="mt-6 font-display text-7xl leading-none text-[#2d241f]">This page wandered off.</h1><p className="mt-6 font-body text-base leading-7 text-[#77665a]">The kettle is still on, though. Head back to the café and start again.</p><Link href="/" className="pressable mt-8 inline-flex items-center gap-2 bg-[#b65e3c] px-5 py-3.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef]">BACK TO THE CAFÉ <ArrowUpRight className="h-4 w-4" /></Link></div></div>;
}
