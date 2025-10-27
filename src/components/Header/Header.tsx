"use client";

import { useClickOutside } from "@/hooks/useClickOutside";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import LoginForm from "../LoginForm/LoginForm";
import { ThemeToggle } from "../ThemeToggle/ThemeToggle";
import styles from "./Header.module.scss";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setMenuOpen(false), menuOpen);

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
