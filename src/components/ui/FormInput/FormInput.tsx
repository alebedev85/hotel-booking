"use client";

import styles from "./FormInput.module.scss";
import {
  UseFormRegister,
  FieldErrors,
  RegisterOptions,
  FieldError,
} from "react-hook-form";
import { IFormValues } from "@/types";

interface Props {
  name: keyof IFormValues;
  label: string;
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
  register,
  errors,
  type = "text",
  autoComplete = "off",
  onFocus,
  rules,
}: Props) {
  const error = errors[name] as FieldError | undefined;

  return (
    <div className={styles.wrapper}>
      <input
        id={name}
        type={type}
        {...register(name, rules)}
        autoComplete={autoComplete}
        onFocus={onFocus}
      />
      <label htmlFor={name}>{label}</label>

      {error?.message && (
        <p className={styles.error}>{error.message}</p>
      )}
    </div>
  );
}
