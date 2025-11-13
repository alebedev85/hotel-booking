"use client";

import HotelCard from "@/components/HotelCard/HotelCard";
import HotelMap from "@/components/HotelMap/HotelMap";
import SearchForm from "@/components/SearchForm/SearchForm";
import { useAppSelector } from "@/store";
import styles from "@/styles/Hotels.module.scss";
import { IHotel } from "@/types";
import { useEffect, useState } from "react";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [activeHotelId, setActiveHotelId] = useState<string | null>(null);
  const { location } = useAppSelector((state) => state.search);

  useEffect(() => {
    const loadHotels = async () => {
      const res = await fetch("/moscow_hotels.json");
      const data = await res.json();
      setHotels(data);
    };
    loadHotels();
  }, []);

  return (
    <main className={styles.page}>
      <SearchForm />

      <h2 className={styles.title}>Отели в {location || "..."}:</h2>
      <div className={styles.layout}>
        <section className={styles.list}>
          {hotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onHover={() => setActiveHotelId(hotel.id)}
              onLeave={() => setActiveHotelId(null)}
            />
          ))}
        </section>

        <aside className={styles.map}>
          <HotelMap hotels={hotels} activeHotelId={activeHotelId} />
        </aside>
      </div>
    </main>
  );
}
