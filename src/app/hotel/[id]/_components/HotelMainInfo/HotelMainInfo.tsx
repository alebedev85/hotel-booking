"use client";

import BookingCard from "@/components/BookingCard/BookingCard";
import styles from "./HotelMainInfo.module.scss";
import { Hotel } from "@/types/hotel";

interface HotelMainInfoProps {
  hotel: Hotel; // В будущем заменим на интерфейс из Prisma
}

export default function HotelMainInfo({ hotel }: HotelMainInfoProps) {
  return (
    <section className={styles.container}>
      <div className={styles.infoSide}>
        <div className={styles.badgeLine}>
          <div className={styles.stars}>
            {[...Array(5)].map((_, i) => (
              <span key={i} className="material-symbols-outlined">star</span>
            ))}
          </div>
          <span className={styles.collectionName}>{hotel.collection}</span>
        </div>

        <h1 className={styles.title}>{hotel.name}</h1>

        <div className={styles.location}>
          <span className="material-symbols-outlined">location_on</span>
          <address>{hotel.location.address}</address>
        </div>

        {/* Сетка удобств */}
        <div className={styles.amenities}>
          {hotel.amenities.map((item, idx) => (
            <div key={idx} className={styles.amenityItem}>
              <div className={styles.iconWrapper}>
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ПРАВАЯ ЧАСТЬ: КАРТОЧКА */}
      <div className={styles.cardSide}>
        <BookingCard price={hotel.price} currency={hotel.currency} />
      </div>
    </section>
  );
}