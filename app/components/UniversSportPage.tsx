import Link from "next/link";
import styles from "./UniversSportPage.module.css";

const sports = [
  {
    name: "Football",
    image: "/univers-sport/femme/products/football.jpg",
    count: "128 produits",
    href: "/univers-sport-football",
  },
  {
    name: "Basketball",
    image: "/univers-sport/femme/products/basketball.jpg",
    count: "96 produits",
    href: "/univers-sport-basketball",
  },
  {
    name: "Tennis",
    image: "/univers-sport/femme/products/tennis.jpg",
    count: "74 produits",
    href: "/univers-sport-tennis",
  },
  {
    name: "Padel",
    image: "/univers-sport/femme/products/padel.jpg",
    count: "58 produits",
    href: "/univers-sport-padel",
  },
  {
    name: "Running",
    image: "/univers-sport/femme/products/running.jpg",
    count: "64 produits",
    href: "/univers-sport-running",
  },
];

export default function UniversSportPage() {
  return (
    <section className={styles.sportPage}>
      <div className={styles.container}>
        <div className={styles.topSection}>
          <div className={styles.leftIntro}>
            <p className={styles.kicker}>UNIVERS SPORT</p>

            <h1>L&apos;Esprit Sportif au Quotidien</h1>

            <p className={styles.introText}>
              Découvrez des collections pensées pour la performance, le confort
              et le style, dans chaque discipline.
            </p>

            <Link href="/univers-sport" className={styles.viewAll}>
              Voir toutes les disciplines
              <span>→</span>
            </Link>
          </div>

          <div
            className={styles.rightBanner}
            style={{
              backgroundImage:
                'url("/univers-sport/femme/banner/banner.jpg")',
            }}
          >
            <div className={styles.bannerOverlay} />

            <div className={styles.bannerContent}>
              <span>SBI PARIS SPORT</span>

              <h2>
                Performance.
                <br />
                Élégance.
                <br />
                Excellence.
              </h2>
            </div>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {sports.map((sport) => (
            <Link
              href={sport.href}
              className={styles.sportCard}
              key={sport.name}
            >
              <div className={styles.sportPhoto}>
                <img src={sport.image} alt={sport.name} />

                <div
                  className={styles.photoOverlay}
                  aria-hidden="true"
                />

                <span className={styles.sportBadge}>
                  {sport.name}
                </span>
              </div>

              <div className={styles.sportContent}>
                <h3>{sport.name}</h3>

                <span className={styles.count}>
                  {sport.count}
                </span>

                <span className={styles.discover}>
                  Voir la collection
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
