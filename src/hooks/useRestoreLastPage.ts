"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useRestoreLastPage() {
  const router = useRouter();

  useEffect(() => {
    const lastPage = localStorage.getItem("lastPage");
    if (lastPage === "/hotels") {
      const lastSearch = localStorage.getItem("lastSearch");
      if (lastSearch) {
        const { location, checkIn, checkOut, guests } = JSON.parse(lastSearch);

        router.replace(
          `/hotels?location=${encodeURIComponent(
            location
          )}&checkIn=${checkIn}&checkOut=${checkOut}&guests=${guests}`
        );
      }
    }
  }, [router]);
}
