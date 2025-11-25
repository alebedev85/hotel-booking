"use client";

import { useAppDispatch, useAppSelector } from "@/store";
import { logoutUser } from "@/store/authSlice";
import Link from "next/link";
import styles from "./UserMenu.module.scss";

interface LogoutFormProps {
  onClose: () => void;
}

export default function UserMenu({ onClose }: LogoutFormProps) {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      // Вызываем logout thunk — он делает POST /api/auth/logout
      await dispatch(logoutUser()).unwrap();

      // Закрываем меню (например, модальное окно)
      onClose();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };
  return (
    <aside className={styles.menu}>
      <div className={styles.header}>
        <span className={styles.email}>{user?.email}</span>
        <div className={styles.actions}>
          <Link href="/settings">Настройки</Link>
          <button onClick={handleLogout}>Выход</button>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/bookings">Мои бронирования</Link>
        <Link href="/transfers">Мои трансферы</Link>
        <Link href="/favorites">Мои избранные отели</Link>
      </nav>

      <section className={styles.points}>
        <p>Ваши баллы</p>
        <span className={styles.count}>0 ⭐</span>
      </section>
    </aside>
  );
}
