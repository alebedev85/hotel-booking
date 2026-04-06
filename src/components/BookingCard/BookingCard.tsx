import { clsx } from "clsx";
import styles from "./BookingCard.module.scss";

interface BookingCardProps {
  price: number;
  currency: string;
}

export default function BookingCard({ price, currency }: BookingCardProps) {
  return (
    <aside className={styles.wrapper}>
      {/* Секция цены */}
      <div className={styles.header}>
        <span className={styles.price}>{currency}{price}</span>
        <span className={styles.period}>/ ночь</span>
      </div>

      {/* Форма выбора */}
      <div className={styles.form}>
        {/* Даты заезда/выезда */}
        <div className={styles.fieldGroup} role="button">
          <div className={styles.column}>
            <span className={styles.label}>Заезд</span>
            <span className={styles.value}>12 Окт 2026</span>
          </div>
          <div className={styles.divider} />
          <div className={styles.column}>
            <span className={styles.label}>Выезд</span>
            <span className={styles.value}>15 Окт 2026</span>
          </div>
        </div>

        {/* Гости */}
        <div className={clsx(styles.fieldGroup, styles.clickable)} role="button">
          <div className={styles.column}>
            <span className={styles.label}>Гости</span>
            <span className={styles.value}>2 Взрослых, 1 Номер</span>
          </div>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
      </div>

      {/* Кнопка действия */}
      <button className={styles.submitBtn}>
        Проверить наличие
      </button>

      <p className={styles.footerHint}>
        Оплата при заезде возможна для стандартных тарифов.
      </p>
    </aside>
  );
}