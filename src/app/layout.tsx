import RestoreLastPage from "@/components/RestoreLastPage/RestoreLastPage";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import "./globals.scss";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Hotel Booking",
  description: "Приложение для бронирования отелей",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <Providers>
        <RestoreLastPage />
        {children}
      </Providers>
    </html>
  );
}
