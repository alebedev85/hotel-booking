import Image from "next/image";
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import { IHotel } from "@/types";
import styles from "./HotelCard.module.scss";

interface HotelCardProps {
  hotel: IHotel;
  onHover?: () => void;
  onLeave?: () => void;
}

export default function HotelCard({ hotel, onHover, onLeave }: HotelCardProps) {
  return (
    <article
      className={styles.card}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <div className={styles.imageContainer}>
        <div className={styles.aspectRatio}>
          <Image
            src={"/hotel.webp"}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            className={styles.hotelImage}
          />
        </div>

        {/* Бейдж в стиле Glassmorphism */}
        <div className={styles.badge}>
          Curated Pick
        </div>

        <FavoriteButton
          className={styles.favoriteButton}
          initialIsFavorite={false}
          onToggle={(val) => console.log("favorite:", val)}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h2 className={styles.hotelName}>{hotel.name}</h2>
          <div className={styles.rating}>
            <span className="material-symbols-outlined">star</span>
            <span className={styles.ratingValue}>4.9</span>
          </div>
        </div>

        <p className={styles.location}>
          {hotel.location.city}, {hotel.location.country}
        </p>

        <div className={styles.footer}>
          <div className={styles.priceBlock}>
            <span className={styles.amount}>
              €{hotel.price_from.toLocaleString("ru-RU")}
            </span>
            <span className={styles.period}> / night</span>
          </div>

          <button className={styles.viewBtn}>
            View Availability
          </button>
        </div>
      </div>
    </article>
  );
}