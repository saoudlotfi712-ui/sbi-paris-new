import {NextResponse} from "next/server";
import type {NextRequest} from "next/server";
import {
  defaultLocale,
  isLocale,
  localeCookieName,
} from "./i18n/routing";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const parts = pathname.split("/");
  const locale = parts[1];

  if (isLocale(locale)) {
    const url = request.nextUrl.clone();
    const rest = "/" + parts.slice(2).join("/");

    url.pathname = rest === "/" ? "/" : rest;

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-sbi-locale", locale);

    const response = NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });

    response.cookies.set(localeCookieName, locale, {
      path: "/",
      maxAge: 31536000,
      sameSite: "lax",
    });

    return response;
  }

  const savedLocale =
    request.cookies.get(localeCookieName)?.value;

  const activeLocale =
    savedLocale && isLocale(savedLocale)
      ? savedLocale
      : defaultLocale;

  const url = request.nextUrl.clone();

  url.pathname =
    pathname === "/"
      ? `/${activeLocale}`
      : `/${activeLocale}${pathname}`;

  return NextResponse.redirect(url);
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};