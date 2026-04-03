import styles from "./HotelPage.module.scss";
import HotelGallery from "./_components/HotelGallery/HotelGallery";
import { mockHotel as hotel } from "./mockHotel";

export default function HotelPage({ params }: { params: { id: string } }) {
  // В будущем тут будет: const hotel = await getHotelById(params.id);

  return (
    <main className={styles.main}>
      {/* ГАЛЕРЕЯ */}
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

        {/* ПРАВАЯ КОЛОНКА: КАРТОЧКА БРОНИРОВАНИЯ */}
        <aside className={styles.bookingCard}>
          <div className={styles.priceHeader}>
            <span className={styles.priceValue}>
              {hotel.currency}
              {hotel.price}
            </span>
            <span className={styles.pricePeriod}>/ ночь</span>
          </div>

          <div className={styles.formContainer}>
            <div className={styles.inputsGroup}>
              <div className={styles.inputField}>
                <label>ЗАЕЗД</label>
                <span>12 Окт 2026</span>
              </div>
              <div className={styles.inputField}>
                <label>ВЫЕЗД</label>
                <span>15 Окт 2026</span>
              </div>
            </div>
            <button className={styles.submitBtn}>Забронировать</button>
          </div>
          <p className={styles.disclaimer}>Бесплатная отмена до 10 октября</p>
        </aside>
      </section>
    </main>
  );
}
