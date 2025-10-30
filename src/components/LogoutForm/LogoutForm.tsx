"use client";

import { useAppDispatch } from "@/store";
import { logoutUser } from "@/store/authSlice";
import styles from "./LogoutForm.module.scss";

interface LogoutFormProps {
  onClose: () => void;
}

export default function LogoutForm({ onClose }: LogoutFormProps) {
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
    <div className={styles.logout}>
      <button className={styles.logoutButton} onClick={handleLogout}>Выход</button>
    </div>
  );
}
