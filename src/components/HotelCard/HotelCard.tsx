import { useHotelHover } from "@/app/hotels/HotelHoverContext";
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import { IHotel } from "@/types";
import Image from "next/image";
import styles from "./HotelCard.module.scss";

interface HotelCardProps {
  hotel: IHotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  const { setActiveId } = useHotelHover();
  return (
    <article
      className={styles.card}
      onMouseEnter={() => setActiveId(hotel.id)}
      onMouseLeave={() => setActiveId(null)}
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
        <div className={styles.badge}>Наш выбор</div>

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
            <span className={styles.period}> / ночь</span>
          </div>

          <button type="button" className={styles.viewBtn}>
            Посмотреть номера
          </button>
        </div>
      </div>
    </article>
  );
}
