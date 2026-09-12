import type { ReactNode } from "react";
import { createMetadata, type SeoLocale } from "../lib/seo";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as SeoLocale;
  return createMetadata({
    ...{
  title: "Devis",
  description: "Devis SBI PARIS.",
  path: "/devis",
  noIndex: true,
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