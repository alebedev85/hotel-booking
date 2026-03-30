import styles from "./Footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brandSection}>
          <div className={styles.logo}>Бугорок!</div>
          <p className={styles.tagline}>
            Искусство путешествий без сучка и задоринки.
          </p>
        </div>

        <div className={styles.linksGrid}>
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Компания</h4>
            <nav className={styles.nav}>
              <a href="#">О проекте</a>
              <a href="#">Связаться с нами</a>
              <a href="#">Направления</a>
            </nav>
          </div>
          
          <div className={styles.column}>
            <h4 className={styles.columnTitle}>Юридическая информация</h4>
            <nav className={styles.nav}>
              <a href="#">Политика конфиденциальности</a>
              <a href="#">Условия использования</a>
              <a href="#">Cookies</a>
            </nav>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <div className={styles.bottomContainer}>
          <span className={styles.copyright}>
            © {currentYear} Бугорок! Все права защищены.
          </span>
          <div className={styles.socials}>
            <span className="material-symbols-outlined">language</span>
            <span className="material-symbols-outlined">public</span>
          </div>
        </div>
      </div>
    </footer>
  );
}