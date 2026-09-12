import {headers} from "next/headers";
import {getRequestConfig} from "next-intl/server";

import {
  defaultLocale,
  isLocale,
} from "./routing";

export default getRequestConfig(async () => {
  const requestHeaders = await headers();

  const requestedLocale =
    requestHeaders.get("x-sbi-locale") ?? undefined;

  const locale = isLocale(requestedLocale)
    ? requestedLocale
    : defaultLocale;

  const messages = (
    await import(`../messages/${locale}.json`)
  ).default;

  return {
    locale,
    messages,
  };
});
