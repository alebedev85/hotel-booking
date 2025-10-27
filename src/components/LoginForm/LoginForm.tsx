import { useState } from "react";
import { useForm } from "react-hook-form";
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
  } = useForm<{ email: string; password: string }>();

  const [isLoginMode, setLoginMode] = useState(true);

  // const dispatch = useDispatch();
  // const { isLoading } = useSelector((state: RootState) => state.auth);
  // const [error, setError] = useState<string | null>(null);

  const onSubmit = async ({ email, password }: FormData) => {
    console.log(email, password);
    onClose();
  };

  return (
    <form
      // autoComplete="off"
      className={styles.loginForm}
      onSubmit={handleSubmit(onSubmit)}
    >
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
        {/* {error && <p className={styles.error}>Ошибка: {error}</p>} */}
      </div>
      <div className={styles.actions}>
        <button className={styles.loginButton}>
          {!isLoginMode ? "Зарегистрироваться" : "Войти"}
        </button>
        <button
          type="button"
          className={styles.modeButton}
          onClick={() => setLoginMode(!isLoginMode)}
        >
          {isLoginMode ? "Зарегистрироваться" : "Войти"}
        </button>
      </div>
    </form>
  );
}
