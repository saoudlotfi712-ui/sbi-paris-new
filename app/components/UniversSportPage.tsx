import Link from "next/link";
import {getLocale} from "next-intl/server";
import styles from "./UniversSportPage.module.css";

type Audience = "homme" | "femme";

type Locale =
  | "fr"
  | "en"
  | "ar"
  | "de"
  | "es"
  | "it"
  | "zh";

type UniversSportPageProps = {
  audience: Audience;
};

const sports = [
  {
    key: "football",
    image: "football.jpg",
    count: 128,
    href: "/univers-sport-football",
    icon: "⚽",
  },
  {
    key: "basketball",
    image: "basketball.jpg",
    count: 96,
    href: "/univers-sport-basketball",
    icon: "🏀",
  },
  {
    key: "tennis",
    image: "tennis.jpg",
    count: 74,
    href: "/univers-sport-tennis",
    icon: "🎾",
  },
  {
    key: "padel",
    image: "padel.jpg",
    count: 58,
    href: "/univers-sport-padel",
    icon: "◉",
  },
  {
    key: "running",
    image: "running.jpg",
    count: 64,
    href: "/univers-sport-running",
    icon: "➜",
  },
] as const;

const translations = {
  fr: {
    maleUpper: "HOMME",
    femaleUpper: "FEMME",
    male: "Homme",
    female: "Femme",
    universe: "UNIVERS SPORT",
    universeHome: "Accueil Univers Sport",
    disciplines: "DISCIPLINES",
    usefulInfo: "INFOS UTILES",
    sizeGuide: "Guide des tailles",
    deliveryReturns: "Livraison & Retours",
    faq: "FAQ",
    fastDelivery: "Livraison rapide",
    deliveryText: "Partout en France",
    simpleOrder: "Commande simplifiée",
    simpleOrderText: "Validation claire",
    easyReturns: "Retours faciles",
    returnsText: "Sous 14 jours",
    customerService: "Service client",
    customerServiceText: "À votre écoute",
    home: "Accueil",
    description:
      "Performance, confort et style pour chaque discipline sportive.",
    qualityProducts: "Produits de qualité",
    premiumSelection: "Sélection premium",
    selectedProducts: "Produits sélectionnés",
    ourDisciplines: "NOS DISCIPLINES",
    chooseDiscipline: "Choisissez votre discipline",
    discover: "Découvrir",
    products: "produits",
    premiumBrands: "Marques Premium",
    premiumBrandsText: "Une sélection de marques",
    competitivePrices: "Prix compétitifs",
    competitivePricesText: "Des offres adaptées",
    quality: "Qualité",
    qualityText: "Produits soigneusement sélectionnés",
    expertAdvice: "Conseils experts",
    expertAdviceText: "Notre équipe à votre service",
    sports: {
      football: "Football",
      basketball: "Basketball",
      tennis: "Tennis",
      padel: "Padel",
      running: "Running",
    },
  },

  en: {
    maleUpper: "MEN",
    femaleUpper: "WOMEN",
    male: "Men",
    female: "Women",
    universe: "SPORT UNIVERSE",
    universeHome: "Sport Universe Home",
    disciplines: "DISCIPLINES",
    usefulInfo: "USEFUL INFORMATION",
    sizeGuide: "Size guide",
    deliveryReturns: "Delivery & Returns",
    faq: "FAQ",
    fastDelivery: "Fast delivery",
    deliveryText: "Across France",
    simpleOrder: "Simple ordering",
    simpleOrderText: "Clear confirmation",
    easyReturns: "Easy returns",
    returnsText: "Within 14 days",
    customerService: "Customer service",
    customerServiceText: "Here to help",
    home: "Home",
    description:
      "Performance, comfort and style for every sporting discipline.",
    qualityProducts: "Quality products",
    premiumSelection: "Premium selection",
    selectedProducts: "Selected products",
    ourDisciplines: "OUR DISCIPLINES",
    chooseDiscipline: "Choose your discipline",
    discover: "Discover",
    products: "products",
    premiumBrands: "Premium Brands",
    premiumBrandsText: "A curated brand selection",
    competitivePrices: "Competitive prices",
    competitivePricesText: "Offers tailored to you",
    quality: "Quality",
    qualityText: "Carefully selected products",
    expertAdvice: "Expert advice",
    expertAdviceText: "Our team is here to help",
    sports: {
      football: "Football",
      basketball: "Basketball",
      tennis: "Tennis",
      padel: "Padel",
      running: "Running",
    },
  },

  ar: {
    maleUpper: "رجال",
    femaleUpper: "نساء",
    male: "رجال",
    female: "نساء",
    universe: "عالم الرياضة",
    universeHome: "الرئيسية - عالم الرياضة",
    disciplines: "الرياضات",
    usefulInfo: "معلومات مفيدة",
    sizeGuide: "دليل المقاسات",
    deliveryReturns: "التوصيل والإرجاع",
    faq: "الأسئلة الشائعة",
    fastDelivery: "توصيل سريع",
    deliveryText: "في جميع أنحاء فرنسا",
    simpleOrder: "طلب بسيط",
    simpleOrderText: "تأكيد واضح",
    easyReturns: "إرجاع سهل",
    returnsText: "خلال 14 يومًا",
    customerService: "خدمة العملاء",
    customerServiceText: "نحن في خدمتك",
    home: "الرئيسية",
    description:
      "الأداء والراحة والأناقة لكل رياضة.",
    qualityProducts: "منتجات عالية الجودة",
    premiumSelection: "اختيار مميز",
    selectedProducts: "منتجات مختارة",
    ourDisciplines: "رياضاتنا",
    chooseDiscipline: "اختر رياضتك",
    discover: "اكتشف",
    products: "منتج",
    premiumBrands: "علامات مميزة",
    premiumBrandsText: "مجموعة مختارة من العلامات",
    competitivePrices: "أسعار تنافسية",
    competitivePricesText: "عروض مناسبة",
    quality: "الجودة",
    qualityText: "منتجات مختارة بعناية",
    expertAdvice: "نصائح الخبراء",
    expertAdviceText: "فريقنا في خدمتك",
    sports: {
      football: "كرة القدم",
      basketball: "كرة السلة",
      tennis: "التنس",
      padel: "البادل",
      running: "الجري",
    },
  },

  de: {
    maleUpper: "HERREN",
    femaleUpper: "DAMEN",
    male: "Herren",
    female: "Damen",
    universe: "SPORTWELT",
    universeHome: "Startseite Sportwelt",
    disciplines: "SPORTARTEN",
    usefulInfo: "NÜTZLICHE INFOS",
    sizeGuide: "Größentabelle",
    deliveryReturns: "Lieferung & Rückgabe",
    faq: "FAQ",
    fastDelivery: "Schnelle Lieferung",
    deliveryText: "In ganz Frankreich",
    simpleOrder: "Einfache Bestellung",
    simpleOrderText: "Klare Bestätigung",
    easyReturns: "Einfache Rückgabe",
    returnsText: "Innerhalb von 14 Tagen",
    customerService: "Kundenservice",
    customerServiceText: "Wir sind für Sie da",
    home: "Startseite",
    description:
      "Leistung, Komfort und Stil für jede Sportart.",
    qualityProducts: "Qualitätsprodukte",
    premiumSelection: "Premium-Auswahl",
    selectedProducts: "Ausgewählte Produkte",
    ourDisciplines: "UNSERE SPORTARTEN",
    chooseDiscipline: "Wählen Sie Ihre Sportart",
    discover: "Entdecken",
    products: "Produkte",
    premiumBrands: "Premium-Marken",
    premiumBrandsText: "Eine ausgewählte Markenauswahl",
    competitivePrices: "Attraktive Preise",
    competitivePricesText: "Passende Angebote",
    quality: "Qualität",
    qualityText: "Sorgfältig ausgewählte Produkte",
    expertAdvice: "Expertenberatung",
    expertAdviceText: "Unser Team ist für Sie da",
    sports: {
      football: "Fußball",
      basketball: "Basketball",
      tennis: "Tennis",
      padel: "Padel",
      running: "Running",
    },
  },

  es: {
    maleUpper: "HOMBRE",
    femaleUpper: "MUJER",
    male: "Hombre",
    female: "Mujer",
    universe: "UNIVERSO DEPORTIVO",
    universeHome: "Inicio Universo Deportivo",
    disciplines: "DISCIPLINAS",
    usefulInfo: "INFORMACIÓN ÚTIL",
    sizeGuide: "Guía de tallas",
    deliveryReturns: "Entrega y devoluciones",
    faq: "FAQ",
    fastDelivery: "Entrega rápida",
    deliveryText: "En toda Francia",
    simpleOrder: "Pedido sencillo",
    simpleOrderText: "Confirmación clara",
    easyReturns: "Devoluciones fáciles",
    returnsText: "En 14 días",
    customerService: "Atención al cliente",
    customerServiceText: "Estamos a tu disposición",
    home: "Inicio",
    description:
      "Rendimiento, comodidad y estilo para cada disciplina deportiva.",
    qualityProducts: "Productos de calidad",
    premiumSelection: "Selección premium",
    selectedProducts: "Productos seleccionados",
    ourDisciplines: "NUESTRAS DISCIPLINAS",
    chooseDiscipline: "Elige tu disciplina",
    discover: "Descubrir",
    products: "productos",
    premiumBrands: "Marcas Premium",
    premiumBrandsText: "Una selección de marcas",
    competitivePrices: "Precios competitivos",
    competitivePricesText: "Ofertas adaptadas",
    quality: "Calidad",
    qualityText: "Productos cuidadosamente seleccionados",
    expertAdvice: "Consejos de expertos",
    expertAdviceText: "Nuestro equipo está a tu servicio",
    sports: {
      football: "Fútbol",
      basketball: "Baloncesto",
      tennis: "Tenis",
      padel: "Pádel",
      running: "Running",
    },
  },

  it: {
    maleUpper: "UOMO",
    femaleUpper: "DONNA",
    male: "Uomo",
    female: "Donna",
    universe: "UNIVERSO SPORT",
    universeHome: "Home Universo Sport",
    disciplines: "DISCIPLINE",
    usefulInfo: "INFORMAZIONI UTILI",
    sizeGuide: "Guida alle taglie",
    deliveryReturns: "Consegna e resi",
    faq: "FAQ",
    fastDelivery: "Consegna rapida",
    deliveryText: "In tutta la Francia",
    simpleOrder: "Ordine semplice",
    simpleOrderText: "Conferma chiara",
    easyReturns: "Resi facili",
    returnsText: "Entro 14 giorni",
    customerService: "Servizio clienti",
    customerServiceText: "Siamo a tua disposizione",
    home: "Home",
    description:
      "Prestazioni, comfort e stile per ogni disciplina sportiva.",
    qualityProducts: "Prodotti di qualità",
    premiumSelection: "Selezione premium",
    selectedProducts: "Prodotti selezionati",
    ourDisciplines: "LE NOSTRE DISCIPLINE",
    chooseDiscipline: "Scegli la tua disciplina",
    discover: "Scopri",
    products: "prodotti",
    premiumBrands: "Marchi Premium",
    premiumBrandsText: "Una selezione di marchi",
    competitivePrices: "Prezzi competitivi",
    competitivePricesText: "Offerte adatte",
    quality: "Qualità",
    qualityText: "Prodotti accuratamente selezionati",
    expertAdvice: "Consigli degli esperti",
    expertAdviceText: "Il nostro team è al tuo servizio",
    sports: {
      football: "Calcio",
      basketball: "Basket",
      tennis: "Tennis",
      padel: "Padel",
      running: "Running",
    },
  },

  zh: {
    maleUpper: "男士",
    femaleUpper: "女士",
    male: "男士",
    female: "女士",
    universe: "运动专区",
    universeHome: "运动专区首页",
    disciplines: "运动项目",
    usefulInfo: "实用信息",
    sizeGuide: "尺码指南",
    deliveryReturns: "配送与退货",
    faq: "常见问题",
    fastDelivery: "快速配送",
    deliveryText: "法国境内配送",
    simpleOrder: "简单下单",
    simpleOrderText: "清晰确认",
    easyReturns: "轻松退货",
    returnsText: "14天内",
    customerService: "客户服务",
    customerServiceText: "随时为您服务",
    home: "首页",
    description:
      "为每项运动提供性能、舒适与时尚。",
    qualityProducts: "优质产品",
    premiumSelection: "精选系列",
    selectedProducts: "精选产品",
    ourDisciplines: "我们的运动项目",
    chooseDiscipline: "选择您的运动项目",
    discover: "探索",
    products: "件商品",
    premiumBrands: "优质品牌",
    premiumBrandsText: "精选品牌",
    competitivePrices: "具有竞争力的价格",
    competitivePricesText: "适合您的优惠",
    quality: "品质",
    qualityText: "精心挑选的产品",
    expertAdvice: "专业建议",
    expertAdviceText: "我们的团队为您服务",
    sports: {
      football: "足球",
      basketball: "篮球",
      tennis: "网球",
      padel: "板式网球",
      running: "跑步",
    },
  },
} as const;

export default async function UniversSportPage({
  audience,
}: UniversSportPageProps) {
  const requestedLocale = await getLocale();

  const locale: Locale =
    requestedLocale in translations
      ? (requestedLocale as Locale)
      : "fr";

  const t = translations[locale];

  const isHomme = audience === "homme";

  const audienceLabel = isHomme
    ? t.maleUpper
    : t.femaleUpper;

  const audienceText = isHomme
    ? t.male
    : t.female;

  const homeHref = `/${locale}/univers-sport-${audience}`;

  const heroImage = isHomme
    ? "/univers-sport/homme/banner/banner-homme.jpg"
    : "/univers-sport/femme/banner/banner.jpg";

  const getSportImage = (image: string) =>
    `/univers-sport/femme/products/${image}`;

  return (
    <main className={styles.page}>
      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <span>{t.universe}</span>
            <strong>{audienceLabel}</strong>
            <div className={styles.redLine} />
          </div>

          <Link
            href={homeHref}
            className={styles.homeButton}
          >
            <span className={styles.homeIcon}>⌂</span>
            <span>{t.universeHome}</span>
          </Link>

          <div className={styles.sidebarSection}>
            <p className={styles.sidebarLabel}>
              {t.disciplines}
            </p><nav className={styles.sportNav}>
              {sports.map((sport) => (
                <Link
                  key={sport.key}
                  href={`/${locale}${sport.href}?audience=${audience}`}
                  className={styles.sportNavItem}
                >
                  <span className={styles.navSportIcon}>
                    {sport.icon}
                  </span>

                  <span>
                    {t.sports[sport.key]}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.separator} />

          <div className={styles.sidebarSection}>
            <p className={styles.sidebarLabel}>
              {t.usefulInfo}
            </p>

            <div className={styles.infoList}>
              <div className={styles.infoItem}>
                <span>♧</span>
                <span>{t.sizeGuide}</span>
              </div>

              <div className={styles.infoItem}>
                <span>▱</span>
                <span>{t.deliveryReturns}</span>
              </div>

              <div className={styles.infoItem}>
                <span>?</span>
                <span>{t.faq}</span>
              </div>
            </div>
          </div>

          <div className={styles.sidebarServices}>
            <div className={styles.sidebarService}>
              <div className={styles.serviceIcon}>
                ▣
              </div>

              <div>
                <strong>{t.fastDelivery}</strong>
                <span>{t.deliveryText}</span>
              </div>
            </div>

            <div className={styles.sidebarService}>
              <div className={styles.serviceIcon}>
                ◇
              </div>

              <div>
                <strong>{t.simpleOrder}</strong>
                <span>{t.simpleOrderText}</span>
              </div>
            </div>

            <div className={styles.sidebarService}>
              <div className={styles.serviceIcon}>
                ↻
              </div>

              <div>
                <strong>{t.easyReturns}</strong>
                <span>{t.returnsText}</span>
              </div>
            </div>

            <div className={styles.sidebarService}>
              <div className={styles.serviceIcon}>
                ◯
              </div>

              <div>
                <strong>{t.customerService}</strong>
                <span>{t.customerServiceText}</span>
              </div>
            </div>
          </div>
        </aside>

        <section className={styles.content}>
          <section className={styles.hero}>
            <div className={styles.heroText}>
              <p className={styles.breadcrumb}>
                <span>{t.home}</span>
                <b>›</b>
                <span>{t.universe}</span>
                <b>›</b>
                <strong>{audienceText}</strong>
              </p>

              <h1>
                {t.universe}
                <span>{audienceLabel}</span>
              </h1>

              <div className={styles.heroUnderline} />

              <p className={styles.heroDescription}>
                {t.description}
              </p>

              <div className={styles.heroBenefits}>
                <div className={styles.heroBenefit}>
                  <div className={styles.benefitIcon}>
                    ✦
                  </div>

                  <div>
                    <strong>
                      {t.qualityProducts}
                    </strong>
                    <small>
                      {t.premiumSelection}
                    </small>
                  </div>
                </div>

                <div className={styles.heroBenefit}>
                  <div className={styles.benefitIcon}>
                    ◇
                  </div>

                  <div>
                    <strong>
                      {t.simpleOrder}
                    </strong>
                    <small>
                      {t.simpleOrderText}
                    </small>
                  </div>
                </div>

                <div className={styles.heroBenefit}>
                  <div className={styles.benefitIcon}>
                    ▱
                  </div>

                  <div>
                    <strong>
                      {t.fastDelivery}
                    </strong>
                    <small>
                      {t.deliveryText}
                    </small>
                  </div>
                </div>

                <div className={styles.heroBenefit}>
                  <div className={styles.benefitIcon}>
                    ↻
                  </div>

                  <div>
                    <strong>
                      {t.easyReturns}
                    </strong>
                    <small>
                      {t.returnsText}
                    </small>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.heroVisual}>
              <img
                src={heroImage}
                alt={`${t.universe} ${audienceText}`}
                className={styles.heroImage}
              />

              <div className={styles.heroFade} />
            </div>
          </section>

          <section className={styles.disciplines}>
            <div className={styles.sectionHeading}>
              <p className={styles.sectionKicker}>
                <span />
                {t.ourDisciplines}
              </p>

              <h2>
                {t.chooseDiscipline}
              </h2>
            </div>

            <div className={styles.disciplineGrid}>
              {sports.map((sport) => (
                <Link
                  key={sport.key}
                  href={`/${locale}${sport.href}?audience=${audience}`}
                  className={styles.disciplineCard}
                >
                  <div className={styles.disciplineImage}>
                    <img
                      src={getSportImage(sport.image)}
                      alt={t.sports[sport.key]}
                    />
                  </div>

                  <div className={styles.disciplineIcon}>
                    {sport.icon}
                  </div>

                  <div className={styles.disciplineContent}>
                    <h3>
                      {t.sports[sport.key]}
                    </h3>

                    <p>
                      {sport.count} {t.products}
                    </p>

                    <span className={styles.discover}>
                      {t.discover}
                      <b>→</b>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className={styles.bottomServices}>
            <div className={styles.bottomService}>
              <div className={styles.bottomIcon}>
                ♔
              </div>

              <div>
                <strong>
                  {t.premiumBrands}
                </strong>
                <span>
                  {t.premiumBrandsText}
                </span>
              </div>
            </div>

            <div className={styles.bottomService}>
              <div className={styles.bottomIcon}>
                %
              </div>

              <div>
                <strong>
                  {t.competitivePrices}
                </strong>
                <span>
                  {t.competitivePricesText}
                </span>
              </div>
            </div>

            <div className={styles.bottomService}>
              <div className={styles.bottomIcon}>
                ✓
              </div>

              <div>
                <strong>
                  {t.quality}
                </strong>
                <span>
                  {t.qualityText}
                </span>
              </div>
            </div>

            <div className={styles.bottomService}>
              <div className={styles.bottomIcon}>
                ◯
              </div>

              <div>
                <strong>
                  {t.expertAdvice}
                </strong>
                <span>
                  {t.expertAdviceText}
                </span>
              </div>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}