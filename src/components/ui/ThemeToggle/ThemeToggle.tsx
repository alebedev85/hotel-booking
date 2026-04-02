"use client";

import { RootState } from "@/store";
import { toggleTheme } from "@/store/themeSlice";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ThemeToggle.module.scss";

export function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Заглушка, чтобы верстка не прыгала при гидратации
  if (!mounted) return <div className={styles.placeholder} />;

  return (
    <button
      className={styles.themeToggle}
      onClick={() => dispatch(toggleTheme())}
      aria-label="Toggle theme"
    >
      <span 
        key={theme} 
        className={`material-symbols-outlined ${styles.icon}`}
      >
        {theme === "light" ? "dark_mode" : "light_mode"}
      </span>
    </button>
  );
}
