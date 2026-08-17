import React, { useState } from "react";
import { CheckCircle2, ShoppingBag, X, Sparkles } from "lucide-react";
import { MenuItemData } from "./MenuItem";

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: string[];
  allMenuItems: MenuItemData[];
  onOrderSuccess: () => void;
}

export default function OrderModal({
  isOpen,
  onClose,
  selectedItems,
  allMenuItems,
  onOrderSuccess,
}: OrderModalProps) {
  const [customerName, setCustomerName] = useState("");
  const [tableOrPhone, setTableOrPhone] = useState("");
  const [notes, setNotes] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState("");

  if (!isOpen) return null;

  const matchedItems = selectedItems
    .map((name) => allMenuItems.find((item) => item.name === name))
    .filter(Boolean) as MenuItemData[];

  const totalPrice = matchedItems.reduce((acc, item) => {
    const numeric = parseFloat(item.price.replace(/[^0-9.]/g, "")) || 0;
    return acc + numeric;
  }, 0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `DC-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(generatedId);
    setOrderPlaced(true);
  };

  const handleFinish = () => {
    setOrderPlaced(false);
    onOrderSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#2d241f]/60 backdrop-blur-sm animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto border border-[#cbb9a4] bg-[#fffaf2] p-5 sm:p-6 md:p-8 shadow-2xl rounded-2xl">

        <button
          type="button"
          onClick={onClose}
          className="absolute right-3.5 top-3.5 flex h-11 w-11 items-center justify-center text-[#77665a] hover:text-[#b65e3c] transition-colors rounded-full"
          aria-label="Close modal"
        >
          <X className="h-5 w-5" />
        </button>

        {!orderPlaced ? (
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#b65e3c]/15 text-[#b65e3c]">
                <ShoppingBag className="h-5 w-5" />
              </div>
              <div>
                <p className="font-body text-[10px] font-extrabold tracking-[0.24em] text-[#b65e3c]">
                  DIWASH'S CAFÉ PRE-ORDER
                </p>
                <h2 className="font-display text-2xl text-[#2d241f]">Confirm Your Order</h2>
              </div>
            </div>

            <div className="mt-5 border-t border-[#dfd3c3] pt-4">
              <p className="font-body text-xs font-bold text-[#77665a] mb-2">ORDER SUMMARY ({matchedItems.length} items):</p>
              <div className="max-h-40 overflow-y-auto space-y-2 pr-1">
                {matchedItems.map((item) => (
                  <div key={item.name} className="flex justify-between text-xs font-body text-[#34443a]">
                    <span>• {item.name}</span>
                    <span className="font-bold">{item.price}</span>
                  </div>
                ))}
              </div>
              <div className="mt-3 border-t border-dashed border-[#cbb9a4] pt-2 flex justify-between font-body text-sm font-bold text-[#2d241f]">
                <span>Total Amount:</span>
                <span className="text-[#b65e3c]">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block font-body text-[10px] font-extrabold tracking-[0.16em] text-[#77665a] mb-1">
                  YOUR NAME *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Diwash"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full h-11 border border-[#cbb9a4] bg-[#f6f0e6] px-3 font-body text-sm text-[#2d241f] rounded-lg outline-none focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
                />
              </div>

              <div>
                <label className="block font-body text-[10px] font-extrabold tracking-[0.16em] text-[#77665a] mb-1">
                  TABLE NO. OR PHONE NUMBER *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Table 4 or 7981459397"
                  value={tableOrPhone}
                  onChange={(e) => setTableOrPhone(e.target.value)}
                  className="w-full h-11 border border-[#cbb9a4] bg-[#f6f0e6] px-3 font-body text-sm text-[#2d241f] rounded-lg outline-none focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
                />
              </div>

              <div>
                <label className="block font-body text-[10px] font-extrabold tracking-[0.16em] text-[#77665a] mb-1">
                  SPECIAL REQUESTS / NOTES (OPTIONAL)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Extra hot, oat milk"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-11 border border-[#cbb9a4] bg-[#f6f0e6] px-3 font-body text-sm text-[#2d241f] rounded-lg outline-none focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full pressable bg-[#b65e3c] py-3.5 font-body text-xs font-extrabold tracking-[0.18em] text-[#fff9ef] rounded-lg hover:bg-[#9e4d30] transition-colors shadow-md flex items-center justify-center gap-2"
              >
                <Sparkles className="h-4 w-4" /> CONFIRM & PLACE ORDER
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center animate-fade-in">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#dce5d8] text-[#54705b] mb-4">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <p className="font-body text-[10px] font-extrabold tracking-[0.24em] text-[#54705b]">
              ORDER CONFIRMED
            </p>
            <h2 className="mt-2 font-display text-3xl text-[#2d241f]">Order Placed Successfully! 🎉</h2>

            <div className="mt-4 inline-block bg-[#e9e0d2] px-4 py-1.5 rounded-full border border-[#cbb9a4] font-body text-xs font-bold text-[#b65e3c]">
              Order Ticket: {orderId}
            </div>

            <p className="mt-4 font-body text-sm leading-6 text-[#77665a]">
              Thank you <strong className="text-[#2d241f]">{customerName}</strong>! Your order for{" "}
              <strong>{matchedItems.length} items</strong> (${totalPrice.toFixed(2)}) has been sent to our kitchen team at <strong>Bhagwati Tole-3</strong>.
            </p>

            <div className="mt-5 border-t border-[#dfd3c3] pt-4 text-left bg-[#f6f0e6] p-4 rounded-xl">
              <p className="font-body text-xs font-bold text-[#2d241f] mb-1">Status: Preparing Now ☕</p>
              <p className="font-body text-[11px] text-[#77665a]">
                Location: Bhagwati Tole-3 (Coordinates: 27.868446, 83.545261)
              </p>
              <p className="font-body text-[11px] text-[#77665a]">Contact: 7981459397</p>
            </div>

            <button
              type="button"
              onClick={handleFinish}
              className="mt-6 pressable w-full bg-[#2d241f] py-3.5 font-body text-xs font-extrabold tracking-[0.18em] text-[#fff9ef] rounded-lg hover:bg-[#b65e3c] transition-colors"
            >
              DONE & CLEAR ORDER
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
