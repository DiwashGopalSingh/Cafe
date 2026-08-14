import React from "react";

export type MenuItemData = { name: string; description?: string; price: string; category: string; image?: string; tags?: string[]; dietary?: string[]; featured?: boolean; customizationOptions?: string[] };
type MenuItemProps = { key?: React.Key; item: MenuItemData; glutenFreeRequested?: boolean; onGlutenFreeToggle?: (itemName: string) => void };

export default function MenuItem({ item, glutenFreeRequested = false, onGlutenFreeToggle }: MenuItemProps) {
  const badges = [...(item.tags ?? []), ...(item.dietary ?? [])];

  return (
    <article
      onClick={() => onGlutenFreeToggle?.(item.name)}
      className={`group cursor-pointer border-b border-[#dfd3c3] py-5 transition-all duration-200 px-3 -mx-3 rounded-xl ${
        glutenFreeRequested
          ? "bg-[#dce5d8]/75 border-l-4 border-l-[#54705b] shadow-sm"
          : item.featured
          ? "bg-[#e9e0d2]/55 hover:bg-[#e9e0d2]/80"
          : "hover:bg-[#fffaf2]"
      }`}
    >
      <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
        {item.image && (
          <div className="relative h-24 w-24 sm:h-28 sm:w-28 shrink-0 overflow-hidden rounded-xl border border-[#cbb9a4] bg-[#e9e0d2] shadow-sm">
            <img
              src={item.image}
              alt={item.name}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
        )}
        <div className="flex-1 w-full">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-2xl text-[#2d241f] transition-colors group-hover:text-[#b65e3c]">
                  {item.name}
                </h3>
                {item.featured && (
                  <span className="font-body text-[9px] font-extrabold tracking-[0.17em] text-[#b65e3c]">
                    SEASONAL
                  </span>
                )}
                {glutenFreeRequested && (
                  <span className="font-body text-[9px] font-extrabold tracking-[0.14em] text-[#34443a] bg-[#78907c]/25 border border-[#54705b]/40 px-2 py-0.5 rounded-full">
                    ✓ SELECTED
                  </span>
                )}
              </div>
              {item.description && (
                <p className="mt-2 max-w-xl font-body text-sm leading-6 text-[#77665a]">
                  {item.description}
                </p>
              )}
            </div>
            <span className="shrink-0 font-body text-base font-extrabold text-[#6e3f2b]">
              {item.price}
            </span>
          </div>
          {badges.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {badges.map((tag, index) => (
                <span
                  key={`${item.name}-${tag}-${index}`}
                  className={`border px-2 py-1 font-body text-[9px] font-bold tracking-[0.12em] ${
                    item.dietary?.includes(tag)
                      ? "border-[#78907c] bg-[#dce5d8]/70 text-[#4c6653]"
                      : "border-[#cbb9a4] text-[#77665a]"
                  }`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <button
            type="button"
            aria-pressed={glutenFreeRequested}
            onClick={(e) => {
              e.stopPropagation();
              onGlutenFreeToggle?.(item.name);
            }}
            className={`mt-4 border px-3.5 py-2 font-body text-[10px] font-extrabold tracking-[0.14em] transition-colors rounded-md ${
              glutenFreeRequested
                ? "border-[#54705b] bg-[#54705b] text-[#fff9ef]"
                : "border-[#cbb9a4] bg-transparent text-[#77665a] group-hover:border-[#b65e3c] group-hover:text-[#b65e3c]"
            }`}
          >
            {glutenFreeRequested ? "✓ ADDED TO ORDER" : "+ CLICK TO ORDER"}
          </button>
        </div>
      </div>
      <p className="mt-2 font-body text-[10px] text-[#a18d7b]">
        Click dish to add to your order.
      </p>
    </article>
  );
}
