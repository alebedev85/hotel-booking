"use client";

import { ru } from "date-fns/locale/ru";
import DatePicker, { registerLocale } from "react-datepicker";
import { Control, Controller } from "react-hook-form";
import styles from "./FormDatePicker.module.scss";

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
  minDate = new Date(),
  required,
}: FormDatePickerProps) {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ required }}
      render={({ field, fieldState: { error } }) => (
        /* Добавляем обертку wrapper и класс ошибки, как в FormInput */
        <div className={`${styles.wrapper} ${error ? styles.hasError : ""}`}>
          <label htmlFor={name} className={styles.label}>
            {label}
          </label>
          
          <div className={styles.inputWrapper}>
            <span className={`material-symbols-outlined ${styles.icon}`}>{icon}</span>
            <div className={styles.pickerContainer}>
              <DatePicker
                id={name}
                selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => field.onChange(date)}
                placeholderText={placeholder}
                minDate={minDate}
                dateFormat="dd.MM.yyyy"
                locale="ru"
                className={styles.input}
                autoComplete="off"
                openToDate={field.value ? new Date(field.value) : new Date()}
              />
            </div>
          </div>

          {/* Абсолютно позиционированная ошибка внизу контейнера */}
          {error?.message && (
            <p className={styles.errorMessage}>{error.message as string}</p>
          )}
        </div>
      )}
    />
  );
}