import AuthChecker from "@/components/AuthChecker/AuthChecker";
import Header from "@/components/Header/Header";
import RestoreLastSearchComponent from "@/components/RestoreLastSearchComponent/useRestoreLastSearch";
import Footer from "@/components/Footer/Footer";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import "@/styles/globals.scss";
import "material-symbols";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import { Suspense } from "react";
import { Providers } from "./providers";
import NextTopLoader from "nextjs-toploader";

export const metadata: Metadata = {
  title: "Бугорок!",
  description: "Приложение для бронирования отелей",
};

// Настраиваем Inter
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "600", "800"],
  variable: "--font-inter", // создаем CSS-переменную
});

// Настраиваем Playfair Display
const playfair = Playfair_Display({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "700"],
  variable: "--font-playfair",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${inter.variable} ${playfair.variable}`}>
      <head />
      <body suppressHydrationWarning={true}>
      <NextTopLoader 
          color="var(--color-primary)"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Providers>
          <AuthChecker />
          <Suspense fallback={<div>Redirecting...</div>}>
            <RestoreLastSearchComponent />
          </Suspense>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
