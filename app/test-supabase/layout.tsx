import type { ReactNode } from "react";
import { createMetadata, type SeoLocale } from "../lib/seo";
import { getLocale } from "next-intl/server";

export async function generateMetadata() {
  const locale = (await getLocale()) as SeoLocale;
  return createMetadata({
    ...{
  title: "Test",
  description: "Page technique SBI PARIS.",
  path: "/test-supabase",
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