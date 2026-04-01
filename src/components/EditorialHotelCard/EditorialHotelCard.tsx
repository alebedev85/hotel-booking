import Image from "next/image";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import styles from "./EditorialHotelCard.module.scss";

interface EditorialHotelCardProps {
  name: string;
  location: string;
  price: string | number;
  image: string;
  rating?: number;
  priority?: boolean; // Добавим проп для оптимизации LCP
}

export default function EditorialHotelCard({
  name,
  location,
  price,
  image,
  priority = false,
}: EditorialHotelCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image
          src={image}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.hotelImage}
          priority={priority}
        />
        <FavoriteButton
          initialIsFavorite={false}
          onToggle={(val) => console.log("Is favorite:", val)}
        />
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.hotelName}>{name}</h3>
          <span className={`material-symbols-outlined ${styles.star}`}>
            star
          </span>
        </div>

        <p className={styles.location}>{location}</p>

        <div className={styles.footer}>
          <div className={styles.priceInfo}>
            <span className={styles.amount}>${price}</span>
            <span className={styles.period}>/ночь</span>
          </div>
          <button className={styles.bookBtn}>Забронировать</button>
        </div>
      </div>
    </div>
  );
}
