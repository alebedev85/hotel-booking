"use client";

import styles from "./FormInput.module.scss";
import { UseFormRegister, FieldErrors, RegisterOptions, FieldError } from "react-hook-form";
import { IFormValues } from "@/types";

interface Props {
  name: keyof IFormValues;
  label: string;
  icon?: string; // Добавили иконку
  placeholder?: string;
  register: UseFormRegister<IFormValues>;
  errors: FieldErrors<IFormValues>;
  type?: string;
  autoComplete?: string;
  onFocus?: () => void;
  rules?: RegisterOptions<IFormValues>;
}

export default function FormInput({
  name,
  label,
  icon,
  placeholder,
  register,
  errors,
  type = "text",
  autoComplete = "off",
  onFocus,
  rules,
}: Props) {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className={`${styles.wrapper} ${error ? styles.hasError : ""}`}>
      <label className={styles.label} htmlFor={name}>{label}</label>
      
      <div className={styles.inputContainer}>
        {icon && <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>}
        <input
          className={styles.input}
          id={name}
          type={type}
          placeholder={placeholder}
          {...register(name, rules)}
          autoComplete={autoComplete}
          onFocus={onFocus}
        />
      </div>

      {error?.message && (
        <p className={styles.errorMessage}>{error.message}</p>
      )}
    </div>
  );
}