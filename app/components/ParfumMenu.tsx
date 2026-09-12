import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  SprayCan,
  Baby,
  Flower2,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import styles from "./ParfumMenu.module.css";

export default function ParfumMenu() {
  const t = useTranslations("parfumMenu");

  return (
    <div className={styles.menu}>
      <div className={styles.column}>
        <h2>{t("men.title")}</h2>

        <Link
          className={styles.item}
          href="/produits/parfums-homme"
        >
          <span className={styles.itemLeft}>
            <SprayCan size={21} strokeWidth={1.7} />
            <span>{t("men.perfumes")}</span>
          </span>

          <ChevronRight
            className={styles.arrow}
            size={21}
            strokeWidth={1.8}
          />
        </Link>

        <Link
          className={styles.item}
          href="/produits/parfums-garcon"
        >
          <span className={styles.itemLeft}>
            <Baby size={21} strokeWidth={1.7} />
            <span>{t("men.boysPerfumes")}</span>
          </span>

          <ChevronRight
            className={styles.arrow}
            size={21}
            strokeWidth={1.8}
          />
        </Link>
      </div>

      <div className={styles.divider} />

      <div className={styles.column}>
        <h2>{t("women.title")}</h2>

        <Link
          className={styles.item}
          href="/produits/parfums-femme"
        >
          <span className={styles.itemLeft}>
            <Flower2 size={21} strokeWidth={1.7} />
            <span>{t("women.perfumes")}</span>
          </span>

          <ChevronRight
            className={styles.arrow}
            size={21}
            strokeWidth={1.8}
          />
        </Link>

        <Link
          className={styles.item}
          href="/produits/parfums-fille"
        >
          <span className={styles.itemLeft}>
            <Sparkles size={21} strokeWidth={1.7} />
            <span>{t("women.girlsPerfumes")}</span>
          </span>

          <ChevronRight
            className={styles.arrow}
            size={21}
            strokeWidth={1.8}
          />
        </Link>
      </div>
    </div>
  );
}