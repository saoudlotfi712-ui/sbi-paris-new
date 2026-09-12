import type { ReactNode } from "react";
import { createMetadata, type SeoLocale } from "../lib/seo";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as SeoLocale;
  return createMetadata({
    ...{
  title: "Retours et échanges",
  description: "Consultez les conditions de retour et d’échange applicables aux commandes SBI PARIS.",
  path: "/retours-echanges",
  noIndex: false,
},
    locale,
  });
}

export default function SeoLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return children;
}