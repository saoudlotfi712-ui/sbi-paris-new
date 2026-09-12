import Link from "next/link";
import {useTranslations} from "next-intl";
import styles from "./HommeMenu.module.css";

export default function HommeMenu() {
  const t = useTranslations("hommeMenu");
  const sport = [
    ["sport.polosSport", "polos-sport-homme", "🧥"], ["sport.tankTops", "debardeurs-homme", "👕"],
    ["sport.shorts", "shorts-sport-homme", "🩳"], ["sport.tracksuits", "survetements-homme", "🥼"],
    ["sport.sportShoes", "chaussures-sport-homme", "👟"], ["sport.caps", "casquettes-homme", "🧢"],
  ];
  const classic = [
    ["classic.polos", "polos-homme", "👕"], ["classic.shirts", "chemises-homme", "👔"],
    ["classic.trousers", "pantalons-homme", "👖"], ["classic.jackets", "vestes-homme", "🧥"],
    ["classic.cityShoes", "chaussures-ville-homme", "👞"],
  ];
  const essentials = [["essentials.socks", "chaussettes-homme", "🧦"], ["essentials.underwear", "sous-vetements-homme", "🩲"]];
  const render = (items: string[][]) => items.map(([key, slug, icon]) => <Link className={styles.item} href={`/produits/${slug}`} key={slug}>{icon} {t(key)}</Link>);
  return <div className={styles.menu}>
    <div className={styles.column}><h2>{t("sport.title")}</h2>{render(sport)}<Link href="/univers-sport-homme" className={styles.univers}><span className={styles.universIcon}>🔥</span><strong>{t("sport.universe")}</strong><span className={styles.universArrow}>➜</span></Link></div>
    <div className={styles.divider} />
    <div className={styles.column}><h2>{t("classic.title")}</h2>{render(classic)}</div>
    <div className={styles.divider} />
    <div className={styles.column}><h2>{t("essentials.title")}</h2>{render(essentials)}</div>
  </div>;
}
