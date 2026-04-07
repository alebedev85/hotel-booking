import { Amenity } from '@/types/hotel';
import styles from './AmenityFeature.module.scss'

export default function AmenityFeature({ icon, label, description }: Amenity) {
  return (
    <div className={styles.item}>
      <span className={`material-symbols-outlined ${styles.icon}`}>
        {icon}
      </span>
      <div className={styles.content}>
        <h4 className={styles.label}>{label}</h4>
        {description && <p className={styles.description}>{description}</p>}
      </div>
    </div>
  );
}