import Link from "next/link";
import styles from "./EditorialChoice.module.scss";
import EditorialHotelCard from "./EditorialHotelCard/EditorialHotelCard";
import { hotels } from "./hotels";

export default function EditorialChoice() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Выбор редакции</h2>
          <p className={styles.description}>
            Наши редакторы путешествуют инкогнито, чтобы составить для вас
            список мест, которые предлагают не просто номер, а новую
            перспективу.
          </p>
        </div>

        <div className={styles.grid}>
          {hotels.map((hotel, index) => (
            <Link
              href={`/hotel/${hotel.id}`}
              key={hotel.id}
              className={styles.cardLink}
            >
              <EditorialHotelCard
                name={hotel.name}
                location={hotel.location}
                price={hotel.price}
                image={hotel.img}
                priority={index < 2}
              />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
