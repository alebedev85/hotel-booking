"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./SearchForm.module.scss";

interface SearchFormProps {
  initialLocation?: string;
  initialCheckIn?: string;
  initialCheckOut?: string;
  initialGuests?: string;
}

export default function SearchForm({
  initialLocation = "",
  initialCheckIn = "",
  initialCheckOut = "",
  initialGuests = "1",
}: SearchFormProps) {
  const router = useRouter();

  // Локальное состояние для управления вводом пользователя
  // Значения берутся напрямую из props при первом рендере
  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(Number(initialGuests));

  const handleSearch = () => {
    if (!location || !checkIn || !checkOut) return;

    // сохраняем текущие значения в localStorage
    const searchData = { location, checkIn, checkOut, guests };
    localStorage.setItem("lastSearch", JSON.stringify(searchData));
    localStorage.setItem("lastPage", "/hotels");

    // навигация с query-параметрами
    router.push(
      `/hotels?location=${encodeURIComponent(location)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    // ключ заставляет React пересоздавать форму,
    // если изменятся initialLocation / initialCheckIn и т.д.
    // это убирает необходимость в useEffect
    <form
      key={`${initialLocation}-${initialCheckIn}-${initialCheckOut}-${initialGuests}`}
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
          onChange={(e) => setLocation(e.target.value)}
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
          onChange={(e) => setCheckIn(e.target.value)}
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
          onChange={(e) => setCheckOut(e.target.value)}
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
          onChange={(e) => setGuests(Number(e.target.value))}
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
