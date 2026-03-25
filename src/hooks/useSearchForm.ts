"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCoordinates, setField } from "@/store/searchSlice";
import { ICity, IFormValues } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

export function useSearchForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Реф для хранения таймера дебаунса
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  // Получаем данные из Redux
  const { loading, city_id, city_name, checkIn, checkOut, guests } =
    useAppSelector((state) => state.search);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control, // Необходим для FormDatePicker
    clearErrors, // Для фикса красной ошибки при выборе города
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      city_name: city_name || "",
      city_id: city_id || 0,
      // DatePicker ожидает объект Date или null
      checkIn: checkIn ? new Date(checkIn) : null,
      checkOut: checkOut ? new Date(checkOut) : null,
      guests: guests || 2,
    },
  });

  const [cities, setCities] = useState<ICity[]>([]);
  const [showList, setShowList] = useState(false);

  // Следим за значениями для логики автокомплита и валидации
  const query = watch("city_name");
  const selectedCityId = watch("city_id");
  const checkInDate = watch("checkIn");

  /**
   * Автозагрузка городов с дебаунсом 300мс
   */
  useEffect(() => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    if (!query || query.length < 2) {
      setCities([]);
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/cities?query=${encodeURIComponent(query)}`,
        );
        if (res.ok) {
          const data = await res.json();
          setCities(data);
        }
      } catch (err) {
        console.error("Failed to fetch cities:", err);
      }
    }, 300);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query]);

  /**
   * Выбор города: исправляем порядок и чистим ошибки
   */
  const selectCity = (city: ICity) => {
    // 1. Сначала обновляем ID
    setValue("city_id", city.id, { shouldValidate: true });
    // 2. Обновляем имя
    setValue("city_name", city.name_ru, { shouldValidate: true });
    // 3. Принудительно чистим ошибку, возникшую из-за потери фокуса
    clearErrors("city_name");

    setCities([]);
    setShowList(false);
  };

  /**
   * Сабмит: форматируем даты перед сохранением
   */
  const onSubmit = async (data: IFormValues) => {
    // Превращаем Date объекты в ISO строки для Redux/API
    const isoCheckIn =
      data.checkIn instanceof Date
        ? data.checkIn.toISOString()
        : data.checkIn || "";
    const isoCheckOut =
      data.checkOut instanceof Date
        ? data.checkOut.toISOString()
        : data.checkOut || "";

    // Обновляем Redux
    dispatch(setField({ field: "checkIn", value: isoCheckIn }));
    dispatch(setField({ field: "checkOut", value: isoCheckOut }));
    dispatch(setField({ field: "guests", value: data.guests }));
    dispatch(setField({ field: "city_id", value: data.city_id }));
    dispatch(setField({ field: "city_name", value: data.city_name }));

    // Координаты
    await dispatch(fetchCoordinates(data.city_name));

    // Формируем query-параметры для URL
    const params = new URLSearchParams({
      city_id: String(data.city_id),
      checkIn: isoCheckIn,
      checkOut: isoCheckOut || "",
      guests: String(data.guests),
    });

    router.push(`/hotels?${params.toString()}`);
  };

  return {
    // RHF
    register,
    control,
    handleSubmit,
    errors,
    watch,
    // Состояние городов
    cities,
    showList,
    setShowList,
    selectCity,
    // Данные для UI
    loading,
    selectedCityId,
    checkInDate, // Чтобы ограничить minDate во втором календаре
    onSubmit,
  };
}
