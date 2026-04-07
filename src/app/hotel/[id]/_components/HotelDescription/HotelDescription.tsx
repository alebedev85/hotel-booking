import { Hotel } from "@/types/hotel";
import AmenityFeature from "@/components/ui/AmenityFeature/AmenityFeature";
import LocationInsight from "@/components/LocationInsight/LocationInsight";
import styles from "./HotelDescription.module.scss";

export default function HotelDescription({ hotel }: { hotel: Hotel }) {
  return (
    <section className={styles.grid}>
      {/* Левая колонка: Текст и Удобства */}
      <div className={styles.contentSide}>
        <h2 className={styles.mainTitle}>Художественное наследие</h2>
        
        <div className={styles.textBlock}>
          {hotel.description.content.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>

        <div className={styles.amenitiesSection}>
          <h3 className={styles.subTitle}>Исключительный комфорт</h3>
          <div className={styles.amenitiesGrid}>
            {hotel.detailedAmenities.map((item, idx) => (
              <AmenityFeature key={idx} {...item} />
            ))}
          </div>
        </div>
      </div>
      <div className={styles.stickySide}>
        <LocationInsight nearby={hotel.location.nearby} />
      </div>
    </section>
  );
}