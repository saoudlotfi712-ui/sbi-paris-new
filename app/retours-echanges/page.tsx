import styles from "./retours.module.css";

export default function RetoursPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <div className={styles.breadcrumb}>
          Accueil <span>›</span> Retours & échanges
        </div>

        <div className={styles.header}>
          <h1>Retours & échanges</h1>
          <div className={styles.line}></div>

          <p>
            Votre satisfaction est notre priorité.
            Si un article ne vous convient pas, vous disposez de
            <strong> 30 jours </strong>
            après réception pour demander un retour ou un échange.
          </p>
        </div>

        <div className={styles.cards}>

          <div className={styles.topCard}>
            📦
            <h3>30 jours pour changer d'avis</h3>
            <p>Retour possible sous 30 jours après réception.</p>
          </div>

          <div className={styles.topCard}>
            🔄
            <h3>Retours gratuits</h3>
            <p>Les retours sont gratuits en France métropolitaine.</p>
          </div>

          <div className={styles.topCard}>
            ↔️
            <h3>Échanges rapides</h3>
            <p>Échange immédiat selon disponibilité.</p>
          </div>

          <div className={styles.topCard}>
            🛡️
            <h3>Remboursement garanti</h3>
            <p>Sous 7 jours après réception du retour.</p>
          </div>

        </div>

        <div className={styles.grid}>

          <div className={styles.card}>

            <h2>Comment retourner un article ?</h2>

            <div className={styles.step}>
              <span>1</span>
              <div>
                <h4>Demande de retour</h4>
                <p>Connectez-vous à votre compte ou contactez notre équipe.</p>
              </div>
            </div>

            <div className={styles.step}>
              <span>2</span>
              <div>
                <h4>Expédition</h4>
                <p>Recevez votre étiquette et déposez votre colis.</p>
              </div>
            </div>

            <div className={styles.step}>
              <span>3</span>
              <div>
                <h4>Réception</h4>
                <p>Nous vérifions votre retour sous 48 heures.</p>
              </div>
            </div>

            <div className={styles.step}>
              <span>4</span>
              <div>
                <h4>Remboursement</h4>
                <p>Le remboursement est effectué sous 7 jours ouvrés.</p>
              </div>
            </div>

          </div>

          <div className={styles.card}>

            <h2>Conditions de retour</h2>

            <ul className={styles.list}>
              <li>✔ Produit neuf et non utilisé.</li>
              <li>✔ Emballage d'origine obligatoire.</li>
              <li>✔ Les étiquettes doivent être présentes.</li>
              <li>✔ Les produits personnalisés ne sont pas repris.</li>
              <li>✔ Retour gratuit en France métropolitaine.</li>
            </ul>

            <div className={styles.help}>

              <h3>Besoin d'aide ?</h3>

              <p>Notre équipe est disponible 7j/7.</p>

              <div className={styles.contacts}>
                <span>📞 +33 6 22 19 68 58</span>
                <span>💬 +33 6 43 02 10 21</span>
                <span>✉ contact@sbiparis.com</span>
              </div>

            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
