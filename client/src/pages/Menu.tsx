// Hearth & Paper: the menu page behaves like a tactile printed list, with a clear pre-order
// customization summary that never turns a request into an unverified dietary claim.
import React, { useMemo, useState } from "react";
import { ArrowUpRight, Check, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import SectionIntro from "@/components/SectionIntro";
import MenuItem, { MenuItemData } from "@/components/MenuItem";
import OrderModal from "@/components/OrderModal";
import { getImageUrl } from "@/const";

const items: MenuItemData[] = [
  { name: "Diwash's House Espresso", price: "$4.50", category: "Hot Drink", description: "Our signature double shot featuring origin notes of dark chocolate, stone fruit, and brown sugar.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80" },
  { name: "Cardamom & Honey Latte", price: "$6.00", category: "Hot Drink", description: "Freshly ground cardamom, wildflower honey, espresso, and silky steamed milk.", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80" },
  { name: "Slow Drip Filter Coffee", price: "$5.00", category: "Hot Drink", description: "Single-origin seasonal bean brewed slowly for clarity, floral aroma, and a clean finish.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80" },
  { name: "Smoky Vanilla Cappuccino", price: "$5.50", category: "Hot Drink", description: "Double espresso, house-smoked vanilla bean syrup, and micro-foamed milk.", image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=600&q=80" },
  { name: "Spiced Chai & Oat Milk", price: "$5.50", category: "Hot Drink", description: "Whole-spice slow decoction chai blended with organic oat milk.", image: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=600&q=80" },
  { name: "Cold Brew & Salted Cream", price: "$6.00", category: "Cold Drinks", description: "24-hour steep cold coffee topped with a floating velvety sea salt cream.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
  { name: "Iced Hibiscus & Citrus Tonic", price: "$5.50", category: "Cold Drinks", description: "Steeped organic hibiscus, citrus bitters, sparkling tonic water over hand-cut ice.", image: "https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&w=600&q=80" },
  { name: "Fresh Orchard Fruit Juice", price: "$5.00", category: "Cold Drinks", description: "Pressed daily with local apple, ginger, and Meyer lemon.", image: "https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&w=600&q=80" },
  { name: "The Orchard Toast", price: "$12.00", category: "Food", description: "Grilled sourdough, whipped ricotta, seasonal fruit, toasted seeds, and a honey drizzle.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80", featured: true },
  { name: "Wild Mushroom & Gruyère Tart", price: "$14.00", category: "Food", description: "Flaky rye crust filled with caramelized leeks, wild mushrooms, and melted aged Gruyère.", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80" },
  { name: "Roasted Duck & Fennel Sandwich", price: "$16.00", category: "Food", description: "Slow roasted duck breast, pickled fennel, watercress, and plum chutney on ciabatta.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80" },
  { name: "Soft Scramble & Herb Butter", price: "$11.00", category: "Food", description: "Pasture eggs gently scrambled with chives, cultured herb butter, served with country toast.", image: "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?auto=format&fit=crop&w=600&q=80" },
  { name: "Warm Almond & Pistachio Croissant", price: "$6.50", category: "Snack", description: "Double-baked twice with almond frangipane and crushed pistachios.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80" },
  { name: "Cardamom & Brown Sugar Scone", price: "$5.00", category: "Snack", description: "Crumbly butter scone baked fresh every morning with coarse sugar topping.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80" },
  { name: "Seasonal Fruit Galette", price: "$7.00", category: "Snack", description: "Rustic free-form tart filled with orchard fruit and vanilla bean syrup.", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80" },
  { name: "Crispy Thyme Fries & Garlic Aioli", price: "$8.00", category: "Snack", description: "Hand-cut skin-on potatoes tossed with fresh thyme salt and house-made aioli.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80" }
];
const categories = ["All", "Hot Drink", "Cold Drinks", "Food", "Snack"];
const dietaryOptions = ["gluten-free", "vegan"];

export default function Menu() {
  const [category, setCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>([]);
  const [orderModalOpen, setOrderModalOpen] = useState(false);

  const sections = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const filteredItems = items.filter((item) => {
      const searchable = [item.name, item.category].join(" ").toLowerCase();
      return !normalizedQuery || searchable.includes(normalizedQuery);
    });
    return (category === "All" ? categories.slice(1) : [category])
      .map((name) => ({ name, items: filteredItems.filter((item) => item.category === name) }))
      .filter((section) => section.items.length);
  }, [category, query]);
  const visibleCount = sections.reduce((total: number, section: { name: string; items: MenuItemData[] }) => total + section.items.length, 0);
  const toggleCustomization = (itemName: string) => setSelectedCustomizations((current: string[]) => current.includes(itemName) ? current.filter((name: string) => name !== itemName) : [...current, itemName]);

  return <div className="bg-[#f6f0e6] relative">
    <section className="border-b border-border/70 bg-[#fffaf2] py-16 md:py-24">
      <div className="container grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
        <div>
          <SectionIntro
            eyebrow="THE MENU / NO. 04"
            title="Good food, simply listed."
            body="Food, snacks, hot drinks, and cold drinks from the café’s latest menu card."
          />
          <p className="mt-6 font-body text-xs leading-6 text-[#77665a]">
            Ask the team about allergens.<br />Click any dish or drink below to place your order.
          </p>
        </div>
        <div className="relative overflow-hidden rounded-2xl border border-[#cbb9a4] bg-[#e9e0d2] shadow-xl group">
          <img
            src={getImageUrl("/images/crafted_espresso.png")}
            alt="Diwash's Café Menu Table"
            className="h-64 sm:h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2d241f]/70 via-transparent to-transparent flex items-end p-5">
            <span className="font-body text-[10px] font-extrabold tracking-[0.2em] text-[#fff9ef] bg-[#b65e3c]/90 px-3 py-1 rounded-full border border-[#fff9ef]/30">
              BHAGWATI TOLE-3 / FRESH DAILY
            </span>
          </div>
        </div>
      </div>
    </section>
    <section className="container py-12 md:py-20">
      <div className="border-b border-[#dfd3c3] pb-7"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#b65e3c]">CHOOSE YOUR MOMENT</p><div className="mt-5 flex flex-wrap gap-2" role="tablist" aria-label="Menu categories">{categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`pressable border px-4 py-2 font-body text-xs font-bold transition-colors ${category === item ? "border-[#b65e3c] bg-[#b65e3c] text-[#fff9ef]" : "border-[#cbb9a4] bg-transparent text-[#77665a] hover:border-[#b65e3c] hover:text-[#b65e3c]"}`}>{item}</button>)}</div></div><p className="font-body text-xs font-semibold text-[#a18d7b]">{visibleCount} items / owner supplied</p></div>
        <div className="mt-7 grid gap-4 md:grid-cols-[1fr_auto] md:items-end"><label className="block"><span className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#b65e3c]">SEARCH THE MENU</span><span className="relative mt-2 block"><Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#b65e3c]" /><input value={query} onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)} type="search" placeholder="Try “duck”, “tea”, or “fries”" aria-label="Search menu items" className="h-11 w-full border border-[#cbb9a4] bg-[#fffaf2] pl-10 pr-10 font-body text-sm text-[#2d241f] outline-none transition-shadow placeholder:text-[#a18d7b] focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20" />{query && <button type="button" onClick={() => setQuery("")} aria-label="Clear menu search" className="absolute right-3 top-1/2 -translate-y-1/2 text-[#77665a] hover:text-[#b65e3c]"><X className="h-4 w-4" /></button>}</span></label>
          <div><span className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#b65e3c]">FILTER / DIETARY STATUS</span><div className="mt-2 flex flex-wrap items-center gap-2"><span className="mr-1 font-body text-[10px] text-[#a18d7b]">PENDING REVIEW</span>{dietaryOptions.map((option: string) => <button key={option} type="button" disabled aria-disabled="true" className="border border-[#d8cbbb] bg-[#eee7dc] px-3 py-2 font-body text-[10px] font-bold tracking-[0.1em] text-[#a18d7b]">{option.toUpperCase()}</button>)}</div><p className="mt-2 max-w-xs font-body text-[10px] leading-4 text-[#a18d7b]">Use the per-dish customization button below to request gluten-free preparation.</p></div>
        </div>
      </div>
      
      <section className="paper-surface mt-8 border border-[#cbb9a4] p-5 md:p-6 shadow-sm" aria-live="polite" aria-labelledby="selected-customizations-title">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="font-body text-[10px] font-extrabold tracking-[0.24em] text-[#b65e3c]">PRE-ORDER LIST</p>
            <h2 id="selected-customizations-title" className="mt-2 font-display text-3xl text-[#2d241f]">
              Selected items to order ({selectedCustomizations.length})
            </h2>
          </div>
          {selectedCustomizations.length > 0 && (
            <button type="button" onClick={() => setSelectedCustomizations([])} className="editorial-link font-body text-[10px] font-extrabold tracking-[0.14em] text-[#b65e3c]">
              CLEAR ALL
            </button>
          )}
        </div>

        {selectedCustomizations.length === 0 ? (
          <p className="mt-4 max-w-xl font-body text-sm leading-6 text-[#77665a]">
            No items selected yet. Click on any dish or drink below to add it to your order.
          </p>
        ) : (
          <div>
            <ul className="mt-5 grid gap-2 sm:grid-cols-2">
              {selectedCustomizations.map((name: string) => (
                <li key={name} className="flex items-center justify-between gap-3 border-t border-[#dfd3c3] pt-3 font-body text-sm text-[#34443a]">
                  <span className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-[#54705b]" />
                    {name}
                  </span>
                  <button type="button" onClick={() => toggleCustomization(name)} aria-label={`Remove ${name} from order`} className="font-body text-[10px] font-extrabold tracking-[0.1em] text-[#b65e3c]">
                    REMOVE
                  </button>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-[#dfd3c3] pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-body text-xs text-[#77665a]">
                Ready to place your order with Diwash's Café team?
              </p>
              <button
                type="button"
                onClick={() => setOrderModalOpen(true)}
                className="pressable w-full sm:w-auto bg-[#b65e3c] px-6 py-3 font-body text-xs font-extrabold tracking-[0.18em] text-[#fff9ef] rounded-lg hover:bg-[#9e4d30] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <ShoppingBag className="h-4 w-4" /> PLACE ORDER NOW ({selectedCustomizations.length})
              </button>
            </div>
          </div>
        )}
      </section>

      <div className="mt-8 max-w-3xl">{sections.length ? sections.map((section: { name: string; items: MenuItemData[] }) => <section key={section.name} className="mb-10 last:mb-0"><div className="mb-1 flex items-center gap-3 border-b-2 border-[#b65e3c]/45 pb-3"><span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-[#b65e3c]/55 bg-[#fffaf2] p-1"><img src={getImageUrl("/images/diwash_mark.png")} alt="" className="h-full w-full object-contain" /></span><span className="font-body text-[10px] font-extrabold tracking-[0.27em] text-[#b65e3c]">{section.name.toUpperCase()} / {String(section.items.length).padStart(2, "0")}</span><span className="ml-auto font-body text-[9px] font-bold tracking-[0.14em] text-[#a18d7b]">ASK ABOUT TODAY’S BATCH</span></div>{section.items.map((item: MenuItemData) => <MenuItem key={item.name} item={item} glutenFreeRequested={selectedCustomizations.includes(item.name)} onGlutenFreeToggle={toggleCustomization} />)}</section>) : <div className="border border-dashed border-[#cbb9a4] bg-[#fffaf2] px-6 py-10 text-center"><p className="font-display text-3xl text-[#2d241f]">Nothing on this page yet.</p><p className="mt-3 font-body text-sm text-[#77665a]">Try a different search or clear the menu search.</p><button type="button" onClick={() => { setQuery(""); setCategory("All"); }} className="editorial-link mt-5 font-body text-xs font-extrabold tracking-[0.14em] text-[#b65e3c]">CLEAR SEARCH</button></div>}</div>
      <div className="mt-14 flex items-center justify-between border-t border-[#dfd3c3] pt-5"><p className="max-w-sm font-body text-xs leading-5 text-[#77665a]">Menu details are transcribed from the supplied image. Please ask the café team about ingredients and allergens.</p><a href="mailto:diwashgs64@gmail.com" className="editorial-link flex items-center font-body text-xs font-extrabold tracking-[0.14em] text-[#b65e3c]">ASK A QUESTION <ArrowUpRight className="ml-2 h-4 w-4" /></a></div>
    </section>

    {/* Sticky floating bottom order bar */}
    {selectedCustomizations.length > 0 && (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-[92%] max-w-md bg-[#2d241f] text-[#fff9ef] p-4 rounded-2xl shadow-2xl border border-[#b65e3c]/50 flex items-center justify-between gap-4">
        <div>
          <p className="font-body text-xs font-bold text-[#fff9ef] flex items-center gap-2">
            <ShoppingBag className="h-4 w-4 text-[#b65e3c]" /> {selectedCustomizations.length} items in your order
          </p>
          <p className="font-body text-[10px] text-[#d9c8b6]">Ready for Diwash's Café?</p>
        </div>
        <button
          type="button"
          onClick={() => setOrderModalOpen(true)}
          className="pressable bg-[#b65e3c] px-4 py-2.5 rounded-xl font-body text-xs font-extrabold tracking-wider text-[#fff9ef] hover:bg-[#9e4d30] transition-colors flex items-center gap-1.5 shadow-sm"
        >
          PLACE ORDER →
        </button>
      </div>
    )}

    <OrderModal
      isOpen={orderModalOpen}
      onClose={() => setOrderModalOpen(false)}
      selectedItems={selectedCustomizations}
      allMenuItems={items}
      onOrderSuccess={() => setSelectedCustomizations([])}
    />
  </div>;
}
