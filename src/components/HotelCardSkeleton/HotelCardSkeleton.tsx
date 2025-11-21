import styles from "./HotelCardSkeleton.module.scss";

export default function HotelCardSkeleton() {
  return (
    <div className={styles.skeleton}>
      <div className={styles.image} />

      <div className={styles.content}>
        <div className={styles.title} />
        <div className={styles.text} />
        <div className={styles.text} />

        <div className={styles.bottom}>
          <div className={styles.price} />
          <div className={styles.button} />
        </div>
      </div>
    </div>
  );
}
