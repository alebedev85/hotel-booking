"use client";

import { useForm } from "react-hook-form";
import { useAppDispatch, useAppSelector } from "@/store";
import { setField, fetchCoordinates } from "@/store/searchSlice";
import { useRouter } from "next/navigation";
import styles from "./SearchForm.module.scss";

interface FormValues {
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
}

export default function SearchForm() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const {loading, location, checkIn, checkOut, guests} = useAppSelector((state) => state.search);

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      location: location,
      checkIn: checkIn,
      checkOut: checkOut,
      guests: guests,
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { location, checkIn, checkOut, guests } = data;

    // сохраняем поля в стор
    dispatch(setField({ field: "location", value: location }));
    dispatch(setField({ field: "checkIn", value: checkIn }));
    dispatch(setField({ field: "checkOut", value: checkOut }));
    dispatch(setField({ field: "guests", value: guests }));

    // загружаем координаты
    await dispatch(fetchCoordinates(location));

    router.push(
      `/hotels?location=${encodeURIComponent(location)}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
    );
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.field}>
        <input id="location" placeholder=" " {...register("location")} required />
        <label htmlFor="location">Направление</label>
      </div>

      <div className={styles.field}>
        <input id="checkIn" type="date" {...register("checkIn")} required />
        <label htmlFor="checkIn">Заезд</label>
      </div>

      <div className={styles.field}>
        <input id="checkOut" type="date" {...register("checkOut")} required />
        <label htmlFor="checkOut">Выезд</label>
      </div>

      <div className={styles.field}>
        <input id="guests" type="number" min={1} {...register("guests")} required />
        <label htmlFor="guests">Гости</label>
      </div>

      <button type="submit" className={styles.searchButton} disabled={loading}>
        {loading ? "Поиск..." : "Найти"}
      </button>
    </form>
  );
}
