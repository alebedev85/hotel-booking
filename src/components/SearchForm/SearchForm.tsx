"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { setSearch } from "@/store/searchSlice";
import { useRouter } from "next/navigation";
import styles from "./SearchForm.module.scss";

interface SearchState {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}
export default function SearchForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { location, checkIn, checkOut, guests } = useAppSelector(
    (state) => state.search
  );

  const handleChange = (field: keyof SearchState, value: string | number) => {
    dispatch(
      setSearch({
        ...{ location, checkIn, checkOut, guests },
        [field]: value,
      })
    );
  };

  const handleSearch = async () => {
    if (!location || !checkIn || !checkOut) return;

    try {
      // 1️⃣ Запрашиваем координаты у OpenStreetMap Nominatim
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${encodeURIComponent(
          location
        )}&format=json&limit=1`,
        {
          headers: {
            "User-Agent": "HotelBookingApp/1.0",
          },
        }
      );

      const data = await res.json();

      if (!data || data.length === 0) {
        console.error("Ошибка при поиске города:");
        return;
      }

      const { lat, lon } = data[0];

      // 2️⃣ Обновляем Redux: добавляем координаты
      dispatch(
        setSearch({
          location,
          checkIn,
          checkOut,
          guests,
          lat: parseFloat(lat),
          lon: parseFloat(lon),
        })
      );

      // 3️⃣ Переходим на страницу отелей
      router.push(
        `/hotels?location=${encodeURIComponent(
          location
        )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
    } catch (err) {
      console.error("Ошибка при поиске города:", err);
    }
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      {/* Поле "Направление" */}
      <div className={styles.field}>
        <input
          id="location"
          type="text"
          placeholder=" "
          value={location}
          onChange={(e) => handleChange("location", e.target.value)}
          required
        />
        <label htmlFor="location">Направление</label>
      </div>

      {/* Поле "Заезд" */}
      <div className={styles.field}>
        <input
          id="checkIn"
          type="date"
          placeholder=" "
          value={checkIn}
          onChange={(e) => handleChange("checkIn", e.target.value)}
          required
        />
        <label htmlFor="checkIn">Заезд</label>
      </div>

      {/* Поле "Выезд" */}
      <div className={styles.field}>
        <input
          id="checkOut"
          type="date"
          placeholder=" "
          value={checkOut}
          onChange={(e) => handleChange("checkOut", e.target.value)}
          required
        />
        <label htmlFor="checkOut">Выезд</label>
      </div>

      {/* Поле "Гости" */}
      <div className={styles.field}>
        <input
          id="guests"
          type="number"
          min={1}
          placeholder=" "
          value={guests}
          onChange={(e) => handleChange("guests", Number(e.target.value))}
          required
        />
        <label htmlFor="guests">Гости</label>
      </div>

      {/* Кнопка поиска */}
      <button type="submit" className={styles.searchButton}>
        Найти
      </button>
    </form>
  );
}
