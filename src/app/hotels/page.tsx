"use client";

import HotelCard from "@/components/HotelCard/HotelCard";
import HotelCardSkeleton from "@/components/HotelCardSkeleton/HotelCardSkeleton";
import HotelMap from "@/components/HotelMap/HotelMap";
import Loader from "@/components/Loader/Loader";
import SearchForm from "@/components/SearchForm/SearchForm";
import { useAppSelector } from "@/store";
import styles from "@/styles/Hotels.module.scss";
import { IHotel } from "@/types";
import { useEffect, useState } from "react";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<IHotel[]>([]);
  const [activeHotelId, setActiveHotelId] = useState<string | null>(null);
  const { location, loading } = useAppSelector((state) => state.search);
  const [loadingHotels, setLoadingHotels] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);

  // Устанавливаем mounted = true только на клиенте
  useEffect(() => {
    setMounted(true);
  }, []);

  // Загружаем отели после монтирования и когда меняется location
  useEffect(() => {
    if (!mounted || !location) return;

    const loadHotels = async () => {
      setLoadingHotels(true);
      try {
        const res = await fetch(
          `/api/hotels?location=${encodeURIComponent(location)}`
        );
        const data = await res.json();
        console.log(data);
        setHotels(data.hotels);
      } catch (err) {
        console.error("Ошибка при загрузке отелей:", err);
        setHotels([]);
      } finally {
        setLoadingHotels(false);
      }
    };

    loadHotels();
  }, [mounted, location]);

  // Пока компонент не смонтирован на клиенте, показываем лоадер
  if (!mounted) {
    return (
      <main className={styles.page}>
        <Loader />
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <SearchForm />

      {location ? (
        <h2 className={styles.title}>Отели в {location}:</h2>
      ) : (
        <h2 className={styles.title}>Выберите город</h2>
      )}

      <div className={styles.layout}>
        <section className={styles.list}>
          {loading || loadingHotels
            ? Array.from({ length: 10 }).map((_, i) => (
                <HotelCardSkeleton key={i} />
              ))
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
          {loading || loadingHotels ? (
            <Loader />
          ) : (
            <HotelMap hotels={hotels} activeHotelId={activeHotelId} />
          )}
        </aside>
      </div>
    </main>
  );
}
