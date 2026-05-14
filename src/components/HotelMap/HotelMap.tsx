"use client";

import { IHotel } from "@/types";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef } from "react";
import styles from "./HotelMap.module.scss";
import { useAppSelector } from "@/store";
import { useMap } from "react-leaflet"; // нужно для управления центром карты
import { useHotelHover } from "@/app/hotels/HotelHoverContext";

// --- динамические импорты, чтобы Leaflet не ломался при SSR ---
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), {
  ssr: false,
});

// --- Компонент для плавного перемещения карты при смене города ---
function MapUpdater({ center }: { center: LatLngExpression }) {
  const map = useMap();

  useEffect(() => {
    // когда центр обновляется, карта плавно двигается в новое место
    map.setView(center, 12, { animate: true });
  }, [center, map]);

  return null;
}

interface HotelMapProps {
  hotels: IHotel[];
}

export default function HotelMap({ hotels}: HotelMapProps) {
  const { activeId } = useHotelHover();

  // 🔹 достаём координаты города из Redux
  const { lat, lon } = useAppSelector((state) => state.search);

  // 🔹 ссылка на все маркеры (чтобы управлять попапами)
  const markersRef = useRef<Record<string, L.Marker>>({});

  // 🔹 создаём иконку отеля (один раз)
  const hotelIcon = useMemo(() => {
    if (typeof window === "undefined") return null;
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const L = require("leaflet");
    return L.icon({
      iconUrl: "/hotel-icon.svg",
      iconSize: [25, 25],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }, []);

  // --- Определяем центр карты ---
  const defaultCenter: LatLngExpression = [55.7558, 37.6173]; // Москва
  const hasCityCoords = lat && lon;
  // если есть координаты из Redux — используем их, иначе первый отель или Москва
  const center: LatLngExpression = hasCityCoords
    ? [lat!, lon!]
    : hotels.length
    ? [hotels[0].location.lat, hotels[0].location.lon]
    : defaultCenter;

  // --- Управление попапами при наведении ---
  useEffect(() => {
    if (!activeId) {
      Object.values(markersRef.current).forEach((m) => m.closePopup());
      return;
    }

    const marker = markersRef.current[activeId];
    if (marker) marker.openPopup();
  }, [activeId]);

  if (!hotels.length && !hasCityCoords) return null;



  return (
    <div className={styles.map}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        {/* 🔄 двигаем карту при смене города */}
        <MapUpdater center={center} />

        {/* Слой карты (OpenStreetMap) */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {/* Рендерим маркеры отелей */}
        {hotels.map((hotel) => {
          const { lat, lon } = hotel.location;
          return (
            <Marker
              key={hotel.id}
              position={[lat, lon]}
              icon={hotelIcon}
              ref={(marker) => {
                if (marker) markersRef.current[hotel.id] = marker;
              }}
            >
              <Popup>
                <strong>{hotel.name}</strong> <br />
                ⭐ {hotel.rating} — от {hotel.price_from} ₽
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
