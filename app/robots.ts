import type { MetadataRoute } from "next";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.sbiparis.com"
).replace(/\/+$/, "");

const SITE_IS_LIVE =
  process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export default function robots(): MetadataRoute.Robots {
  if (!SITE_IS_LIVE) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
      sitemap: `${SITE_URL}/sitemap.xml`,
      host: SITE_URL,
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/admin/",
        "/cart",
        "/checkout/",
        "/devis",
        "/facture",
        "/suivi-commande",
        "/test-supabase",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}