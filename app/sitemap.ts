import type { MetadataRoute } from "next";

import {
  catalogBySlug,
  catalogCategories,
} from "@/app/lib/catalog";

import { supabase } from "@/lib/supabase";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.sbiparis.com"
).replace(/\/+$/, "");

const locales = [
  "fr",
  "en",
  "de",
  "es",
  "it",
  "ar",
  "zh",
] as const;

export const revalidate = 3600;

type SitemapProduct = {
  id: string;
  category: string | null;
  subcategory: string | null;
  created_at: string | null;
};

const publicRoutes = [
  "/",
  "/a-propos",
  "/carrieres",
  "/cgv",
  "/collection",
  "/contact",
  "/enfant",
  "/espace-pro",
  "/faq",
  "/femme",
  "/homme",
  "/mentions-legales",
  "/mobilite",
  "/nos-boutiques",
  "/paiement-securise",
  "/parfum",
  "/politique-de-confidentialite",
  "/promotions",
  "/retours-echanges",
  "/tableau-des-tailles",
  "/univers-sport-homme",
  "/univers-sport-femme",
  "/univers-sport-football",
  "/univers-sport-basketball",
  "/univers-sport-tennis",
  "/univers-sport-padel",
  "/univers-sport-running",
];

function localizedUrl(
  locale: string,
  route: string,
) {
  return route === "/"
    ? `${SITE_URL}/${locale}`
    : `${SITE_URL}/${locale}${route}`;
}

function languageAlternates(route: string) {
  return {
    fr: localizedUrl("fr", route),
    en: localizedUrl("en", route),
    de: localizedUrl("de", route),
    es: localizedUrl("es", route),
    it: localizedUrl("it", route),
    ar: localizedUrl("ar", route),
    zh: localizedUrl("zh", route),
    "x-default": localizedUrl("fr", route),
  };
}

function getProductCategorySlug(
  category: string | null,
  subcategory: string | null,
): string | null {
  if (category === "parfum" && subcategory) {
    const perfumeSlug =
      `parfums-${subcategory}`;

    if (catalogBySlug.has(perfumeSlug)) {
      return perfumeSlug;
    }
  }

  if (
    category &&
    catalogBySlug.has(category)
  ) {
    return category;
  }

  return null;
}

export default async function sitemap():
  Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const entries: MetadataRoute.Sitemap = [];

  for (const route of publicRoutes) {
    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, route),
        lastModified: now,
        changeFrequency:
          route === "/"
            ? "daily"
            : "weekly",
        priority:
          route === "/"
            ? 1
            : 0.7,
        alternates: {
          languages:
            languageAlternates(route),
        },
      });
    }
  }

  for (const category of catalogCategories) {
    const route =
      `/produits/${category.slug}`;

    for (const locale of locales) {
      entries.push({
        url: localizedUrl(locale, route),
        lastModified: now,
        changeFrequency: "daily",
        priority: 0.8,
        alternates: {
          languages:
            languageAlternates(route),
        },
      });
    }
  }

  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      category,
      subcategory,
      created_at
    `)
    .eq("is_active", true);

  if (!error && data) {
    for (
      const row of data as SitemapProduct[]
    ) {
      const categorySlug =
        getProductCategorySlug(
          row.category,
          row.subcategory,
        );

      if (!categorySlug) {
        continue;
      }

      const route =
        `/produit/${categorySlug}/${row.id}`;

      for (const locale of locales) {
        entries.push({
          url: localizedUrl(
            locale,
            route,
          ),
          lastModified:
            row.created_at
              ? new Date(row.created_at)
              : now,
          changeFrequency: "weekly",
          priority: 0.9,
          alternates: {
            languages:
              languageAlternates(route),
          },
        });
      }
    }
  }

  return entries;
}