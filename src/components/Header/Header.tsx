"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import { useAppDispatch, useAppSelector } from "@/store";
import { resetSearch } from "@/store/searchSlice";
import Link from "next/link";
import { useRef, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import UserMenu from "../UserMenu/UserMenu";
import styles from "./Header.module.scss";

export default function Header() {
  const dispatch = useAppDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, authenticated } = useAppSelector((state) => state.auth);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {/* ЛОГОТИП */}
        <Link
          href="/"
          className={styles.logo}
          onClick={() => dispatch(resetSearch())}
        >
          Бугорок!
        </Link>

        {/* ЦЕНТРАЛЬНАЯ НАВИГАЦИЯ */}
        <div className={styles.navLinks}>
          <Link href="#" className={styles.link}>
            Мои бронирования
          </Link>
          <Link href="#" className={styles.link}>
            Язык
          </Link>
          <Link href="#" className={styles.link}>
            Валюта
          </Link>
        </div>

        {/* ПРАВАЯ ЧАСТЬ */}
        <div className={styles.actions} ref={menuRef}>
          <ThemeToggle />

          <button
            className={styles.loginButton}
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {authenticated ? user?.email?.split("@")[0] : "Вход"}
          </button>

          {menuOpen && (
            <div className={styles.dropdownMenu}>
              {authenticated ? (
                <UserMenu onClose={() => setMenuOpen(false)} />
              ) : (
                <LoginForm onClose={() => setMenuOpen(false)} />
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
