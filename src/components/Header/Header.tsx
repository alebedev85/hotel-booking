"use client";

import Link from "next/link";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
        onClick={() => localStorage.setItem("skipRestore", "true")}
      >
        Бугорок!
      </Link>

      <div className={styles.actions}>
        <ThemeToggle />
        <Link href="/login" className={styles.loginButton}>
          Войти
        </Link>
      </div>
    </header>
  );
}
