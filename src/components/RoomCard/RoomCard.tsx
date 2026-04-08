import Image from "next/image";
import { Room } from "@/types/hotel";
import styles from "./RoomCard.module.scss";

interface RoomCardProps {
  room: Room;
  currency: string;
}

export default function RoomCard({ room, currency }: RoomCardProps) {
  const totalPrice = room.price * 3;

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={room.image} alt={room.name} fill className={styles.image} />
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <h3 className={styles.roomName}>{room.name}</h3>
          
          {/* Характеристики */}
          <p className={styles.meta}>
            {[room.size, ...room.features].join(" | ")}
          </p>
          
          {/* Преимущества */}
          <ul className={styles.benefits}>
            {room.benefits.map((benefit, index) => (
              <li key={index} className={styles.benefitItem}>
                <span className="material-symbols-outlined">check</span>
                {benefit}
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.actions}>
          <div className={styles.priceBlock}>
            <span className={styles.currentPrice}>
              {currency}{room.price}
            </span>
            <span className={styles.totalHint}>
              итого за 3 ночи: {currency}{totalPrice}
            </span>
          </div>
          
          <button className={styles.reserveButton}>
            Забронировать
          </button>
        </div>
      </div>
    </div>
  );
}