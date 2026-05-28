import styles from "./HotelCardSkeleton.module.scss";

export default function HotelCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      {/* Контейнер картинки */}
      <div className={styles.imageContainer}>
        <div className={styles.aspectRatio} />
      </div>

      {/* Контентная часть */}
      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.hotelName} />
          <div className={styles.rating} />
        </div>

        <div className={styles.location} />

        <div className={styles.footer}>
          <div className={styles.priceBlock} />
          <div className={styles.viewBtn} />
        </div>
      </div>
    </div>
  );
}
