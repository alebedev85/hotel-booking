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
          {/* <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcbkN8JhCFGpsIx4jzD6n-tqKpwZf_2kGHjNmDJf7cXCwHhAztVoF3y4sgTJDu3dC3ny_3h9IrBaB8RJ5l2kDnzVdXjH2dWPSEam2selu8_wBek9g97i1zRZ9vrps_0DZMZeSRQWluCPlyxb-xmGQVqaRNHsf02Mr8lR8SGmZmo6QHey4GVzeTSo5jHvL9kDQceCAVwZrPFANAeYHTmtbXnAJ7F_F1vCTq5PC_GYjIzXMpO4jQAHxmLIhpRhkaP_OEbj6sa5COfzc" alt="Luxury destination" /> */}
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
          {/* <p className={styles.subtitle}>
            The world’s most intentional travel experiences, hand-picked for the discerning wanderer.
          </p> */}
        </div>

        {/* Твоя логика поиска внутри нового дизайна */}
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
