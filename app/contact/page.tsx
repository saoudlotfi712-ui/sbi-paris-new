import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import styles from "./contact.module.css";

const contactItems = [
  {
    title: "Téléphone",
    value: "+33 6 22 19 68 58",
    href: "tel:+33622196858",
    icon: Phone,
  },
  {
    title: "WhatsApp",
    value: "+33 6 43 02 10 21",
    href: "https://wa.me/33643021021",
    icon: MessageCircle,
  },
  {
    title: "E-mail",
    value: "contact@sbiparis.com",
    href: "mailto:contact@sbiparis.com",
    icon: Mail,
  },
];

export default function ContactPage() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">Accueil</Link>
        <span aria-hidden="true">›</span>
        <strong>Contactez-nous</strong>
      </div>

      <section className={styles.contactSection}>
        <aside className={styles.contactPanel}>
          <div className={styles.panelContent}>
            <span className={styles.kicker}>SERVICE CLIENT</span>

            <h1>Contactez-nous</h1>

            <span className={styles.redLine} />

            <p className={styles.intro}>
              Notre équipe est disponible pour répondre à vos questions
              concernant vos commandes, nos produits ou nos services.
            </p>

            <div className={styles.contactList}>
              {contactItems.map((item) => {
                const Icon = item.icon;
                const external = item.href.startsWith("https");

                return (
                  <a
                    key={item.title}
                    href={item.href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className={styles.contactItem}
                  >
                    <span className={styles.iconCircle}>
                      <Icon size={23} strokeWidth={1.6} />
                    </span>

                    <span className={styles.contactText}>
                      <strong>{item.title}</strong>
                      <small>{item.value}</small>
                    </span>
                  </a>
                );
              })}
            </div>

            <Link href="/" className={styles.backLink}>
              <ArrowLeft size={18} />
              Retour à l’accueil
            </Link>
          </div>

          <div
            className={styles.eiffelDecoration}
            aria-hidden="true"
          />
        </aside>

        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h2>Envoyez-nous un message</h2>
            <span className={styles.redLine} />

            <p>
              Remplissez le formulaire ci-dessous et nous vous répondrons
              rapidement.
            </p>
          </div>

          <form className={styles.form} action="mailto:contact@sbiparis.com" method="post" encType="text/plain">
            <div className={styles.twoColumns}>
              <FormField
                label="Nom et prénom"
                name="name"
                type="text"
                placeholder="Votre Nom et prénom"
                required
              />

              <FormField
                label="E-mail"
                name="email"
                type="email"
                placeholder="Votre adresse e-mail"
                required
              />
            </div>

            <div className={styles.twoColumns}>
              <FormField
                label="Téléphone"
                name="phone"
                type="tel"
                placeholder="Votre numéro de téléphone"
              />

              <FormField
                label="Sujet"
                name="subject"
                type="text"
                placeholder="Le sujet de votre message"
                required
              />
            </div>

            <label className={styles.field}>
              <span>
                Message <b>*</b>
              </span>

              <textarea
                name="message"
                rows={6}
                placeholder="Écrivez votre message ici..."
                required
              />
            </label>

            <button type="submit" className={styles.submitButton}>
              ENVOYER LE MESSAGE
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

type FormFieldProps = {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
};

function FormField({
  label,
  name,
  type,
  placeholder,
  required = false,
}: FormFieldProps) {
  return (
    <label className={styles.field}>
      <span>
        {label} {required && <b>*</b>}
      </span>

      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required={required}
      />
    </label>
  );
}
