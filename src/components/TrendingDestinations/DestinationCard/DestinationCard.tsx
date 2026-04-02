import Image from 'next/image';
import styles from "./DestinationCard.module.scss";

interface DestinationCardProps {
  name: string;
  count?: string;
  img: string;
  size: 'large' | 'medium' | 'small';
  priority?: boolean; // Для LCP оптимизации первых карточек
}

export default function DestinationCard({ name, count, img, size, priority = false }: DestinationCardProps) {
  return (
    <div className={`${styles.card} ${styles[size]}`}>
      <div className={styles.imageWrapper}>
        <Image 
          src={img} 
          alt={name} 
          fill 
          sizes={size === 'large' ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 100vw, 25vw'}
          className={styles.nextImage}
          priority={priority}
        />
      </div>

      <div className={styles.overlay}>
        <h3 className={styles.destName}>{name}</h3>
        {count && <p className={styles.destCount}>{count}</p>}
      </div>
    </div>
  );
}