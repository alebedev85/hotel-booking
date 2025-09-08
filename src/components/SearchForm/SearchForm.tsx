"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
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

  const [location, setLocation] = useState(initialLocation);
  const [checkIn, setCheckIn] = useState(initialCheckIn);
  const [checkOut, setCheckOut] = useState(initialCheckOut);
  const [guests, setGuests] = useState(Number(initialGuests));

  useEffect(() => {
    setLocation(initialLocation);
    setCheckIn(initialCheckIn);
    setCheckOut(initialCheckOut);
    setGuests(Number(initialGuests));
  }, [initialLocation, initialCheckIn, initialCheckOut, initialGuests]);

  const handleSearch = () => {
    if (!location || !checkIn || !checkOut) return;

    const searchData = { location, checkIn, checkOut, guests };
    localStorage.setItem("lastSearch", JSON.stringify(searchData));
    localStorage.setItem("lastPage", "/hotels");

    router.push(
      `/hotels?location=${encodeURIComponent(location)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <form className={styles.form} onSubmit={(e) => { e.preventDefault(); handleSearch(); }}>
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

      <button type="submit" className={styles.searchButton}>
        Найти
      </button>
    </form>
  );
}
