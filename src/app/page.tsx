"use client";

import EditorialChoice from "@/app/_components/EditorialChoice/EditorialChoice";
import TrendingDestinations from "@/app/_components/TrendingDestinations/TrendingDestinations";
import HeroSection from "./_components/HeroSection/HeroSection";
import styles from "./Home.module.scss";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <HeroSection />
      <TrendingDestinations />
      <EditorialChoice />
    </main>
  );
}
