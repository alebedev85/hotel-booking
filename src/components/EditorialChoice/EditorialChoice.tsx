import EditorialHotelCard from "../EditorialHotelCard/EditorialHotelCard";
import styles from "./EditorialChoice.module.scss";
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
            <EditorialHotelCard
              key={hotel.id}
              name={hotel.name}
              location={hotel.location}
              price={hotel.price}
              image={hotel.img}
              priority={index < 2} // Первые две картинки грузим сразу
            />
          ))}
        </div>
      </div>
    </section>
  );
}
