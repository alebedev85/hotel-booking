"use client";

import CityDropdown from "@/components/ui/CityDropdown/CityDropdown";
import FormInput from "@/components/ui/FormInput/FormInput";
import { useSearchForm } from "@/hooks/useSearchForm";
import { useEffect, useRef } from "react";
import FormDatePicker from "../ui/FormDatePicker/FormDatePicker";
import styles from "./SearchForm.module.scss";

export default function SearchForm() {
  const {
    register,
    handleSubmit,
    errors,
    showList,
    setShowList,
    cities,
    selectCity,
    loading,
    selectedCityId,
    control,
    onSubmit,
    watch,
  } = useSearchForm();

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (formRef.current && !formRef.current.contains(event.target as Node)) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShowList]);

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className={styles.grid}>
        {/* ГОРОД */}
        <div className={styles.fieldWithDropdown}>
          <FormInput
            name="city_name"
            label="Destination"
            icon="location_on"
            placeholder="Куда поедем?"
            register={register}
            errors={errors}
            rules={{
              required: "Введите город",
              validate: () => selectedCityId > 0 || "Выберите город из списка",
            }}
            onFocus={() => setShowList(true)}
          />
          <input type="hidden" {...register("city_id")} />
          <CityDropdown
            cities={cities}
            setShow={setShowList}
            show={showList}
            onSelect={selectCity}
          />
        </div>

        {/* Дата заезда */}
        <div className={styles.lastField}>
          <FormDatePicker
            name="checkIn"
            label="Check-in"
            icon="calendar_month"
            placeholder="Когда заезд?"
            control={control}
            required="Выберите дату заезда"
          />
        </div>

        {/* Дата выезда */}
        <div className={styles.lastField}>
          <FormDatePicker
            name="checkOut"
            label="Check-out"
            icon="calendar_month"
            placeholder="Когда выезд?"
            control={control}
            minDate={
              watch("checkIn") && watch("checkIn") !== null
                ? new Date(watch("checkIn")!)
                : new Date()
            }
            required="Выберите дату выезда"
          />
        </div>

        {/* ГОСТИ + КНОПКА */}
        <div className={styles.lastField}>
          <FormInput
            name="guests"
            type="text"
            label="Guests"
            icon="person"
            placeholder="Количество гостей"
            register={register}
            errors={errors}
            rules={{ required: "Кол-во гостей" }}
          />

          <button
            type="submit"
            className={styles.searchButton}
            disabled={loading}
          >
            <span className="material-symbols-outlined">
              {loading ? "sync" : "search"}
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
