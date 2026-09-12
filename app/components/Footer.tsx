import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

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
      href: "/boutiques",
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

  const currentLanguage =
    languageNames[locale] ?? locale.toUpperCase();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.topGrid}>
          <div className={styles.brandColumn}>
            <Link href="/" className={styles.logoLink}>
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
              href="mailto:contact@sbiparis.com"
            >
              contact@sbiparis.com
            </a>

            <div className={styles.socials}>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <span aria-hidden="true">f</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <span aria-hidden="true">◎</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <span aria-hidden="true">♪</span>
              </a>

              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span aria-hidden="true">in</span>
              </a>
            </div>
          </div>

          <div className={styles.newsletterColumn}>
            <span className={styles.kicker}>
              {t("newsletter.kicker")}
            </span>

            <h2>{t("newsletter.title")}</h2>

            <p>{t("newsletter.description")}</p>

            <form className={styles.newsletterForm} action="mailto:contact@sbiparis.com" method="post" encType="text/plain">
              <label
                htmlFor="footer-email"
                className={styles.srOnly}
              >
                {t("newsletter.emailLabel")}
              </label>

              <input
                id="footer-email"
                name="email"
                type="email"
                placeholder={t("newsletter.emailPlaceholder")}
                required
              />

              <button type="submit">
                {t("newsletter.submit")}
              </button>
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
            <h3>{t("information.title")}</h3>
            <span className={styles.titleLine} />

            <nav aria-label={t("information.title")}>
              {informationLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                >
                  {item.label}
                </Link>
              ))}

              <Link
                href="/tableau-des-tailles"
                className={styles.sizeGuide}
              >
                {t("information.links.sizeGuide")}
              </Link>
            </nav>
          </div>
        </div>

        <div className={styles.bottomBar}>
          <p>{t("copyright")}</p>

          <div className={styles.language}>
            <span
              className={styles.flag}
              aria-hidden="true"
            >
              <i />
              <i />
              <i />
            </span>

            <strong>{currentLanguage}</strong>
            <span aria-hidden="true">⌄</span>
          </div>

          <div
            className={styles.payments}
            aria-label={t("paymentsLabel")}
          >
            <span className={styles.visa}>
              VISA
            </span>

            <span
              className={styles.mastercard}
              aria-label="Mastercard"
            >
              <i />
              <i />
            </span>

            <span className={styles.amex}>
              AMEX
            </span>

            <span className={styles.applePay}>
               Pay
            </span>

            <span className={styles.paypal}>
              PayPal
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
      <h3>{title}</h3>
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
