"use client";

import { useRestoreLastPage } from "@/hooks/useRestoreLastPage";

export default function RestoreLastPageComponent() {
  useRestoreLastPage();
  return null; // этот компонент ничего не рендерит
}
