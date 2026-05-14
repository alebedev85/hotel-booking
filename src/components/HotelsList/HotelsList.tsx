import HotelCard from "@/components/HotelCard/HotelCard";
import HotelCardSkeleton from "@/components/HotelCardSkeleton/HotelCardSkeleton";
import { IHotel } from "@/types";
import styles from "./HotelsList.module.scss";

interface HotelsListProps {
  hotels: IHotel[];
  isLoading: boolean;
  isError: boolean;
  cityName: string | null;
  cityId: number | null;
  onHotelHover: (id: string) => void;
  onHotelLeave: () => void;
}

export default function HotelsList({
  hotels,
  isLoading,
  isError,
  cityName,
  cityId,
  onHotelHover,
  onHotelLeave,
}: HotelsListProps) {
  return (
    <section className={styles.hotelsList}>
      <header className={styles.header}>
        {cityId ? (
          <>
            <h2 className={styles.title}>Отели в {cityName}</h2>
            <p className={styles.subtitle}>Найдено {hotels.length} вариантов</p>
          </>
        ) : (
          <h2 className={styles.title}>Выберите город для поиска</h2>
        )}
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
              <HotelCard
                key={hotel.id}
                hotel={hotel}
                onHover={() => onHotelHover(hotel.id)}
                onLeave={onHotelLeave}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}