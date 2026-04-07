import { NearbyPlace } from "@/types/hotel";
import styles from "./LocationInsight.module.scss";

export default function LocationInsight({ nearby }: { nearby: NearbyPlace[] }) {
  return (
    <div className={styles.wrapper}>
      <h3 className={styles.title}>Location Insight</h3>
      <div className={styles.mapPreview}>
        <div className={styles.marker}>
          <span className="material-symbols-outlined">location_on</span>
        </div>
      </div>
      <ul className={styles.list}>
        {nearby.map((place, idx) => (
          <li key={idx} className={styles.item}>
            <span className={styles.name}>{place.name}</span>
            <span className={styles.distance}>{place.distance}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}