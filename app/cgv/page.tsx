import styles from "./cgv.module.css";
import Link from "next/link";

export default function CGVPage() {
  return (
    <main className={styles.page}>

      <div className={styles.breadcrumb}>
        <Link href="/">Accueil</Link>
        <span>›</span>
        <strong>Conditions générales de vente</strong>
      </div>

      <section className={styles.hero}>
        <h1>Conditions générales de vente</h1>
        <span className={styles.line}></span>

        <p>
          Les présentes Conditions Générales de Vente (CGV) régissent les
          relations contractuelles entre SBI PARIS et tout client effectuant
          un achat sur notre boutique en ligne.
        </p>
      </section>

      <section className={styles.layout}>

        <aside className={styles.sidebar}>

          <h3>Dans cette page</h3>

          <nav>

            <a href="#objet">1. Objet</a>
            <a href="#produits">2. Produits</a>
            <a href="#commandes">3. Commandes</a>
            <a href="#prix">4. Prix</a>
            <a href="#paiement">5. Paiement</a>
            <a href="#livraison">6. Livraison</a>
            <a href="#retractation">7. Droit de rétractation</a>
            <a href="#retours">8. Retours & échanges</a>
            <a href="#garantie">9. Garanties</a>
            <a href="#responsabilite">10. Responsabilité</a>
            <a href="#donnees">11. Données personnelles</a>
            <a href="#propriete">12. Propriété intellectuelle</a>
            <a href="#litiges">13. Litiges</a>
            <a href="#contact">14. Contact</a>

          </nav>

        </aside>

        <div className={styles.content}>

          <section id="objet" className={styles.card}>
            <h2>1. Objet</h2>

            <p>
              Les présentes Conditions Générales de Vente définissent les droits
              et obligations entre SARL BEN ISSIA PARIS et toute personne
              effectuant un achat sur le site officiel SBI PARIS.
            </p>
          </section>

          <section id="produits" className={styles.card}>
            <h2>2. Produits</h2>

            <p>
              Les produits proposés sont présentés avec le plus grand soin.
              Les photographies sont fournies à titre illustratif.
            </p>
          </section>

          <section id="commandes" className={styles.card}>
            <h2>3. Commandes</h2>

            <p>
              Toute commande implique l'acceptation des présentes CGV.
              Une commande devient définitive après validation du paiement.
            </p>
          </section>

          <section id="prix" className={styles.card}>
            <h2>4. Prix</h2>

            <p>
              Tous les prix sont affichés en euros (€) TTC.
              SBI PARIS se réserve le droit de modifier ses tarifs à tout
              moment sans préavis.
            </p>
          </section>

          <section id="paiement" className={styles.card}>
            <h2>5. Paiement</h2>

            <p>
              Le paiement en ligne n&apos;est pas encore disponible directement sur le site. Les modalités de paiement sont communiquées lors de la validation de la commande.
            </p>
          </section>

          <section id="livraison" className={styles.card}>
            <h2>6. Livraison</h2>

            <p>
              Les commandes sont expédiées après validation du paiement.
              Les délais peuvent varier selon le pays de destination.
            </p>
          </section>

          <section id="retractation" className={styles.card}>
            <h2>7. Droit de rétractation</h2>

            <p>
              Conformément à la réglementation française,
              le client dispose de 14 jours pour exercer son droit
              de rétractation lorsqu'il est applicable.
            </p>
          </section>

          <section id="retours" className={styles.card}>
            <h2>8. Retours & échanges</h2>

            <p>
              Les retours sont acceptés selon notre politique de retour,
              sous réserve que les articles soient retournés dans leur état
              d'origine.
            </p>
          </section>

          <section id="garantie" className={styles.card}>
            <h2>9. Garanties</h2>

            <p>
              Tous nos produits bénéficient des garanties prévues
              par la législation française.
            </p>
          </section>

          <section id="responsabilite" className={styles.card}>
            <h2>10. Responsabilité</h2>

            <p>
              SBI PARIS ne pourra être tenue responsable des dommages
              indirects résultant de l'utilisation des produits vendus.
            </p>
          </section>

          <section id="donnees" className={styles.card}>
            <h2>11. Données personnelles</h2>

            <p>
              Les informations personnelles sont traitées conformément
              à notre Politique de confidentialité et au RGPD.
            </p>
          </section>

          <section id="propriete" className={styles.card}>
            <h2>12. Propriété intellectuelle</h2>

            <p>
              Tous les contenus du site SBI PARIS sont protégés par le
              droit d'auteur. Toute reproduction est interdite sans
              autorisation écrite.
            </p>
          </section>

          <section id="litiges" className={styles.card}>
            <h2>13. Litiges</h2>

            <p>
              Les présentes CGV sont soumises au droit français.
              Tout litige relève de la compétence des juridictions françaises.
            </p>
          </section>

          <section id="contact" className={styles.card}>
            <h2>14. Contact</h2>

            <p><strong>E-mail :</strong> contactsbiparis@gmail.com</p>

            <p><strong>Téléphone :</strong> +33 6 22 19 68 58</p>

            <p>
              <strong>Adresse :</strong><br />
              SARL BEN ISSIA PARIS<br />
              139 Rue André Karman<br />
              93300 Aubervilliers – France
            </p>

          </section>

        </div>

      </section>

    </main>
  );
}
