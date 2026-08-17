// Hearth & Paper: the shared shell keeps navigation editorial and practical, using oat paper,
// espresso ink, Copper Kettle rules, and short page-turn transitions.
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Calendar, Menu as MenuIcon, X } from "lucide-react";
import { useCustomization } from "@/contexts/CustomizationContext";
import ReservationModal from "@/components/ReservationModal";
import { getImageUrl } from "@/const";

const navItems = [
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our story" },
  { href: "/visit", label: "Visit" },
];

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [location, setLocation] = useLocation();
  const [open, setOpen] = useState(false);
  const [reservationOpen, setReservationOpen] = useState(false);
  const { selectedCustomizations } = useCustomization();
  const openCheckout = () => setLocation("/checkout");

  return (
    <div className="min-h-screen overflow-x-hidden text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-[#f6f0e6]/92 backdrop-blur-xl">
        <div className="container flex h-[76px] items-center justify-between gap-6">
          <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)} aria-label="Diwash's Café home">
            <span className="relative flex h-10 w-10 shrink-0 overflow-hidden items-center justify-center rounded-full border border-[#b65e3c]/70 bg-[#fffaf2] transition-transform duration-200 group-hover:rotate-[-8deg]"><img src={getImageUrl("/images/diwash_mark.png")} alt="" className="h-full w-full object-cover rounded-full" /></span>
            <span className="leading-none"><span className="block font-body text-[9px] font-extrabold tracking-[0.32em] text-[#6e3f2b]">DIWASH'S</span><span className="font-display text-[22px] text-[#2d241f]">Café</span><span className="block pt-0.5 font-body text-[7px] font-bold tracking-[0.23em] text-[#b65e3c]">COFFEE ROOM</span></span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            {navItems.map((item) => <Link key={item.href} href={item.href} className={`editorial-link font-body text-sm font-semibold ${location === item.href ? "text-[#b65e3c]" : "text-[#49382e]"}`}>{item.label}</Link>)}
          </nav>
          <div className="flex items-center gap-2 sm:gap-3">
            <button onClick={openCheckout} className="pressable flex min-h-[44px] items-center gap-1.5 bg-[#b65e3c] px-3.5 py-2.5 font-body text-[11px] font-extrabold tracking-[0.1em] text-[#fff9ef] rounded-lg sm:hidden" type="button" aria-label="Review order">
              {selectedCustomizations.length ? `ORDER (${selectedCustomizations.length})` : "ORDER"}
            </button>
            <button onClick={() => setReservationOpen(true)} className="pressable hidden items-center gap-2 border border-[#b65e3c] bg-[#fffaf2] px-4 py-2 font-body text-[11px] font-extrabold tracking-[0.12em] text-[#b65e3c] transition-colors hover:bg-[#b65e3c] hover:text-[#fff9ef] sm:flex" type="button">
              <Calendar className="h-3.5 w-3.5" /> RESERVE TABLE
            </button>
            <button onClick={openCheckout} className="pressable hidden items-center gap-2 bg-[#2d241f] px-4 py-2 font-body text-[11px] font-extrabold tracking-[0.12em] text-[#fff9ef] transition-colors hover:bg-[#b65e3c] sm:flex" type="button">
              {selectedCustomizations.length ? `REVIEW ORDER (${selectedCustomizations.length})` : "ORDER AHEAD"} <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? "Close menu" : "Open menu"} className="pressable inline-flex h-11 w-11 items-center justify-center border border-border bg-card text-[#2d241f] rounded-lg md:hidden">
              {open ? <X className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
        {open && (
          <div className="border-t border-border bg-[#fffaf2] px-6 py-6 shadow-xl md:hidden animate-fade-in">
            <nav className="flex flex-col gap-3" aria-label="Mobile navigation">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`flex min-h-[44px] items-center font-display text-3xl transition-colors ${location === item.href ? "text-[#b65e3c]" : "text-[#2d241f]"}`}>
                  {item.label}
                </Link>
              ))}
              <div className="mt-4 flex flex-col gap-3 border-t border-[#dfd3c3] pt-4">
                <button type="button" onClick={() => { setReservationOpen(true); setOpen(false); }} className="flex min-h-[44px] items-center gap-2.5 rounded-lg border border-[#b65e3c] bg-[#fffaf2] px-4 py-2.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#b65e3c]">
                  <Calendar className="h-4 w-4" /> RESERVE A TABLE
                </button>
                <button type="button" onClick={() => { openCheckout(); setOpen(false); }} className="flex min-h-[44px] items-center justify-between rounded-lg bg-[#2d241f] px-4 py-2.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef]">
                  <span>{selectedCustomizations.length ? `REVIEW ORDER (${selectedCustomizations.length})` : "ORDER AHEAD"}</span>
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </nav>
          </div>
        )}

      </header>
      <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
      <main>{children}</main>
      <footer className="border-t border-[#5e4738]/20 bg-[#2d241f] text-[#f6f0e6]">
        <div className="container grid gap-12 py-14 md:grid-cols-[1.3fr_0.7fr_0.9fr] md:py-20">
          <div><p className="font-body text-[10px] font-extrabold tracking-[0.28em] text-[#d88963]">NO. 04 / OPEN DAILY</p><h2 className="mt-4 max-w-sm font-display text-4xl leading-[0.98] text-[#fff9ef]">Make room for the good part of the day.</h2><Link href="/visit" className="editorial-link mt-7 inline-flex font-body text-sm font-bold text-[#d9c8b6]">Plan your visit <ArrowUpRight className="ml-2 h-4 w-4" /></Link></div>
          <div><p className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#d88963]">FIND US</p><p className="mt-4 font-body text-sm leading-7 text-[#d9c8b6]">Bhagwati Tole-3<br />27.868446, 83.545261<br /><a href="tel:7981459397" className="editorial-link">7981459397</a></p></div>
          <div><p className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#d88963]">THE SHORT VERSION</p><p className="mt-4 font-body text-sm leading-7 text-[#d9c8b6]">Coffee with a point of view. Pastry worth pausing for. A room made for lingering.</p></div>
        </div>
        <div className="container flex flex-col justify-between gap-3 border-t border-[#f6f0e6]/15 py-5 font-body text-[10px] font-bold tracking-[0.14em] text-[#a99481] sm:flex-row"><span>© 2026 DIWASH'S CAFÉ</span><span>MADE FOR MORNINGS / 7 AM — 3 PM</span></div>
      </footer>
    </div>
  );
}
