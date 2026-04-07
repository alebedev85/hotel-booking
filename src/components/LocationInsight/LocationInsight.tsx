import { NearbyPlace } from "@/types/hotel";
import Image from "next/image";
import styles from "./LocationInsight.module.scss";

export default function LocationInsight({ nearby }: { nearby: NearbyPlace[] }) {
  return (
    <aside className={styles.wrapper}>
      <h3 className={styles.title}>Location Insight</h3>
      <div className={styles.mapContainer}>
        <Image
          className={styles.mapImage}
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWt_9a6Zhv02iFGCrd7LO_AvCedPJ72u9WKux6xlokHiAvR0qnOIcIl-0qmShCvfAJWtnDFFLnSzhMOjnTzZMzu2AjZoPV_T2zdPdAFWxsgjbw2vLfZAeSlfaqD7XG7VVLozJ14invV0DRqXldZW1WBweJGBN6i2II80xZJ8eHuVENIX9YK-ghSYYzrgfvDVLKNp707DQVuMN8W5rwW_mm1Zu75ZCALd0fmdP496IbeRQF0H_GQiLp3Blf0h7vsmoRjz7IpJRqo6s"
          alt="Map preview"
          fill // Растягиваем на весь контейнер
          sizes="(max-width: 768px) 100vw, 300px"
        />
        <div className={styles.markerOverlay}>
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
    </aside>
  );
}