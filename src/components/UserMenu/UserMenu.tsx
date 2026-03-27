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
      await dispatch(logoutUser()).unwrap();
      onClose();
    } catch (error) {
      console.error("Ошибка при выходе:", error);
    }
  };

  return (
    <aside className={styles.glassWrapper}>
      <div className={styles.header}>
        <div className={styles.userInfo}>
          <span className="material-symbols-outlined">account_circle</span>
          <span className={styles.email}>{user?.email?.split('@')[0]}</span>
        </div>
        <div className={styles.topActions}>
          <Link href="/settings" className={styles.iconLink} title="Settings">
            <span className="material-symbols-outlined">settings</span>
          </Link>
          <button onClick={handleLogout} className={styles.iconLink} title="Logout">
            <span className="material-symbols-outlined">logout</span>
          </button>
        </div>
      </div>

      <nav className={styles.nav}>
        <Link href="/bookings" className={styles.navLink}>
          <span className="material-symbols-outlined">hotel</span>
          Мои бронирования
        </Link>
        <Link href="/transfers" className={styles.navLink}>
          <span className="material-symbols-outlined">directions_car</span>
          Мои трансферы
        </Link>
        <Link href="/favorites" className={styles.navLink}>
          <span className="material-symbols-outlined">favorite</span>
          Мои избранные отели
        </Link>
      </nav>

      <section className={styles.points}>
        <div className={styles.pointsLabel}>
          <span className="material-symbols-outlined">stars</span>
          <p>Ваши баллы</p>
        </div>
        <span className={styles.count}>0</span>
      </section>
    </aside>
  );
}