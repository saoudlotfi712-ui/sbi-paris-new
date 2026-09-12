import Link from "next/link";
import {useTranslations} from "next-intl";
import styles from "./EnfantMenu.module.css";

export default function EnfantMenu() {
  const t = useTranslations("enfantMenu");
  const boy=[["boy.polos","polos-garcon"],["boy.shorts","shorts-garcon"],["boy.trousers","pantalons-garcon"],["boy.jackets","vestes-garcon"],["boy.shoes","chaussures-garcon"],["boy.caps","casquettes-garcon"]];
  const girl=[["girl.dresses","robes-fille"],["girl.polos","polos-fille"],["girl.shorts","shorts-fille"],["girl.trousers","pantalons-fille"],["girl.jackets","vestes-fille"],["girl.shoes","chaussures-fille"]];
  const column=(title:string,items:string[][])=><div className={styles.column}><h2>{t(title)}</h2>{items.map(([key,slug])=><Link className={styles.item} href={`/produits/${slug}`} key={slug}>{t(key)}</Link>)}</div>;
  return <div className={styles.menu}>{column("boy.title",boy)}<div className={styles.divider}/>{column("girl.title",girl)}</div>;
}
