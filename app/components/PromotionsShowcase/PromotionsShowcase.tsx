import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";

import styles from "./PromotionsShowcase.module.css";

type PromotionItem = {
  title: string;
  subtitle: string;
  discount: string;
  image: string;
  href: string;
};

type NewItem = {
  title: string;
  subtitle: string;
  image: string;
  href: string;
};

export default function PromotionsShowcase() {
  const t = useTranslations("promotionsShowcase");

  const promotions: PromotionItem[] = [
    {
      title: t("promotions.items.perfume.title"),
      subtitle: t("promotions.items.perfume.subtitle"),
      discount: "-25%",
      image: "/home-promos/promo-parfum.jpg",
      href: "/parfum",
    },
    {
      title: t("promotions.items.accessories.title"),
      subtitle: t("promotions.items.accessories.subtitle"),
      discount: "-20%",
      image: "/home-promos/promo-accessoires.jpg",
      href: "/collection",
    },
    {
      title: t("promotions.items.men.title"),
      subtitle: t("promotions.items.men.subtitle"),
      discount: "-30%",
      image: "/home-promos/promo-homme.jpg",
      href: "/homme",
    },
  ];

  const newItems: NewItem[] = [
    {
      title: t("newItems.items.accessories.title"),
      subtitle: t("newItems.items.accessories.subtitle"),
      image: "/home-promos/new-accessoires.jpg",
      href: "/collection",
    },
    {
      title: t("newItems.items.travelBag.title"),
      subtitle: t("newItems.items.travelBag.subtitle"),
      image: "/home-promos/new-sac.jpg",
      href: "/homme",
    },
    {
      title: t("newItems.items.women.title"),
      subtitle: t("newItems.items.women.subtitle"),
      image: "/home-promos/new-femme.jpg",
      href: "/femme",
    },
    {
      title: t("newItems.items.men.title"),
      subtitle: t("newItems.items.men.subtitle"),
      image: "/home-promos/new-homme.jpg",
      href: "/homme",
    },
    {
      title: t("newItems.items.mobility.title"),
      subtitle: t("newItems.items.mobility.subtitle"),
      image: "/home-promos/new-mobilite.jpg",
      href: "/mobilite",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <header className={styles.sectionHeader}>
          <Image
            src="/home-promos/logo-2.png"
            alt={t("logoAlt")}
            width={380}
            height={120}
            priority={false}
            className={styles.logo}
          />

          <div className={styles.headerLines} aria-hidden="true">
            <span />
            <b />
            <span />
          </div>

          <p>{t("header")}</p>
        </header>

        <div className={styles.promotionGrid}>
          <div className={styles.promotionIntro}>
            <div className={styles.promotionText}>
              <span className={styles.kicker}>
                {t("promotions.kicker")}
              </span>

              <h2>
                {t("promotions.title.line1")}
                <strong>{t("promotions.title.line2")}</strong>
              </h2>

              <p>{t("promotions.description")}</p>

              <Link href="/promotions" className={styles.redButton}>
                {t("promotions.button")}
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className={styles.discountPanel}>
              <small>{t("promotions.discount.upTo")}</small>
              <strong>-30%</strong>
              <span>{t("promotions.discount.description")}</span>
            </div>

            <div
              className={styles.promotionDecoration}
              aria-hidden="true"
            />
          </div>

          <div className={styles.promotionCards}>
            {promotions.map((item) => (
              <article
                className={styles.promotionCard}
                key={item.title}
              >
                <Link
                  href={item.href}
                  className={styles.promotionImage}
                  aria-label={`${t("discover")} ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 800px) 100vw, 25vw"
                  />

                  <span className={styles.discountBadge}>
                    {item.discount}
                  </span>
                </Link>

                <div className={styles.cardContent}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>

                  <Link href={item.href}>
                    {t("promotions.viewSelection")}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className={styles.newsGrid}>
          <div className={styles.newsIntro}>
            <span className={styles.kicker}>
              {t("newItems.kicker")}
            </span>

            <h2>
              {t("newItems.title.line1")}
              <strong>{t("newItems.title.line2")}</strong>
            </h2>

            <p>{t("newItems.description")}</p>

            <Link href="/promotions" className={styles.blueButton}>
              {t("newItems.button")}
              <span aria-hidden="true">→</span>
            </Link>
          </div>

          <div className={styles.newsCards}>
            {newItems.map((item) => (
              <article
                className={styles.newsCard}
                key={item.title}
              >
                <Link
                  href={item.href}
                  className={styles.newsImage}
                  aria-label={`${t("discover")} ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 800px) 100vw, 18vw"
                  />

                  <span className={styles.newBadge}>NEW</span>
                </Link>

                <div className={styles.newsContent}>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>

                  <Link href={item.href}>
                    {t("newItems.viewProduct")}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
