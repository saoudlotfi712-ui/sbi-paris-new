import Link from "next/link";
import {
  BadgeCheck,
  Banknote,
  CheckCircle2,
  CreditCard,
  Headphones,
  Home,
  LockKeyhole,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

import styles from "./paiement.module.css";

const securityItems = [
  {
    title: "Connexion sécurisée (SSL)",
    text:
      "Notre site utilise une connexion chiffrée afin de protéger les informations transmises lors de votre navigation.",
    icon: LockKeyhole,
  },
  {
    title: "Paiements 100% sécurisés",
    text:
      "Vos données bancaires sont traitées par des prestataires de paiement sécurisés et ne sont pas conservées directement par SBI PARIS.",
    icon: CreditCard,
  },
  {
    title: "Protection anti-fraude",
    text:
      "Nos partenaires de paiement peuvent utiliser des outils de vérification et de détection afin de limiter les opérations frauduleuses.",
    icon: ShieldCheck,
  },
  {
    title: "Confidentialité renforcée",
    text:
      "Vos informations personnelles sont traitées conformément à notre politique de confidentialité et à la réglementation applicable.",
    icon: RefreshCw,
  },
];

const reassuranceItems = [
  {
    title: "Transactions sécurisées",
    text:
      "Toutes vos transactions bénéficient de technologies de protection adaptées.",
    icon: ShieldCheck,
  },
  {
    title: "Confidentialité garantie",
    text:
      "Vos informations personnelles et bancaires restent strictement confidentielles.",
    icon: LockKeyhole,
  },
  {
    title: "Service client à votre écoute",
    text:
      "Notre équipe est disponible pour répondre à vos questions concernant vos paiements.",
    icon: Headphones,
  },
  {
    title: "Achetez en toute confiance",
    text:
      "Profitez d’une expérience d’achat simple, claire et sécurisée avec SBI PARIS.",
    icon: CheckCircle2,
  },
];

export default function PaiementSecurisePage() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">
          <Home size={15} aria-hidden="true" />
          Accueil
        </Link>

        <span aria-hidden="true">›</span>
        <strong>Paiement sécurisé</strong>
      </div>

      <section className={styles.hero}>
        <span className={styles.kicker}>TRANSACTIONS PROTÉGÉES</span>

        <h1>Paiement sécurisé</h1>

        <span className={styles.titleLine} />

        <p>
          Chez SBI PARIS, la sécurité de vos paiements est une priorité.
          Nous mettons tout en œuvre pour garantir des transactions sûres,
          fiables et confidentielles à chaque commande.
        </p>
      </section>

      <section className={styles.mainGrid}>
        <div className={styles.securityColumn}>
          <div className={styles.sectionHeading}>
            <ShieldCheck size={34} strokeWidth={1.6} />
            <h2>Notre engagement sécurité</h2>
          </div>

          <div className={styles.securityList}>
            {securityItems.map((item) => {
              const Icon = item.icon;

              return (
                <article className={styles.securityItem} key={item.title}>
                  <span className={styles.securityIcon}>
                    <Icon size={26} strokeWidth={1.6} />
                  </span>

                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        <aside className={styles.paymentCard}>
          <h2>Moyens de paiement acceptés</h2>
          <span className={styles.cardLine} />

          <div className={styles.paymentGroup}>
            <h3>Cartes bancaires</h3>

            <div className={styles.paymentLogos}>
              <span className={styles.visa}>VISA</span>

              <span className={styles.mastercard} aria-label="Mastercard">
                <i />
                <i />
              </span>

              <span className={styles.amex}>AMEX</span>

              <span className={styles.cb}>CB</span>
            </div>
          </div>

          <div className={styles.paymentGroup}>
            <h3>Paiements en ligne</h3>

            <div className={styles.paymentLogos}>
              <span className={styles.paypal}>PayPal</span>
              <span className={styles.applePay}> Pay</span>
              <span className={styles.googlePay}>G Pay</span>
            </div>
          </div>

          <div className={styles.paymentGroup}>
            <h3>Autres moyens de paiement</h3>

            <div className={styles.bankTransfer}>
              <Banknote size={25} strokeWidth={1.5} />
              <span>Virement bancaire</span>
            </div>
          </div>

          <p className={styles.disclaimer}>
            Les moyens de paiement réellement disponibles peuvent varier
            selon le pays, la devise, le montant de la commande et les services
            activés au moment du paiement.
          </p>
        </aside>
      </section>

      <section className={styles.reassuranceGrid}>
        {reassuranceItems.map((item) => {
          const Icon = item.icon;

          return (
            <article className={styles.reassuranceItem} key={item.title}>
              <span>
                <Icon size={35} strokeWidth={1.5} />
              </span>

              <div>
                <h2>{item.title}</h2>
                <p>{item.text}</p>
              </div>
            </article>
          );
        })}
      </section>

      <section className={styles.infoStrip}>
        <BadgeCheck size={28} strokeWidth={1.5} />

        <p>
          Les logos et marques de paiement appartiennent à leurs propriétaires
          respectifs. SBI PARIS ne conserve jamais les données complètes de
          votre carte bancaire.
        </p>
      </section>
    </main>
  );
}
