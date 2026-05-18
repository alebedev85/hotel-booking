import HotelCard from "@/components/HotelCard/HotelCard";
import HotelCardSkeleton from "@/components/HotelCardSkeleton/HotelCardSkeleton";
import { IHotel } from "@/types";
import styles from "./HotelsList.module.scss";
import Link from "next/link";

interface HotelsListProps {
  hotels: IHotel[];
  isLoading: boolean;
  isError: boolean;
  cityName: string | null;
  cityId: number | null;
}

export default function HotelsList({
  hotels,
  isLoading,
  isError,
  cityName,
  cityId,
}: HotelsListProps) {
  return (
    <section className={styles.hotelsList}>
      <header className={styles.header}>
        {cityId ? (
          <div>
            <h2 className={styles.title}>Отели в {cityName}</h2>
            <p className={styles.subtitle}>Найдено {hotels.length} вариантов</p>
          </div>
        ) : (
          <h2 className={styles.title}>Выберите город для поиска</h2>
        )}
        {/* Кнопка фильтров */}
        <button className={styles.filterBtn}>
          <span className="material-symbols-outlined">filter_list</span>
          <span>Фильтры</span>
        </button>
      </header>

      <div className={styles.content}>
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => <HotelCardSkeleton key={i} />)
        ) : isError ? (
          <div className={styles.message}>Ошибка при загрузке отелей</div>
        ) : hotels.length === 0 && cityId ? (
          <div className={styles.message}>Ничего не найдено</div>
        ) : (
          <div className={styles.list}>
            {hotels.map((hotel) => (
              <Link
                href={`/hotel/${hotel.id}`}
                key={hotel.id}
                className={styles.cardLink}
              >
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                />
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}