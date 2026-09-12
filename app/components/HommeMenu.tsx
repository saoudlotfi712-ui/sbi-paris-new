import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Shirt,
  Dumbbell,
  Layers3,
  Footprints,
  Crown,
  BriefcaseBusiness,
  Package,
  ArrowRight,
} from "lucide-react";
import styles from "./HommeMenu.module.css";

export default function HommeMenu() {
  const t = useTranslations("hommeMenu");

  const sport = [
    {
      key: "sport.polosSport",
      slug: "polos-sport-homme",
      Icon: Shirt,
    },
    {
      key: "sport.tankTops",
      slug: "debardeurs-homme",
      Icon: Dumbbell,
    },
    {
      key: "sport.shorts",
      slug: "shorts-sport-homme",
      Icon: Dumbbell,
    },
    {
      key: "sport.tracksuits",
      slug: "survetements-homme",
      Icon: Layers3,
    },
    {
      key: "sport.sportShoes",
      slug: "chaussures-sport-homme",
      Icon: Footprints,
    },
    {
      key: "sport.caps",
      slug: "casquettes-homme",
      Icon: Crown,
    },
  ];

  const classic = [
    {
      key: "classic.polos",
      slug: "polos-homme",
      Icon: Shirt,
    },
    {
      key: "classic.shirts",
      slug: "chemises-homme",
      Icon: Shirt,
    },
    {
      key: "classic.trousers",
      slug: "pantalons-homme",
      Icon: BriefcaseBusiness,
    },
    {
      key: "classic.jackets",
      slug: "vestes-homme",
      Icon: Layers3,
    },
    {
      key: "classic.cityShoes",
      slug: "chaussures-ville-homme",
      Icon: Footprints,
    },
  ];

  const essentials = [
    {
      key: "essentials.socks",
      slug: "chaussettes-homme",
      Icon: Footprints,
    },
    {
      key: "essentials.underwear",
      slug: "sous-vetements-homme",
      Icon: Package,
    },
  ];

  const render = (
    items: {
      key: string;
      slug: string;
      Icon: typeof Shirt;
    }[]
  ) =>
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
      <div className={styles.column}>
        <h2>{t("sport.title")}</h2>

        {render(sport)}

        <Link
          href="/univers-sport-homme"
          className={styles.univers}
        >
          <Dumbbell
            className={styles.universIcon}
            size={25}
            strokeWidth={1.8}
          />

          <strong>
            {t("sport.universe")}
          </strong>

          <ArrowRight
            className={styles.universArrow}
            size={23}
            strokeWidth={2}
          />
        </Link>
      </div>

      <div className={styles.divider} />

      <div className={styles.column}>
        <h2>{t("classic.title")}</h2>

        {render(classic)}
      </div>

      <div className={styles.divider} />

      <div className={styles.column}>
        <h2>{t("essentials.title")}</h2>

        {render(essentials)}
      </div>
    </div>
  );
}