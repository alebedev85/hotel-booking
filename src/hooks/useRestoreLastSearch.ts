"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAppSelector } from "@/store";
import { QUERY_PARAMS } from "@/constants/storageKeys";

/**
 * Хук восстанавливает последний поиск пользователя из Redux (через redux-persist).
 * Срабатывает только на страницах "/" и "/hotels".
 * Если есть skipRestore в sessionStorage → пропускаем восстановление.
 */
export function useRestoreLastSearch() {
  const router = useRouter();
  const pathname = usePathname();

  // Берем данные последнего поиска из Redux
  const lastSearch = useAppSelector((state) => state.search);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Проверка, чтобы хук работал только на "/" и "/hotels"
    if (pathname !== "/" && !pathname.startsWith("/hotels")) return;

    // Если есть skipRestore → пропускаем редирект и удаляем ключ
    if (sessionStorage.getItem("skipRestore")) {
      sessionStorage.removeItem("skipRestore");
      return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const hasParams =
      urlParams.get(QUERY_PARAMS.CITY_ID) &&
      urlParams.get(QUERY_PARAMS.CHECK_IN) &&
      urlParams.get(QUERY_PARAMS.CHECK_OUT) &&
      urlParams.get(QUERY_PARAMS.GUESTS);

    // Если параметры поиска уже есть в URL → не делаем редирект
    if (hasParams) return;

    // Если есть данные последнего поиска в Redux → редирект на /hotels
    if (lastSearch?.city_id && lastSearch?.checkIn && lastSearch?.checkOut && lastSearch?.guests) {
      router.replace(
        `/hotels?city_id=${lastSearch.city_id}&checkIn=${lastSearch.checkIn}&checkOut=${lastSearch.checkOut}&guests=${lastSearch.guests}`
      );
    }
  }, [router, pathname, lastSearch]);
}
