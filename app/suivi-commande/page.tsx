import styles from "./suivi.module.css";

export default function SuiviCommandePage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          Accueil <span>›</span> Suivi de commande
        </div>

        <div className={styles.header}>
          <h1>Suivi de commande</h1>
          <div className={styles.line}></div>

          <p>
            Entrez votre numéro de commande et l’adresse e-mail utilisée lors
            de votre achat pour suivre l’état de votre commande en temps réel.
          </p>
        </div>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>Suivre votre commande</h2>

            <label>Numéro de commande *</label>
            <input
              type="text"
              placeholder="Ex : SBIPARIS-123456"
            />

            <label>E-mail *</label>
            <input
              type="email"
              placeholder="Ex : votre@email.com"
            />

            <button>🔍 SUIVRE MA COMMANDE</button>

            <div className={styles.info}>
              <strong>ℹ</strong>

              <p>
                Vous trouverez votre numéro de commande dans
                l’e-mail de confirmation reçu après votre achat.
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <h2>Où trouver mon numéro de commande ?</h2>

            <p className={styles.text}>
              Votre numéro de commande vous a été envoyé par e-mail dès la
              validation de votre achat.
            </p>

            <div className={styles.mail}>
              <div className={styles.mailHeader}>
                <strong>SBI PARIS</strong>
                <span>12:30</span>
              </div>

              <img
                src="/logo.png"
                alt="SBI PARIS"
                className={styles.mailLogo}
              />

              <h3>Merci pour votre commande !</h3>

              <p>Votre numéro de commande est :</p>

              <div className={styles.order}>
                SBIPARIS-123456
              </div>

              <small>Date : 14 Mai 2026</small>

              <hr />

              <p>
                Nous vous tiendrons informé à chaque étape de l’expédition.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.features}>
          <div className={styles.feature}>
            🚚
            <h3>Livraison rapide</h3>
            <p>2 à 5 jours ouvrés en France</p>
          </div>

          <div className={styles.feature}>
            📦
            <h3>Suivi en temps réel</h3>
            <p>Suivez votre colis à chaque étape</p>
          </div>

          <div className={styles.feature}>
            🛡️
            <h3>Paiement sécurisé</h3>
            <p>Vos paiements sont 100% sécurisés</p>
          </div>

          <div className={styles.feature}>
            🎧
            <h3>Besoin d'aide ?</h3>
            <p>Notre service client est là pour vous aider</p>
          </div>
        </div>
      </div>
    </main>
  );
}
