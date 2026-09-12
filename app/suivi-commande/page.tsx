import {useTranslations} from "next-intl";
import styles from "./suivi.module.css";

export default function SuiviCommandePage(){
  const t=useTranslations("trackingPage");
  return <main className={styles.page}><div className={styles.container}>
    <div className={styles.breadcrumb}>{t("breadcrumb.home")} <span>›</span> {t("breadcrumb.current")}</div>
    <div className={styles.header}><h1>{t("title")}</h1><div className={styles.line}></div><p>{t("description")}</p></div>

    <div className={styles.grid}>
      <div className={styles.card}>
        <h2>{t("form.title")}</h2>
        <label>{t("form.orderNumber")} *</label><input type="text" placeholder={t("form.orderPlaceholder")} />
        <label>{t("form.email")} *</label><input type="email" placeholder={t("form.emailPlaceholder")} />
        <button>🔍 {t("form.submit")}</button>
        <div className={styles.info}><strong>ℹ</strong><p>{t("form.help")}</p></div>
      </div>

      <div className={styles.card}>
        <h2>{t("example.title")}</h2><p className={styles.text}>{t("example.description")}</p>
        <div className={styles.mail}>
          <div className={styles.mailHeader}><strong>SBI PARIS</strong><span>12:30</span></div>
          <img src="/logo.png" alt="SBI PARIS" className={styles.mailLogo} />
          <h3>{t("example.thanks")}</h3><p>{t("example.orderNumberIs")}</p>
          <div className={styles.order}>SBIPARIS-123456</div>
          <small>{t("example.date")}</small><hr /><p>{t("example.shippingUpdates")}</p>
        </div>
      </div>
    </div>

    <div className={styles.features}>
      <div className={styles.feature}>🚚<h3>{t("features.fast.title")}</h3><p>{t("features.fast.text")}</p></div>
      <div className={styles.feature}>📦<h3>{t("features.realtime.title")}</h3><p>{t("features.realtime.text")}</p></div>
      <div className={styles.feature}>🛡️<h3>{t("features.secure.title")}</h3><p>{t("features.secure.text")}</p></div>
      <div className={styles.feature}>🎧<h3>{t("features.help.title")}</h3><p>{t("features.help.text")}</p></div>
    </div>
  </div></main>;
}
