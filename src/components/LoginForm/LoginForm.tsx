"use client";

import { AppDispatch, RootState } from "@/store";
import { clearError, loginUser, registerUser } from "@/store/authSlice";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader/Loader";
import styles from "./LoginForm.module.scss";

interface FormData {
  email: string;
  password: string;
}

interface AuthLoginForm {
  onClose: () => void;
}

export default function LoginForm({ onClose }: AuthLoginForm) {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, authenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoginMode, setLoginMode] = useState(true);
  const [message, setMessage] = useState(""); // сообщение
  const [messageType, setMessageType] = useState<"success" | "error">(
    "success"
  );

  useEffect(() => {
    if (authenticated) {
      setMessage(isLoginMode ? "Вы вошли!" : "Регистрация успешна!");
      setMessageType("success");
    } else if (error) {
      setMessage(error);
      setMessageType("error");
    }
  }, [authenticated, error, isLoginMode]);

  const onSubmit = async ({ email, password }: FormData) => {
    setMessage("");
    dispatch(clearError());

    try {
      if (isLoginMode) {
        // Логин
        await dispatch(loginUser({ email, password })).unwrap();
      } else {
        // Регистрация
        await dispatch(registerUser({ email, password })).unwrap();
      }
      //При необходимости закрыть форму:
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setMessage(err.message || "Ошибка");
      setMessageType("error");
    }
  };

  const handleToggle = () => {
    setLoginMode(!isLoginMode);
    setMessage("");
    dispatch(clearError());
  };

  return (
    <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.inputs}>
        <input
          id="email"
          type="email"
          placeholder="Почта"
          {...register("email", {
            required: "Email обязателен",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Введите корректный email",
            },
          })}
        />
        <input
          id="password"
          type="password"
          placeholder="Пароль"
          {...register("password", {
            required: "Пароль обязателен",
            minLength: {
              value: 6,
              message: "Пароль должен содержать минимум 6 символа",
            },
          })}
        />
      </div>

      {/* Сообщение об успехе или ошибке */}
      {message && (
        <p
          className={messageType === "success" ? styles.success : styles.error}
        >
          {message}
        </p>
      )}

      {loading ? (
        <Loader />
      ) : (
        <div className={styles.actions}>
          <button className={styles.loginButton}>
            {isLoginMode ? "Войти" : "Зарегистрироваться"}
          </button>
          <button
            type="button"
            className={styles.modeButton}
            onClick={handleToggle}
          >
            {isLoginMode ? "Зарегистрироваться" : "Войти"}
          </button>
        </div>
      )}
    </form>
  );
}
