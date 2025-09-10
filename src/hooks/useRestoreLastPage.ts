"use client";

import { QUERY_PARAMS, STORAGE_KEYS } from "@/constants/storageKeys";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

/**
 * Восстанавливает последнюю страницу поиска или защищает /hotels
 * от прямого захода без параметров поиска.
 */
export function useRestoreLastPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!searchParams) return;

    const location = searchParams.get(QUERY_PARAMS.LOCATION);
    const checkIn = searchParams.get(QUERY_PARAMS.CHECK_IN);
    const checkOut = searchParams.get(QUERY_PARAMS.CHECK_OUT);
    const guests = searchParams.get(QUERY_PARAMS.GUESTS);

    if (location && checkIn && checkOut && guests) return;

    let lastSearch;
    try {
      lastSearch = localStorage.getItem(STORAGE_KEYS.LAST_SEARCH);
    } catch {
      lastSearch = null;
    }

    if (lastSearch) {
      const { location, checkIn, checkOut, guests } = JSON.parse(lastSearch);
      router.replace(
        `/hotels?location=${encodeURIComponent(
          location
        )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
      );
    } else {
      router.replace("/");
    }
  }, [router, searchParams]);
}
