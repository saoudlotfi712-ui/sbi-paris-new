import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";

import Header from "./components/Header";
import Footer from "./components/Footer";

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
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
        >
          <Header />

          {children}

          <a
            href="mailto:contact@sbiparis.com"
            aria-label="E-mail contact@sbiparis.com"
            className="emailContactFloat"
          >
            <span aria-hidden="true">✉</span>
          </a>

          <a
            href="https://wa.me/33643021021"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="whatsappFloat"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
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
