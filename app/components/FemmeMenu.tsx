import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Shirt,
  Dumbbell,
  Layers3,
  Footprints,
  Crown,
  Heart,
  Sparkles,
  Package,
  ArrowRight,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import styles from "./FemmeMenu.module.css";

type MenuItem = {
  key: string;
  slug: string;
  Icon: LucideIcon;
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export default function FemmeMenu() {
  const t = useTranslations("femmeMenu");

  const groups: MenuGroup[] = [
    {
      title: "sport.title",
      items: [
        {
          key: "sport.polosSport",
          slug: "polos-sport-femme",
          Icon: Shirt,
        },
        {
          key: "sport.tankTops",
          slug: "debardeurs-femme",
          Icon: Dumbbell,
        },
        {
          key: "sport.shorts",
          slug: "shorts-sport-femme",
          Icon: Dumbbell,
        },
        {
          key: "sport.tracksuits",
          slug: "survetements-femme",
          Icon: Layers3,
        },
        {
          key: "sport.sportShoes",
          slug: "chaussures-sport-femme",
          Icon: Footprints,
        },
        {
          key: "sport.caps",
          slug: "casquettes-femme",
          Icon: Crown,
        },
      ],
    },

    {
      title: "classic.title",
      items: [
        {
          key: "classic.polos",
          slug: "polos-femme",
          Icon: Shirt,
        },
        {
          key: "classic.shirts",
          slug: "chemises-femme",
          Icon: Shirt,
        },
        {
          key: "classic.dresses",
          slug: "robes-femme",
          Icon: Sparkles,
        },
        {
          key: "classic.trousers",
          slug: "pantalons-femme",
          Icon: Layers3,
        },
        {
          key: "classic.jackets",
          slug: "vestes-femme",
          Icon: Shirt,
        },
        {
          key: "classic.cityShoes",
          slug: "chaussures-ville-femme",
          Icon: Footprints,
        },
      ],
    },

    {
      title: "essentials.title",
      items: [
        {
          key: "essentials.socks",
          slug: "chaussettes-femme",
          Icon: Footprints,
        },
        {
          key: "essentials.lingerie",
          slug: "lingerie-femme",
          Icon: Heart,
        },
      ],
    },
  ];

  const renderItems = (items: MenuItem[]) =>
    items.map(({ key, slug, Icon }) => (
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
    ));

  return (
    <div className={styles.menu}>
      {groups.map((group, index) => (
        <div
          key={group.title}
          style={{ display: "contents" }}
        >
          <div className={styles.column}>
            <h2>{t(group.title)}</h2>

            {renderItems(group.items)}
          </div>

          {index < groups.length - 1 && (
            <div className={styles.divider} />
          )}
        </div>
      ))}

      <Link
        href="/univers-sport-femme"
        className={styles.univers}
      >
        <span>
          <Dumbbell
            size={26}
            strokeWidth={1.8}
          />
        </span>

        <strong>
          {t("sport.universe")}
        </strong>

        <b>
          <ArrowRight
            size={24}
            strokeWidth={2}
          />
        </b>
      </Link>
    </div>
  );
}