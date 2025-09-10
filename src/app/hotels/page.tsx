"use client";

import HotelCard from "@/components/HotelCard/HotelCard";
import HotelMap from "@/components/HotelMap/HotelMap";
import SearchForm from "@/components/SearchForm/SearchForm";
import styles from "@/styles/Hotels.module.scss";
import { hotelsList } from "@/constants/hotels";

export default function HotelsPage() {
  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Отели для вас:</h1>

      {/* Форма поиска будет использовать данные из Redux */}
      <SearchForm />

      <div className={styles.layout}>
        <div className={styles.list}>
          {hotelsList.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))}
        </div>

        <div className={styles.map}>
          <HotelMap hotels={hotelsList} />
        </div>
      </div>
    </main>
  );
}
