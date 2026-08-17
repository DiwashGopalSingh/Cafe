import { useState } from "react";
import { Link } from "wouter";
import { ArrowDownRight, ArrowUpRight, Calendar, Clock3, MapPin, Phone } from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import GalleryCarousel from "@/components/GalleryCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import ReservationModal from "@/components/ReservationModal";
import { getImageUrl } from "@/const";

const hero = getImageUrl("/images/diwash_hero.png");
const featuredCoffee = getImageUrl("/images/crafted_espresso.png");
const interior = getImageUrl("/images/bakery_pastry.png");

export default function Home() {
  const [reservationOpen, setReservationOpen] = useState(false);

  return <div>
    <section className="relative overflow-hidden border-b border-border/70 bg-[#f6f0e6]">
      <div className="container grid min-h-[520px] sm:min-h-[600px] md:min-h-[670px] items-center gap-8 sm:gap-12 py-10 sm:py-16 md:grid-cols-[0.82fr_1.18fr] md:py-24 lg:gap-20">
        <div className="relative z-10 max-w-xl">
          <p className="fade-up font-body text-[10px] font-extrabold tracking-[0.3em] text-[#b65e3c]">NO. 04 / NEIGHBORHOOD COFFEE ROOM</p>
          <h1 className="fade-up fade-up-delay-1 mt-4 sm:mt-7 font-display text-balance text-[clamp(2.75rem,8vw,7.5rem)] leading-[0.85] sm:leading-[0.82] tracking-[-0.04em] text-[#2d241f]">
            A good cup changes the <em className="text-[#b65e3c]">shape</em> of the morning.
          </h1>
          <p className="fade-up fade-up-delay-2 mt-5 sm:mt-8 max-w-md font-body text-sm sm:text-base leading-6 sm:leading-7 text-[#77665a]">
            Coffee with a point of view, pastry worth pausing for, and a room made for the hours between here and wherever you’re going next.
          </p>
          <div className="fade-up fade-up-delay-3 mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
            <Link href="/menu" className="pressable inline-flex items-center justify-center gap-3 bg-[#b65e3c] px-5 py-3.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef] rounded-lg hover:bg-[#9e4d30]">
              SEE THE MENU <ArrowUpRight className="h-4 w-4" />
            </Link>
            <button onClick={() => setReservationOpen(true)} className="pressable inline-flex items-center justify-center gap-3 bg-[#2d241f] px-5 py-3.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef] rounded-lg hover:bg-[#b65e3c] transition-colors">
              <Calendar className="h-4 w-4" /> RESERVE A TABLE
            </button>
            <Link href="/visit" className="editorial-link font-body text-xs font-extrabold tracking-[0.14em] text-[#49382e] text-center sm:text-left pt-2 sm:pt-0">
              FIND THE KETTLE
            </Link>
          </div>
        </div>
        <div className="relative min-h-[280px] sm:min-h-[420px] md:min-h-[600px]">
          <div className="absolute -right-8 top-2 h-20 w-20 rounded-full border border-[#b65e3c]/45 md:right-2 md:top-6" />
          <div className="absolute -bottom-4 left-0 z-20 hidden max-w-[170px] bg-[#fffaf2] p-4 shadow-[0_16px_35px_rgba(86,61,43,0.12)] sm:block">
            <p className="font-body text-[9px] font-extrabold tracking-[0.2em] text-[#b65e3c]">TODAY’S NOTE</p>
            <p className="mt-3 font-display text-xl leading-tight text-[#2d241f]">Come early. Stay awhile.</p>
          </div>
          <div className="relative h-full min-h-[280px] sm:min-h-[420px] overflow-hidden rounded-[2rem_0.6rem_2rem_0.6rem] sm:rounded-[3rem_0.6rem_3rem_0.6rem] bg-[#ddcdb8] shadow-[0_25px_70px_rgba(86,61,43,0.18)] md:min-h-[600px]">
            <img src={hero} alt="Coffee on a warm wooden café counter in morning light" className="h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d241f]/25 to-transparent" />
          </div>
          <div className="absolute -bottom-10 -right-5 hidden h-36 w-36 rounded-full bg-[#78907c]/80 mix-blend-multiply lg:block" />
        </div>
      </div>
      <div className="container flex items-center gap-3 pb-7 sm:pb-9 font-body text-[10px] font-extrabold tracking-[0.22em] text-[#a18d7b]">
        <ArrowDownRight className="h-4 w-4 text-[#b65e3c]" /> SCROLL FOR THE GOOD PART
      </div>
    </section>
    <GalleryCarousel />
    <section className="grain bg-[#fffaf2] py-14 sm:py-20 md:py-28">
      <div className="container grid gap-10 sm:gap-14 md:grid-cols-[0.75fr_1.25fr] md:items-end">
        <SectionIntro eyebrow="02 / THE ROOM" title="Small rituals. Big difference." body="We keep the room simple so the details have somewhere to land: properly dialed espresso, pastry still warm from the oven, and a little more time than you thought you had." />
        <div className="grid grid-cols-2 gap-3 sm:gap-6">
          <div className="pt-6 sm:pt-12">
            <img src={interior} alt="Warm interior corner with a communal table and copper light" className="soft-lift aspect-[4/5] w-full object-cover rounded-[0.6rem_1.5rem_0.6rem_1.5rem] sm:rounded-[0.6rem_2rem_0.6rem_2rem]" />
          </div>
          <div>
            <img src={featuredCoffee} alt="Crafted espresso poured over warm ceramic cup" className="soft-lift aspect-[4/5] w-full object-cover rounded-[1.5rem_0.6rem_1.5rem_0.6rem] sm:rounded-[2rem_0.6rem_2rem_0.6rem]" />
            <p className="mt-3 sm:mt-4 font-body text-[9px] sm:text-[10px] font-extrabold tracking-[0.2em] text-[#b65e3c]">A LITTLE SLOWER / A LOT BETTER</p>
          </div>
        </div>
      </div>
    </section>
    <section className="bg-[#dce5d8] py-14 sm:py-20 md:py-28">
      <div className="container grid gap-10 sm:gap-12 md:grid-cols-[1.15fr_0.85fr] md:items-center">
        <div>
          <div className="mb-4 sm:mb-6 flex items-center gap-3">
            <span className="font-body text-[10px] font-extrabold tracking-[0.28em] text-[#54705b]">03 / WHAT’S ON</span>
            <span className="h-px w-16 bg-[#54705b]/40" />
          </div>
          <h2 className="max-w-2xl font-display text-balance text-4xl sm:text-5xl md:text-7xl leading-[0.92] text-[#2d241f]">
            A short menu with a long memory.
          </h2>
          <p className="mt-5 sm:mt-7 max-w-lg font-body text-sm sm:text-[15px] leading-6 sm:leading-7 text-[#526358]">
            The familiar things, made attentively. A few bright seasonal turns. Nothing here is trying too hard.
          </p>
          <Link href="/menu" className="editorial-link mt-6 sm:mt-8 inline-flex items-center font-body text-xs font-extrabold tracking-[0.16em] text-[#34443a]">
            READ THE FULL MENU <ArrowUpRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
        <div className="paper-surface relative p-6 sm:p-7 md:p-9 rounded-2xl shadow-sm">
          <div className="copper-rule" />
          <p className="mt-5 sm:mt-6 font-body text-[10px] font-extrabold tracking-[0.25em] text-[#b65e3c]">SEASONAL / 01</p>
          <h3 className="mt-3 sm:mt-4 font-display text-3xl sm:text-4xl leading-none text-[#2d241f]">The Orchard Toast</h3>
          <p className="mt-3 sm:mt-4 font-body text-sm leading-6 text-[#77665a]">Grilled sourdough, whipped ricotta, orchard fruit, toasted seeds, and a little honey.</p>
          <div className="mt-6 sm:mt-8 flex items-center justify-between border-t border-[#dfd3c3] pt-4 font-body text-xs font-extrabold tracking-[0.12em] text-[#6e3f2b]">
            <span>07:00 — 15:00</span>
            <span>$12</span>
          </div>
        </div>
      </div>
    </section>
    <TestimonialsSection />
    <section className="bg-[#f6f0e6] py-14 sm:py-20 md:py-28">
      <div className="container grid gap-10 sm:gap-12 md:grid-cols-[0.8fr_1.2fr] md:items-start">
        <SectionIntro eyebrow="04 / COME BY" title="The door is usually open." body="The room changes with the light. If you have a particular need or a large table to gather, a quick call is the kindest way to make a plan." />
        <div className="grid gap-4 sm:gap-5 sm:grid-cols-3">
          <div className="border-t-2 border-[#b65e3c] pt-4">
            <MapPin className="h-5 w-5 text-[#b65e3c]" />
            <p className="mt-3 sm:mt-5 font-body text-sm font-bold text-[#2d241f]">Bhagwati Tole-3</p>
            <p className="mt-1 font-body text-sm text-[#77665a]">27.868446, 83.545261</p>
          </div>
          <div className="border-t-2 border-[#b65e3c] pt-4">
            <Clock3 className="h-5 w-5 text-[#b65e3c]" />
            <p className="mt-3 sm:mt-5 font-body text-sm font-bold text-[#2d241f]">Every day</p>
            <p className="mt-1 font-body text-sm text-[#77665a]">7 am — 3 pm</p>
          </div>
          <div className="border-t-2 border-[#b65e3c] pt-4">
            <Phone className="h-5 w-5 text-[#b65e3c]" />
            <p className="mt-3 sm:mt-5 font-body text-sm font-bold text-[#2d241f]">Call ahead</p>
            <a href="tel:7981459397" className="editorial-link mt-1 inline-block font-body text-sm text-[#77665a]">7981459397</a>
          </div>
        </div>
      </div>
    </section>
    <ReservationModal isOpen={reservationOpen} onClose={() => setReservationOpen(false)} />
  </div>;
}


