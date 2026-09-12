import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Shirt,
  Layers3,
  Footprints,
  Crown,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./EnfantMenu.module.css";

type MenuItem = {
  key: string;
  slug: string;
  Icon: LucideIcon;
};

export default function EnfantMenu() {
  const t = useTranslations("enfantMenu");

  const boy: MenuItem[] = [
    {
      key: "boy.polos",
      slug: "polos-garcon",
      Icon: Shirt,
    },
    {
      key: "boy.shorts",
      slug: "shorts-garcon",
      Icon: Layers3,
    },
    {
      key: "boy.trousers",
      slug: "pantalons-garcon",
      Icon: Layers3,
    },
    {
      key: "boy.jackets",
      slug: "vestes-garcon",
      Icon: Shirt,
    },
    {
      key: "boy.shoes",
      slug: "chaussures-garcon",
      Icon: Footprints,
    },
    {
      key: "boy.caps",
      slug: "casquettes-garcon",
      Icon: Crown,
    },
  ];

  const girl: MenuItem[] = [
    {
      key: "girl.dresses",
      slug: "robes-fille",
      Icon: Sparkles,
    },
    {
      key: "girl.polos",
      slug: "polos-fille",
      Icon: Shirt,
    },
    {
      key: "girl.shorts",
      slug: "shorts-fille",
      Icon: Layers3,
    },
    {
      key: "girl.trousers",
      slug: "pantalons-fille",
      Icon: Layers3,
    },
    {
      key: "girl.jackets",
      slug: "vestes-fille",
      Icon: Shirt,
    },
    {
      key: "girl.shoes",
      slug: "chaussures-fille",
      Icon: Footprints,
    },
  ];

  const column = (
    title: string,
    items: MenuItem[]
  ) => (
    <div className={styles.column}>
      <h2>{t(title)}</h2>

      {items.map(({ key, slug, Icon }) => (
        <Link
          className={styles.item}
          href={`/produits/${slug}`}
          key={slug}
        >
          <Icon
            size={20}
            strokeWidth={1.7}
          />

          <span>{t(key)}</span>
        </Link>
      ))}
    </div>
  );

  return (
    <div className={styles.menu}>
      {column("boy.title", boy)}

      <div className={styles.divider} />

      {column("girl.title", girl)}
    </div>
  );
}