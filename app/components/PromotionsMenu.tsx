import { useTranslations } from "next-intl";
import {
  BadgePercent,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import styles from "./PromotionsMenu.module.css";

export default function PromotionsMenu() {
  const t = useTranslations("promotionsMenu");

  return (
    <div className={styles.menu}>
      <div className={styles.column}>
        <h2>
          <BadgePercent
            size={23}
            strokeWidth={1.8}
          />

          <span>{t("promotions.title")}</span>
        </h2>

        <div className={styles.item}>
          <span className={styles.itemLeft}>
            <BadgePercent
              size={21}
              strokeWidth={1.7}
            />

            <span>{t("promotions.label")}</span>
          </span>

          <ChevronRight
            className={styles.arrow}
            size={22}
            strokeWidth={1.8}
          />
        </div>
      </div>

      <div className={styles.divider} />

      <div className={styles.column}>
        <h2>
          <Sparkles
            size={23}
            strokeWidth={1.8}
          />

          <span>{t("newArrivals.title")}</span>
        </h2>

        <div className={styles.item}>
          <span className={styles.itemLeft}>
            <Sparkles
              size={21}
              strokeWidth={1.7}
            />

            <span>{t("newArrivals.label")}</span>
          </span>

          <ChevronRight
            className={styles.arrow}
            size={22}
            strokeWidth={1.8}
          />
        </div>
      </div>
    </div>
  );
}