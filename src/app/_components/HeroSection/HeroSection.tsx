import Image from "next/image";

import SearchForm from "@/components/SearchForm/SearchForm";
import styles from "./HeroSection.module.scss";

export default function HeroSection() {
  return (
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
  );
}
