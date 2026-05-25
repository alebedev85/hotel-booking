"use client";

import HotelMap from "@/components/HotelMap/HotelMap";
import HotelsList from "@/components/HotelsList/HotelsList";
import SearchForm from "@/components/SearchForm/SearchForm";
import Loader from "@/components/ui/Loader/Loader";

import { useAppSelector } from "@/store";
import { useGetHotelsByCityQuery } from "@/store/hotelsApi";
import { HotelHoverProvider } from "./HotelHoverContext"; // Импортируем провайдер

import styles from "./Hotels.module.scss";

export default function HotelsPage() {
  const {
    city_name,
    city_id,
    loading: searchLoading,
  } = useAppSelector((state) => state.search);

  // RTK Query запрос
  const {
    data,
    isLoading: apiLoading,
    isError,
  } = useGetHotelsByCityQuery(city_id!, {
    skip: !city_id,
  });

  const hotels = data?.hotels.slice(0, 10) || [];
  const isLoading = searchLoading || apiLoading;

  return (
    <main className={styles.hotels}>
      <div className={styles.formContainer}>
        <SearchForm />
      </div>

      <HotelHoverProvider>
        <div className={styles.layout}>
          <div className={styles.listContainer}>
            <HotelsList
              hotels={hotels}
              isLoading={isLoading}
              isError={isError}
              cityName={city_name}
              cityId={city_id}
            />
          </div>

          <aside className={styles.map}>
            {isLoading ? <Loader /> : <HotelMap hotels={hotels} />}
          </aside>
        </div>
      </HotelHoverProvider>
    </main>
  );
}
