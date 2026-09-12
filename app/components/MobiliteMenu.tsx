import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Zap,
  Bike,
  Luggage,
  ChevronRight,
} from "lucide-react";
import styles from "./MobiliteMenu.module.css";

export default function MobiliteMenu() {
  const t = useTranslations("mobiliteMenu");

  return (
    <div className={styles.menu}>
      <Link
        className={styles.item}
        href="/produits/trottinettes-electriques"
      >
        <span className={styles.itemLeft}>
          <Zap size={23} strokeWidth={1.7} />
          <span>{t("electricScooters")}</span>
        </span>

        <ChevronRight
          className={styles.arrow}
          size={24}
          strokeWidth={1.8}
        />
      </Link>

      <Link
        className={styles.item}
        href="/produits/velos-electriques"
      >
        <span className={styles.itemLeft}>
          <Bike size={23} strokeWidth={1.7} />
          <span>{t("electricBikes")}</span>
        </span>

        <ChevronRight
          className={styles.arrow}
          size={24}
          strokeWidth={1.8}
        />
      </Link>

      <Link
        className={styles.item}
        href="/produits/valises-electriques"
      >
        <span className={styles.itemLeft}>
          <Luggage size={23} strokeWidth={1.7} />
          <span>{t("electricLuggage")}</span>
        </span>

        <ChevronRight
          className={styles.arrow}
          size={24}
          strokeWidth={1.8}
        />
      </Link>
    </div>
  );
}