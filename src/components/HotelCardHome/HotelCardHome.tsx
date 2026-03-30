import styles from "./HotelCardHome.module.scss";

interface HotelCardHomeProps {
  name: string;
  location: string;
  price: string | number;
  image: string;
  rating?: number; // Можно передавать количество звезд или оценку
}

export default function HotelCardHome({ name, location, price, image }: HotelCardHomeProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={image} alt={name} loading="lazy" />
        {/* Кнопка "В избранное" — пригодится для личного кабинета */}
        <button className={styles.favoriteBtn} aria-label="Add to favorites">
          <span className="material-symbols-outlined">favorite</span>
        </button>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.hotelName}>{name}</h3>
          <span className={`material-symbols-outlined ${styles.star}`}>star</span>
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