"use client";

import SearchForm from "@/components/SearchForm/SearchForm";
import { useSearchParams } from "next/navigation";
import styles from "../../styles/Hotels.module.scss";
import HotelCard from "@/components/HotelCard/HotelCard";
import HotelMap from "@/components/HotelMap/HotelMap";

const hotels = [
  { id: 1, name: "Отель А", lat: 55.751244, lng: 37.618423, price: 5000 },
  { id: 2, name: "Отель Б", lat: 55.761244, lng: 37.628423, price: 4500 },
  { id: 3, name: "Отель В", lat: 55.741244, lng: 37.608423, price: 6000 },
];

export default function HotelsPage() {
  // Достаем параметры из адресной строки
  const params = useSearchParams();

  const location = params.get("location") || "";
  const checkIn = params.get("checkIn") || "";
  const checkOut = params.get("checkOut") || "";
  const guests = params.get("guests") || "1";

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Отели для вас:</h1>
      {/* 🔹 Форма нового поиска с предзаполненными значениями */}
      <SearchForm
        initialLocation={location}
        initialCheckIn={checkIn}
        initialCheckOut={checkOut}
        initialGuests={guests}
      />
      <div className={styles.layout}>
        <div className={styles.list}>
          {hotels.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))}
        </div>

        <div className={styles.map}>
          <HotelMap hotels={hotels} />
        </div>
      </div>
    </main>
  );
}
