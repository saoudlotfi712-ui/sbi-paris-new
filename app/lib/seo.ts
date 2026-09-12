import type {Metadata} from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.sbiparis.com";

const SITE_IS_LIVE =
  process.env.NEXT_PUBLIC_SITE_LIVE === "true";

export type SeoLocale =
  | "fr"
  | "en"
  | "de"
  | "es"
  | "it"
  | "ar"
  | "zh";

type SeoOptions = {
  title: string;
  description: string;
  path?: string;
  noIndex?: boolean;
  locale?: SeoLocale;
};

type LocalizedLabels = Record<SeoLocale, string>;

const ogLocales: Record<SeoLocale, string> = {
  fr: "fr_FR",
  en: "en_US",
  de: "de_DE",
  es: "es_ES",
  it: "it_IT",
  ar: "ar_TN",
  zh: "zh_CN",
};

const routeLabels: Record<string, LocalizedLabels> = {
  "": {
    fr: "Élégance parisienne",
    en: "Parisian Elegance",
    de: "Pariser Eleganz",
    es: "Elegancia parisina",
    it: "Eleganza parigina",
    ar: "الأناقة الباريسية",
    zh: "巴黎优雅",
  },

  "/homme": {
    fr: "Mode Homme",
    en: "Men's Fashion",
    de: "Herrenmode",
    es: "Moda Hombre",
    it: "Moda Uomo",
    ar: "أزياء الرجال",
    zh: "男士时尚",
  },

  "/femme": {
    fr: "Mode Femme",
    en: "Women's Fashion",
    de: "Damenmode",
    es: "Moda Mujer",
    it: "Moda Donna",
    ar: "أزياء النساء",
    zh: "女士时尚",
  },

  "/enfant": {
    fr: "Mode Enfant",
    en: "Kids' Fashion",
    de: "Kindermode",
    es: "Moda Infantil",
    it: "Moda Bambini",
    ar: "أزياء الأطفال",
    zh: "儿童时尚",
  },

  "/parfum": {
    fr: "Parfums",
    en: "Fragrances",
    de: "Parfums",
    es: "Perfumes",
    it: "Profumi",
    ar: "العطور",
    zh: "香水",
  },

  "/collection": {
    fr: "Collections",
    en: "Collections",
    de: "Kollektionen",
    es: "Colecciones",
    it: "Collezioni",
    ar: "المجموعات",
    zh: "系列",
  },

  "/promotions": {
    fr: "Promotions",
    en: "Offers",
    de: "Angebote",
    es: "Promociones",
    it: "Promozioni",
    ar: "العروض",
    zh: "优惠活动",
  },

  "/mobilite": {
    fr: "Mobilité",
    en: "Mobility",
    de: "Mobilität",
    es: "Movilidad",
    it: "Mobilità",
    ar: "التنقل",
    zh: "出行",
  },

  "/univers-sport-homme": {
    fr: "Univers Sport Homme",
    en: "Men's Sports",
    de: "Sportwelt Herren",
    es: "Deporte Hombre",
    it: "Sport Uomo",
    ar: "عالم الرياضة للرجال",
    zh: "男士运动",
  },

  "/univers-sport-femme": {
    fr: "Univers Sport Femme",
    en: "Women's Sports",
    de: "Sportwelt Damen",
    es: "Deporte Mujer",
    it: "Sport Donna",
    ar: "عالم الرياضة للنساء",
    zh: "女士运动",
  },

  "/univers-sport-football": {
    fr: "Football",
    en: "Football",
    de: "Fußball",
    es: "Fútbol",
    it: "Calcio",
    ar: "كرة القدم",
    zh: "足球",
  },

  "/univers-sport-basketball": {
    fr: "Basketball",
    en: "Basketball",
    de: "Basketball",
    es: "Baloncesto",
    it: "Basket",
    ar: "كرة السلة",
    zh: "篮球",
  },

  "/univers-sport-tennis": {
    fr: "Tennis",
    en: "Tennis",
    de: "Tennis",
    es: "Tenis",
    it: "Tennis",
    ar: "التنس",
    zh: "网球",
  },

  "/univers-sport-padel": {
    fr: "Padel",
    en: "Padel",
    de: "Padel",
    es: "Pádel",
    it: "Padel",
    ar: "البادل",
    zh: "板式网球",
  },

  "/univers-sport-running": {
    fr: "Running",
    en: "Running",
    de: "Running",
    es: "Running",
    it: "Running",
    ar: "الجري",
    zh: "跑步",
  },

  "/a-propos": {
    fr: "À propos",
    en: "About Us",
    de: "Über uns",
    es: "Sobre nosotros",
    it: "Chi siamo",
    ar: "من نحن",
    zh: "关于我们",
  },

  "/contact": {
    fr: "Contact",
    en: "Contact",
    de: "Kontakt",
    es: "Contacto",
    it: "Contatti",
    ar: "اتصل بنا",
    zh: "联系我们",
  },

  "/espace-pro": {
    fr: "Espace Professionnel",
    en: "Professional Area",
    de: "Geschäftskunden",
    es: "Espacio Profesional",
    it: "Area Professionale",
    ar: "فضاء المحترفين",
    zh: "专业客户专区",
  },

  "/faq": {
    fr: "Questions fréquentes",
    en: "Frequently Asked Questions",
    de: "Häufig gestellte Fragen",
    es: "Preguntas frecuentes",
    it: "Domande frequenti",
    ar: "الأسئلة الشائعة",
    zh: "常见问题",
  },

  "/nos-boutiques": {
    fr: "Nos boutiques",
    en: "Our Stores",
    de: "Unsere Geschäfte",
    es: "Nuestras tiendas",
    it: "I nostri negozi",
    ar: "متاجرنا",
    zh: "我们的门店",
  },

  "/carrieres": {
    fr: "Carrières",
    en: "Careers",
    de: "Karriere",
    es: "Empleo",
    it: "Lavora con noi",
    ar: "الوظائف",
    zh: "招聘",
  },

  "/tableau-des-tailles": {
    fr: "Guide des tailles",
    en: "Size Guide",
    de: "Größentabelle",
    es: "Guía de tallas",
    it: "Guida alle taglie",
    ar: "دليل المقاسات",
    zh: "尺码指南",
  },

  "/retours-echanges": {
    fr: "Retours et échanges",
    en: "Returns & Exchanges",
    de: "Rückgabe und Umtausch",
    es: "Devoluciones y cambios",
    it: "Resi e cambi",
    ar: "الإرجاع والاستبدال",
    zh: "退货与换货",
  },

  "/paiement-securise": {
    fr: "Paiement sécurisé",
    en: "Secure Payment",
    de: "Sichere Zahlung",
    es: "Pago seguro",
    it: "Pagamento sicuro",
    ar: "الدفع الآمن",
    zh: "安全支付",
  },

  "/suivi-commande": {
    fr: "Suivi de commande",
    en: "Order Tracking",
    de: "Bestellverfolgung",
    es: "Seguimiento del pedido",
    it: "Tracciamento ordine",
    ar: "تتبع الطلب",
    zh: "订单追踪",
  },

  "/mentions-legales": {
    fr: "Mentions légales",
    en: "Legal Notice",
    de: "Impressum",
    es: "Aviso legal",
    it: "Note legali",
    ar: "الإشعارات القانونية",
    zh: "法律声明",
  },

  "/politique-de-confidentialite": {
    fr: "Politique de confidentialité",
    en: "Privacy Policy",
    de: "Datenschutzerklärung",
    es: "Política de privacidad",
    it: "Informativa sulla privacy",
    ar: "سياسة الخصوصية",
    zh: "隐私政策",
  },

  "/cgv": {
    fr: "Conditions générales de vente",
    en: "Terms and Conditions of Sale",
    de: "Allgemeine Verkaufsbedingungen",
    es: "Condiciones generales de venta",
    it: "Condizioni generali di vendita",
    ar: "الشروط العامة للبيع",
    zh: "销售条款",
  },

  "/compte": {
    fr: "Mon compte",
    en: "My Account",
    de: "Mein Konto",
    es: "Mi cuenta",
    it: "Il mio account",
    ar: "حسابي",
    zh: "我的账户",
  },

  "/favoris": {
    fr: "Mes favoris",
    en: "My Favorites",
    de: "Meine Favoriten",
    es: "Mis favoritos",
    it: "I miei preferiti",
    ar: "المفضلة",
    zh: "我的收藏",
  },
};

const descriptions: Record<
  SeoLocale,
  (label: string) => string
> = {
  fr: (label) =>
    `${label} chez SBI PARIS. Découvrez les collections, services et l'élégance parisienne de SBI PARIS.`,

  en: (label) =>
    `${label} at SBI PARIS. Discover SBI PARIS collections, services and Parisian elegance.`,

  de: (label) =>
    `${label} bei SBI PARIS. Entdecken Sie die Kollektionen, Services und Pariser Eleganz von SBI PARIS.`,

  es: (label) =>
    `${label} en SBI PARIS. Descubre las colecciones, servicios y la elegancia parisina de SBI PARIS.`,

  it: (label) =>
    `${label} su SBI PARIS. Scopri le collezioni, i servizi e l'eleganza parigina di SBI PARIS.`,

  ar: (label) =>
    `${label} لدى SBI PARIS. اكتشف مجموعات وخدمات وأناقة SBI PARIS الباريسية.`,

  zh: (label) =>
    `${label} — SBI PARIS。探索 SBI PARIS 的系列产品、服务与巴黎优雅风格。`,
};

function cleanTitle(title: string) {
  return title
    .replace(/\s*\|\s*SBI PARIS\s*$/i, "")
    .trim();
}

function getLocalizedSeo(
  normalizedPath: string,
  locale: SeoLocale,
  fallbackTitle: string,
  fallbackDescription: string,
) {
  const labels = routeLabels[normalizedPath];

  if (labels) {
    const label = labels[locale];

    return {
      title: label,
      description: descriptions[locale](label),
    };
  }

  if (
    normalizedPath.startsWith("/produit/") ||
    normalizedPath.startsWith("/produits/")
  ) {
    const productTitle = cleanTitle(fallbackTitle);

    return {
      title: productTitle || "SBI PARIS",
      description: descriptions[locale](
        productTitle || "SBI PARIS",
      ),
    };
  }

  return {
    title: cleanTitle(fallbackTitle),
    description: fallbackDescription,
  };
}

export function createMetadata({
  title,
  description,
  path = "/",
  noIndex = false,
  locale = "fr",
}: SeoOptions): Metadata {
  const normalizedPath =
    path === "/"
      ? ""
      : `/${path.replace(/^\/+|\/+$/g, "")}`;

  const localizedPath =
    `/${locale}${normalizedPath}`;

  const canonical = new URL(
    localizedPath,
    SITE_URL,
  ).toString();

  const localizedSeo = getLocalizedSeo(
    normalizedPath,
    locale,
    title,
    description,
  );

  const finalTitle =
    localizedSeo.title === "SBI PARIS"
      ? "SBI PARIS"
      : `${localizedSeo.title} | SBI PARIS`;

  const languages = {
    fr: new URL(
      `/fr${normalizedPath}`,
      SITE_URL,
    ).toString(),

    en: new URL(
      `/en${normalizedPath}`,
      SITE_URL,
    ).toString(),

    de: new URL(
      `/de${normalizedPath}`,
      SITE_URL,
    ).toString(),

    es: new URL(
      `/es${normalizedPath}`,
      SITE_URL,
    ).toString(),

    it: new URL(
      `/it${normalizedPath}`,
      SITE_URL,
    ).toString(),

    ar: new URL(
      `/ar${normalizedPath}`,
      SITE_URL,
    ).toString(),

    zh: new URL(
      `/zh${normalizedPath}`,
      SITE_URL,
    ).toString(),

    "x-default": new URL(
      `/fr${normalizedPath}`,
      SITE_URL,
    ).toString(),
  };

  const shouldIndex =
    SITE_IS_LIVE && !noIndex;

  const logoUrl = new URL(
    "/logo.png",
    SITE_URL,
  ).toString();

  return {
    metadataBase: new URL(SITE_URL),

    /*
     * absolute يمنع template الموجود في app/layout.tsx
     * من إضافة "| SBI PARIS" مرة ثانية.
     */
    title: {
      absolute: finalTitle,
    },

    description: localizedSeo.description,

    alternates: {
      canonical,
      languages,
    },

    robots: {
      index: shouldIndex,
      follow: shouldIndex,

      googleBot: {
        index: shouldIndex,
        follow: shouldIndex,
      },
    },

    openGraph: {
      type: "website",
      siteName: "SBI PARIS",
      locale: ogLocales[locale],
      title: finalTitle,
      description: localizedSeo.description,
      url: canonical,
      images: [logoUrl],
    },

    twitter: {
      card: "summary_large_image",
      title: finalTitle,
      description: localizedSeo.description,
      images: [logoUrl],
    },
  };
}