import styles from "./HotelCard.module.scss";

interface HotelCardProps {
  id: number;
  name: string;
  price: number;
}

export default function HotelCard({ id, name, price }: HotelCardProps) {
  return (
    <div className={styles.card}>
      <h2 className={styles.name}>{name}</h2>
      <p className={styles.price}>Цена за ночь: {price} ₽</p>
    </div>
  );
}