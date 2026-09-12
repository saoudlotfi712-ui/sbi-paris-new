import Link from "next/link";
import {useTranslations} from "next-intl";
import styles from "./ParfumMenu.module.css";

export default function ParfumMenu() {
  const t=useTranslations("parfumMenu");
  return <div className={styles.menu}>
    <div className={styles.column}><h2>{t("men.title")}</h2><Link className={styles.item} href="/produits/parfums-homme">🧴 {t("men.perfumes")}</Link><Link className={styles.item} href="/produits/parfums-garcon">👦 {t("men.boysPerfumes")}</Link></div>
    <div className={styles.divider}/>
    <div className={styles.column}><h2>{t("women.title")}</h2><Link className={styles.item} href="/produits/parfums-femme">🌸 {t("women.perfumes")}</Link><Link className={styles.item} href="/produits/parfums-fille">👧 {t("women.girlsPerfumes")}</Link></div>
  </div>;
}
