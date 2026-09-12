import Image from "next/image";
import Link from "next/link";
import {
  useLocale,
  useTranslations,
} from "next-intl";

import styles from "./Footer.module.css";

export default function Footer() {
  const t = useTranslations("footer");
  const locale = useLocale();

  const serviceLinks = [
    {
      label: t("service.links.contact"),
      href: "/contact",
    },
    {
      label: t("service.links.faq"),
      href: "/faq",
    },
    {
      label: t("service.links.orderTracking"),
      href: "/suivi-commande",
    },
    {
      label: t("service.links.returns"),
      href: "/retours-echanges",
    },
  ];

  const companyLinks = [
    {
      label: t("company.links.about"),
      href: "/a-propos",
    },
    {
      label: t("company.links.professional"),
      href: "/espace-pro",
    },
    {
      label: t("company.links.stores"),
      href: "/nos-boutiques",
    },
    {
      label: t("company.links.careers"),
      href: "/carrieres",
    },
  ];

  const informationLinks = [
    {
      label: t("information.links.legal"),
      href: "/mentions-legales",
    },
    {
      label: t("information.links.terms"),
      href: "/cgv",
    },
    {
      label: t("information.links.privacy"),
      href: "/politique-de-confidentialite",
    },
    {
      label: t("information.links.securePayment"),
      href: "/paiement-securise",
    },
  ];

  const languageNames: Record<string, string> = {
    fr: "FRANÇAIS",
    en: "ENGLISH",
    ar: "العربية",
    de: "DEUTSCH",
    it: "ITALIANO",
    es: "ESPAÑOL",
    zh: "中文",
    cn: "中文",
  };

  const languageFlags: Record<string, string> = {
    fr: "🇫🇷",
    en: "🇬🇧",
    ar: "🇸🇦",
    de: "🇩🇪",
    it: "🇮🇹",
    es: "🇪🇸",
    zh: "🇨🇳",
    cn: "🇨🇳",
  };

  const newsletterConsent: Record<string, string> = {
    fr: "J’accepte de recevoir les actualités et offres SBI PARIS.",
    en: "I agree to receive SBI PARIS news and offers.",
    de: "Ich möchte Neuigkeiten und Angebote von SBI PARIS erhalten.",
    es: "Acepto recibir noticias y ofertas de SBI PARIS.",
    it: "Accetto di ricevere notizie e offerte da SBI PARIS.",
    ar: "أوافق على تلقي أخبار وعروض SBI PARIS.",
    zh: "我同意接收 SBI PARIS 的新闻和优惠信息。",
  };

  const privacyLabels: Record<string, string> = {
    fr: "Politique de confidentialité",
    en: "Privacy policy",
    de: "Datenschutzrichtlinie",
    es: "Política de privacidad",
    it: "Informativa sulla privacy",
    ar: "سياسة الخصوصية",
    zh: "隐私政策",
  };

  const currentLanguage =
    languageNames[locale] ??
    locale.toUpperCase();

  const currentFlag =
    languageFlags[locale] ?? "🌐";

  const consentText =
    newsletterConsent[locale] ??
    newsletterConsent.fr;

  const privacyLabel =
    privacyLabels[locale] ??
    privacyLabels.fr;

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.brandColumn}>
            <Link
              href="/"
              className={styles.logoLink}
            >
              <Image
                src="/logo.png"
                alt="SBI PARIS"
                width={220}
                height={190}
                className={styles.logo}
              />
            </Link>

            <p className={styles.brandText}>
              {t("brand.line1")}
              <br />
              {t("brand.line2")}
            </p>

            <a
              className={styles.contactEmail}
              href="mailto:contactsbiparis@gmail.com"
            >
              contactsbiparis@gmail.com
            </a>
          </div>

          <div className={styles.newsletterColumn}>
            <span className={styles.kicker}>
              {t("newsletter.kicker")}
            </span>

            <h2>
              {t("newsletter.title")}
            </h2>

            <p>
              {t("newsletter.description")}
            </p>

            <form
              className={styles.newsletterForm}
              action="/api/contact"
              method="post"
            >
              <input
                type="hidden"
                name="type"
                value="newsletter"
              />

              <label
                htmlFor="footer-email"
                className={styles.srOnly}
              >
                {t("newsletter.emailLabel")}
              </label>

              <div className={styles.newsletterRow}>
                <input
                  id="footer-email"
                  name="email"
                  type="email"
                  placeholder={t(
                    "newsletter.emailPlaceholder",
                  )}
                  required
                />

                <button type="submit">
                  {t("newsletter.submit")}
                </button>
              </div>

              <label
                className={
                  styles.newsletterConsent
                }
              >
                <input
                  type="checkbox"
                  name="consent"
                  value="yes"
                  required
                />

                <span>
                  {consentText}{" "}
                  <Link href="/politique-de-confidentialite">
                    {privacyLabel}
                  </Link>
                </span>
              </label>
            </form>
          </div>

          <FooterLinks
            title={t("service.title")}
            links={serviceLinks}
          />

          <FooterLinks
            title={t("company.title")}
            links={companyLinks}
          />

          <div className={styles.linksColumn}>
            <h3>
              {t("information.title")}
            </h3>

            <span className={styles.titleLine} />

            <nav
              aria-label={
                t("information.title")
              }
            >
              {informationLinks.map(
                (item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ),
              )}

              <Link
                href="/tableau-des-tailles"
                className={styles.sizeGuide}
              >
                {t(
                  "information.links.sizeGuide",
                )}
              </Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>
            {t("copyright")}
          </p>

          <div className={styles.language}>
           <span
  className={`${styles.flagIcon} ${
    styles[`flag_${locale}`] ?? styles.flag_fr
  }`}
  aria-hidden="true"
/>

            <strong>
              {currentLanguage}
            </strong>

            <span aria-hidden="true">
              ⌄
            </span>
          </div>
          
        </div>
      </div>
    </footer>
  );
}

type FooterLinksProps = {
  title: string;

  links: {
    label: string;
    href: string;
  }[];
};

function FooterLinks({
  title,
  links,
}: FooterLinksProps) {
  return (
    <div className={styles.linksColumn}>
      <h3>
        {title}
      </h3>

      <span className={styles.titleLine} />

      <nav aria-label={title}>
        {links.map((item) => (
          <Link
            key={item.href}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}