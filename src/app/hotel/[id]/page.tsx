import styles from "./HotelPage.module.scss";
import HotelGallery from "./_components/HotelGallery/HotelGallery";
import HotelMainInfo from "./_components/HotelMainInfo/HotelMainInfo";
import { mockHotel as hotel } from "./mockHotel";

export default function HotelPage({ params }: { params: { id: string } }) {
  // В будущем тут будет: const hotel = await getHotelById(params.id);

  return (
    <main className={styles.main}>
      <HotelGallery images={hotel.images} hotelName={hotel.name} />
      <HotelMainInfo hotel={hotel} />
    </main>
  );
}
