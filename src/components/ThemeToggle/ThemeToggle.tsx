"use client";

import { RootState } from "@/store";
import { toggleTheme } from "@/store/themeSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./ThemeToggle.module.scss";

export function ThemeToggle() {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.theme.theme);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <button
      className={styles.themeToggle}
      onClick={() => dispatch(toggleTheme())}
    >
      {theme === "light" ? "🌙" : "🌞"}
    </button>
  );
}
