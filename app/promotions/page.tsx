"use client";

import Link from "next/link";
import {useState} from "react";
import {useTranslations} from "next-intl";

export default function PromotionsPage() {
  const t = useTranslations("promotionsPage");

  const sections = {
    promotions: {
      title: t("sections.promotions.title"),
      description: t("sections.promotions.description"),
      items: [{label: t("sections.promotions.items.promotions"), slug: "promotions"}],
    },
    nouveautes: {
      title: t("sections.news.title"),
      description: t("sections.news.description"),
      items: [{label: t("sections.news.items.news"), slug: "nouveautes"}],
    },
  };

  const [active, setActive] = useState<keyof typeof sections>("promotions");
  const current = sections[active];

  return (
    <main className="hommeLuxuryPage">
      <section className="hommeLuxuryLayout">
        <aside className="hommeAccordionBox">
          <h1>{t("pageTitle")}</h1>
          {Object.entries(sections).map(([key, section]) => (
            <div key={key} className={`accordionSection ${active === key ? "open" : ""}`}>
              <button type="button" onClick={() => setActive(key as keyof typeof sections)}>
                <span>{section.title}</span><b>{active === key ? "−" : "+"}</b>
              </button>
              <div className="accordionContent">
                {section.items.map((item) => (
                  <Link key={item.slug} href={`/produits/${item.slug}`}>○ {item.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </aside>

        <section className="hommeLuxuryContent">
          <p className="hommeBreadcrumb">
            {t("breadcrumb.home")} › {t("breadcrumb.promotionsAndNews")} › {current.title}
          </p>
          <h2>{current.title}</h2>
          <p className="hommeDescription">{current.description}</p>
          <div className="categoryCards">
            {current.items.map((item) => (
              <Link className="categoryCard" href={`/produits/${item.slug}`} key={item.slug}>
                <div className="categoryIcon">◎</div>
                <h3>{item.label}</h3>
                <span>{t("discover")} →</span>
              </Link>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
