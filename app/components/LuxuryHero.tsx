"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import styles from "./LuxuryHero.module.css";

const heroImages = [
  "/banner.jpg",
  "/hero-slider/hero-2.jpg",
  "/hero-slider/hero-3.jpg",
];

export default function LuxuryHero() {
  const t = useTranslations("hero");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setCurrentImage((current) =>
        (current + 1) % heroImages.length
      );
    }, 3000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <section
      className={styles.hero}
      style={{ position: "relative" }}
    >
      {heroImages.map((src, index) => (
        <img
          key={src}
          src={src}
          alt={t("imageAlt")}
          className={styles.image}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: currentImage === index ? 1 : 0,
            transition: "opacity 900ms ease-in-out",
            zIndex: 0,
          }}
        />
      ))}

      <div
        className={styles.overlay}
        style={{ zIndex: 1 }}
      />

      <div
        className={styles.content}
        style={{
          position: "relative",
          zIndex: 2,
        }}
      >
        <p className={styles.brand}>SBI PARIS</p>

        <h1 className={styles.title}>
          <span>{t("title.line1")}</span>

          <span className={styles.red}>
            {t("title.line2")}
          </span>

          <span>{t("title.line3")}</span>
        </h1>

        <p className={styles.description}>
          {t("description.line1")}
          <br />
          {t("description.line2")}
        </p>

        <div className={styles.actions}>
          <Link
            href="/collection"
            className={styles.primaryButton}
          >
            {t("buttons.collection")}
          </Link>

          <Link
            href="/promotions"
            className={styles.secondaryButton}
          >
            {t("buttons.news")}
          </Link>
        </div>

        <div className={styles.stats}>
          <Stat value="1994" label={t("stats.paris")} />
          <Stat value="30" label={t("stats.countries")} />
        </div>
      </div>
    </section>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className={styles.stat}>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
