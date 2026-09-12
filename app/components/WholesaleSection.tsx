import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowRight,
  BadgePercent,
  Headphones,
  ShieldCheck,
  Truck,
} from "lucide-react";

import styles from "./WholesaleSection.module.css";

export default function WholesaleSection() {
  const t = useTranslations("wholesale");

  const benefits = [
    {
      title: t("benefits.prices.title"),
      description: t("benefits.prices.description"),
      icon: BadgePercent,
    },
    {
      title: t("benefits.delivery.title"),
      description: t("benefits.delivery.description"),
      icon: Truck,
    },
    {
      title: t("benefits.support.title"),
      description: t("benefits.support.description"),
      icon: Headphones,
    },
    {
      title: t("benefits.quality.title"),
      description: t("benefits.quality.description"),
      icon: ShieldCheck,
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.card}>
          <div className={styles.imageWrapper}>
            <Image
              src="/wholesale/warehouse.jpg"
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 900px) 100vw, 34vw"
              className={styles.image}
            />

            <div className={styles.imageOverlay} aria-hidden="true" />
          </div>

          <div className={styles.intro}>
            <p className={styles.kicker}>{t("kicker")}</p>

            <h2>
              {t("title.line1")}
              <span>{t("title.line2")}</span>
            </h2>

            <p className={styles.description}>
              {t("description")}
            </p>

            <Link href="/espace-pro" className={styles.button}>
              {t("button")}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          </div>

          <div className={styles.benefits}>
            {benefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div className={styles.benefit} key={benefit.title}>
                  <div className={styles.iconBox}>
                    <Icon size={25} strokeWidth={1.7} aria-hidden="true" />
                  </div>

                  <div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
