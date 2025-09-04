"use client";

import { useSearchParams } from "next/navigation";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import styles from "../../styles/Hotels.module.scss";

const hotels = [
  { id: 1, name: "Отель А", lat: 55.751244, lng: 37.618423, price: 5000 },
  { id: 2, name: "Отель Б", lat: 55.761244, lng: 37.628423, price: 4500 },
  { id: 3, name: "Отель В", lat: 55.741244, lng: 37.608423, price: 6000 },
];

export default function HotelsPage() {
  const params = useSearchParams();

  const location = params.get("location");
  const checkIn = params.get("checkIn");
  const checkOut = params.get("checkOut");
  const guests = params.get("guests");

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>
        Отели в {location} ({checkIn} → {checkOut}, гостей: {guests})
      </h1>

      <div className={styles.layout}>
        {/* Список отелей */}
        <div className={styles.list}>
          {hotels.map((hotel) => (
            <div key={hotel.id} className={styles.card}>
              <h2>{hotel.name}</h2>
              <p>Цена за ночь: {hotel.price} ₽</p>
            </div>
          ))}
        </div>

        {/* Карта */}
        <div className={styles.map}>
          <MapContainer
            center={[55.751244, 37.618423]}
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
      </div>
    </main>
  );
}
