"use client";

import RestoreLastPage from "@/components/RestoreLastPage/RestoreLastPage";
import SearchForm from "@/components/SearchForm/SearchForm";
import styles from "@/styles/Home.module.scss";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <RestoreLastPage />
      <h1 className={styles.title}>Поиск отелей</h1>
      <SearchForm />
    </main>
  );
}
