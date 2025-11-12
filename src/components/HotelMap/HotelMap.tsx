"use client";

import { IHotel } from "@/types";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import styles from "./HotelMap.module.scss";
import { useMemo } from "react";

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

interface HotelMapProps {
  hotels: IHotel[];
}

export default function HotelMap({ hotels }: HotelMapProps) {
  const hotelIcon = useMemo(() => {
    if (typeof window === "undefined") return null;
    // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
    const L = require("leaflet");
    return L.icon({
      iconUrl: "/hotel.jpg",
      iconSize: [22, 22],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });
  }, []);
  // Безопасно берём координаты центра
  const center: LatLngExpression = hotels.length
    ? [hotels[0].location.lat, hotels[0].location.lon]
    : [55.7558, 37.6173]; // Москва по умолчанию

  return (
    <div className={styles.map}>
      <MapContainer
        center={center}
        zoom={12}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />

        {hotels.map((hotel) => {
          const { lat, lon } = hotel.location;

          return (
            <Marker key={hotel.id} position={[lat, lon]} icon={hotelIcon}>
              <Popup>
                <strong>{hotel.name}</strong> <br />⭐ {hotel.rating} — от{" "}
                {hotel.price_from} ₽
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
