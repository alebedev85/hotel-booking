"use client";

import { ICity } from "@/types";
import styles from "./CityDropdown.module.scss";

interface Props {
  cities: ICity[];
  show: boolean;
  onSelect: (city: ICity) => void;
}

export default function CityDropdown({ cities, show, onSelect }: Props) {
  if (!show || cities.length === 0) return null;

  return (
    <ul className={styles.dropdown}>
      {cities.map((city) => (
        <li key={city.id} onClick={() => onSelect(city)}>
          {city.name_ru}
        </li>
      ))}
    </ul>
  );
}
