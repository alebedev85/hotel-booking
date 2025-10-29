import { useState } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const [isLoginMode, setLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(""); // текст сообщения
  const [messageType, setMessageType] = useState<"success" | "error">("success"); // тип сообщения

  const onSubmit = async ({ email, password }: FormData) => {
    setIsLoading(true);
    setMessage(""); // сброс предыдущего сообщения

    const url = isLoginMode ? "/api/auth/login" : "/api/auth/register";

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Ошибка");
        setMessageType("error");
      } else {
        setMessage(isLoginMode ? "Вы вошли!" : "Регистрация успешна!");
        setMessageType("success");
        // Если нужно закрывать форму сразу после успеха, раскомментировать:
        // onClose();
      }
    } catch (err) {
      setMessage("Ошибка сервера");
      setMessageType("error");
    }

    setIsLoading(false);
  };

  const handleToggle = () => {
    setLoginMode(!isLoginMode)
    setMessage(""); // сброс сообщения при закрытии
   
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

      {/* Сообщение о результате запроса */}
      {message && (
        <p
          className={messageType === "success" ? styles.success : styles.error}
        >
          {message}
        </p>
      )}

      {isLoading ? (
        <Loader />
      ) : (
        <div className={styles.actions}>
          <button className={styles.loginButton}>
            {!isLoginMode ? "Зарегистрироваться" : "Войти"}
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
