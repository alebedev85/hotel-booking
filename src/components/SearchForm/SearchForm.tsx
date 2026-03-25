"use client";

import CityDropdown from "@/components/ui/CityDropdown/CityDropdown";
import FormInput from "@/components/ui/FormInput/FormInput";
import { useSearchForm } from "@/hooks/useSearchForm";
import { useEffect, useRef } from "react";
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
    onSubmit,
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

        {/* ДАТЫ */}
        <FormInput
          name="checkIn"
          type="text" // Используем текст для стилизации как в макете, или date
          label="Check-in"
          icon="calendar_month"
          placeholder="Укажите дату"
          register={register}
          errors={errors}
          rules={{ required: "Дата заезда" }}
        />

        <FormInput
          name="checkOut"
          type="text"
          label="Check-out"
          icon="calendar_month"
          placeholder="Укажите дату"
          register={register}
          errors={errors}
          rules={{ required: "Дата выезда" }}
        />

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
