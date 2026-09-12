"use client";

import Link from "next/link";
import {useState} from "react";
import {useTranslations} from "next-intl";

export default function FemmePage() {
  const t = useTranslations("femmePage");

  const sections = {
    sportive: {
      title: t("sections.sportive.title"),
      description: t("sections.sportive.description"),
      items: [
        { label: t("sections.sportive.items.polosSport"), slug: "polos-sport-femme" },
        { label: t("sections.sportive.items.tankTops"), slug: "debardeurs-femme" },
        { label: t("sections.sportive.items.shorts"), slug: "shorts-sport-femme" },
        { label: t("sections.sportive.items.tracksuits"), slug: "survetements-femme" },
        { label: t("sections.sportive.items.sportShoes"), slug: "chaussures-sport-femme" },
        { label: t("sections.sportive.items.caps"), slug: "casquettes-femme" },
      ],
    },
    classique: {
      title: t("sections.classique.title"),
      description: t("sections.classique.description"),
      items: [
        { label: t("sections.classique.items.polos"), slug: "polos-femme" },
        { label: t("sections.classique.items.shirts"), slug: "chemises-femme" },
        { label: t("sections.classique.items.dresses"), slug: "robes-femme" },
        { label: t("sections.classique.items.trousers"), slug: "pantalons-femme" },
        { label: t("sections.classique.items.jackets"), slug: "vestes-femme" },
        { label: t("sections.classique.items.cityShoes"), slug: "chaussures-ville-femme" },
      ],
    },
    essentiels: {
      title: t("sections.essentiels.title"),
      description: t("sections.essentiels.description"),
      items: [
        { label: t("sections.essentiels.items.socks"), slug: "chaussettes-femme" },
        { label: t("sections.essentiels.items.lingerie"), slug: "lingerie-femme" },
      ],
    }
  };

  const [active, setActive] = useState<keyof typeof sections>("sportive");
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

          <div className="universSportCard">
            <div className="universOverlay" />
            <h2><span>{t("sportUniverse.title1")} </span><span className="red">{t("sportUniverse.title2")}</span></h2>
            <p>{t("sportUniverse.description")}</p>
            <Link href="/univers-sport-femme" className="universButton">
              {t("sportUniverse.button")} <span aria-hidden="true">→</span>
            </Link>
          </div>
        </aside>

        <section className="hommeLuxuryContent">
          <p className="hommeBreadcrumb">{t("breadcrumb.home")} › {t("breadcrumb.women")} › {current.title}</p>
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
