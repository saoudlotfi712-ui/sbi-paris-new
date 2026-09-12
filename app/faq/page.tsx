import Link from "next/link";
import {
  ArrowRight,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import styles from "./faq.module.css";

const faqItems = [
  {
    question: "Quels sont les délais de livraison ?",
    answer:
      "Les commandes sont généralement livrées sous 2 à 5 jours ouvrés en France métropolitaine. Pour les livraisons internationales, le délai varie généralement entre 5 et 10 jours ouvrés selon la destination.",
  },
  {
    question: "Puis-je suivre ma commande ?",
    answer:
      "Oui. Dès l’expédition de votre commande, vous recevrez un e-mail contenant votre numéro de suivi. Vous pourrez également consulter l’état de votre commande depuis la page Suivi de commande.",
  },
  {
    question: "Quels sont les modes de paiement acceptés ?",
    answer:
      "Nous acceptons les principales cartes bancaires, notamment Visa, Mastercard et American Express, ainsi que PayPal et Apple Pay lorsque ces options sont disponibles.",
  },
  {
    question: "Puis-je retourner ou échanger un article ?",
    answer:
      "Vous disposez de 30 jours après réception de votre commande pour demander un retour ou un échange. Les articles doivent être non portés, non lavés et retournés dans leur emballage d’origine.",
  },
  {
    question: "Comment choisir la bonne taille ?",
    answer:
      "Consultez notre Tableau des tailles pour comparer vos mesures avec celles de nos vêtements et chaussures. En cas d’hésitation entre deux tailles, nous vous conseillons généralement de choisir la taille supérieure.",
  },
  {
    question: "Les produits SBI PARIS sont-ils authentiques ?",
    answer:
      "Oui. Tous les produits proposés sur notre site sont soigneusement sélectionnés et commercialisés par SBI PARIS afin de garantir leur qualité et leur authenticité.",
  },
  {
    question: "Comment contacter le service client ?",
    answer:
      "Notre équipe est joignable par téléphone, WhatsApp et e-mail. Vous pouvez également utiliser le formulaire disponible sur notre page Contactez-nous.",
  },
];

export default function FaqPage() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">Accueil</Link>
        <span aria-hidden="true">›</span>
        <strong>FAQ</strong>
      </div>

      <section className={styles.hero}>
        <h1>Questions fréquentes</h1>
        <span className={styles.titleLine} />

        <p>
          Retrouvez ci-dessous les réponses aux questions les plus courantes.
          <br />
          Si vous ne trouvez pas votre réponse, notre équipe est là pour vous
          aider.
        </p>
      </section>

      <section className={styles.content}>
        <aside className={styles.helpPanel}>
          <div className={styles.helpContent}>
            <span className={styles.kicker}>BESOIN D’AIDE ?</span>

            <h2>
              Nous sommes là
              <br />
              pour vous.
            </h2>

            <p>
              Notre équipe reste à votre disposition du lundi au dimanche,
              7j/7.
            </p>

            <div className={styles.contactList}>
              <ContactItem
                title="Téléphone"
                value="+33 6 22 19 68 58"
                href="tel:+33622196858"
                icon={<Phone size={21} strokeWidth={1.6} />}
              />

              <ContactItem
                title="WhatsApp"
                value="+33 6 43 02 10 21"
                href="https://wa.me/33643021021"
                icon={<MessageCircle size={21} strokeWidth={1.6} />}
                external
              />

              <ContactItem
                title="E-mail"
                value="contact@sbiparis.com"
                href="mailto:contact@sbiparis.com"
                icon={<Mail size={21} strokeWidth={1.6} />}
              />
            </div>

            <Link href="/contact" className={styles.contactButton}>
              NOUS CONTACTER
              <ArrowRight size={17} />
            </Link>
          </div>

          <div
            className={styles.eiffelDecoration}
            aria-hidden="true"
          />
        </aside>

        <div className={styles.faqList}>
          {faqItems.map((item, index) => (
            <details
              className={styles.faqItem}
              key={item.question}
              open={index === 0}
            >
              <summary>
                <span>
                  {index + 1}. {item.question}
                </span>

                <span className={styles.toggleIcon} aria-hidden="true" />
              </summary>

              <div className={styles.answer}>
                <p>{item.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

type ContactItemProps = {
  title: string;
  value: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
};

function ContactItem({
  title,
  value,
  href,
  icon,
  external = false,
}: ContactItemProps) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={styles.contactItem}
    >
      <span className={styles.iconCircle}>{icon}</span>

      <span className={styles.contactText}>
        <strong>{title}</strong>
        <small>{value}</small>
      </span>
    </a>
  );
}
