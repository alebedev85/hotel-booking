"use client";

import HotelMap from "@/components/HotelMap/HotelMap";
import SearchForm from "@/components/SearchForm/SearchForm";
import Loader from "@/components/ui/Loader/Loader";
import { useAppSelector } from "@/store";
import { useGetHotelsByCityQuery } from "@/store/hotelsApi";
import { useState } from "react";
import styles from "./Hotels.module.scss";
import HotelsList from "@/components/HotelsList/HotelsList";

export default function HotelsPage() {
  const { city_name, city_id, loading } = useAppSelector(
    (state) => state.search,
  );
  const [activeHotelId, setActiveHotelId] = useState<string | null>(null);

  // Используем RTK Query хук для загрузки отелей
  const { data, isLoading, isError } = useGetHotelsByCityQuery(city_id!, {
    skip: !city_id, // пропускаем запрос, если город не выбран
  });

  const hotels = data?.hotels.slice(0,10) || [];

  return (
    <main className={styles.hotels}>
      <SearchForm />

      <div className={styles.layout}>
        <HotelsList 
          hotels={hotels}
          isLoading={isLoading}
          isError={isError}
          cityName={city_name}
          cityId={city_id}
          onHotelHover={setActiveHotelId}
          onHotelLeave={() => setActiveHotelId(null)}
        />

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
