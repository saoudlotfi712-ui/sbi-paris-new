export const locales = [
  "fr",
  "ar",
  "de",
  "it",
  "en",
  "es",
  "zh",
] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "fr";

export const localeCookieName = "SBI_LOCALE";

export function isLocale(value: string | undefined): value is Locale {
  return Boolean(
    value &&
      locales.includes(value as Locale),
  );
}

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return locale === "ar" ? "rtl" : "ltr";
}