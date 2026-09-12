import Link from "next/link";
import {useTranslations} from "next-intl";
import styles from "./CollectionMenu.module.css";

export default function CollectionMenu() {
  const t=useTranslations("collectionMenu");
  return <div className={styles.menu}>
    <div className={styles.column}><h2>{t("dailyUniverse")}</h2><Link className={styles.item} href="/produits/sacs">👜 {t("bags")}</Link><Link className={styles.item} href="/produits/maroquinerie">💼 {t("leatherGoods")}</Link><Link className={styles.item} href="/produits/valises">🧳 {t("luggage")}</Link><Link className={styles.item} href="/produits/accessoires">⌚ {t("accessories")}</Link></div>
    <div className={styles.divider}/>
    <div className={styles.column}><h2>{t("signature")}</h2><Link className={styles.item} href="/produits/artisanat">🪭 {t("craftsmanship")}</Link><Link className={styles.item} href="/produits/mode-traditionnelle">🥻 {t("traditionalFashion")}</Link></div>
  </div>;
}
