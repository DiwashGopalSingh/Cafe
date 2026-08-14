import React, { FormEvent, useRef, useState } from "react";
import { ArrowLeft, Check, CheckCircle2, Plus, Send, ShoppingBag, Sparkles, X, Utensils } from "lucide-react";
import { Link } from "wouter";
import SectionIntro from "@/components/SectionIntro";
import { useCustomization } from "@/contexts/CustomizationContext";
import MenuItem, { MenuItemData } from "@/components/MenuItem";

const menuItems: MenuItemData[] = [
  { name: "Diwash's House Espresso", price: "$4.50", category: "Hot Drink", description: "Our signature double shot with notes of dark chocolate & stone fruit.", image: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?auto=format&fit=crop&w=600&q=80" },
  { name: "Cardamom & Honey Latte", price: "$6.00", category: "Hot Drink", description: "Ground cardamom, wildflower honey, espresso & steamed milk.", image: "https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80" },
  { name: "Slow Drip Filter Coffee", price: "$5.00", category: "Hot Drink", description: "Single-origin seasonal bean brewed slowly for clarity & floral aroma.", image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80" },
  { name: "Cold Brew & Salted Cream", price: "$6.00", category: "Cold Drinks", description: "24-hour steep cold coffee topped with floating sea salt cream.", image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80" },
  { name: "The Orchard Toast", price: "$12.00", category: "Food", description: "Grilled sourdough, whipped ricotta, seasonal fruit & honey.", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=600&q=80", featured: true },
  { name: "Wild Mushroom & Gruyère Tart", price: "$14.00", category: "Food", description: "Flaky rye crust filled with leeks, wild mushrooms & melted Gruyère.", image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?auto=format&fit=crop&w=600&q=80" },
  { name: "Roasted Duck & Fennel Sandwich", price: "$16.00", category: "Food", description: "Roasted duck breast, pickled fennel, watercress & plum chutney.", image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=600&q=80" },
  { name: "Warm Almond & Pistachio Croissant", price: "$6.50", category: "Snack", description: "Double-baked twice with almond frangipane & crushed pistachios.", image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80" },
  { name: "Cardamom & Brown Sugar Scone", price: "$5.00", category: "Snack", description: "Crumbly butter scone baked fresh every morning.", image: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=600&q=80" },
  { name: "Crispy Thyme Fries & Garlic Aioli", price: "$8.00", category: "Snack", description: "Hand-cut skin-on potatoes tossed with fresh thyme salt.", image: "https://images.unsplash.com/photo-1576107232684-1279f390859f?auto=format&fit=crop&w=600&q=80" }
];

type FormErrors = { name?: string; phone?: string };

export default function Checkout() {
  const { selectedCustomizations, toggleCustomization, clearCustomizations } = useCustomization();
  const [showMenuPicker, setShowMenuPicker] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [ticketId, setTicketId] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const nameRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  const matchedItems = selectedCustomizations
    .map((name) => menuItems.find((item) => item.name === name))
    .filter(Boolean) as MenuItemData[];

  const totalPrice = matchedItems.reduce((acc, item) => {
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + numeric;
  }, 0);

  const submitRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};
    if (!name.trim()) nextErrors.name = "Please enter your name.";
    if (!phone.trim()) nextErrors.phone = "Please enter a phone number.";
    else if (!/[\d\s()+-]{7,}/.test(phone.trim())) nextErrors.phone = "Please enter a valid phone number.";
    
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      else phoneRef.current?.focus();
      return;
    }
    
    const generatedTicket = `DC-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] bg-[#f6f0e6] py-20 md:py-28">
        <div className="container max-w-3xl">
          <div className="paper-surface border border-[#cbb9a4] p-8 md:p-12 rounded-2xl shadow-xl">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dce5d8] text-[#54705b]">
                <CheckCircle2 className="h-7 w-7" />
              </div>
              <div>
                <p className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#54705b]">
                  ORDER CONFIRMED
                </p>
                <h1 className="font-display text-4xl leading-none text-[#2d241f]">Order Placed Successfully! 🎉</h1>
              </div>
            </div>

            <div className="mt-4 inline-block bg-[#e9e0d2] px-4 py-1.5 rounded-full border border-[#cbb9a4] font-body text-xs font-bold text-[#b65e3c]">
              Order Ticket: {ticketId}
            </div>

            <p className="mt-5 max-w-xl font-body text-base leading-7 text-[#77665a]">
              Thank you <strong className="text-[#2d241f]">{name}</strong>! Your order request for{" "}
              <strong>{selectedCustomizations.length} items</strong> (${totalPrice.toFixed(2)}) has been sent to our kitchen team at <strong>Bhagwati Tole-3</strong>.
            </p>

            <div className="mt-6 border-t border-[#dfd3c3] pt-4 bg-[#f6f0e6] p-4 rounded-xl space-y-1 text-left">
              <p className="font-body text-xs font-bold text-[#2d241f]">Location: Bhagwati Tole-3 (27.868446, 83.545261)</p>
              <p className="font-body text-[11px] text-[#77665a]">Customer Phone: {phone}</p>
              <p className="font-body text-[11px] text-[#77665a]">Café Contact: 7981459397</p>
            </div>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/menu" className="pressable inline-flex items-center gap-2 bg-[#b65e3c] px-6 py-3.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef] rounded-lg">
                BACK TO MENU
              </Link>
              <button
                type="button"
                onClick={() => {
                  clearCustomizations();
                  setSubmitted(false);
                }}
                className="editorial-link font-body text-xs font-extrabold tracking-[0.14em] text-[#b65e3c]"
              >
                START ANOTHER ORDER
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f6f0e6]">
      <section className="border-b border-border/70 bg-[#fffaf2] py-16 md:py-24">
        <div className="container grid gap-10 md:grid-cols-[1fr_0.8fr] md:items-center">
          <div>
            <SectionIntro
              eyebrow="ORDER AHEAD / REVIEW"
              title="A little note before the kitchen."
              body="Review your selected dishes or add items directly to your order before sending."
            />
            <div className="mt-6">
              <Link
                href="/menu"
                className="editorial-link inline-flex items-center font-body text-xs font-extrabold tracking-[0.14em] text-[#b65e3c]"
              >
                <ArrowLeft className="mr-2 h-4 w-4" /> BACK TO FULL MENU
              </Link>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-[#cbb9a4] bg-[#e9e0d2] shadow-xl group">
            <img
              src="/images/diwash_cafe_checkout_header.png"
              alt="Diwash's Café Barista Kitchen Prep"
              className="h-64 sm:h-72 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2d241f]/70 via-transparent to-transparent flex items-end p-5">
              <span className="font-body text-[10px] font-extrabold tracking-[0.2em] text-[#fff9ef] bg-[#b65e3c]/90 px-3 py-1 rounded-full border border-[#fff9ef]/30">
                KITCHEN DISPATCH / BHAGWATI TOLE-3
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="container grid gap-10 py-12 md:grid-cols-[1fr_0.8fr] md:py-20">
        <div className="space-y-6">
          {/* Order summary section */}
          <div className="paper-surface border border-[#cbb9a4] p-6 md:p-8 rounded-2xl shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-body text-[10px] font-extrabold tracking-[0.24em] text-[#b65e3c]">ORDER SUMMARY</p>
                <h2 className="mt-2 font-display text-3xl text-[#2d241f]">Selected items to order</h2>
              </div>
              <span className="font-body text-xs font-bold text-[#6e3f2b]">
                {selectedCustomizations.length} item{selectedCustomizations.length === 1 ? "" : "s"}
              </span>
            </div>

            {selectedCustomizations.length === 0 ? (
              <div className="mt-6 border-t border-[#dfd3c3] pt-6">
                <p className="font-body text-sm leading-6 text-[#77665a]">
                  No customizations or dishes are selected yet. Click below to view dishes and add items to your order.
                </p>
                <button
                  type="button"
                  onClick={() => setShowMenuPicker(true)}
                  className="pressable mt-5 inline-flex items-center gap-2 bg-[#b65e3c] px-5 py-2.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef] rounded-lg shadow-sm"
                >
                  <Utensils className="h-4 w-4" /> CHOOSE FROM THE MENU
                </button>
              </div>
            ) : (
              <div>
                <ul className="mt-6 grid gap-3 border-t border-[#dfd3c3] pt-5">
                  {selectedCustomizations.map((name) => {
                    const matched = menuItems.find((i) => i.name === name);
                    return (
                      <li key={name} className="flex items-center justify-between gap-3 border-b border-[#dfd3c3] pb-3 font-body text-sm text-[#34443a]">
                        <span className="flex items-center gap-3">
                          <Check className="h-4 w-4 text-[#54705b]" />
                          <span className="font-bold text-[#2d241f]">{name}</span>
                          {matched && <span className="font-body text-xs text-[#b65e3c]">({matched.price})</span>}
                        </span>
                        <button
                          type="button"
                          onClick={() => toggleCustomization(name)}
                          aria-label={`Remove ${name} from order`}
                          className="inline-flex items-center gap-1 font-body text-[10px] font-extrabold tracking-[0.1em] text-[#b65e3c] hover:text-[#8f432c]"
                        >
                          <X className="h-3.5 w-3.5" /> REMOVE
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-6 border-t border-dashed border-[#cbb9a4] pt-4 flex justify-between font-body text-sm font-bold text-[#2d241f]">
                  <span>Subtotal Amount:</span>
                  <span className="text-[#b65e3c]">${totalPrice.toFixed(2)}</span>
                </div>

                <div className="mt-5 border-t border-[#dfd3c3] pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setShowMenuPicker(!showMenuPicker)}
                    className="editorial-link font-body text-xs font-extrabold tracking-[0.14em] text-[#b65e3c] flex items-center gap-1"
                  >
                    <Plus className="h-3.5 w-3.5" /> {showMenuPicker ? "HIDE MENU PICKER" : "ADD MORE DISHES"}
                  </button>
                  <button
                    type="button"
                    onClick={() => clearCustomizations()}
                    className="font-body text-[10px] font-bold text-[#77665a] hover:text-[#b65e3c]"
                  >
                    CLEAR ALL
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Interactive Menu Dish Selection Section */}
          {(showMenuPicker || selectedCustomizations.length === 0) && (
            <div className="paper-surface border border-[#cbb9a4] p-4 md:p-5 rounded-2xl shadow-sm animate-fade-in">
              <div className="flex items-center justify-between border-b border-[#dfd3c3] pb-3">
                <div>
                  <p className="font-body text-[9px] font-extrabold tracking-[0.2em] text-[#b65e3c]">CHOOSE FROM THE MENU</p>
                  <h3 className="font-display text-xl text-[#2d241f]">Click dish to order</h3>
                </div>
                <span className="font-body text-[11px] text-[#77665a]">Diwash's Café Menu</span>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 max-h-[380px] overflow-y-auto pr-1">
                {menuItems.map((item) => {
                  const isSelected = selectedCustomizations.includes(item.name);
                  return (
                    <div
                      key={item.name}
                      onClick={() => toggleCustomization(item.name)}
                      className={`group cursor-pointer border p-3 rounded-xl transition-all flex items-start gap-3 ${
                        isSelected
                          ? "bg-[#dce5d8]/80 border-[#54705b] shadow-xs"
                          : "border-[#dfd3c3] bg-[#fffaf2] hover:border-[#b65e3c]/60 hover:bg-[#fff9ef]"
                      }`}
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-14 w-14 shrink-0 rounded-lg object-cover border border-[#cbb9a4]/60"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-display text-base text-[#2d241f] truncate group-hover:text-[#b65e3c]">
                            {item.name}
                          </h4>
                          <span className="shrink-0 font-body text-xs font-bold text-[#6e3f2b]">
                            {item.price}
                          </span>
                        </div>
                        <p className="font-body text-[11px] text-[#77665a] line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleCustomization(item.name);
                          }}
                          className={`mt-2 border px-2.5 py-1 font-body text-[9px] font-extrabold tracking-[0.1em] rounded transition-colors ${
                            isSelected
                              ? "border-[#54705b] bg-[#54705b] text-[#fff9ef]"
                              : "border-[#cbb9a4] bg-transparent text-[#77665a] group-hover:border-[#b65e3c] group-hover:text-[#b65e3c]"
                          }`}
                        >
                          {isSelected ? "✓ ADDED" : "+ ORDER"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Customer Details Form */}
        <form onSubmit={submitRequest} noValidate className="paper-surface border border-[#cbb9a4] p-6 md:p-8 rounded-2xl shadow-sm h-fit sticky top-24">
          <p className="font-body text-[10px] font-extrabold tracking-[0.24em] text-[#b65e3c]">YOUR DETAILS</p>
          <h2 className="mt-2 font-display text-3xl text-[#2d241f]">Confirm & Send Order</h2>

          {selectedCustomizations.length > 0 && (
            <div className="mt-4 bg-[#f6f0e6] p-3 rounded-lg border border-[#cbb9a4]/60 font-body text-xs flex justify-between items-center text-[#2d241f]">
              <span>Order Summary: <strong>{selectedCustomizations.length} items</strong></span>
              <span className="font-bold text-[#b65e3c]">${totalPrice.toFixed(2)}</span>
            </div>
          )}

          <div className="mt-6 grid gap-5">
            <label className="font-body text-xs font-bold text-[#49382e]" htmlFor="checkout-name">
              Name *
              <input
                ref={nameRef}
                id="checkout-name"
                required
                placeholder="e.g. Diwash"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  if (errors.name) setErrors((current) => ({ ...current, name: undefined }));
                }}
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? "checkout-name-error" : undefined}
                className={`mt-2 h-11 w-full border bg-[#fffaf2] px-3 font-normal outline-none focus:ring-2 focus:ring-[#b65e3c]/20 rounded-lg ${
                  errors.name ? "border-[#9e4d30] ring-2 ring-[#b65e3c]/20" : "border-[#cbb9a4] focus:border-[#b65e3c]"
                }`}
              />
              {errors.name && (
                <span id="checkout-name-error" role="alert" className="mt-2 block font-body text-[11px] font-normal text-[#9e4d30]">
                  {errors.name}
                </span>
              )}
            </label>

            <label className="font-body text-xs font-bold text-[#49382e]" htmlFor="checkout-phone">
              Phone Number *
              <input
                ref={phoneRef}
                id="checkout-phone"
                required
                type="tel"
                placeholder="e.g. 7981459397"
                value={phone}
                onChange={(event) => {
                  setPhone(event.target.value);
                  if (errors.phone) setErrors((current) => ({ ...current, phone: undefined }));
                }}
                aria-invalid={Boolean(errors.phone)}
                aria-describedby={errors.phone ? "checkout-phone-error" : undefined}
                className={`mt-2 h-11 w-full border bg-[#fffaf2] px-3 font-normal outline-none focus:ring-2 focus:ring-[#b65e3c]/20 rounded-lg ${
                  errors.phone ? "border-[#9e4d30] ring-2 ring-[#b65e3c]/20" : "border-[#cbb9a4] focus:border-[#b65e3c]"
                }`}
              />
              {errors.phone && (
                <span id="checkout-phone-error" role="alert" className="mt-2 block font-body text-[11px] font-normal text-[#9e4d30]">
                  {errors.phone}
                </span>
              )}
            </label>

            <label className="font-body text-xs font-bold text-[#49382e]" htmlFor="checkout-notes">
              Special Notes / Requests <span className="font-normal text-[#a18d7b]">(optional)</span>
              <textarea
                id="checkout-notes"
                value={notes}
                onChange={(event) => setNotes(event.target.value)}
                rows={4}
                placeholder="Anything else the café team should know? (e.g. extra hot, oat milk)"
                className="mt-2 w-full resize-y border border-[#cbb9a4] bg-[#fffaf2] p-3 font-normal outline-none placeholder:text-[#a18d7b] focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20 rounded-lg"
              />
            </label>
          </div>

          <button
            type="submit"
            className="pressable mt-7 w-full inline-flex items-center justify-center gap-2 bg-[#b65e3c] px-6 py-3.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef] rounded-lg hover:bg-[#9e4d30] transition-colors shadow-md"
          >
            <Sparkles className="h-4 w-4" /> CONFIRM & PLACE ORDER
          </button>
          <p className="mt-4 font-body text-[10px] leading-4 text-[#a18d7b]">
            Name and phone are required for kitchen dispatch at Bhagwati Tole-3.
          </p>
        </form>
      </section>
    </div>
  );
}
