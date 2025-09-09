// app/layout.tsx
import { useRestoreLastPage } from "@/hooks/useRestoreLastPage";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Приложение для бронирования отелей",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useRestoreLastPage();
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
