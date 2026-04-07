"use client";
import { Hotel } from "@/types/hotel";
import BookingCard from "@/components/BookingCard/BookingCard";
import StarRating from "@/components/ui/StarRating/StarRating";
import AmenityItem from "@/components/ui/AmenityItem/AmenityItem";
import styles from "./HotelMainInfo.module.scss";

interface HotelMainInfoProps {
  hotel: Hotel; // В будущем заменим на интерфейс из Prisma
}

export default function HotelMainInfo({ hotel }: HotelMainInfoProps) {
  return (
    <section className={styles.hotelMainInfo}>
      <div className={styles.infoSide}>
        <div className={styles.badgeLine}>
          <StarRating count={hotel.stars} />
          <span className={styles.collectionName}>{hotel.collection}</span>
        </div>

        <h1 className={styles.title}>{hotel.name}</h1>

        <div className={styles.location}>
          <span className="material-symbols-outlined">location_on</span>
          <address>{hotel.location.address}</address>
        </div>
        <div className={styles.amenities}>
          {hotel.previewAmenities.map((item, idx) => (
            <AmenityItem key={idx} icon={item.icon} label={item.label} />
          ))}
        </div>
      </div>
      <div className={styles.cardSide}>
        <BookingCard price={hotel.price} currency={hotel.currency} />
      </div>
    </section>
  );
}
