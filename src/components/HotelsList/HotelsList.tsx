import HotelCard from "@/components/HotelCard/HotelCard";
import HotelCardSkeleton from "@/components/HotelCardSkeleton/HotelCardSkeleton";
import { IHotel } from "@/types";
import styles from "./HotelsList.module.scss";
import Link from "next/link";
import Loader from "../ui/Loader/Loader";

interface HotelsListProps {
  hotels: IHotel[];
  isLoading: boolean;
  isError: boolean;
  cityName: string | null;
  cityId: number | null;
  totalCount: number;
  hasMore: boolean;
  triggerRef: React.RefObject<HTMLDivElement | null>;
}

export default function HotelsList({
  hotels,
  isLoading,
  isError,
  cityName,
  cityId,
  totalCount,
  hasMore,
  triggerRef,
}: HotelsListProps) {
  
  // Показывать скелетоны только при первой загрузке, когда отелей еще нет.
  // Если отели уже есть (например, 10 штук), то при догрузке следующих этот блок проигнорируется,
  // и старые отели останутся на своем месте в DOM, не ломая скролл.
  const showSkeleton = isLoading && hotels.length === 0;

  return (
    <section className={styles.hotelsList}>
      <header className={styles.header}>
        {cityId ? (
          <div>
            <h2 className={styles.title}>Отели в {cityName}</h2>
            <p className={styles.subtitle}>Найдено {totalCount} вариантов</p>
          </div>
        ) : (
          <h2 className={styles.title}>Выберите город для поиска</h2>
        )}
        
        <button className={styles.filterBtn}>
          <span className="material-symbols-outlined">filter_list</span>
          <span>Фильтры</span>
        </button>
      </header>

      <div className={styles.content}>
        {showSkeleton ? (
          <div className={styles.list}>
            {Array.from({ length: 6 }).map((_, i) => (
              <HotelCardSkeleton key={i} />
            ))}
          </div>
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
                <HotelCard hotel={hotel} />
              </Link>
            ))}

            {hasMore && (
              <div ref={triggerRef} className={styles.scrollTrigger}>
                {isLoading && <Loader />}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}