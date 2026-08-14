// Hearth & Paper: keep order-intent state quiet, durable, and explicit—customization requests are
// estimates until the café confirms availability and pricing.
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "copper-kettle-customizations-v1";
const CUSTOMIZATION_FEE = 2;
type CustomizationContextValue = { selectedCustomizations: string[]; toggleCustomization: (itemName: string) => void; clearCustomizations: () => void; estimatedTotal: number; customizationFee: number };
const CustomizationContext = createContext<CustomizationContextValue | null>(null);

export function CustomizationProvider({ children }: { children: React.ReactNode }) {
  const [selectedCustomizations, setSelectedCustomizations] = useState<string[]>(() => {
    if (typeof window === "undefined") return [];
    try { const saved = JSON.parse(window.localStorage.getItem(STORAGE_KEY) ?? "[]"); return Array.isArray(saved) && saved.every((item) => typeof item === "string") ? saved : []; } catch { return []; }
  });
  useEffect(() => { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedCustomizations)); }, [selectedCustomizations]);
  const value = useMemo(() => ({ selectedCustomizations, toggleCustomization: (itemName: string) => setSelectedCustomizations(current => current.includes(itemName) ? current.filter(name => name !== itemName) : [...current, itemName]), clearCustomizations: () => setSelectedCustomizations([]), estimatedTotal: selectedCustomizations.length * CUSTOMIZATION_FEE, customizationFee: CUSTOMIZATION_FEE }), [selectedCustomizations]);
  return <CustomizationContext.Provider value={value}>{children}</CustomizationContext.Provider>;
}

export function useCustomization() {
  const value = useContext(CustomizationContext);
  if (!value) throw new Error("useCustomization must be used within CustomizationProvider");
  return value;
}
