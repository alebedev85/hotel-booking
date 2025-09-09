"use client";

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

  const location = searchParams.get("location");
  const checkIn = searchParams.get("checkIn");
  const checkOut = searchParams.get("checkOut");
  const guests = searchParams.get("guests");

  if (location && checkIn && checkOut && guests) return;

  let lastSearch;
  try {
    lastSearch = localStorage.getItem("lastSearch");
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
