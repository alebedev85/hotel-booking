import Image from "next/image";
import FavoriteButton from "@/components/ui/FavoriteButton/FavoriteButton";
import styles from "./HotelGallery.module.scss";

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
}

export default function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  if (!images || images.length < 3) return null;

  return (
    <section className={styles.gallery}>
      {/* Кнопка теперь позиционируется относительно всей секции */}
      <FavoriteButton className={styles.favoritePos} />

      {/* ГЛАВНОЕ ФОТО */}
      <div className={styles.mainImage}>
        <Image 
          src={images[0]} 
          alt={hotelName} 
          fill 
          priority 
          className={styles.objectCover}
        />
        <div className={styles.galleryTrigger}>
          <span className="material-symbols-outlined">photo_library</span>
          <span>{images.length} Фотографий</span>
        </div>
      </div>

      {/* БОКОВЫЕ ФОТО (Контейнер-столбец) */}
      <div className={styles.sideImages}>
        {images.slice(1, 3).map((img, idx) => (
          <div key={idx} className={styles.subImage}>
            <Image 
              src={img} 
              alt={`${hotelName} view ${idx}`} 
              fill 
              className={styles.objectCover} 
            />
          </div>
        ))}
      </div>
    </section>
  );
}