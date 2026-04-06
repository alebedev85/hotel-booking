import { Amenity } from "@/types/hotel";
import styles from './AmenityItem.module.scss'

export default function AmenityItem({ icon, label }: Amenity) {
  return (
    <div className={styles.amenityItem}>
      <div className={styles.iconWrapper}>
        <span className="material-symbols-outlined">{icon}</span>
      </div>
      <span>{label}</span>
    </div>
  );
}