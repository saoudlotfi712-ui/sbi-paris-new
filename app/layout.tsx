import {OrganizationJsonLd} from "./components/SeoJsonLd";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";
import SbiAssistant from "./components/SbiAssistant";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.sbiparis.com";

const siteIsLive =
  process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "SBI PARIS | Mode, Sport, Parfum & MobilitÃ©",
    template: "%s | SBI PARIS",
  },

  description:
    "DÃ©couvrez lâ€™univers SBI PARIS : mode, sport, parfums, accessoires et mobilitÃ© Ã©lectrique.",

  applicationName: "SBI PARIS",
  creator: "SBI PARIS",
  publisher: "SBI PARIS",

  robots: siteIsLive
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
        },
      }
    : {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },

  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: siteUrl,
    siteName: "SBI PARIS",
    title: "SBI PARIS | Mode, Sport, Parfum & MobilitÃ©",
    description:
      "DÃ©couvrez lâ€™univers SBI PARIS : mode, sport, parfums, accessoires et mobilitÃ© Ã©lectrique.",
    images: ["/logo.png"],
  },

  twitter: {
    card: "summary_large_image",
    title: "SBI PARIS | Mode, Sport, Parfum & MobilitÃ©",
    description:
      "DÃ©couvrez lâ€™univers SBI PARIS : mode, sport, parfums, accessoires et mobilitÃ© Ã©lectrique.",
    images: ["/logo.png"],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  const direction = locale === "ar" ? "rtl" : "ltr";

  return (
    <html lang={locale} dir={direction}>
      <body>
        <OrganizationJsonLd />
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <Header />

          {children}

          <SbiAssistant />

          <a
            href="mailto:contactsbiparis@gmail.com"
            aria-label="E-mail contactsbiparis@gmail.com"
            className="emailContactFloat"
          >
            <span aria-hidden="true">&#9993;</span>
          </a>

          <a
            href="https://wa.me/33643021021"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="whatsappFloat"
          >
            <img
              src="/whatsapp.svg"
              alt="WhatsApp"
              width="34"
              height="34"
            />
          </a>

          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}


