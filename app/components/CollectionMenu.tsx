import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ShoppingBag,
  Briefcase,
  Luggage,
  Watch,
  Hammer,
  Shirt,
} from "lucide-react";
import styles from "./CollectionMenu.module.css";

export default function CollectionMenu() {
  const t = useTranslations("collectionMenu");

  return (
    <div className={styles.menu}>
      <div className={styles.column}>
        <h2>{t("dailyUniverse")}</h2>

        <Link className={styles.item} href="/produits/sacs">
          <ShoppingBag size={20} strokeWidth={1.7} />
          <span>{t("bags")}</span>
        </Link>

        <Link className={styles.item} href="/produits/maroquinerie">
          <Briefcase size={20} strokeWidth={1.7} />
          <span>{t("leatherGoods")}</span>
        </Link>

        <Link className={styles.item} href="/produits/valises">
          <Luggage size={20} strokeWidth={1.7} />
          <span>{t("luggage")}</span>
        </Link>

        <Link className={styles.item} href="/produits/accessoires">
          <Watch size={20} strokeWidth={1.7} />
          <span>{t("accessories")}</span>
        </Link>
      </div>

      <div className={styles.divider} />

      <div className={styles.column}>
        <h2>{t("signature")}</h2>

        <Link className={styles.item} href="/produits/artisanat">
          <Hammer size={20} strokeWidth={1.7} />
          <span>{t("craftsmanship")}</span>
        </Link>

        <Link
          className={styles.item}
          href="/produits/mode-traditionnelle"
        >
          <Shirt size={20} strokeWidth={1.7} />
          <span>{t("traditionalFashion")}</span>
        </Link>
      </div>
    </div>
  );
}