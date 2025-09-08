"use client";

import dynamic from "next/dynamic";
import { LatLngExpression } from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./HotelMap.module.scss";

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
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

interface Hotel {
  id: number;
  name: string;
  lat: number;
  lng: number;
  price: number;
}

interface HotelMapProps {
  hotels: Hotel[];
}

export default function HotelMap({ hotels }: HotelMapProps) {
  const center: LatLngExpression = [hotels[0].lat, hotels[0].lng];

  return (
    <div className={styles.map}>
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {hotels.map((hotel) => (
          <Marker key={hotel.id} position={[hotel.lat, hotel.lng]}>
            <Popup>
              {hotel.name} <br /> Цена: {hotel.price} ₽
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
