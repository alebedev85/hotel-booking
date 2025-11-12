import { IHotel } from "@/types";
import styles from "./HotelCard.module.scss";

interface HotelCardProps {
  hotel: IHotel;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <article className={styles.card}>
      <img src="/hotel.jpg" alt="" className={styles.image} />

      <div className={styles.content}>
        <h3 className={styles.name}>{hotel.name}</h3>

        <p className={styles.address}>
          {hotel.location.city}, {hotel.location.country}
        </p>

        <div className={styles.facilities}>
          {hotel.facilities.slice(0, 3).map((f) => (
            <span key={f}>{f}</span>
          ))}
        </div>

        <div className={styles.bottom}>
          <div className={styles.price}>
            от{" "}
            <span className={styles.amount}>
              {hotel.price_from.toLocaleString("ru-RU")}
            </span>{" "}
            ₽
          </div>

          <button className={styles.button}>Подробнее</button>
        </div>
      </div>
    </article>
  );
}
