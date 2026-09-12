import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "./LuxuryHero.module.css";

export default function LuxuryHero() {
  const t = useTranslations("hero");

  return (
    <section className={styles.hero}>
      <img
        src="/banner.jpg"
        alt={t("imageAlt")}
        className={styles.image}
      />

      <div className={styles.overlay} />

      <div className={styles.content}>
        <p className={styles.brand}>SBI PARIS</p>

        <h1 className={styles.title}>
          <span>{t("title.line1")}</span>

          <span className={styles.red}>
            {t("title.line2")}
          </span>

          <span>{t("title.line3")}</span>
        </h1>

        <p className={styles.description}>
          {t("description.line1")}
          <br />
          {t("description.line2")}
        </p>

        <div className={styles.actions}>
          <Link
            href="/collection"
            className={styles.primaryButton}
          >
            {t("buttons.collection")}
          </Link>

          <Link
            href="/promotions"
            className={styles.secondaryButton}
          >
            {t("buttons.news")}
          </Link>
        </div>

        <div className={styles.stats}>
          <Stat value="1994" label={t("stats.paris")} />
          
          <Stat value="30" label={t("stats.countries")} />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className={styles.stat}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
