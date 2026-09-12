import { useTranslations } from "next-intl";
import styles from "./PromotionsMenu.module.css";

export default function PromotionsMenu() {
  const t = useTranslations("promotionsMenu");

  return (
    <div className={styles.menu}>
      <div className={styles.column}>
        <h2>🏷️ {t("promotions.title")}</h2>

        <div className={styles.item}>
          <span>{t("promotions.label")}</span>
        </div>
      </div>

      <div className={styles.divider}></div>

      <div className={styles.column}>
        <h2>☆ {t("newArrivals.title")}</h2>

        <div className={styles.item}>
          <span>{t("newArrivals.label")}</span>
        </div>
      </div>
    </div>
  );
}
