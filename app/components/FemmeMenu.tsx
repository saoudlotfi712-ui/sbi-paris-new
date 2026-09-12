import Link from "next/link";
import {useTranslations} from "next-intl";
import styles from "./FemmeMenu.module.css";

export default function FemmeMenu() {
  const t = useTranslations("femmeMenu");
  const groups = [
    {title:"sport.title", items:[["sport.polosSport","polos-sport-femme"],["sport.tankTops","debardeurs-femme"],["sport.shorts","shorts-sport-femme"],["sport.tracksuits","survetements-femme"],["sport.sportShoes","chaussures-sport-femme"],["sport.caps","casquettes-femme"]]},
    {title:"classic.title", items:[["classic.polos","polos-femme"],["classic.shirts","chemises-femme"],["classic.dresses","robes-femme"],["classic.trousers","pantalons-femme"],["classic.jackets","vestes-femme"],["classic.cityShoes","chaussures-ville-femme"]]},
    {title:"essentials.title", items:[["essentials.socks","chaussettes-femme"],["essentials.lingerie","lingerie-femme"]]},
  ];
  return <div className={styles.menu}>{groups.map((group,index)=><div key={group.title} style={{display:"contents"}}><div className={styles.column}><h2>{t(group.title)}</h2>{group.items.map(([key,slug])=><Link className={styles.item} href={`/produits/${slug}`} key={slug}>{t(key)}</Link>)}</div>{index<groups.length-1&&<div className={styles.divider}/>}</div>)}<Link href="/univers-sport-femme" className={styles.univers}><span>🔥</span><strong>{t("sport.universe")}</strong><b>➜</b></Link></div>;
}
