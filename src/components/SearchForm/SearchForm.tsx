"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCoordinates, setField } from "@/store/searchSlice";
import { ICity } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./SearchForm.module.scss";

interface FormValues {
  city_name: string;
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

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
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
  const selectedCityId = watch("city_id");

  // Автокомплит
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

  const selectCity = (city: ICity) => {
    setValue("city_name", city.name_ru, { shouldValidate: true });
    setValue("city_id", city.id, { shouldValidate: true });
    setCities([]);
    setShowList(false);
  };

  const onSubmit = async (data: FormValues) => {
    // Проверка выбора города
    if (!data.city_id) {
      return;
    }

    dispatch(setField({ field: "checkIn", value: data.checkIn }));
    dispatch(setField({ field: "checkOut", value: data.checkOut }));
    dispatch(setField({ field: "guests", value: data.guests }));

    await dispatch(fetchCoordinates(data.city_name));

    dispatch(setField({ field: "city_id", value: data.city_id }));
    dispatch(setField({ field: "city_name", value: data.city_name }));

    setCities([]);
    setShowList(false);

    router.push(
      `/hotels?city_id=${data.city_id}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ГОРОД */}
      <div className={styles.field}>
        <input
          id="city_name"
          placeholder=" "
          {...register("city_name", {
            required: "Введите город",
            validate: () =>
              selectedCityId > 0 || "Выберите город из списка",
          })}
          onFocus={() => setShowList(true)}
          autoComplete="off"
        />
        <label htmlFor="city_name">Направление</label>

        <input type="hidden" {...register("city_id")} />

        {showList && cities.length > 0 && (
          <ul className={styles.dropdown}>
            {cities.map((city) => (
              <li key={city.id} onClick={() => selectCity(city)}>
                {city.name_ru}
              </li>
            ))}
          </ul>
        )}

        {errors.city_name && (
          <p className={styles.error}>{errors.city_name.message}</p>
        )}
      </div>

      {/* ДАТА ЗАЕЗДА */}
      <div className={styles.field}>
        <input
          id="checkIn"
          type="date"
          {...register("checkIn", {
            required: "Выберите дату заезда",
          })}
        />
        <label htmlFor="checkIn">Заезд</label>
        {errors.checkIn && (
          <p className={styles.error}>{errors.checkIn.message}</p>
        )}
      </div>

      {/* ДАТА ВЫЕЗДА */}
      <div className={styles.field}>
        <input
          id="checkOut"
          type="date"
          {...register("checkOut", {
            required: "Выберите дату выезда",
          })}
        />
        <label htmlFor="checkOut">Выезд</label>
        {errors.checkOut && (
          <p className={styles.error}>{errors.checkOut.message}</p>
        )}
      </div>

      {/* ГОСТИ */}
      <div className={styles.field}>
        <input
          id="guests"
          type="number"
          min={1}
          {...register("guests", {
            required: "Укажите количество гостей",
            min: { value: 1, message: "Минимум 1 гость" },
          })}
        />
        <label htmlFor="guests">Гости</label>
        {errors.guests && (
          <p className={styles.error}>{errors.guests.message}</p>
        )}
      </div>

      <button type="submit" className={styles.searchButton} disabled={loading}>
        {loading ? "Поиск..." : "Найти"}
      </button>
    </form>
  );
}
