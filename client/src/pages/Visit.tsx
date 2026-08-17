// Hearth & Paper: visit page combines practical details, an interactive map, and a warm reservation
// request surface, with copper rules and paper textures carrying the café’s printed identity.
import { useCallback, useState } from "react";
import { ArrowUpRight, CarFront, Clock3, Mail, MapPin, Phone, TrainFront } from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import { MapView } from "@/components/Map";
import ReservationForm from "@/components/ReservationForm";
import { getImageUrl } from "@/const";

// Café location: 27.868446, 83.545261
const cafeLocation = { lat: 27.868446, lng: 83.545261 };

function LocationFallback() {
  return <div className="relative h-[380px] overflow-hidden bg-[#e9e0d2] md:h-[500px]">
    <div className="absolute inset-0 opacity-45" style={{ backgroundImage: "linear-gradient(#b9a58f 1px, transparent 1px), linear-gradient(90deg, #b9a58f 1px, transparent 1px)", backgroundSize: "52px 52px" }} />
    <div className="absolute left-[-10%] top-[48%] h-12 w-[120%] rotate-[-13deg] bg-[#d5c4ad] shadow-[0_0_0_1px_rgba(118,94,70,0.14)]" />
    <div className="absolute left-[57%] top-[-10%] h-[120%] w-9 rotate-[24deg] bg-[#d5c4ad] shadow-[0_0_0_1px_rgba(118,94,70,0.14)]" />
    <div className="absolute left-[47%] top-[39%] flex h-5 w-5 items-center justify-center rounded-full border-4 border-[#fffaf2] bg-[#b65e3c] shadow-[0_0_0_10px_rgba(182,94,60,0.18)]"><span className="h-1.5 w-1.5 rounded-full bg-[#fffaf2]" /></div>
    <div className="absolute left-1/2 top-[48%] w-[min(78%,290px)] -translate-x-1/2 -translate-y-1/2 bg-[#fffaf2]/95 p-5 text-center shadow-[0_16px_32px_rgba(86,61,43,0.14)]"><span className="mx-auto inline-flex h-9 w-9 overflow-hidden items-center justify-center rounded-full border border-[#b65e3c]/55 bg-[#fffaf2]"><img src={getImageUrl("/images/diwash_mark.png")} alt="" className="h-full w-full object-cover rounded-full" /></span><p className="mt-3 font-body text-[10px] font-extrabold tracking-[0.2em] text-[#b65e3c]">DIWASH'S CAFÉ</p><p className="mt-2 font-display text-3xl text-[#2d241f]">Bhagwati Tole-3</p><p className="mt-1 font-body text-xs text-[#77665a]">look for the mark</p></div>
    <p className="absolute bottom-4 left-6 font-body text-[9px] font-bold tracking-[0.15em] text-[#77665a]">MAP PIN / BHAGWATI TOLE-3</p>
  </div>;
}

export default function Visit() {
  const [mapFailed, setMapFailed] = useState(false);
  const handleMapReady = useCallback((map: google.maps.Map) => {
    if (window.google?.maps?.marker?.AdvancedMarkerElement) new window.google.maps.marker.AdvancedMarkerElement({ map, position: cafeLocation, title: "Diwash's Café" });
  }, []);

  return <div className="bg-[#f6f0e6]">
    <section className="border-b border-border/70 bg-[#fffaf2] py-14 sm:py-20 md:py-28">
      <div className="container grid gap-8 sm:gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-end">
        <SectionIntro eyebrow="VISIT / COME AS YOU ARE" title="Find your way to the kettle." body="A warm room, a short walk from wherever you are. Come for the first coffee or the last pastry; we’ll leave the light on." />
        <div className="paper-surface grid grid-cols-2 gap-4 sm:gap-5 p-5 sm:p-6 sm:grid-cols-4 md:mb-1 rounded-2xl">
          <div><Clock3 className="h-5 w-5 text-[#b65e3c]" /><p className="mt-2.5 sm:mt-3 font-body text-[10px] font-extrabold tracking-[0.16em] text-[#77665a]">HOURS</p><p className="mt-1 font-body text-sm font-bold text-[#2d241f]">7 — 3</p></div>
          <div><MapPin className="h-5 w-5 text-[#b65e3c]" /><p className="mt-2.5 sm:mt-3 font-body text-[10px] font-extrabold tracking-[0.16em] text-[#77665a]">ADDRESS</p><p className="mt-1 font-body text-sm font-bold text-[#2d241f]">Bhagwati Tole-3</p></div>
          <div><CarFront className="h-5 w-5 text-[#b65e3c]" /><p className="mt-2.5 sm:mt-3 font-body text-[10px] font-extrabold tracking-[0.16em] text-[#77665a]">PARKING</p><p className="mt-1 font-body text-sm font-bold text-[#2d241f]">Nearby</p></div>
          <div><TrainFront className="h-5 w-5 text-[#b65e3c]" /><p className="mt-2.5 sm:mt-3 font-body text-[10px] font-extrabold tracking-[0.16em] text-[#77665a]">TRANSIT</p><p className="mt-1 font-body text-sm font-bold text-[#2d241f]">2 blocks</p></div>
        </div>
      </div>
    </section>
    <section className="container grid gap-8 sm:gap-12 py-12 sm:py-16 md:grid-cols-[1.15fr_0.85fr] md:py-20">
      <div className="overflow-hidden border border-[#d6c6b2] bg-[#e9e0d2] rounded-2xl shadow-sm">
        <iframe
          title="Diwash's Café Google Maps Location"
          width="100%"
          height="500"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${cafeLocation.lat},${cafeLocation.lng}&z=16&output=embed`}
          className="h-[300px] sm:h-[400px] md:h-[500px] w-full"
        />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-[#d6c6b2] bg-[#fffaf2] p-4 sm:px-5">
          <p className="font-body text-[9px] font-bold tracking-[0.15em] text-[#77665a]">27.868446°N, 83.545261°E · DIWASH'S CAFÉ</p>
          <a href={`https://www.google.com/maps/dir/?api=1&destination=${cafeLocation.lat},${cafeLocation.lng}`} target="_blank" rel="noreferrer" className="editorial-link flex shrink-0 items-center font-body text-[10px] font-extrabold tracking-[0.14em] text-[#b65e3c]">GET DIRECTIONS <ArrowUpRight className="ml-2 h-4 w-4" /></a>
        </div>
      </div>

      <div><SectionIntro eyebrow="THE PRACTICAL PART" title="Come early. Call if you need us." body="We keep the door open from the first good light until the afternoon starts to turn. For accessibility, large groups, or a special order, a quick call is the kindest way to make a plan." /><div className="mt-10 grid gap-5 border-t border-[#dfd3c3] pt-5"><a href="tel:7981459397" className="group flex items-center justify-between"><span className="flex items-center gap-3 font-body text-sm font-bold text-[#2d241f]"><Phone className="h-4 w-4 text-[#b65e3c]" />7981459397</span><ArrowUpRight className="h-4 w-4 text-[#b65e3c] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a><a href="mailto:diwashgs64@gmail.com" className="group flex items-center justify-between border-t border-[#dfd3c3] pt-5"><span className="flex items-center gap-3 font-body text-sm font-bold text-[#2d241f]"><Mail className="h-4 w-4 text-[#b65e3c]" />diwashgs64@gmail.com</span><ArrowUpRight className="h-4 w-4 text-[#b65e3c] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a></div></div></section>
    <section className="container grid gap-10 border-t border-[#dfd3c3] py-16 md:grid-cols-[0.7fr_1.3fr] md:py-24"><div><SectionIntro eyebrow="RESERVE A TABLE" title="Give the day a little shape." body="Choose a time and send a request. We’ll confirm the table by email." /></div><ReservationForm /></section>
  </div>;
}
