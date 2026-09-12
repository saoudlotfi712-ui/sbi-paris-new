import {useTranslations} from "next-intl";
import styles from "./a-propos.module.css";

export default function AProposPage(){
  const t=useTranslations("aboutPage");
  return <main className={styles.page}><div className={styles.container}>
    <div className={styles.breadcrumb}>{t("breadcrumb.home")} <span>›</span> {t("breadcrumb.current")}</div>

    <section className={styles.hero}>
      <div className={styles.left}>
        <span className={styles.kicker}>{t("hero.kicker")}</span><h1>{t("hero.title")}</h1><div className={styles.line}></div>
        <p>{t("hero.p1")}</p><p>{t("hero.p2")}</p><p>{t("hero.p3")}</p>
        <a href="/" className={styles.button}>{t("hero.button")} →</a>
      </div>
      <div className={styles.right}>
        <img src="/store.jpg" alt="SBI PARIS" />
        <div className={styles.experience}><strong>30+</strong><span>{t("experience")}</span></div>
      </div>
    </section>

    <section className={styles.values}>
      <h2>{t("values.title")}</h2>
      <div className={styles.valueGrid}>
        <div className={styles.value}>🏅<h3>{t("values.quality.title")}</h3><p>{t("values.quality.text")}</p></div>
        <div className={styles.value}>🤝<h3>{t("values.trust.title")}</h3><p>{t("values.trust.text")}</p></div>
        <div className={styles.value}>💡<h3>{t("values.innovation.title")}</h3><p>{t("values.innovation.text")}</p></div>
        <div className={styles.value}>❤️<h3>{t("values.passion.title")}</h3><p>{t("values.passion.text")}</p></div>
      </div>
      <div className={styles.stats}>
        <div><strong>30+</strong><span>{t("stats.experience")}</span></div>
        <div><strong>10K+</strong><span>{t("stats.customers")}</span></div>
        <div><strong>50K+</strong><span>{t("stats.products")}</span></div>
        <div><strong>7/7</strong><span>{t("stats.support")}</span></div>
      </div>
    </section>
  </div></main>;
}
