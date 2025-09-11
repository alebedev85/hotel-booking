"use client";

import Link from "next/link";
import styles from "./Header.module.scss";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";

export default function Header() {
  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo}>
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