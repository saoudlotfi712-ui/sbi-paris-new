"use client";

import Link from "next/link";
import {useState} from "react";
import {useTranslations} from "next-intl";

export default function EnfantPage() {
  const t = useTranslations("enfantPage");

  const sections = {
    garcon: {
      title: t("sections.boy.title"),
      description: t("sections.boy.description"),
      items: [
        { label: t("sections.boy.items.polos"), slug: "polos-garcon" },
        { label: t("sections.boy.items.shorts"), slug: "shorts-garcon" },
        { label: t("sections.boy.items.trousers"), slug: "pantalons-garcon" },
        { label: t("sections.boy.items.jackets"), slug: "vestes-garcon" },
        { label: t("sections.boy.items.shoes"), slug: "chaussures-garcon" },
        { label: t("sections.boy.items.caps"), slug: "casquettes-garcon" },
      ],
    },
    fille: {
      title: t("sections.girl.title"),
      description: t("sections.girl.description"),
      items: [
        { label: t("sections.girl.items.dresses"), slug: "robes-fille" },
        { label: t("sections.girl.items.polos"), slug: "polos-fille" },
        { label: t("sections.girl.items.shorts"), slug: "shorts-fille" },
        { label: t("sections.girl.items.trousers"), slug: "pantalons-fille" },
        { label: t("sections.girl.items.jackets"), slug: "vestes-fille" },
        { label: t("sections.girl.items.shoes"), slug: "chaussures-fille" },
      ],
    }
  };

  const [active, setActive] = useState<keyof typeof sections>("garcon");
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
          <p className="hommeBreadcrumb">{t("breadcrumb.home")} › {t("breadcrumb.children")} › {current.title}</p>
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
