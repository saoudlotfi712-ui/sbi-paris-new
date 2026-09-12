"use client";

import Link from "next/link";
import {useState} from "react";
import {useTranslations} from "next-intl";

export default function CollectionPage() {
  const t = useTranslations("collectionPage");

  const sections = {
    quotidien: {
      title: t("sections.quotidien.title"),
      description: t("sections.quotidien.description"),
      items: [
        { label: t("sections.quotidien.items.bags"), slug: "sacs" },
        { label: t("sections.quotidien.items.leatherGoods"), slug: "maroquinerie" },
        { label: t("sections.quotidien.items.luggage"), slug: "valises" },
        { label: t("sections.quotidien.items.accessories"), slug: "accessoires" },
      ],
    },
    signature: {
      title: t("sections.signature.title"),
      description: t("sections.signature.description"),
      items: [
        { label: t("sections.signature.items.craftsmanship"), slug: "artisanat" },
        { label: t("sections.signature.items.traditionalFashion"), slug: "mode-traditionnelle" },
      ],
    }
  };

  const [active, setActive] = useState<keyof typeof sections>("quotidien");
  const current = sections[active];

  return (
    <main className="hommeLuxuryPage">
      <section className="hommeLuxuryLayout">
        <aside className="hommeAccordionBox">
          <h1>{t("title")}</h1>
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
          <p className="hommeBreadcrumb">{t("breadcrumb.home")} › {t("breadcrumb.collection")} › {current.title}</p>
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
