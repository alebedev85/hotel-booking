"use client";

import HotelMap from "@/components/HotelMap/HotelMap";
import HotelsList from "@/components/HotelsList/HotelsList";
import SearchForm from "@/components/SearchForm/SearchForm";
import Loader from "@/components/ui/Loader/Loader";

import { useAppSelector } from "@/store";
import { useGetHotelsByCityQuery } from "@/store/hotelsApi";
import { HotelHoverProvider } from "./HotelHoverContext";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";

import styles from "./Hotels.module.scss";

export default function HotelsPage() {
  const {
    city_name,
    city_id,
    loading: searchLoading,
  } = useAppSelector((state) => state.search);

  // Безопасный вызов RTK Query без нон-налл утверждений (!)
  const {
    data,
    isLoading: apiLoading,
    isError,
  } = useGetHotelsByCityQuery(city_id ?? 0, {
    skip: !city_id,
  });

  const allHotels = data?.hotels || [];
  const isLoading = searchLoading || apiLoading;

  // Подключаем наш обновленный стабильный хук
  const { 
    visibleElements: visibleHotels, 
    triggerRef,
    hasMore 
  } = useInfiniteScroll({
    allElements: allHotels,
    step: 10,
    isLoading,
    resetDependency: city_id,
  });

  return (
    <main className={styles.hotels}>
      <div className={styles.formContainer}>
        <SearchForm />
      </div>

      <HotelHoverProvider>
        <div className={styles.layout}>
          
          {/* Контейнер со скроллом отелей */}
          <div className={styles.listContainer}>
            <HotelsList
              hotels={visibleHotels}
              isLoading={isLoading}
              isError={isError}
              cityName={city_name}
              cityId={city_id}
              totalCount={allHotels.length}
              hasMore={hasMore}
              triggerRef={triggerRef}
            />
          </div>

          {/* Правая панель с картой */}
          <aside className={styles.map}>
            {isLoading ? (
              <div className={styles.mapLoader}>
                <Loader />
              </div>
            ) : (
              <HotelMap hotels={allHotels} />
            )}
          </aside>

        </div>
      </HotelHoverProvider>
    </main>
  );
}