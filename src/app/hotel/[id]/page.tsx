import styles from "./HotelPage.module.scss";
import HotelGallery from "./_components/HotelGallery/HotelGallery";
import BookingCard from "@/components/BookingCard/BookingCard";
import { mockHotel as hotel } from "./mockHotel";

export default function HotelPage({ params }: { params: { id: string } }) {
  // В будущем тут будет: const hotel = await getHotelById(params.id);

  return (
    <main className={styles.main}>
      <HotelGallery images={hotel.images} hotelName={hotel.name} />

      <section className={styles.contentLayout}>
        <div className={styles.infoSide}>
          <div className={styles.badge}>
            <div className={styles.stars}>
              {[...Array(hotel.stars)].map((_, i) => (
                <span key={i} className="material-symbols-outlined">
                  star
                </span>
              ))}
            </div>
            <span className={styles.collectionText}>{hotel.collection}</span>
          </div>

          <h1 className={styles.title}>{hotel.name}</h1>

          <div className={styles.location}>
            <span className="material-symbols-outlined">location_on</span>
            <address>{hotel.location.address}</address>
          </div>

          {/* Сетка удобств (Amenities) */}
          <div className={styles.amenitiesGrid}>
            {hotel.amenities.slice(0, 4).map((item, idx) => (
              <div key={idx} className={styles.amenityItem}>
                <div className={styles.iconCircle}>
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className={styles.descriptionSection}>
            <h2>{hotel.description.title}</h2>
            {hotel.description.content.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
        <BookingCard price={hotel.price} currency={hotel.currency} />
      </section>
    </main>
  );
}
