import Link from "next/link";
import { useTranslations } from "next-intl";
import styles from "./ParisUniverse.module.css";

export function ParisUniverse() {
  const t = useTranslations("parisUniverse");

  const collections = [
    {
      number: "01",
      category: t("cards.women.category"),
      title: t("cards.women.title"),
      image: "/universe/femme.jpg",
      href: "/femme",
      positionClass: styles.femme,
    },
    {
      number: "02",
      category: t("cards.men.category"),
      title: t("cards.men.title"),
      image: "/universe/homme.jpg",
      href: "/homme",
      positionClass: styles.homme,
    },
    {
      number: "03",
      category: t("cards.perfume.category"),
      title: t("cards.perfume.title"),
      image: "/universe/parfum.jpg",
      href: "/parfum",
      positionClass: styles.parfum,
    },
    {
      number: "04",
      category: t("cards.kids.category"),
      title: t("cards.kids.title"),
      image: "/universe/enfant.jpg",
      href: "/enfant",
      positionClass: styles.enfant,
    },
    {
      number: "05",
      category: t("cards.mobility.category"),
      title: t("cards.mobility.title"),
      image: "/universe/mobilite.jpg",
      href: "/mobilite",
      positionClass: styles.mobilite,
    },
    {
      number: "06",
      category: t("cards.news.category"),
      title: t("cards.news.title"),
      image: "/universe/nouveautes.jpg",
      href: "/promotions",
      positionClass: styles.nouveautes,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.parisDecoration} aria-hidden="true" />

      <div className={styles.container}>
        <div className={styles.heading}>
          <p className={styles.kicker}>{t("kicker")}</p>

          <h2 className={styles.title}>
            {t("title.line1")}
            <span>
              {t("title.line2")} <strong>SBI PARIS</strong>
            </span>
          </h2>

          <div className={styles.ornament} aria-hidden="true">
            <span />
            <b>✦</b>
            <span />
          </div>

          <p className={styles.description}>
            {t("description")}
          </p>

          <Link href="/collection" className={styles.mainButton}>
            {t("button")}
            <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className={styles.grid}>
          {collections.map((collection) => (
            <Link
              key={collection.number}
              href={collection.href}
              className={`${styles.card} ${collection.positionClass}`}
            >
              <img
                src={collection.image}
                alt={`${collection.category} ${collection.title}`}
                className={styles.image}
              />

              <div className={styles.overlay} aria-hidden="true" />

              <span className={styles.number}>{collection.number}</span>

              <div className={styles.cardContent}>
                <span className={styles.category}>
                  {collection.category}
                </span>

                <h3>{collection.title}</h3>

                <span className={styles.redLine} aria-hidden="true" />

                <span className={styles.discover}>
                  {t("discover")}
                  <b aria-hidden="true">→</b>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
