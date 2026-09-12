import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

export type SportLocale =
  | "fr"
  | "en"
  | "ar"
  | "de"
  | "es"
  | "it"
  | "zh";

type Texts = {
  universe: string;
  male: string;
  female: string;
  universeHome: string;
  disciplines: string;
  usefulInfo: string;
  sizeGuide: string;
  deliveryReturns: string;
  fastDelivery: string;
  deliveryText: string;
  simpleOrder: string;
  simpleOrderText: string;
  easyReturns: string;
  returnsText: string;
  customerService: string;
  customerText: string;
  home: string;
  description: string;
  qualityProducts: string;
  premiumSelection: string;
  ourDisciplines: string;
  chooseDiscipline: string;
  discover: string;
  products: string;
  newItems: string;
  priceAsc: string;
  priceDesc: string;
  productsPerPage: string;
  jerseys: string;
  shirtsPolos: string;
  shorts: string;
  tracksuits: string;
  shoes: string;
  accessories: string;
  trousers: string;
  jackets: string;
  newBadge: string;
  promoBadge: string;
};

const texts: Record<SportLocale, Texts> = {
  fr: {
    universe: "UNIVERS SPORT",
    male: "Homme",
    female: "Femme",
    universeHome: "Accueil Univers Sport",
    disciplines: "DISCIPLINES",
    usefulInfo: "INFOS UTILES",
    sizeGuide: "Guide des tailles",
    deliveryReturns: "Livraison & Retours",
    fastDelivery: "Livraison Rapide",
    deliveryText: "Partout en France",
    simpleOrder: "Commande simplifiée",
    simpleOrderText: "Validation claire",
    easyReturns: "Retours Faciles",
    returnsText: "Sous 14 jours",
    customerService: "Service Client",
    customerText: "À votre écoute",
    home: "Accueil",
    description:
      "Performance, confort et style pour chaque discipline sportive.",
    qualityProducts: "Produits de qualité",
    premiumSelection: "Sélection premium",
    ourDisciplines: "NOS DISCIPLINES",
    chooseDiscipline: "Choisissez votre discipline",
    discover: "Découvrir",
    products: "produits",
    newItems: "Nouveautés",
    priceAsc: "Prix croissant",
    priceDesc: "Prix décroissant",
    productsPerPage: "Produits par page",
    jerseys: "Maillots",
    shirtsPolos: "T-shirts / Polos",
    shorts: "Shorts",
    tracksuits: "Survêtements",
    shoes: "Chaussures",
    accessories: "Accessoires",
    trousers: "Pantalons",
    jackets: "Vestes",
    newBadge: "NOUVEAU",
    promoBadge: "PROMO",
  },

  en: {
    universe: "SPORT UNIVERSE",
    male: "Men",
    female: "Women",
    universeHome: "Sport Universe Home",
    disciplines: "DISCIPLINES",
    usefulInfo: "USEFUL INFORMATION",
    sizeGuide: "Size Guide",
    deliveryReturns: "Delivery & Returns",
    fastDelivery: "Fast Delivery",
    deliveryText: "Across France",
    simpleOrder: "Simple Ordering",
    simpleOrderText: "Clear Confirmation",
    easyReturns: "Easy Returns",
    returnsText: "Within 14 days",
    customerService: "Customer Service",
    customerText: "Here to help",
    home: "Home",
    description:
      "Performance, comfort and style for every sporting discipline.",
    qualityProducts: "Quality Products",
    premiumSelection: "Premium Selection",
    ourDisciplines: "OUR DISCIPLINES",
    chooseDiscipline: "Choose Your Discipline",
    discover: "Discover",
    products: "products",
    newItems: "New Arrivals",
    priceAsc: "Price: Low to High",
    priceDesc: "Price: High to Low",
    productsPerPage: "Products per page",
    jerseys: "Jerseys",
    shirtsPolos: "T-shirts / Polos",
    shorts: "Shorts",
    tracksuits: "Tracksuits",
    shoes: "Shoes",
    accessories: "Accessories",
    trousers: "Trousers",
    jackets: "Jackets",
    newBadge: "NEW",
    promoBadge: "SALE",
  },

  ar: {
    universe: "عالم الرياضة",
    male: "رجال",
    female: "نساء",
    universeHome: "الرئيسية - عالم الرياضة",
    disciplines: "الرياضات",
    usefulInfo: "معلومات مفيدة",
    sizeGuide: "دليل المقاسات",
    deliveryReturns: "التوصيل والإرجاع",
    fastDelivery: "توصيل سريع",
    deliveryText: "في جميع أنحاء فرنسا",
    simpleOrder: "طلب بسيط",
    simpleOrderText: "تأكيد واضح",
    easyReturns: "إرجاع سهل",
    returnsText: "خلال 14 يومًا",
    customerService: "خدمة العملاء",
    customerText: "نحن في خدمتك",
    home: "الرئيسية",
    description: "الأداء والراحة والأناقة لكل رياضة.",
    qualityProducts: "منتجات عالية الجودة",
    premiumSelection: "اختيار مميز",
    ourDisciplines: "رياضاتنا",
    chooseDiscipline: "اختر رياضتك",
    discover: "اكتشف",
    products: "منتج",
    newItems: "الجديد",
    priceAsc: "السعر من الأقل إلى الأعلى",
    priceDesc: "السعر من الأعلى إلى الأقل",
    productsPerPage: "المنتجات في الصفحة",
    jerseys: "قمصان رياضية",
    shirtsPolos: "تيشيرتات / بولو",
    shorts: "سراويل قصيرة",
    tracksuits: "بدلات رياضية",
    shoes: "أحذية",
    accessories: "إكسسوارات",
    trousers: "سراويل",
    jackets: "سترات",
    newBadge: "جديد",
    promoBadge: "عرض",
  },

  de: {
    universe: "SPORTWELT",
    male: "Herren",
    female: "Damen",
    universeHome: "Startseite Sportwelt",
    disciplines: "SPORTARTEN",
    usefulInfo: "NÜTZLICHE INFOS",
    sizeGuide: "Größentabelle",
    deliveryReturns: "Lieferung & Rückgabe",
    fastDelivery: "Schnelle Lieferung",
    deliveryText: "In ganz Frankreich",
    simpleOrder: "Einfache Bestellung",
    simpleOrderText: "Klare Bestätigung",
    easyReturns: "Einfache Rückgabe",
    returnsText: "Innerhalb von 14 Tagen",
    customerService: "Kundenservice",
    customerText: "Wir sind für Sie da",
    home: "Startseite",
    description:
      "Leistung, Komfort und Stil für jede Sportart.",
    qualityProducts: "Qualitätsprodukte",
    premiumSelection: "Premium-Auswahl",
    ourDisciplines: "UNSERE SPORTARTEN",
    chooseDiscipline: "Wählen Sie Ihre Sportart",
    discover: "Entdecken",
    products: "Produkte",
    newItems: "Neuheiten",
    priceAsc: "Preis aufsteigend",
    priceDesc: "Preis absteigend",
    productsPerPage: "Produkte pro Seite",
    jerseys: "Trikots",
    shirtsPolos: "T-Shirts / Polos",
    shorts: "Shorts",
    tracksuits: "Trainingsanzüge",
    shoes: "Schuhe",
    accessories: "Accessoires",
    trousers: "Hosen",
    jackets: "Jacken",
    newBadge: "NEU",
    promoBadge: "ANGEBOT",
  },

  es: {
    universe: "UNIVERSO DEPORTIVO",
    male: "Hombre",
    female: "Mujer",
    universeHome: "Inicio Universo Deportivo",
    disciplines: "DISCIPLINAS",
    usefulInfo: "INFORMACIÓN ÚTIL",
    sizeGuide: "Guía de tallas",
    deliveryReturns: "Entrega y devoluciones",
    fastDelivery: "Entrega rápida",
    deliveryText: "En toda Francia",
    simpleOrder: "Pedido sencillo",
    simpleOrderText: "Confirmación clara",
    easyReturns: "Devoluciones fáciles",
    returnsText: "En 14 días",
    customerService: "Atención al cliente",
    customerText: "Estamos a tu disposición",
    home: "Inicio",
    description:
      "Rendimiento, comodidad y estilo para cada disciplina deportiva.",
    qualityProducts: "Productos de calidad",
    premiumSelection: "Selección premium",
    ourDisciplines: "NUESTRAS DISCIPLINAS",
    chooseDiscipline: "Elige tu disciplina",
    discover: "Descubrir",
    products: "productos",
    newItems: "Novedades",
    priceAsc: "Precio ascendente",
    priceDesc: "Precio descendente",
    productsPerPage: "Productos por página",
    jerseys: "Camisetas deportivas",
    shirtsPolos: "Camisetas / Polos",
    shorts: "Pantalones cortos",
    tracksuits: "Chándales",
    shoes: "Calzado",
    accessories: "Accesorios",
    trousers: "Pantalones",
    jackets: "Chaquetas",
    newBadge: "NUEVO",
    promoBadge: "OFERTA",
  },

  it: {
    universe: "UNIVERSO SPORT",
    male: "Uomo",
    female: "Donna",
    universeHome: "Home Universo Sport",
    disciplines: "DISCIPLINE",
    usefulInfo: "INFORMAZIONI UTILI",
    sizeGuide: "Guida alle taglie",
    deliveryReturns: "Consegna e resi",
    fastDelivery: "Consegna rapida",
    deliveryText: "In tutta la Francia",
    simpleOrder: "Ordine semplice",
    simpleOrderText: "Conferma chiara",
    easyReturns: "Resi facili",
    returnsText: "Entro 14 giorni",
    customerService: "Servizio clienti",
    customerText: "Siamo a tua disposizione",
    home: "Home",
    description:
      "Prestazioni, comfort e stile per ogni disciplina sportiva.",
    qualityProducts: "Prodotti di qualità",
    premiumSelection: "Selezione premium",
    ourDisciplines: "LE NOSTRE DISCIPLINE",
    chooseDiscipline: "Scegli la tua disciplina",
    discover: "Scopri",
    products: "prodotti",
    newItems: "Novità",
    priceAsc: "Prezzo crescente",
    priceDesc: "Prezzo decrescente",
    productsPerPage: "Prodotti per pagina",
    jerseys: "Maglie",
    shirtsPolos: "T-shirt / Polo",
    shorts: "Pantaloncini",
    tracksuits: "Tute",
    shoes: "Scarpe",
    accessories: "Accessori",
    trousers: "Pantaloni",
    jackets: "Giacche",
    newBadge: "NUOVO",
    promoBadge: "OFFERTA",
  },

  zh: {
    universe: "运动专区",
    male: "男士",
    female: "女士",
    universeHome: "运动专区首页",
    disciplines: "运动项目",
    usefulInfo: "实用信息",
    sizeGuide: "尺码指南",
    deliveryReturns: "配送与退货",
    fastDelivery: "快速配送",
    deliveryText: "法国境内配送",
    simpleOrder: "简单下单",
    simpleOrderText: "清晰确认",
    easyReturns: "轻松退货",
    returnsText: "14天内",
    customerService: "客户服务",
    customerText: "随时为您服务",
    home: "首页",
    description: "为每项运动提供性能、舒适与时尚。",
    qualityProducts: "优质产品",
    premiumSelection: "精选系列",
    ourDisciplines: "我们的运动项目",
    chooseDiscipline: "选择您的运动项目",
    discover: "探索",
    products: "件商品",
    newItems: "新品",
    priceAsc: "价格从低到高",
    priceDesc: "价格从高到低",
    productsPerPage: "每页商品数",
    jerseys: "运动球衣",
    shirtsPolos: "T恤 / Polo衫",
    shorts: "短裤",
    tracksuits: "运动套装",
    shoes: "鞋类",
    accessories: "配饰",
    trousers: "长裤",
    jackets: "夹克",
    newBadge: "新品",
    promoBadge: "优惠",
  },
};

const sportNames: Record<
  SportLocale,
  Record<string, string>
> = {
  fr: {
    football: "Football",
    basketball: "Basketball",
    tennis: "Tennis",
    padel: "Padel",
    running: "Running",
  },
  en: {
    football: "Football",
    basketball: "Basketball",
    tennis: "Tennis",
    padel: "Padel",
    running: "Running",
  },
  de: {
    football: "Fußball",
    basketball: "Basketball",
    tennis: "Tennis",
    padel: "Padel",
    running: "Running",
  },
  es: {
    football: "Fútbol",
    basketball: "Baloncesto",
    tennis: "Tenis",
    padel: "Pádel",
    running: "Running",
  },
  it: {
    football: "Calcio",
    basketball: "Basket",
    tennis: "Tennis",
    padel: "Padel",
    running: "Running",
  },
  ar: {
    football: "كرة القدم",
    basketball: "كرة السلة",
    tennis: "التنس",
    padel: "البادل",
    running: "الجري",
  },
  zh: {
    football: "足球",
    basketball: "篮球",
    tennis: "网球",
    padel: "板式网球",
    running: "跑步",
  },
};

function sportName(
  locale: SportLocale,
  value: string,
) {
  return (
    sportNames[locale][value.toLowerCase()] ??
    value
  );
}

function translateCore(
  locale: SportLocale,
  value: string,
) {
  const t = texts[locale];

  const exact: Record<string, string> = {
    "UNIVERS SPORT": t.universe,
    "Univers Sport": t.universe,
    HOMME: t.male.toUpperCase(),
    FEMME: t.female.toUpperCase(),
    Homme: t.male,
    Femme: t.female,
    "Accueil Univers Sport": t.universeHome,
    DISCIPLINES: t.disciplines,
    "INFOS UTILES": t.usefulInfo,
    "Guide des tailles": t.sizeGuide,
    "Livraison & Retours": t.deliveryReturns,
    "Livraison Rapide": t.fastDelivery,
    "Livraison rapide": t.fastDelivery,
    "Partout en France": t.deliveryText,

    // Pas d'affirmation de paiement en ligne.
    "Paiement Sécurisé": t.simpleOrder,
    "Paiement sécurisé": t.simpleOrder,
    "100% sécurisé": t.simpleOrderText,
    "100% protégé": t.simpleOrderText,

    "Retours Faciles": t.easyReturns,
    "Retours faciles": t.easyReturns,
    "Sous 14 jours": t.returnsText,
    "Service Client": t.customerService,
    "Service client": t.customerService,
    "7j/7 à votre écoute": t.customerText,
    "À votre écoute": t.customerText,
    Accueil: t.home,

    "Performance, confort et style pour chaque discipline sportive.":
      t.description,

    "Produits de qualité": t.qualityProducts,
    "Sélection premium": t.premiumSelection,
    "NOS DISCIPLINES": t.ourDisciplines,
    "Choisissez votre discipline":
      t.chooseDiscipline,
    Découvrir: t.discover,

    Nouveautés: t.newItems,
    "Prix croissant": t.priceAsc,
    "Prix décroissant": t.priceDesc,
    "Produits par page": t.productsPerPage,

    Maillots: t.jerseys,
    "T-shirts / Polos": t.shirtsPolos,
    Shorts: t.shorts,
    Survêtements: t.tracksuits,
    Chaussures: t.shoes,
    Accessoires: t.accessories,
    Pantalons: t.trousers,
    Vestes: t.jackets,

    NOUVEAU: t.newBadge,
    Nouveau: t.newBadge,
    PROMO: t.promoBadge,

    Football: sportName(locale, "football"),
    Basketball: sportName(locale, "basketball"),
    Tennis: sportName(locale, "tennis"),
    Padel: sportName(locale, "padel"),
    Running: sportName(locale, "running"),
  };

  if (exact[value]) {
    return exact[value];
  }

  const countMatch =
    value.match(/^(\d+)\s+produits$/i);

  if (countMatch) {
    return `${countMatch[1]} ${t.products}`;
  }

  const displayMatch = value.match(
    /^Affichage de (\d+) à (\d+) sur (\d+) produits$/i,
  );

  if (displayMatch) {
    const [, from, to, total] = displayMatch;

    const displayLabels: Record<
      SportLocale,
      string
    > = {
      fr: `Affichage de ${from} à ${to} sur ${total} produits`,
      en: `Showing ${from} to ${to} of ${total} products`,
      de: `${from} bis ${to} von ${total} Produkten`,
      es: `Mostrando ${from} a ${to} de ${total} productos`,
      it: `Visualizzazione da ${from} a ${to} di ${total} prodotti`,
      ar: `عرض ${from} إلى ${to} من أصل ${total} منتج`,
      zh: `显示 ${from}–${to}，共 ${total} 件商品`,
    };

    return displayLabels[locale];
  }

  const shoesTitle = value.match(
    /^CHAUSSURES DE (FOOTBALL|BASKETBALL|TENNIS|PADEL|RUNNING)$/i,
  );

  if (shoesTitle) {
    const sport = sportName(
      locale,
      shoesTitle[1],
    );

    const labels: Record<SportLocale, string> = {
      fr: `CHAUSSURES DE ${sport.toUpperCase()}`,
      en: `${sport.toUpperCase()} SHOES`,
      de: `${sport.toUpperCase()} SCHUHE`,
      es: `CALZADO DE ${sport.toUpperCase()}`,
      it: `SCARPE DA ${sport.toUpperCase()}`,
      ar: `أحذية ${sport}`,
      zh: `${sport}鞋`,
    };

    return labels[locale];
  }

  const ourShoes = value.match(
    /^Nos Chaussures de (Football|Basketball|Tennis|Padel|Running)$/i,
  );

  if (ourShoes) {
    const sport = sportName(
      locale,
      ourShoes[1],
    );

    const labels: Record<SportLocale, string> = {
      fr: `Nos Chaussures de ${sport}`,
      en: `Our ${sport} Shoes`,
      de: `Unsere ${sport}-Schuhe`,
      es: `Nuestro calzado de ${sport}`,
      it: `Le nostre scarpe da ${sport}`,
      ar: `أحذيتنا لـ${sport}`,
      zh: `我们的${sport}鞋`,
    };

    return labels[locale];
  }

  const altMatch = value.match(
    /^SBI PARIS Univers Sport Homme (Football|Basketball|Tennis|Padel|Running)$/i,
  );

  if (altMatch) {
    return `SBI PARIS ${t.universe} ${t.male} ${sportName(
      locale,
      altMatch[1],
    )}`;
  }

  return value;
}

function translateText(
  locale: SportLocale,
  value: string,
) {
  const match = value.match(
    /^(\s*)([\s\S]*?)(\s*)$/,
  );

  if (!match) return value;

  const [, before, core, after] = match;

  if (!core.trim()) return value;

  return `${before}${translateCore(
    locale,
    core,
  )}${after}`;
}

type ElementProps = Record<string, unknown> & {
  children?: ReactNode;
};

export function translateSportTree(
  node: ReactNode,
  locale: SportLocale,
): ReactNode {
  if (typeof node === "string") {
    return translateText(locale, node);
  }

  if (!isValidElement(node)) {
    return node;
  }

  const element =
    node as ReactElement<ElementProps>;

  const props = element.props;
  const nextProps: Partial<ElementProps> = {};

  for (const key of [
    "alt",
    "title",
    "aria-label",
    "placeholder",
  ]) {
    const value = props[key];

    if (typeof value === "string") {
      nextProps[key] = translateText(
        locale,
        value,
      );
    }
  }

  if ("children" in props) {
    nextProps.children = Children.map(
      props.children,
      (child) =>
        translateSportTree(child, locale),
    );
  }

  return cloneElement(element, nextProps);
}