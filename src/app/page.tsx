"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.scss";

export default function HomePage() {
  const router = useRouter();
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage === "/hotels") {
      const lastSearch = localStorage.getItem("lastSearch");
      if (lastSearch) {
        const { location, checkIn, checkOut, guests } = JSON.parse(lastSearch);
        router.replace(
          `/hotels?location=${encodeURIComponent(
            location
          )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
        );
      }
    }
  }, [router]);

  const handleSearch = () => {
    if (!location || !checkIn || !checkOut) return;

    const searchData = { location, checkIn, checkOut, guests };
    localStorage.setItem("lastSearch", JSON.stringify(searchData));
    localStorage.setItem("lastPage", "/hotels");

    router.push(
      `/hotels?location=${encodeURIComponent(
        location
      )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <main className={styles.container}>
      <div className={styles.form}>
        <h1>Поиск отелей</h1>

        <input
          type="text"
          placeholder="Город или место"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <div className={styles.row}>
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>

        <input
          type="number"
          min={1}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
        />

        <button onClick={handleSearch}>Найти</button>
      </div>
    </main>
  );
}
