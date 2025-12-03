"use client";

import { useRestoreLastSearch } from "@/hooks/useRestoreLastSearch";

export default function RestoreLastSearchComponent() {
  useRestoreLastSearch();
  return null; // этот компонент ничего не рендерит
}
