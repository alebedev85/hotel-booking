"use client";

import CityDropdown from "@/components/ui/CityDropdown/CityDropdown";
import FormInput from "@/components/ui/FormInput/FormInput";
import { useSearchForm } from "@/hooks/useSearchForm";
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

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* ГОРОД */}
      <div className={styles.cityFiled}>
        <FormInput
          name="city_name"
          label="Направление"
          register={register}
          errors={errors}
          rules={{
            required: "Введите город",
            validate: () => selectedCityId > 0 || "Выберите город из списка",
          }}
          onFocus={() => setShowList(true)}
        />

        <input type="hidden" {...register("city_id")} />

        <CityDropdown cities={cities} show={showList} onSelect={selectCity} />
      </div>

      {/* Даты */}
      <FormInput
        name="checkIn"
        type="date"
        label="Заезд"
        register={register}
        errors={errors}
        rules={{
          required: "Выберите дату заезда",
        }}
      />

      <FormInput
        name="checkOut"
        type="date"
        label="Выезд"
        register={register}
        errors={errors}
        rules={{
          required: "Выберите дату выезда",
        }}
      />

      {/* Гости */}
      <FormInput
        name="guests"
        type="number"
        label="Гости"
        register={register}
        errors={errors}
        rules={{
          required: "Укажите количество гостей",
          min: { value: 1, message: "Минимум 1 гость" },
        }}
      />

      <button type="submit" className={styles.searchButton} disabled={loading}>
        {loading ? "Поиск..." : "Найти"}
      </button>
    </form>
  );
}
