import { Room } from "@/types/hotel";
import RoomCard from "@/components/RoomCard/RoomCard";
import styles from "./RoomSelection.module.scss";

interface RoomSelectionProps {
  rooms: Room[];
  currency: string;
}

export default function RoomSelection({ rooms, currency }: RoomSelectionProps) {
  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Варианты размещения</h2>
      <div className={styles.list}>
        {rooms.map((room) => (
          <RoomCard 
            key={room.id} 
            room={room} 
            currency={currency} 
          />
        ))}
      </div>
    </section>
  );
}