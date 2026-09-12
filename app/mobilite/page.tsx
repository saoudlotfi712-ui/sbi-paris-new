"use client";

import Link from "next/link";
import {useTranslations} from "next-intl";

export default function MobilitePage() {
  const t = useTranslations("mobilitePage");
  const items = [
    {label: t("section.items.electricScooters"), slug: "trottinettes-electriques"},
    {label: t("section.items.electricBikes"), slug: "velos-electriques"},
    {label: t("section.items.electricLuggage"), slug: "valises-electriques"},
  ];
  return (
    <main className="hommeLuxuryPage">
      <section className="hommeLuxuryLayout">
        <aside className="hommeAccordionBox">
          <h1>{t("pageTitle")}</h1>
          <div className="accordionSection open">
            <button type="button"><span>{t("section.title")}</span><b>−</b></button>
            <div className="accordionContent">{items.map((item) => <Link key={item.slug} href={`/produits/${item.slug}`}>○ {item.label}</Link>)}</div>
          </div>
        </aside>
        <section className="hommeLuxuryContent">
          <p className="hommeBreadcrumb">{t("breadcrumb.home")} › {t("breadcrumb.mobility")}</p>
          <h2>{t("section.title")}</h2>
          <p className="hommeDescription">{t("section.description")}</p>
          <div className="categoryCards">{items.map((item) => (
            <Link className="categoryCard" href={`/produits/${item.slug}`} key={item.slug}>
              <div className="categoryIcon">◎</div><h3>{item.label}</h3><span>{t("discover")} →</span>
            </Link>
          ))}</div>
        </section>
      </section>
    </main>
  );
}
