"use client";

import RestoreLastPageComponent from "@/components/RestoreLastPage/RestoreLastPage";
import SearchForm from "@/components/SearchForm/SearchForm";
import styles from "@/styles/Home.module.scss";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <RestoreLastPageComponent />
      <h1 className={styles.title}>Поиск отелей</h1>
      <SearchForm />
    </main>
  );
}
