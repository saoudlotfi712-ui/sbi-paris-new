import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "./HomeSportSection.module.css";

export default function HomeSportSection() {
  const t = useTranslations("homeSport");

  const sports = [
    {
      key: "football",
      icon: "⚽",
      image: "/univers-sport/femme/products/football.jpg",
      count: 128,
      href: "/univers-sport-femme",
    },
    {
      key: "basketball",
      icon: "🏀",
      image: "/univers-sport/femme/products/basketball.jpg",
      count: 96,
      href: "/univers-sport-femme",
    },
    {
      key: "tennis",
      icon: "🎾",
      image: "/univers-sport/femme/products/tennis.jpg",
      count: 74,
      href: "/univers-sport-femme",
    },
    {
      key: "padel",
      icon: "◉",
      image: "/univers-sport/femme/products/padel.jpg",
      count: 58,
      href: "/univers-sport-femme",
    },
    {
      key: "running",
      icon: "🏃",
      image: "/univers-sport/femme/products/running.jpg",
      count: 64,
      href: "/univers-sport-femme",
    },
  ] as const;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <div>
            <p className={styles.kicker}>{t("kicker")}</p>

            <h2>{t("title")}</h2>
          </div>

          <Link
            href="/univers-sport-femme"
            className={styles.viewAll}
          >
            {t("viewAll")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {sports.map((sport) => {
            const name = t(`sports.${sport.key}`);

            return (
              <Link
                href={sport.href}
                className={styles.card}
                key={sport.key}
              >
                <div className={styles.imageWrapper}>
                  <img
                    src={sport.image}
                    alt={name}
                    className={styles.image}
                  />

                  <span
                    className={styles.iconBadge}
                    aria-hidden="true"
                  >
                    {sport.icon}
                  </span>
                </div>

                <div className={styles.content}>
                  <h3>{name}</h3>

                  <span className={styles.count}>
                    {t("productCount", {
                      count: sport.count,
                    })}
                  </span>

                  <span className={styles.discover}>
                    {t("discover")}
                    <b aria-hidden="true">→</b>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
