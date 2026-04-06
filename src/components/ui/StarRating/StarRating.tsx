import styles from './StarRating.module.scss'

export default function StarRating({ count }: { count: number }) {
  return (
    <div className={styles.stars}>
      {[...Array(count)].map((_, i) => (
        <span key={i} className="material-symbols-outlined">star</span>
      ))}
    </div>
  );
}