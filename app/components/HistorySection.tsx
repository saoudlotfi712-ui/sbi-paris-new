import { useTranslations } from "next-intl";
import styles from "./HistorySection.module.css";

export default function HistorySection() {
  const t = useTranslations("history");

  return (
    <section className={styles.history}>
      <div className={styles.container}>
        <div className={styles.image}>
          <img
            src="/store.jpg"
            alt={t("imageAlt")}
          />
        </div>

        <div className={styles.content}>
          <span className={styles.subtitle}>
            {t("subtitle")}
          </span>

          <h3 className={styles.year}>1994</h3>

          <h2 className={styles.title}>
            SBI PARIS
          </h2>

          <p className={styles.text}>
            {t("description")}
          </p>

          <div className={styles.stats}>
            <div>
              <h4>150+</h4>
              <span>{t("stats.collections")}</span>
            </div>

            <div>
              <h4>30</h4>
              <span>{t("stats.countries")}</span>
            </div>

            <div>
              <h4>98%</h4>
              <span>{t("stats.customers")}</span>
            </div>

            <div>
              <h4>{t("stats.qualityTitle")}</h4>
              <span>{t("stats.quality")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
