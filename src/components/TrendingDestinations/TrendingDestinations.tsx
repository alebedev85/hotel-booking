import { destinations } from './TrendingDestinationsData';

import styles from "./TrendingDestinations.module.scss";

export default function TrendingDestinations() {

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <span className={styles.label}>Лучшее в этом сезоне</span>
          <h2 className={styles.title}>Популярные направления</h2>
        </div>
        <a href="#" className={styles.viewAll}>Смотреть все направления</a>
      </div>

      <div className={styles.grid}>
        {destinations.map((dest) => (
          <div key={dest.id} className={`${styles.card} ${styles[dest.size]}`}>
            <img src={dest.img} alt={dest.name} className={styles.image} />
            <div className={styles.overlay}>
              <h3 className={styles.destName}>{dest.name}</h3>
              {dest.count && <p className={styles.destCount}>{dest.count}</p>}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}