import Image from "next/image";
import Link from "next/link";
import {useTranslations} from "next-intl";
import {
  BadgePercent,
  CheckCircle2,
  FileText,
  Globe2,
  Headphones,
  ShieldCheck,
  Truck,
  UserPlus,
} from "lucide-react";

import styles from "./page.module.css";

export default function EspaceProPage() {
  const t = useTranslations("espacePro");

  const advantages = [
    {
      title: t("advantages.items.prices.title"),
      description: t("advantages.items.prices.description"),
      icon: BadgePercent,
    },
    {
      title: t("advantages.items.delivery.title"),
      description: t("advantages.items.delivery.description"),
      icon: Globe2,
    },
    {
      title: t("advantages.items.support.title"),
      description: t("advantages.items.support.description"),
      icon: Headphones,
    },
    {
      title: t("advantages.items.quality.title"),
      description: t("advantages.items.quality.description"),
      icon: ShieldCheck,
    },
  ];

  const universes = [
    {
      title: t("universes.items.men"),
      image: "/espace-pro/images/partner.jpg",
      href: "/homme",
    },
    {
      title: t("universes.items.women"),
      image: "/espace-pro/images/warehouse.jpg",
      href: "/femme",
    },
    {
      title: t("universes.items.children"),
      image: "/espace-pro/images/hero.jpg",
      href: "/enfant",
    },
    {
      title: t("universes.items.sport"),
      image: "/univers-sport/femme/products/running.jpg",
      href: "/univers-sport-femme",
    },
    {
      title: t("universes.items.perfume"),
      image: "/espace-pro/images/warehouse.jpg",
      href: "/parfum",
    },
    {
      title: t("universes.items.mobility"),
      image: "/espace-pro/images/partner.jpg",
      href: "/mobilite",
    },
  ];

  const steps = [
    {
      number: "01",
      title: t("steps.items.account.title"),
      description: t("steps.items.account.description"),
      icon: UserPlus,
    },
    {
      number: "02",
      title: t("steps.items.quote.title"),
      description: t("steps.items.quote.description"),
      icon: FileText,
    },
    {
      number: "03",
      title: t("steps.items.order.title"),
      description: t("steps.items.order.description"),
      icon: CheckCircle2,
    },
    {
      number: "04",
      title: t("steps.items.delivery.title"),
      description: t("steps.items.delivery.description"),
      icon: Truck,
    },
  ];

  const stats = [
    {
      value: "1994",
      label: t("stats.creation"),
    },
    {
      value: "30+",
      label: t("stats.countries"),
    },
    {
      value: "150+",
      label: t("stats.collections"),
    },
    {
      value: "98%",
      label: t("stats.customers"),
    },
  ];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <Image
          src="/espace-pro/images/hero.jpg"
          alt={t("hero.imageAlt")}
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />

        <div className={styles.heroOverlay} />

        <div className={styles.heroContainer}>
          <div className={styles.heroContent}>
            <p className={styles.kicker}>{t("hero.kicker")}</p>

            <h1>
              {t("hero.title.line1")}
              <br />
              {t("hero.title.line2")}
              <br />
              {t("hero.title.line3")} <span>SBI PARIS</span>
            </h1>

            <p className={styles.heroDescription}>
              {t("hero.description")}
            </p>

            <div className={styles.heroActions}>
              <Link href="#avantages" className={styles.primaryButton}>
                {t("hero.buttons.advantages")}
              </Link>

              <Link href="#contact" className={styles.secondaryButton}>
                {t("hero.buttons.quote")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="avantages" className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>{t("advantages.title")}</h2>
            <span />
          </div>

          <div className={styles.advantagesGrid}>
            {advantages.map((item) => {
              const Icon = item.icon;

              return (
                <article key={item.title} className={styles.advantageCard}>
                  <Icon className={styles.advantageIcon} />

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.universSection}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>{t("universes.title")}</h2>
            <span />
          </div>

          <div className={styles.universGrid}>
            {universes.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className={styles.universeCard}
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 700px) 50vw, 17vw"
                  className={styles.universeImage}
                />

                <div className={styles.universeOverlay} />

                <div className={styles.universeContent}>
                  <h3>{item.title}</h3>
                  <span />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section><section className={styles.stepsSection}>
        <div className={styles.container}>
          <div className={styles.sectionTitle}>
            <h2>{t("steps.title")}</h2>
            <span />
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step, index) => {
              const Icon = step.icon;

              return (
                <article key={step.number} className={styles.step}>
                  <div className={styles.stepTop}>
                    <span className={styles.stepNumber}>{step.number}</span>

                    {index < steps.length - 1 && (
                      <span className={styles.stepLine} />
                    )}
                  </div>

                  <Icon className={styles.stepIcon} size={42} />

                  <h3>{step.title}</h3>

                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.statsContainer}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className={styles.formSection}>
        <div className={styles.formContainer}>
          <div className={styles.formColumn}>
            <p className={styles.formKicker}>{t("form.kicker")}</p>

            <h2>
              {t("form.title.line1")}
              <br />
              {t("form.title.line2")}
            </h2>

            <div className={styles.titleLine} />

            <form className={styles.form}>
              <div className={styles.formGrid}>
                <label>
                  <span>{t("form.fields.fullName")}</span>
                  <input
                    type="text"
                    name="fullName"
                    placeholder={t("form.placeholders.fullName")}
                    required
                  />
                </label>

                <label>
                  <span>{t("form.fields.company")}</span>
                  <input
                    type="text"
                    name="company"
                    placeholder={t("form.placeholders.company")}
                    required
                  />
                </label>

                <label>
                  <span>{t("form.fields.email")}</span>
                  <input
                    type="email"
                    name="email"
                    placeholder={t("form.placeholders.email")}
                    required
                  />
                </label>

                <label>
                  <span>{t("form.fields.phone")}</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder={t("form.placeholders.phone")}
                    required
                  />
                </label>

                <label>
                  <span>{t("form.fields.country")}</span>
                  <input
                    type="text"
                    name="country"
                    placeholder={t("form.placeholders.country")}
                    required
                  />
                </label>

                <label>
                  <span>{t("form.fields.city")}</span>
                  <input
                    type="text"
                    name="city"
                    placeholder={t("form.placeholders.city")}
                    required
                  />
                </label>

                <label>
                  <span>{t("form.fields.activity")}</span>
                  <select name="activity" defaultValue="" required>
                    <option value="" disabled>
                      {t("form.activity.placeholder")}
                    </option>
                    <option value="grossiste">
                      {t("form.activity.grossiste")}
                    </option>
                    <option value="distributeur">
                      {t("form.activity.distributeur")}
                    </option>
                    <option value="importateur">
                      {t("form.activity.importateur")}
                    </option>
                    <option value="boutique">
                      {t("form.activity.boutique")}
                    </option>
                    <option value="marketplace">
                      {t("form.activity.marketplace")}
                    </option>
                    <option value="autre">
                      {t("form.activity.other")}
                    </option>
                  </select>
                </label>

                <label>
                  <span>{t("form.fields.volume")}</span>
                  <select name="volume" defaultValue="" required>
                    <option value="" disabled>
                      {t("form.volume.placeholder")}
                    </option>
                    <option value="moins-5000">
                      {t("form.volume.less5000")}
                    </option>
                    <option value="5000-15000">
                      {t("form.volume.from5000to15000")}
                    </option>
                    <option value="15000-50000">
                      {t("form.volume.from15000to50000")}
                    </option>
                    <option value="plus-50000">
                      {t("form.volume.more50000")}
                    </option>
                  </select>
                </label>

                <label>
                  <span>{t("form.fields.category")}</span>
                  <select name="category" defaultValue="" required>
                    <option value="" disabled>
                      {t("form.category.placeholder")}
                    </option>
                    <option value="mode-homme">
                      {t("form.category.men")}
                    </option>
                    <option value="mode-femme">
                      {t("form.category.women")}
                    </option>
                    <option value="enfant">
                      {t("form.category.children")}
                    </option>
                    <option value="sport">
                      {t("form.category.sport")}
                    </option>
                    <option value="parfum">
                      {t("form.category.perfume")}
                    </option>
                    <option value="mobilite">
                      {t("form.category.mobility")}
                    </option>
                    <option value="plusieurs">
                      {t("form.category.multiple")}
                    </option>
                  </select>
                </label>

                <label>
                  <span>{t("form.fields.website")}</span>
                  <input
                    type="url"
                    name="website"
                    placeholder={t("form.placeholders.website")}
                  />
                </label>
              </div>

              <label className={styles.messageField}>
                <span>{t("form.fields.message")}</span>
                <textarea
                  name="message"
                  rows={6}
                  placeholder={t("form.placeholders.message")}
                />
              </label>

              <button type="submit" className={styles.submitButton}>
                {t("form.submit")}
              </button>
            </form>
          </div>

          <div className={styles.formImageWrapper}><Image
              src="/espace-pro/images/warehouse.jpg"
              alt={t("form.imageAlt")}
              fill
              sizes="(max-width: 1100px) 100vw, 45vw"
              className={styles.formImage}
            />

            <div className={styles.formImageOverlay} />

            <div className={styles.imageBadge}>
              <Truck size={34} />

              <div>
                <strong>{t("form.badge.title")}</strong>
                <span>{t("form.badge.description")}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.partnerSection}>
        <Image
          src="/espace-pro/images/partner.jpg"
          alt={t("partner.imageAlt")}
          fill
          sizes="100vw"
          className={styles.partnerImage}
        />

        <div className={styles.partnerOverlay} />

        <div className={styles.partnerContainer}>
          <div className={styles.partnerContent}>
            <p className={styles.partnerKicker}>
              {t("partner.kicker")}
            </p>

            <h2>
              {t("partner.title.line1")}
              <span>SBI PARIS</span>
            </h2>

            <p className={styles.partnerDescription}>
              {t("partner.description")}
            </p>

            <Link href="#contact" className={styles.partnerButton}>
              {t("partner.button")}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
