import AuthChecker from "@/components/AuthChecker/AuthChecker";
import Header from "@/components/Header/Header";
import RestoreLastPage from "@/components/RestoreLastPage/RestoreLastPage";
import "@/styles/globals.scss";
import "leaflet/dist/leaflet.css";
import type { Metadata } from "next";
import { Suspense } from "react";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Бугорок!",
  description: "Приложение для бронирования отелей",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head />
      <body>
        <Providers>
          <AuthChecker />
          <Suspense fallback={<div>Redirecting...</div>}>
            <RestoreLastPage />
          </Suspense>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  );
}
