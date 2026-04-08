import styles from "./HotelPage.module.scss";
import HotelDescription from "./_components/HotelDescription/HotelDescription";
import HotelGallery from "./_components/HotelGallery/HotelGallery";
import HotelMainInfo from "./_components/HotelMainInfo/HotelMainInfo";
import RoomSelection from "./_components/RoomSelection/RoomSelection";
import { mockHotel as hotel } from "./mockHotel";

export default function HotelPage({ params }: { params: { id: string } }) {
  // В будущем тут будет: const hotel = await getHotelById(params.id);

  return (
    <main className={styles.main}>
      <HotelGallery images={hotel.images} hotelName={hotel.name} />
      <HotelMainInfo hotel={hotel} />
      <HotelDescription hotel={hotel} />
      <RoomSelection rooms={hotel.rooms} currency={hotel.currency} />
    </main>
  );
}
