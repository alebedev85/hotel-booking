"use client";

import { ICity } from "@/types";
import styles from "./CityDropdown.module.scss";
import { useEffect } from "react";

interface Props {
  cities: ICity[];
  setShow: (show: boolean) => void;
  show: boolean;
  onSelect: (city: ICity) => void;
}

export default function CityDropdown({ cities,setShow, show, onSelect }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setShow(false); // Или просто закрыть через проп
    };

    if (show) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [show, onSelect]);

  if (!show || cities.length === 0) return null;

  return (
    <ul className={styles.dropdown}>
      {cities.map((city) => (
        <li key={city.id} onClick={() => onSelect(city)}>
          <div className={styles.cityItem}>
            <span
              className="material-symbols-outlined"
              style={{ fontSize: "18px", opacity: 0.6 }}
            >
              location_on
            </span>
            <span>{city.name_ru}</span>
          </div>
        </li>
      ))}
    </ul>
  );
}
