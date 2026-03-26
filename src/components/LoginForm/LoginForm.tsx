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

  const onSubmit = async ({ email, password }: FormData) => {
    dispatch(clearError());
    try {
      if (isLoginMode) {
        await dispatch(loginUser({ email, password })).unwrap();
      } else {
        await dispatch(registerUser({ email, password })).unwrap();
      }
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.glassWrapper}>
      <form className={styles.loginForm} onSubmit={handleSubmit(onSubmit)}>
        <h3 className={styles.title}>{isLoginMode ? "Вход" : "Создать аккаунт"}</h3>
        
        <div className={styles.inputs}>
          <div className={styles.inputGroup}>
            <span className="material-symbols-outlined">mail</span>
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </div>
          
          <div className={styles.inputGroup}>
            <span className="material-symbols-outlined">lock</span>
            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </div>
        </div>

        {error && <p className={styles.errorText}>{error}</p>}

        <div className={styles.actions}>
          {loading ? (
            <Loader />
          ) : (
            <>
              <button type="submit" className={styles.submitBtn}>
                {isLoginMode ? "Войти" : "Зарегистрироваться"}
              </button>
              <button
                type="button"
                className={styles.switchBtn}
                onClick={() => setLoginMode(!isLoginMode)}
              >
                {isLoginMode ? "Создать аккаунт" : "Уже есть аккаунт?"}
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}