"use client";

import Link from "next/link";
import {useState} from "react";
import {useTranslations} from "next-intl";

export default function ParfumPage() {
  const t = useTranslations("parfumPage");

  const sections = {
    homme: {
      title: t("sections.men.title"),
      description: t("sections.men.description"),
      items: [
        { label: t("sections.men.items.perfumes"), slug: "parfums-homme" },
        { label: t("sections.men.items.boysPerfumes"), slug: "parfums-garcon" },
      ],
    },
    femme: {
      title: t("sections.women.title"),
      description: t("sections.women.description"),
      items: [
        { label: t("sections.women.items.perfumes"), slug: "parfums-femme" },
        { label: t("sections.women.items.girlsPerfumes"), slug: "parfums-fille" },
      ],
    }
  };

  const [active, setActive] = useState<keyof typeof sections>("homme");
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
          <p className="hommeBreadcrumb">{t("breadcrumb.home")} › {t("breadcrumb.perfume")} › {current.title}</p>
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
