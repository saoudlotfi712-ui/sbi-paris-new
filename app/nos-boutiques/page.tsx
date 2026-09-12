import styles from "./nos-boutiques.module.css";

export default function NosBoutiquesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <div className={styles.breadcrumb}>
          Accueil <span>›</span> Nos boutiques
        </div>

        <div className={styles.title}>
          <h1>Nos boutiques</h1>

          <div className={styles.line}></div>

          <p>
            Retrouvez nos boutiques SBI PARIS et découvrez nos collections
            dans des espaces élégants.
          </p>
        </div>

        <section className={styles.grid}>

          <div className={styles.left}>

            <div className={styles.card}>
              <img
                src="/store.jpg"
                alt="Paris Saint-Honoré"
              />

              <div className={styles.info}>
                <h3>📍 PARIS – SAINT-HONORÉ</h3>

                <p>124 Rue du Faubourg Saint-Honoré</p>
                <p>75008 Paris, France</p>

                <p>
                  <strong>Lun - Sam :</strong> 10h00 - 19h30
                </p>

                <p>
                  <strong>Dimanche :</strong> 11h00 - 18h00
                </p>

                <div className={styles.buttons}>
                  <button>VOIR SUR LA CARTE</button>
                  <button>ITINÉRAIRE</button>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <img
                src="/store.jpg"
                alt="Paris Champs-Élysées"
              />

              <div className={styles.info}>
                <h3>📍 PARIS – CHAMPS-ÉLYSÉES</h3>

                <p>78 Avenue des Champs-Élysées</p>
                <p>75008 Paris, France</p>

                <p>
                  <strong>Lun - Sam :</strong> 10h00 - 20h00
                </p>

                <p>
                  <strong>Dimanche :</strong> 11h00 - 19h00
                </p>

                <div className={styles.buttons}>
                  <button>VOIR SUR LA CARTE</button>
                  <button>ITINÉRAIRE</button>
                </div>
              </div>
            </div>

            <div className={styles.card}>
              <img
                src="/store.jpg"
                alt="Lyon Bellecour"
              />

              <div className={styles.info}>
                <h3>📍 LYON – BELLECOUR</h3>

                <p>25 Rue de la République</p>
                <p>69002 Lyon, France</p>

                <p>
                  <strong>Lun - Sam :</strong> 10h00 - 19h30
                </p>

                <p>
                  <strong>Dimanche :</strong> Fermé
                </p>

                <div className={styles.buttons}>
                  <button>VOIR SUR LA CARTE</button>
                  <button>ITINÉRAIRE</button>
                </div>
              </div>
            </div>

          </div>

          <div className={styles.right}>

            <iframe
              src="https://www.google.com/maps?q=Paris&output=embed"
              loading="lazy"
            />

            <div className={styles.features}>

              <div>
                <h4>🛍️ Essayage en boutique</h4>
                <p>
                  Essayez nos produits directement en magasin.
                </p>
              </div>

              <div>
                <h4>📦 Retrait en boutique</h4>
                <p>
                  Commandez en ligne et retirez gratuitement.
                </p>
              </div>

              <div>
                <h4>💳 Paiement sécurisé</h4>
                <p>
                  Paiement 100% sécurisé dans toutes nos boutiques.
                </p>
              </div>

              <div>
                <h4>🔄 Échanges facilités</h4>
                <p>
                  Retour et échange rapide en magasin.
                </p>
              </div>

            </div>

          </div>

        </section>

      </div>
    </main>
  );
}
