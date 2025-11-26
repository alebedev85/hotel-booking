"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCoordinates, setField } from "@/store/searchSlice";
import { ICity } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SearchForm.module.scss";

interface FormValues {
  city_name: string; // отображаемое имя
  city_id: number;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function SearchForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { loading, city_id, city_name, checkIn, checkOut, guests } =
    useAppSelector((state) => state.search);

  const { register, handleSubmit, setValue, watch } = useForm<FormValues>({
    defaultValues: {
      city_name: city_name || "",
      city_id: city_id || 0,
      checkIn,
      checkOut,
      guests,
    },
  });

  const [cities, setCities] = useState<ICity[]>([]);
  const [showList, setShowList] = useState(false);

  const query = watch("city_name");

  // Автокомплит городов
  useEffect(() => {
    const loadCities = async () => {
      if (!query || query.length < 2) {
        setCities([]);
        return;
      }
      const res = await fetch(`/api/cities?query=${encodeURIComponent(query)}`);
      const data = await res.json();
      setCities(data);
    };

    loadCities();
  }, [query]);

  // Выбор города из списка
  const selectCity = (city: ICity) => {
    setValue("city_name", city.name_ru);
    setValue("city_id", city.id);
    setCities([]);
    setShowList(false);
  };

  const onSubmit = async (data: FormValues) => {
    if (!city_id) {
      alert("Выберите город из списка");
      return;
    }

    dispatch(setField({ field: "checkIn", value: data.checkIn }));
    dispatch(setField({ field: "checkOut", value: data.checkOut }));
    dispatch(setField({ field: "guests", value: data.guests }));

    // загружаем координаты
    await dispatch(fetchCoordinates(data.city_name));
    dispatch(setField({ field: "city_id", value: data.city_id }));
    dispatch(setField({ field: "city_name", value: data.city_name }));

    setCities([]);
    setShowList(false);

    router.push(
      `/hotels?city_id=${city_id}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      {/* ГОРОД */}
      <div className={styles.field}>
        <input
          id="city_name"
          placeholder=" "
          {...register("city_name")}
          onFocus={() => setShowList(true)}
          autoComplete="off"
        />
        <label htmlFor="city_name">Направление</label>
        <input
          id="city_id"
          type="hidden"
          placeholder=" "
          {...register("city_id")}
        />

        {showList && cities.length > 0 && (
          <ul className={styles.dropdown}>
            {cities.map((city) => (
              <li key={city.id} onClick={() => selectCity(city)}>
                {city.name_ru}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* ДАТЫ */}
      <div className={styles.field}>
        <input id="checkIn" type="date" {...register("checkIn")} required />
        <label htmlFor="checkIn">Заезд</label>
      </div>

      <div className={styles.field}>
        <input id="checkOut" type="date" {...register("checkOut")} required />
        <label htmlFor="checkOut">Выезд</label>
      </div>

      {/* ГОСТИ */}
      <div className={styles.field}>
        <input
          id="guests"
          type="number"
          min={1}
          {...register("guests")}
          required
        />
        <label htmlFor="guests">Гости</label>
      </div>

      <button type="submit" className={styles.searchButton} disabled={loading}>
        {loading ? "Поиск..." : "Найти"}
      </button>
    </form>
  );
}
