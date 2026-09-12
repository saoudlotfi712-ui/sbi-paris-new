"use client";

import Link from "next/link";
import {
  useLocale,
  useTranslations,
} from "next-intl";
import {
  ArrowLeft,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";

import styles from "./contact.module.css";

const consentTexts: Record<string, string> = {
  fr: "J’accepte que mes données soient utilisées pour répondre à ma demande.",
  en: "I agree that my data may be used to respond to my request.",
  de: "Ich stimme zu, dass meine Daten zur Beantwortung meiner Anfrage verwendet werden.",
  es: "Acepto que mis datos se utilicen para responder a mi solicitud.",
  it: "Accetto che i miei dati siano utilizzati per rispondere alla mia richiesta.",
  ar: "أوافق على استخدام بياناتي للرد على طلبي.",
  zh: "我同意使用我的个人信息来回复我的请求。",
};

export default function ContactPage() {
  const t = useTranslations("contactPage");
  const locale = useLocale();

  const consentText =
    consentTexts[locale] ??
    consentTexts.fr;

  const contactItems = [
    {
      title: t("contact.phone"),
      value: "+33 6 22 19 68 58",
      href: "tel:+33622196858",
      icon: Phone,
    },
    {
      title: t("contact.whatsapp"),
      value: "+33 6 43 02 10 21",
      href: "https://wa.me/33643021021",
      icon: MessageCircle,
    },
    {
      title: t("contact.email"),
      value: "contactsbiparis@gmail.com",
      href: "mailto:contactsbiparis@gmail.com",
      icon: Mail,
    },
  ];

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">
          {t("breadcrumb.home")}
        </Link>

        <span aria-hidden="true">›</span>

        <strong>
          {t("breadcrumb.contact")}
        </strong>
      </div>

      <section className={styles.contactSection}>
        <aside className={styles.contactPanel}>
          <div className={styles.panelContent}>
            <span className={styles.kicker}>
              {t("kicker")}
            </span>

            <h1>{t("title")}</h1>

            <span className={styles.redLine} />

            <p className={styles.intro}>
              {t("description")}
            </p>

            <div className={styles.contactList}>
              {contactItems.map((item) => {
                const Icon = item.icon;

                const external =
                  item.href.startsWith("https");

                return (
                  <a
                    key={item.href}
                    href={item.href}
                    target={
                      external
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      external
                        ? "noopener noreferrer"
                        : undefined
                    }
                    className={styles.contactItem}
                  >
                    <span
                      className={
                        styles.iconCircle
                      }
                    >
                      <Icon
                        size={23}
                        strokeWidth={1.6}
                      />
                    </span>

                    <span
                      className={
                        styles.contactText
                      }
                    >
                      <strong>
                        {item.title}
                      </strong>

                      <small>
                        {item.value}
                      </small>
                    </span>
                  </a>
                );
              })}
            </div>

            <Link
              href="/"
              className={styles.backLink}
            >
              <ArrowLeft size={18} />
              {t("backHome")}
            </Link>
          </div>

          <div
            className={
              styles.eiffelDecoration
            }
            aria-hidden="true"
          />
        </aside>

        <div className={styles.formPanel}>
          <div className={styles.formHeader}>
            <h2>{t("form.title")}</h2>

            <span className={styles.redLine} />

            <p>{t("form.description")}</p>
          </div>

          <form
            className={styles.form}
            action="/api/contact"
            method="post"
          >
            <input
              type="hidden"
              name="type"
              value="contact"
            />

            <div className={styles.twoColumns}>
              <FormField
                label={t(
                  "form.fields.name.label",
                )}
                name="name"
                type="text"
                placeholder={t(
                  "form.fields.name.placeholder",
                )}
                required
              />

              <FormField
                label={t(
                  "form.fields.email.label",
                )}
                name="email"
                type="email"
                placeholder={t(
                  "form.fields.email.placeholder",
                )}
                required
              />
            </div>

            <div className={styles.twoColumns}>
              <FormField
                label={t(
                  "form.fields.phone.label",
                )}
                name="phone"
                type="tel"
                placeholder={t(
                  "form.fields.phone.placeholder",
                )}
              />

              <FormField
                label={t(
                  "form.fields.subject.label",
                )}
                name="subject"
                type="text"
                placeholder={t(
                  "form.fields.subject.placeholder",
                )}
                required
              />
            </div>

            <label className={styles.field}>
              <span>
                {t(
                  "form.fields.message.label",
                )}{" "}
                <b>*</b>
              </span>

              <textarea
                name="message"
                rows={6}
                placeholder={t(
                  "form.fields.message.placeholder",
                )}
                required
              />
            </label>

            <label>
              <input
                type="checkbox"
                name="consent"
                value="yes"
                required
              />{" "}
              {consentText}{" "}
              <Link href="/politique-de-confidentialite">
                Politique de confidentialité
              </Link>
            </label>

            <button
              type="submit"
              className={styles.submitButton}
            >
              {t("form.submit")}
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