"use client";

import SearchForm from "@/components/SearchForm/SearchForm";
import Image from "next/image";
// import TrendingDestinations from "@/components/TrendingDestinations/TrendingDestinations";
// import EditorialChoice from "@/components/EditorialChoice/EditorialChoice";
import styles from "@/styles/Home.module.scss";

export default function HomePage() {
  return (
    <main className={styles.container}>
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="/home-page-img.jpg"
            alt="Luxury destination"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.overlay}></div>
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.title}>Привет, браток! Покатили за бугорок?</h1>
        </div>

        <div className={styles.searchWrapper}>
          <SearchForm />
        </div>
      </section>

      {/* НОВЫЕ СЕКЦИИ 
      <TrendingDestinations />
      <EditorialChoice /> */}
    </main>
  );
}
