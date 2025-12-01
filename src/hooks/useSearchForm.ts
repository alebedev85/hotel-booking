"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ICity } from "@/types";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCoordinates, setField } from "@/store/searchSlice";
import { useRouter } from "next/navigation";
import { IFormValues } from "@/types";

/**
 * Хук инкапсулирует всю логику формы поиска:
 *  - управление RHF (react-hook-form)
 *  - автокомплит городов
 *  - валидацию выбранного города
 *  - обновление Redux полей
 *  - редирект на страницу с отелями
 */
export function useSearchForm() {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Получаем текущие значения из Redux,
  // чтобы подставить их в defaultValues (восстановление состояния)
  const { loading, city_id, city_name, checkIn, checkOut, guests } =
    useAppSelector((state) => state.search);

  /**
   * Инициализация формы.
   * RHF берёт данные из Redux как стартовые —
   * позволяет сохранять введённые поля при возврате на форму.
   */
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: {
      city_name: city_name || "",
      city_id: city_id || 0,
      checkIn,
      checkOut,
      guests,
    },
  });

  /** Состояние списка городов для автокомплита */
  const [cities, setCities] = useState<ICity[]>([]);

  /** Флаг отображения выпадающего списка */
  const [showList, setShowList] = useState(false);

  /** Отслеживаем ввод города */
  const query = watch("city_name");

  /** Id выбранного города — для валидации */
  const selectedCityId = watch("city_id");

  /**
   * Автозагрузка городов при вводе
   * Срабатывает, когда пользователь вводит хотя бы 2 символа
   */
  useEffect(() => {
    const load = async () => {
      // Если введено меньше 2 символов — скрываем список
      if (!query || query.length < 2) {
        setCities([]);
        return;
      }

      // Запрашиваем подходящие города с сервера
      const res = await fetch(`/api/cities?query=${query}`);
      const data = await res.json();
      setCities(data);
    };

    load();
  }, [query]);

  /**
   * Выбор города из списка:
   *  - заполняем поля city_name и city_id
   *  - скрываем список
   *  - запускаем валидацию через RHF
   */
  const selectCity = (city: ICity) => {
    setValue("city_name", city.name_ru, { shouldValidate: true });
    setValue("city_id", city.id, { shouldValidate: true });
    setCities([]);
    setShowList(false);
  };

  /**
   * Сабмит формы:
   *  1. Записываем данные в Redux
   *  2. Фетчим координаты города (асинхронно)
   *  3. Обновляем дополнительные поля
   *  4. Перенаправляем на страницу отелей с параметрами
   */
  const onSubmit = async (data: IFormValues) => {
    // Обновляем даты и гостей
    dispatch(setField({ field: "checkIn", value: data.checkIn }));
    dispatch(setField({ field: "checkOut", value: data.checkOut }));
    dispatch(setField({ field: "guests", value: data.guests }));

    // Получаем координаты выбранного города
    await dispatch(fetchCoordinates(data.city_name));

    // Сохраняем id и название в Redux
    dispatch(setField({ field: "city_id", value: data.city_id }));
    dispatch(setField({ field: "city_name", value: data.city_name }));

    // Редирект с параметрами
    router.push(
      `/hotels?city_id=${data.city_id}&checkIn=${data.checkIn}&checkOut=${data.checkOut}&guests=${data.guests}`
    );
  };

  /**
   * Возвращаем наружу только то, что требуется форме.
   * Лишняя логика и состояние остаётся инкапсулировано в хуке.
   */
  return {
    register,
    handleSubmit,
    errors,
    showList,
    setShowList,
    cities,
    selectCity,
    loading,
    selectedCityId,
    onSubmit,
  };
}
