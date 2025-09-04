// app/layout.tsx
import type { Metadata } from "next";
import "./globals.scss";
import "leaflet/dist/leaflet.css";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Приложение для бронирования отелей",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
