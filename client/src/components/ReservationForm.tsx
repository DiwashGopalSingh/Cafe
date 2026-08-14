import { FormEvent, useState } from "react";
import { CheckCircle2, Mail, Users, Calendar, Sparkles } from "lucide-react";
import { toast } from "sonner";

type ReservationFormData = {
  date: string;
  time: string;
  partySize: string;
  name: string;
  email: string;
  phone: string;
  notes: string;
};

const initialForm: ReservationFormData = {
  date: "",
  time: "",
  partySize: "2",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export default function ReservationForm() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  const update = (field: keyof ReservationFormData, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const generatedTicket = `TR-${Math.floor(1000 + Math.random() * 9000)}`;
    setTicketId(generatedTicket);
    setSubmitted(true);
    toast.success("Your table & order ahead request is confirmed!");
  };

  if (submitted) {
    return (
      <div className="paper-surface border border-[#b6c9b8] p-7 md:p-9 rounded-2xl shadow-lg animate-fade-in">
        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#dce5d8] text-[#54705b]">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <div>
            <p className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#4c6653]">
              RESERVATION & ORDER AHEAD CONFIRMED
            </p>
            <h3 className="font-display text-3xl text-[#2d241f]">We've Reserved Your Table! 🎉</h3>
          </div>
        </div>

        <div className="mt-4 inline-block bg-[#e9e0d2] px-4 py-1.5 rounded-full border border-[#cbb9a4] font-body text-xs font-bold text-[#b65e3c]">
          Reservation Ticket: {ticketId}
        </div>

        <p className="mt-4 max-w-md font-body text-sm leading-6 text-[#77665a]">
          Thank you <strong className="text-[#2d241f]">{form.name}</strong>! Your table request for{" "}
          <strong>{form.partySize} {Number(form.partySize) === 1 ? "guest" : "guests"}</strong> on{" "}
          <strong>{form.date}</strong> at <strong>{form.time}</strong> has been logged for Diwash's Café at <strong>Bhagwati Tole-3</strong>.
        </p>

        <div className="mt-5 border-t border-[#dfd3c3] pt-4 bg-[#f6f0e6] p-4 rounded-xl space-y-1">
          <p className="font-body text-xs font-bold text-[#2d241f]">Location: Bhagwati Tole-3 (27.868446, 83.545261)</p>
          <p className="font-body text-[11px] text-[#77665a]">Confirmation Email: {form.email}</p>
          <p className="font-body text-[11px] text-[#77665a]">Contact Phone: {form.phone}</p>
        </div>

        <button
          type="button"
          onClick={() => {
            setForm(initialForm);
            setSubmitted(false);
          }}
          className="pressable mt-7 font-body text-xs font-extrabold tracking-[0.14em] text-[#b65e3c] hover:underline"
        >
          ← MAKE ANOTHER RESERVATION
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="paper-surface border border-[#dfd3c3] p-6 md:p-9 rounded-2xl shadow-sm">
      <div className="flex items-start justify-between gap-6 border-b border-[#dfd3c3] pb-5">
        <div>
          <p className="font-body text-[10px] font-extrabold tracking-[0.25em] text-[#b65e3c]">
            RESERVE & ORDER AHEAD / 02
          </p>
          <h3 className="mt-3 font-display text-4xl leading-none text-[#2d241f]">Save a table & order ahead.</h3>
        </div>
        <Users className="h-6 w-6 text-[#b65e3c]" />
      </div>

      <p className="mt-5 font-body text-xs leading-5 text-[#77665a]">
        Reserve your table at Bhagwati Tole-3 in advance. For direct questions or same-day inquiries, call us at <strong>7981459397</strong>.
      </p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="font-body text-xs font-bold text-[#49382e]">
          Date
          <input
            required
            type="date"
            value={form.date}
            onChange={(event) => update("date", event.target.value)}
            min={new Date().toISOString().split("T")[0]}
            className="mt-2 h-11 w-full border border-[#cbb9a4] bg-[#fffaf2] px-3 font-body text-sm font-normal text-[#2d241f] rounded-lg outline-none focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
          />
        </label>

        <label className="font-body text-xs font-bold text-[#49382e]">
          Time
          <select
            required
            value={form.time}
            onChange={(event) => update("time", event.target.value)}
            className="mt-2 h-11 w-full border border-[#cbb9a4] bg-[#fffaf2] px-3 font-body text-sm font-normal text-[#2d241f] rounded-lg outline-none focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
          >
            <option value="" disabled>
              Select a time
            </option>
            {["7:30 am", "8:30 am", "10:00 am", "11:30 am", "1:00 pm", "2:00 pm"].map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
        </label>

        <label className="font-body text-xs font-bold text-[#49382e]">
          Party size
          <select
            required
            value={form.partySize}
            onChange={(event) => update("partySize", event.target.value)}
            className="mt-2 h-11 w-full border border-[#cbb9a4] bg-[#fffaf2] px-3 font-body text-sm font-normal text-[#2d241f] rounded-lg outline-none focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((size) => (
              <option key={size} value={size}>
                {size} {size === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </label>

        <label className="font-body text-xs font-bold text-[#49382e]">
          Name
          <input
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            placeholder="e.g. Diwash"
            autoComplete="name"
            className="mt-2 h-11 w-full border border-[#cbb9a4] bg-[#fffaf2] px-3 font-body text-sm font-normal text-[#2d241f] rounded-lg outline-none focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
          />
        </label>

        <label className="font-body text-xs font-bold text-[#49382e]">
          Email
          <input
            required
            type="email"
            placeholder="e.g. hello@example.com"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            autoComplete="email"
            className="mt-2 h-11 w-full border border-[#cbb9a4] bg-[#fffaf2] px-3 font-body text-sm font-normal text-[#2d241f] rounded-lg outline-none placeholder:text-[#a18d7b] focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
          />
        </label>

        <label className="font-body text-xs font-bold text-[#49382e]">
          Phone Number
          <input
            required
            type="tel"
            placeholder="e.g. 7981459397"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            autoComplete="tel"
            className="mt-2 h-11 w-full border border-[#cbb9a4] bg-[#fffaf2] px-3 font-body text-sm font-normal text-[#2d241f] rounded-lg outline-none placeholder:text-[#a18d7b] focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
          />
        </label>

        <label className="font-body text-xs font-bold text-[#49382e] sm:col-span-2">
          Pre-Order Notes / Special Requests <span className="font-normal text-[#a18d7b]">(optional)</span>
          <textarea
            value={form.notes}
            onChange={(event) => update("notes", event.target.value)}
            rows={3}
            placeholder="Pre-order coffee preference, dietary requests, high chair…"
            className="mt-2 w-full resize-y border border-[#cbb9a4] bg-[#fffaf2] px-3 py-3 font-body text-sm font-normal text-[#2d241f] rounded-lg outline-none placeholder:text-[#a18d7b] focus:border-[#b65e3c] focus:ring-2 focus:ring-[#b65e3c]/20"
          />
        </label>
      </div>

      <button
        type="submit"
        className="pressable mt-7 inline-flex items-center gap-2 bg-[#b65e3c] px-6 py-3.5 font-body text-xs font-extrabold tracking-[0.14em] text-[#fff9ef] rounded-lg hover:bg-[#9e4d30] transition-colors shadow-md"
      >
        <Sparkles className="h-4 w-4" /> CONFIRM & PLACE RESERVATION
      </button>
    </form>
  );
}
