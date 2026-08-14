// Hearth & Paper: the map sits inside the café’s paper-and-copper visit experience;
// the supported proxy remains the primary path and the parent can render a graceful fallback.
/**
 * Google Maps frontend integration.
 * The Manus proxy provides the Maps JavaScript API without requiring a user-supplied key.
 */
/// <reference types="@types/google.maps" />

import { useEffect, useRef } from "react";
import { usePersistFn } from "@/hooks/usePersistFn";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    google?: typeof google;
  }
}

const API_KEY = import.meta.env.VITE_FRONTEND_FORGE_API_KEY;
const FORGE_BASE_URL = import.meta.env.VITE_FRONTEND_FORGE_API_URL || "https://forge.butterfly-effect.dev";
const MAPS_PROXY_URL = `${FORGE_BASE_URL}/v1/maps/proxy`;

function loadMapScript() {
  return new Promise<boolean>((resolve) => {
    if (window.google?.maps) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = `${MAPS_PROXY_URL}/maps/api/js?key=${API_KEY}&v=weekly&libraries=marker,places,geocoding,geometry`;
    script.async = true;
    script.crossOrigin = "anonymous";
    script.onload = () => { resolve(true); script.remove(); };
    script.onerror = () => { console.error("Failed to load Google Maps script"); resolve(false); script.remove(); };
    document.head.appendChild(script);
  });
}

interface MapViewProps {
  className?: string;
  initialCenter?: google.maps.LatLngLiteral;
  initialZoom?: number;
  onMapReady?: (map: google.maps.Map) => void;
  onMapError?: () => void;
}

export function MapView({ className, initialCenter = { lat: 37.7749, lng: -122.4194 }, initialZoom = 12, onMapReady, onMapError }: MapViewProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map | null>(null);

  const init = usePersistFn(async () => {
    const loaded = await loadMapScript();
    if (!loaded || !window.google?.maps) {
      onMapError?.();
      return;
    }
    if (!mapContainer.current) {
      onMapError?.();
      return;
    }
    map.current = new window.google.maps.Map(mapContainer.current, { zoom: initialZoom, center: initialCenter, mapTypeControl: true, fullscreenControl: true, zoomControl: true, streetViewControl: true, mapId: "DEMO_MAP_ID" });
    onMapReady?.(map.current);
  });

  useEffect(() => { init(); }, [init]);
  return <div ref={mapContainer} className={cn("h-[500px] w-full", className)} />;
}
