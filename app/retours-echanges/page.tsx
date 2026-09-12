import {useTranslations} from "next-intl";
import styles from "./retours.module.css";

export default function RetoursPage(){
  const t=useTranslations("returnsPage");
  const conditions=t.raw("conditions.items") as string[];
  return <main className={styles.page}><div className={styles.container}>
    <div className={styles.breadcrumb}>{t("breadcrumb.home")} <span>›</span> {t("breadcrumb.current")}</div>
    <div className={styles.header}><h1>{t("title")}</h1><div className={styles.line}></div><p>{t("description")}</p></div>

    <div className={styles.cards}>
      <div className={styles.topCard}>📦<h3>{t("cards.delay.title")}</h3><p>{t("cards.delay.text")}</p></div>
      <div className={styles.topCard}>🔄<h3>{t("cards.free.title")}</h3><p>{t("cards.free.text")}</p></div>
      <div className={styles.topCard}>↔️<h3>{t("cards.exchange.title")}</h3><p>{t("cards.exchange.text")}</p></div>
      <div className={styles.topCard}>🛡️<h3>{t("cards.refund.title")}</h3><p>{t("cards.refund.text")}</p></div>
    </div>

    <div className={styles.grid}>
      <div className={styles.card}>
        <h2>{t("steps.title")}</h2>
        {[1,2,3,4].map(n=><div className={styles.step} key={n}><span>{n}</span><div><h4>{t(`steps.${n}.title`)}</h4><p>{t(`steps.${n}.text`)}</p></div></div>)}
      </div>

      <div className={styles.card}>
        <h2>{t("conditions.title")}</h2>
        <ul className={styles.list}>{conditions.map(item=><li key={item}>✔ {item}</li>)}</ul>
        <div className={styles.help}>
          <h3>{t("help.title")}</h3><p>{t("help.text")}</p>
          <div className={styles.contacts}>
            <span>📞 +33 6 22 19 68 58</span><span>💬 +33 6 43 02 10 21</span><span>✉ contactsbiparis@gmail.com</span>
          </div>
        </div>
      </div>
    </div>
  </div></main>;
}
