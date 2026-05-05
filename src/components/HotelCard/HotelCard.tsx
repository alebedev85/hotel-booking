import Image from "next/image";
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import { IHotel } from "@/types";
import styles from "./HotelCard.module.scss";

interface HotelCardProps {
  hotel: IHotel;
  onHover?: () => void;
  onLeave?: () => void;
}

export default function HotelCard({
  hotel,
  onHover,
  onLeave,
}: HotelCardProps) {
  return (
    <article
      className={styles.card}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* IMAGE */}
      <div className={styles.imageWrapper}>
        <Image
          src="/hotel.jpg"
          alt={hotel.name}
          fill
          className={styles.hotelImage}
        />

        <FavoriteButton
          className={styles.favoritePosition}
          initialIsFavorite={false}
          onToggle={(val) => console.log("favorite:", val)}
        />
      </div>

      {/* CONTENT */}
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.hotelName}>{hotel.name}</h3>

          <div className={styles.rating}>
            <span className="material-symbols-outlined">star</span>
            <span>4.8</span>
          </div>
        </div>

        <p className={styles.location}>
          {hotel.location.city}, {hotel.location.country}
        </p>

        <div className={styles.footer}>
          <div className={styles.priceInfo}>
            <span className={styles.amount}>
              {hotel.price_from.toLocaleString("ru-RU")}
            </span>
            <span className={styles.period}>₽ / ночь</span>
          </div>

          <button className={styles.bookBtn}>Подробнее</button>
        </div>
      </div>
    </article>
  );
}