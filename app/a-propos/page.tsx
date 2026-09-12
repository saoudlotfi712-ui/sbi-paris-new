import styles from "./a-propos.module.css";

export default function AProposPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <div className={styles.breadcrumb}>
          Accueil <span>›</span> À propos de nous
        </div>

        <section className={styles.hero}>

          <div className={styles.left}>

            <span className={styles.kicker}>NOTRE HISTOIRE</span>

            <h1>À propos de SBI PARIS</h1>

            <div className={styles.line}></div>

            <p>
              Née au cœur de Paris, SBI PARIS est une marque française
              spécialisée dans la mode, les accessoires, les parfums et la
              mobilité électrique.
            </p>

            <p>
              Depuis 1994, nous proposons des produits élégants,
              soigneusement sélectionnés afin d'offrir la meilleure qualité
              à nos clients.
            </p>

            <p>
              Notre objectif est de rendre le luxe accessible tout en
              conservant l'excellence du savoir-faire français.
            </p>

            <a href="/" className={styles.button}>
              DÉCOUVRIR NOS COLLECTIONS →
            </a>

          </div>

          <div className={styles.right}>

            <img
              src="/store.jpg"
              alt="SBI PARIS"
            />

            <div className={styles.experience}>
              <strong>30+</strong>
              <span>Années d'expérience</span>
            </div>

          </div>

        </section>

        <section className={styles.values}>

          <h2>NOS VALEURS</h2>

          <div className={styles.valueGrid}>

            <div className={styles.value}>
              🏅
              <h3>QUALITÉ</h3>
              <p>
                Des produits sélectionnés avec le plus grand soin.
              </p>
            </div>

            <div className={styles.value}>
              🤝
              <h3>CONFIANCE</h3>
              <p>
                Une relation durable avec chacun de nos clients.
              </p>
            </div>

            <div className={styles.value}>
              💡
              <h3>INNOVATION</h3>
              <p>
                Toujours à la recherche des meilleures tendances.
              </p>
            </div>

            <div className={styles.value}>
              ❤️
              <h3>PASSION</h3>
              <p>
                Une équipe passionnée au service de votre satisfaction.
              </p>
            </div>

          </div>

          <div className={styles.stats}>

            <div>
              <strong>30+</strong>
              <span>Années d'expérience</span>
            </div>

            <div>
              <strong>10K+</strong>
              <span>Clients satisfaits</span>
            </div>

            <div>
              <strong>50K+</strong>
              <span>Produits vendus</span>
            </div>

            <div>
              <strong>7/7</strong>
              <span>Service client disponible</span>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
