"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import LoginForm from "../LoginForm/LoginForm";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Эффект, который следит за кликами вне меню
  useEffect(() => {
    // Функция-обработчик кликов по документу
    const handleClickOutside = (event: MouseEvent) => {
      // Если клик произошёл вне области меню — закрываем его
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    // Если меню открыто — подписываемся на событие клика по документу
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Если меню закрыто — убираем слушатель (чтобы не было утечки)
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Очистка при размонтировании или смене состояния
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]); // Эффект зависит от состояния menuOpen
  return (
    <header className={styles.header}>
      <Link
        href="/"
        className={styles.logo}
        onClick={() => localStorage.setItem("skipRestore", "true")}
      >
        Бугорок!
      </Link>

      <div className={styles.actions} ref={menuRef}>
        <ThemeToggle />
        <button
          className={styles.loginButton}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <FaUserCircle />
        </button>
        {menuOpen && (
          <div className={styles.dropdownMenu}>
            <LoginForm onClose={() => setMenuOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}
