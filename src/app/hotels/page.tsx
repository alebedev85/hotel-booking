"use client";

import HotelCard from "@/components/HotelCard/HotelCard";
import HotelCardSkeleton from "@/components/HotelCardSkeleton/HotelCardSkeleton";
import HotelMap from "@/components/HotelMap/HotelMap";
import Loader from "@/components/Loader/Loader";
import SearchForm from "@/components/SearchForm/SearchForm";
import { useAppSelector } from "@/store";
import { useGetHotelsByCityQuery } from "@/store/hotelsApi";
import styles from "@/styles/Hotels.module.scss";
import { useState } from "react";

export default function HotelsPage() {
  const { city_name, city_id, loading } = useAppSelector(
    (state) => state.search
  );
  const [activeHotelId, setActiveHotelId] = useState<string | null>(null);

  // Используем RTK Query хук для загрузки отелей
  const { data, isLoading, isError } = useGetHotelsByCityQuery(city_id!, {
    skip: !city_id, // пропускаем запрос, если город не выбран
  });

  const hotels = data?.hotels || [];

  return (
    <main className={styles.page}>
      <SearchForm />
      {city_id ? (
        <h2 className={styles.title}>Отели в {city_name}:</h2>
      ) : (
        <h2 className={styles.title}>Выберите город</h2>
      )}

      <div className={styles.layout}>
        <section className={styles.list}>
          {loading || isLoading
            ? Array.from({ length: 10 }).map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))
            : isError
            ? "Ошибка при загрузке отелей"
            : hotels.length === 0
            ? "Ничего не найдено"
            : hotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onHover={() => setActiveHotelId(hotel.id)}
                  onLeave={() => setActiveHotelId(null)}
                />
              ))}
        </section>

        <aside className={styles.map}>
          {loading || isLoading ? (
            <Loader />
          ) : (
            <HotelMap hotels={hotels} activeHotelId={activeHotelId} />
          )}
        </aside>
      </div>
    </main>
  );
}
