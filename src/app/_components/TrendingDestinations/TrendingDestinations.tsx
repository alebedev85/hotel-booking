import { destinations } from "./TrendingDestinationsData";

import DestinationCard from "./DestinationCard/DestinationCard";
import styles from "./TrendingDestinations.module.scss";
import Link from "next/link";

export default function TrendingDestinations() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>Лучшее в этом сезоне</span>
          <h2 className={styles.title}>Популярные направления</h2>
        </div>
        <Link href="#" className={styles.viewAll}>
          Смотреть все направления
        </Link>
      </div>

      <div className={styles.grid}>
        {destinations.map((dest, index) => (
          <DestinationCard
            key={dest.id}
            {...dest}
            size={dest.size as "large" | "medium" | "small"}
            priority={index < 2} // Первые две картинки грузим сразу
          />
        ))}
      </div>
    </section>
  );
}
