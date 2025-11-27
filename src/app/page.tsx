"use client";

import RestoreLastPage from "@/components/RestoreLastPage/RestoreLastPage";
import SearchForm from "@/components/SearchForm/SearchForm";
import styles from "@/styles/Home.module.scss";
import { Suspense } from "react";

export default function HomePage() {
  return (
    <main className={styles.container}>
      <Suspense fallback={<div>Redirecting...</div>}>
        {/* <RestoreLastPage /> */}
      </Suspense>
      <h1 className={styles.title}>Поиск отелей</h1>
      <SearchForm />
      <p className={styles.text}>Привет, браток! Поехали за бугорок?</p>
    </main>
  );
}
