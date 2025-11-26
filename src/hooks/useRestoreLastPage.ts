"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  STORAGE_KEYS,
  QUERY_PARAMS,
} from "@/constants/storageKeys";

/**
 * Хук восстанавливает последний поиск пользователя.
 * Если есть skipRestore в sessionStorage → пропускаем восстановление.
 */
export function useRestoreLastPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Проверка выполнения только в браузере
    if (typeof window === "undefined") return;

    // Если есть skipRestore → удаляем и не делаем редирект
    if (localStorage.getItem("skipRestore")) {
      console.log("skipRestore")
      localStorage.removeItem("skipRestore");
      return;
    }

    const city_id = searchParams.get(QUERY_PARAMS.CITY_ID);
    const checkIn = searchParams.get(QUERY_PARAMS.CHECK_IN);
    const checkOut = searchParams.get(QUERY_PARAMS.CHECK_OUT);
    const guests = searchParams.get(QUERY_PARAMS.GUESTS);

    // Если параметры поиска есть в URL → остаёмся
    if (city_id && checkIn && checkOut && guests) return;

    // Берём данные из localStorage
    const lastSearch = localStorage.getItem(STORAGE_KEYS.LAST_SEARCH);

    if (lastSearch) {
      const { city_id, checkIn, checkOut, guests } = JSON.parse(lastSearch);

      router.replace(
        `/hotels?city_id=${city_id}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
    } else {
      router.replace("/");
    }
  }, [router, searchParams, pathname]);
}
