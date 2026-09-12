import Link from "next/link";
import {useTranslations} from "next-intl";
import styles from "./MobiliteMenu.module.css";

export default function MobiliteMenu() {
  const t=useTranslations("mobiliteMenu");
  return <div className={styles.menu}>
    <Link className={styles.item} href="/produits/trottinettes-electriques">🛴 {t("electricScooters")}</Link>
    <Link className={styles.item} href="/produits/velos-electriques">🚲 {t("electricBikes")}</Link>
    <Link className={styles.item} href="/produits/valises-electriques">🧳 {t("electricLuggage")}</Link>
  </div>;
}
