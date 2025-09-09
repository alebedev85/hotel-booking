"use client";

import HotelCard from "@/components/HotelCard/HotelCard";
import HotelMap from "@/components/HotelMap/HotelMap";
import SearchForm from "@/components/SearchForm/SearchForm";
import { useAppDispatch, useAppSelector } from "@/store";
import { setSearch } from "@/store/searchSlice";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import styles from "@/styles/Hotels.module.scss";

const hotels = [
  { id: 1, name: "Отель А", lat: 55.751244, lng: 37.618423, price: 5000 },
  { id: 2, name: "Отель Б", lat: 55.761244, lng: 37.628423, price: 4500 },
  { id: 3, name: "Отель В", lat: 55.741244, lng: 37.608423, price: 6000 },
];

export default function HotelsPage() {
  const params = useSearchParams();
  const dispatch = useAppDispatch();
  const searchState = useAppSelector((state) => state.search);

  // При первом рендере инициализируем store из URL, если store пустой
  useEffect(() => {
    if (!searchState.location) {
      const location = params.get("location") || "";
      const checkIn = params.get("checkIn") || "";
      const checkOut = params.get("checkOut") || "";
      const guests = Number(params.get("guests") || 1);

      dispatch(setSearch({ location, checkIn, checkOut, guests }));
    }
  }, [params, dispatch, searchState.location]);

  return (
    <main className={styles.container}>
      <h1 className={styles.title}>Отели для вас:</h1>

      {/* Форма поиска будет использовать данные из Redux */}
      <SearchForm />

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
