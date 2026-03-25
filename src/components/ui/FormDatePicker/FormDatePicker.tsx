"use client";

import { ru } from "date-fns/locale/ru"; // Для русского языка
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Control, Controller } from "react-hook-form";
import styles from "./FormDatePicker.module.scss";

// Регистрируем локализацию
registerLocale("ru", ru);

interface FormDatePickerProps {
  name: string;
  label: string;
  icon: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  placeholder: string;
  minDate?: Date;
  required?: string;
}

export default function FormDatePicker({
  name,
  label,
  icon,
  control,
  placeholder,
  minDate = new Date(), // По умолчанию сегодня
  required,
}: FormDatePickerProps) {
  return (
    <div className={styles.field}>
      <label className={styles.label}>{label}</label>
      <div className={styles.inputWrapper}>
        <span className="material-symbols-outlined">{icon}</span>
        <Controller
          name={name}
          control={control}
          rules={{ required }}
          render={({ field, fieldState: { error } }) => (
            <div className={styles.pickerContainer}>
              <DatePicker
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText={placeholder}
                minDate={minDate}
                dateFormat="dd.MM.yyyy"
                locale="ru"
                className={`${styles.input} ${error ? styles.error : ""}`}
                autoComplete="off"
                openToDate={field.value ? new Date(field.value) : new Date()}
              />
              {error && (
                <span className={styles.errorMessage}>
                  {error.message as string}
                </span>
              )}
            </div>
          )}
        />
      </div>
    </div>
  );
}
