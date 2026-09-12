import Link from "next/link";
import type { ReactNode } from "react";
import { getLocale } from "next-intl/server";
import {
  Baby,
  BriefcaseBusiness,
  Footprints,
  Glasses,
  Home,
  Info,
  Ruler,
  Shirt,
} from "lucide-react";

import styles from "./tailles.module.css";

type Locale =
  | "fr"
  | "en"
  | "de"
  | "es"
  | "it"
  | "ar"
  | "zh";

const supportedLocales: Locale[] = [
  "fr",
  "en",
  "de",
  "es",
  "it",
  "ar",
  "zh",
];

const translations = {
  fr: {
    home: "Accueil",
    current: "Tableau des tailles",

    kicker: "GUIDE DES TAILLES",
    title: "Tableau des tailles",
    description:
      "Trouvez facilement la taille idéale pour tous nos univers et profitez d’un confort parfaitement adapté.",

    navAria: "Catégories de tailles",
    navShoes: "Chaussures",
    navClothing: "Vêtements",
    navKids: "Enfant",
    navAccessories: "Accessoires",

    sizeGuide: "GUIDE DES TAILLES",
    sizeGrid: "GRILLE DE TAILLE",
    clothing: "VÊTEMENTS",

    shoesTitle: "CHAUSSURES – CONVERSION INTERNATIONALE",
    eu: "EU",
    us: "US",
    uk: "UK",
    footLength: "Longueur du pied (cm)",

    textileTitle: "TEXTILE",
    size: "Taille",
    juniorTextile: "Textile junior",
    adultTextile: "Textile adulte",

    menTitle: "HOMME",
    womenTitle: "FEMME",
    chest: "Poitrine",
    waist: "Tour de taille",
    hips: "Hanches",

    kidsTitle: "ENFANT",
    age: "Âge",
    recommended: "Taille recommandée",

    runningTitle: "RUNNING",

    bagsTitle: "Sacs",
    bagsText:
      "Mini, Small, Medium, Large et XL. Vérifiez toujours les dimensions indiquées sur la fiche produit.",

    beltsTitle: "Ceintures",
    beltsText:
      "Mesurez votre tour de taille à l’endroit où vous portez habituellement votre ceinture.",

    glassesTitle: "Lunettes",
    glassesText:
      "Consultez la largeur de la monture, du pont et des branches sur chaque fiche produit.",

    adviceTitle: "Conseil SBI PARIS",
    adviceText:
      "Si vous hésitez entre deux tailles, nous vous conseillons de choisir la taille supérieure pour davantage de confort.",

    ages: [
      "2 ans",
      "4 ans",
      "6 ans",
      "8 ans",
      "10 ans",
      "12 ans",
      "14 ans",
    ],

    juniorAges: [
      "< 6 ans / 104 cm",
      "6 ans / 116 cm",
      "8 ans / 128 cm",
      "10 ans / 140 cm",
      "12 ans / 152 cm",
      "14 ans / 164 cm",
    ],
  },

  en: {
    home: "Home",
    current: "Size guide",

    kicker: "SIZE GUIDE",
    title: "Size guide",
    description:
      "Find the ideal size for every SBI PARIS universe and enjoy a perfectly comfortable fit.",

    navAria: "Size categories",
    navShoes: "Shoes",
    navClothing: "Clothing",
    navKids: "Kids",
    navAccessories: "Accessories",

    sizeGuide: "SIZE GUIDE",
    sizeGrid: "SIZE CHART",
    clothing: "CLOTHING",

    shoesTitle: "SHOES – INTERNATIONAL CONVERSION",
    eu: "EU",
    us: "US",
    uk: "UK",
    footLength: "Foot length (cm)",

    textileTitle: "TEXTILE",
    size: "Size",
    juniorTextile: "Junior textile",
    adultTextile: "Adult textile",

    menTitle: "MEN",
    womenTitle: "WOMEN",
    chest: "Chest",
    waist: "Waist",
    hips: "Hips",

    kidsTitle: "KIDS",
    age: "Age",
    recommended: "Recommended size",

    runningTitle: "RUNNING",

    bagsTitle: "Bags",
    bagsText:
      "Mini, Small, Medium, Large and XL. Always check the dimensions shown on the product page.",

    beltsTitle: "Belts",
    beltsText:
      "Measure your waist where you usually wear your belt.",

    glassesTitle: "Glasses",
    glassesText:
      "Check the frame, bridge and temple measurements on each product page.",

    adviceTitle: "SBI PARIS advice",
    adviceText:
      "If you are between two sizes, we recommend choosing the larger size for greater comfort.",

    ages: [
      "2 years",
      "4 years",
      "6 years",
      "8 years",
      "10 years",
      "12 years",
      "14 years",
    ],

    juniorAges: [
      "< 6 years / 104 cm",
      "6 years / 116 cm",
      "8 years / 128 cm",
      "10 years / 140 cm",
      "12 years / 152 cm",
      "14 years / 164 cm",
    ],
  },

  de: {
    home: "Startseite",
    current: "Größentabelle",

    kicker: "GRÖSSENRATGEBER",
    title: "Größentabelle",
    description:
      "Finden Sie ganz einfach die ideale Größe für alle unsere Bereiche und genießen Sie optimalen Tragekomfort.",

    navAria: "Größenkategorien",
    navShoes: "Schuhe",
    navClothing: "Bekleidung",
    navKids: "Kinder",
    navAccessories: "Accessoires",

    sizeGuide: "GRÖSSENRATGEBER",
    sizeGrid: "GRÖSSENTABELLE",
    clothing: "BEKLEIDUNG",

    shoesTitle: "SCHUHE – INTERNATIONALE UMRECHNUNG",
    eu: "EU",
    us: "US",
    uk: "UK",
    footLength: "Fußlänge (cm)",

    textileTitle: "TEXTILIEN",
    size: "Größe",
    juniorTextile: "Junior-Textilien",
    adultTextile: "Erwachsenen-Textilien",

    menTitle: "HERREN",
    womenTitle: "DAMEN",
    chest: "Brustumfang",
    waist: "Taillenumfang",
    hips: "Hüftumfang",

    kidsTitle: "KINDER",
    age: "Alter",
    recommended: "Empfohlene Größe",

    runningTitle: "RUNNING",

    bagsTitle: "Taschen",
    bagsText:
      "Mini, Small, Medium, Large und XL. Prüfen Sie immer die auf der Produktseite angegebenen Maße.",

    beltsTitle: "Gürtel",
    beltsText:
      "Messen Sie Ihren Taillenumfang an der Stelle, an der Sie den Gürtel normalerweise tragen.",

    glassesTitle: "Brillen",
    glassesText:
      "Prüfen Sie auf jeder Produktseite die Breite von Fassung, Steg und Bügeln.",

    adviceTitle: "SBI PARIS Tipp",
    adviceText:
      "Wenn Sie zwischen zwei Größen liegen, empfehlen wir für mehr Komfort die größere Größe.",

    ages: [
      "2 Jahre",
      "4 Jahre",
      "6 Jahre",
      "8 Jahre",
      "10 Jahre",
      "12 Jahre",
      "14 Jahre",
    ],

    juniorAges: [
      "< 6 Jahre / 104 cm",
      "6 Jahre / 116 cm",
      "8 Jahre / 128 cm",
      "10 Jahre / 140 cm",
      "12 Jahre / 152 cm",
      "14 Jahre / 164 cm",
    ],
  },

  es: {
    home: "Inicio",
    current: "Guía de tallas",

    kicker: "GUÍA DE TALLAS",
    title: "Guía de tallas",
    description:
      "Encuentra fácilmente la talla ideal para todas nuestras colecciones y disfruta de un ajuste perfectamente cómodo.",

    navAria: "Categorías de tallas",
    navShoes: "Calzado",
    navClothing: "Ropa",
    navKids: "Niños",
    navAccessories: "Accesorios",

    sizeGuide: "GUÍA DE TALLAS",
    sizeGrid: "TABLA DE TALLAS",
    clothing: "ROPA",

    shoesTitle: "CALZADO – CONVERSIÓN INTERNACIONAL",
    eu: "EU",
    us: "US",
    uk: "UK",
    footLength: "Longitud del pie (cm)",

    textileTitle: "TEXTIL",
    size: "Talla",
    juniorTextile: "Textil juvenil",
    adultTextile: "Textil adulto",

    menTitle: "HOMBRE",
    womenTitle: "MUJER",
    chest: "Pecho",
    waist: "Cintura",
    hips: "Caderas",

    kidsTitle: "NIÑOS",
    age: "Edad",
    recommended: "Talla recomendada",

    runningTitle: "RUNNING",

    bagsTitle: "Bolsos",
    bagsText:
      "Mini, Small, Medium, Large y XL. Comprueba siempre las dimensiones indicadas en la ficha del producto.",

    beltsTitle: "Cinturones",
    beltsText:
      "Mide tu cintura en el punto donde sueles llevar el cinturón.",

    glassesTitle: "Gafas",
    glassesText:
      "Consulta el ancho de la montura, el puente y las varillas en cada ficha de producto.",

    adviceTitle: "Consejo SBI PARIS",
    adviceText:
      "Si dudas entre dos tallas, te recomendamos elegir la talla superior para mayor comodidad.",

    ages: [
      "2 años",
      "4 años",
      "6 años",
      "8 años",
      "10 años",
      "12 años",
      "14 años",
    ],

    juniorAges: [
      "< 6 años / 104 cm",
      "6 años / 116 cm",
      "8 años / 128 cm",
      "10 años / 140 cm",
      "12 años / 152 cm",
      "14 años / 164 cm",
    ],
  },

  it: {
    home: "Home",
    current: "Guida alle taglie",

    kicker: "GUIDA ALLE TAGLIE",
    title: "Guida alle taglie",
    description:
      "Trova facilmente la taglia ideale per tutte le nostre collezioni e goditi una vestibilità perfettamente confortevole.",

    navAria: "Categorie di taglie",
    navShoes: "Scarpe",
    navClothing: "Abbigliamento",
    navKids: "Bambini",
    navAccessories: "Accessori",

    sizeGuide: "GUIDA ALLE TAGLIE",
    sizeGrid: "TABELLA TAGLIE",
    clothing: "ABBIGLIAMENTO",

    shoesTitle: "SCARPE – CONVERSIONE INTERNAZIONALE",
    eu: "EU",
    us: "US",
    uk: "UK",
    footLength: "Lunghezza del piede (cm)",

    textileTitle: "TESSILE",
    size: "Taglia",
    juniorTextile: "Tessile junior",
    adultTextile: "Tessile adulto",

    menTitle: "UOMO",
    womenTitle: "DONNA",
    chest: "Torace",
    waist: "Vita",
    hips: "Fianchi",

    kidsTitle: "BAMBINI",
    age: "Età",
    recommended: "Taglia consigliata",

    runningTitle: "RUNNING",

    bagsTitle: "Borse",
    bagsText:
      "Mini, Small, Medium, Large e XL. Controlla sempre le dimensioni indicate nella scheda prodotto.",

    beltsTitle: "Cinture",
    beltsText:
      "Misura il girovita nel punto in cui indossi abitualmente la cintura.",

    glassesTitle: "Occhiali",
    glassesText:
      "Controlla la larghezza della montatura, del ponte e delle aste in ogni scheda prodotto.",

    adviceTitle: "Consiglio SBI PARIS",
    adviceText:
      "Se sei indeciso tra due taglie, ti consigliamo di scegliere quella più grande per un maggiore comfort.",

    ages: [
      "2 anni",
      "4 anni",
      "6 anni",
      "8 anni",
      "10 anni",
      "12 anni",
      "14 anni",
    ],

    juniorAges: [
      "< 6 anni / 104 cm",
      "6 anni / 116 cm",
      "8 anni / 128 cm",
      "10 anni / 140 cm",
      "12 anni / 152 cm",
      "14 anni / 164 cm",
    ],
  },

  ar: {
    home: "الرئيسية",
    current: "دليل المقاسات",

    kicker: "دليل المقاسات",
    title: "دليل المقاسات",
    description:
      "اعثر بسهولة على المقاس المثالي في جميع مجموعاتنا واستمتع براحة وملاءمة أفضل.",

    navAria: "فئات المقاسات",
    navShoes: "الأحذية",
    navClothing: "الملابس",
    navKids: "الأطفال",
    navAccessories: "الإكسسوارات",

    sizeGuide: "دليل المقاسات",
    sizeGrid: "جدول المقاسات",
    clothing: "الملابس",

    shoesTitle: "الأحذية – التحويل الدولي للمقاسات",
    eu: "EU",
    us: "US",
    uk: "UK",
    footLength: "طول القدم (سم)",

    textileTitle: "الملابس",
    size: "المقاس",
    juniorTextile: "ملابس الناشئين",
    adultTextile: "ملابس البالغين",

    menTitle: "الرجال",
    womenTitle: "النساء",
    chest: "الصدر",
    waist: "الخصر",
    hips: "الورك",

    kidsTitle: "الأطفال",
    age: "العمر",
    recommended: "المقاس الموصى به",

    runningTitle: "الجري",

    bagsTitle: "الحقائب",
    bagsText:
      "Mini وSmall وMedium وLarge وXL. تحقّق دائمًا من الأبعاد المذكورة في صفحة المنتج.",

    beltsTitle: "الأحزمة",
    beltsText:
      "قِس محيط خصرك في الموضع الذي ترتدي فيه الحزام عادةً.",

    glassesTitle: "النظارات",
    glassesText:
      "راجع عرض الإطار والجسر والأذرع في صفحة كل منتج.",

    adviceTitle: "نصيحة SBI PARIS",
    adviceText:
      "إذا كنت مترددًا بين مقاسين، فننصحك باختيار المقاس الأكبر لمزيد من الراحة.",

    ages: [
      "سنتان",
      "4 سنوات",
      "6 سنوات",
      "8 سنوات",
      "10 سنوات",
      "12 سنة",
      "14 سنة",
    ],

    juniorAges: [
      "أقل من 6 سنوات / 104 سم",
      "6 سنوات / 116 سم",
      "8 سنوات / 128 سم",
      "10 سنوات / 140 سم",
      "12 سنة / 152 سم",
      "14 سنة / 164 سم",
    ],
  },

  zh: {
    home: "首页",
    current: "尺码指南",

    kicker: "尺码指南",
    title: "尺码指南",
    description:
      "轻松找到适合各类 SBI PARIS 产品的理想尺码，享受更舒适的穿着体验。",

    navAria: "尺码分类",
    navShoes: "鞋履",
    navClothing: "服装",
    navKids: "儿童",
    navAccessories: "配饰",

    sizeGuide: "尺码指南",
    sizeGrid: "尺码表",
    clothing: "服装",

    shoesTitle: "鞋履 – 国际尺码转换",
    eu: "EU",
    us: "US",
    uk: "UK",
    footLength: "脚长（cm）",

    textileTitle: "服装",
    size: "尺码",
    juniorTextile: "青少年服装",
    adultTextile: "成人服装",

    menTitle: "男士",
    womenTitle: "女士",
    chest: "胸围",
    waist: "腰围",
    hips: "臀围",

    kidsTitle: "儿童",
    age: "年龄",
    recommended: "建议尺码",

    runningTitle: "跑步",

    bagsTitle: "包袋",
    bagsText:
      "提供 Mini、Small、Medium、Large 和 XL。请始终查看商品页面上标注的具体尺寸。",

    beltsTitle: "腰带",
    beltsText:
      "请测量您通常佩戴腰带位置的腰围。",

    glassesTitle: "眼镜",
    glassesText:
      "请在每个商品页面查看镜框、鼻梁和镜腿的宽度。",

    adviceTitle: "SBI PARIS 尺码建议",
    adviceText:
      "如果您介于两个尺码之间，我们建议选择较大的尺码，以获得更舒适的穿着体验。",

    ages: [
      "2 岁",
      "4 岁",
      "6 岁",
      "8 岁",
      "10 岁",
      "12 岁",
      "14 岁",
    ],

    juniorAges: [
      "6 岁以下 / 104 cm",
      "6 岁 / 116 cm",
      "8 岁 / 128 cm",
      "10 岁 / 140 cm",
      "12 岁 / 152 cm",
      "14 岁 / 164 cm",
    ],
  },
} as const;const shoeSizes: string[][] = [
  ["38", "6", "5", "24"],
  ["39", "6.5", "5.5", "24.5"],
  ["40", "7", "6", "25"],
  ["41", "8", "7", "25.5"],
  ["42", "9", "8", "26"],
  ["43", "9.5", "8.5", "26.5"],
  ["44", "10", "9", "27"],
  ["45", "11", "10", "27.5"],
  ["46", "12", "11", "28"],
  ["47", "13", "12", "28.5"],
  ["48", "14", "13", "29"],
  ["49", "15", "14", "29.5"],
  ["50", "16", "15", "30"],
];

const hommeSizes: string[][] = [
  ["XS", "84-88", "70-74", "86-90"],
  ["S", "88-92", "74-78", "90-94"],
  ["M", "92-98", "78-84", "94-100"],
  ["L", "98-104", "84-90", "100-106"],
  ["XL", "104-110", "90-96", "106-112"],
  ["XXL", "110-116", "96-102", "112-118"],
  ["3XL", "116-122", "102-108", "118-124"],
];

const femmeSizes: string[][] = [
  ["XS", "78-82", "60-64", "86-90"],
  ["S", "82-86", "64-68", "90-94"],
  ["M", "86-92", "68-74", "94-100"],
  ["L", "92-98", "74-80", "100-106"],
  ["XL", "98-104", "80-86", "106-112"],
  ["XXL", "104-110", "86-92", "112-118"],
];

const runningSizes: string[][] = [
  ["38", "24"],
  ["39", "24.5"],
  ["40", "25"],
  ["41", "25.5"],
  ["42", "26"],
  ["43", "26.5"],
  ["44", "27"],
  ["45", "27.5"],
  ["46", "28"],
];

export default async function TableauDesTaillesPage() {
  const requestedLocale = await getLocale();

  const locale: Locale = supportedLocales.includes(
    requestedLocale as Locale,
  )
    ? (requestedLocale as Locale)
    : "fr";

  const t = translations[locale];

  const enfantSizes: string[][] = [
    [t.ages[0], "92 cm"],
    [t.ages[1], "104 cm"],
    [t.ages[2], "116 cm"],
    [t.ages[3], "128 cm"],
    [t.ages[4], "140 cm"],
    [t.ages[5], "152 cm"],
    [t.ages[6], "164 cm"],
  ];

  const textileSizes: string[][] = [
    ["5XS", t.juniorAges[0], "—"],
    ["4XS", t.juniorAges[1], "—"],
    ["3XS", t.juniorAges[2], "—"],
    ["2XS", t.juniorAges[3], "—"],
    ["XS", t.juniorAges[4], "—"],
    ["S", t.juniorAges[5], "166 / 174 cm"],
    ["M", "—", "174 / 182 cm"],
    ["L", "—", "182 / 190 cm"],
    ["XL", "—", "190 / 198 cm"],
    ["2XL", "—", "198 / 206 cm"],
    ["3XL", "—", "> 206 cm"],
    ["4XL", "—", "> 206 cm"],
  ];

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href={`/${locale}`}>
          <Home size={15} aria-hidden="true" />
          {t.home}
        </Link>

        <span aria-hidden="true">›</span>

        <strong>{t.current}</strong>
      </div>

      <section className={styles.hero}>
        <span className={styles.kicker}>
          {t.kicker}
        </span>

        <h1>{t.title}</h1>

        <span className={styles.titleLine} />

        <p>{t.description}</p>
      </section>

      <nav
        className={styles.categoryNav}
        aria-label={t.navAria}
      >
        <a href="#chaussures">
          <Footprints
            size={25}
            strokeWidth={1.6}
          />

          <span>{t.navShoes}</span>
        </a>

        <a href="#vetements">
          <Shirt
            size={25}
            strokeWidth={1.6}
          />

          <span>{t.navClothing}</span>
        </a>

        <a href="#enfant">
          <Baby
            size={25}
            strokeWidth={1.6}
          />

          <span>{t.navKids}</span>
        </a>

        <a href="#accessoires">
          <Glasses
            size={25}
            strokeWidth={1.6}
          />

          <span>{t.navAccessories}</span>
        </a>
      </nav>

      <section
        id="chaussures"
        className={styles.guideCard}
      >
        <GuideHeader
          icon={
            <Footprints
              size={29}
              strokeWidth={1.6}
            />
          }
          eyebrow={t.sizeGuide}
          title={t.shoesTitle}
        />

        <ResponsiveTable
          headers={[
            t.eu,
            t.us,
            t.uk,
            t.footLength,
          ]}
          rows={shoeSizes}
        />
      </section>

      <section
        id="vetements"
        className={styles.guideCard}
      >
        <GuideHeader
          icon={
            <Shirt
              size={29}
              strokeWidth={1.6}
            />
          }
          eyebrow={t.sizeGrid}
          title={t.textileTitle}
        />

        <ResponsiveTable
          headers={[
            t.size,
            t.juniorTextile,
            t.adultTextile,
          ]}
          rows={textileSizes}
        />
      </section>

      <section className={styles.doubleGrid}>
        <article className={styles.guideCard}>
          <GuideHeader
            icon={
              <Shirt
                size={27}
                strokeWidth={1.6}
              />
            }
            eyebrow={t.clothing}
            title={t.menTitle}
          />

          <ResponsiveTable
            headers={[
              t.size,
              t.chest,
              t.waist,
              t.hips,
            ]}
            rows={hommeSizes}
          />
        </article>

        <article className={styles.guideCard}>
          <GuideHeader
            icon={
              <Shirt
                size={27}
                strokeWidth={1.6}
              />
            }
            eyebrow={t.clothing}
            title={t.womenTitle}
          />

          <ResponsiveTable
            headers={[
              t.size,
              t.chest,
              t.waist,
              t.hips,
            ]}
            rows={femmeSizes}
          />
        </article>
      </section>

      <section
        id="enfant"
        className={styles.guideCard}
      >
        <GuideHeader
          icon={
            <Baby
              size={29}
              strokeWidth={1.6}
            />
          }
          eyebrow={t.sizeGrid}
          title={t.kidsTitle}
        />

        <ResponsiveTable
          headers={[
            t.age,
            t.recommended,
          ]}
          rows={enfantSizes}
        />
      </section>

      <section className={styles.guideCard}>
        <GuideHeader
          icon={
            <Ruler
              size={29}
              strokeWidth={1.6}
            />
          }
          eyebrow={t.sizeGrid}
          title={t.runningTitle}
        />

        <ResponsiveTable
          headers={[
            t.eu,
            t.footLength,
          ]}
          rows={runningSizes}
        />
      </section>

      <section
        id="accessoires"
        className={styles.accessoryGrid}
      >
        <article>
          <BriefcaseBusiness
            size={31}
            strokeWidth={1.5}
          />

          <h2>{t.bagsTitle}</h2>

          <p>{t.bagsText}</p>
        </article>

        <article>
          <Ruler
            size={31}
            strokeWidth={1.5}
          />

          <h2>{t.beltsTitle}</h2>

          <p>{t.beltsText}</p>
        </article>

        <article>
          <Glasses
            size={31}
            strokeWidth={1.5}
          />

          <h2>{t.glassesTitle}</h2>

          <p>{t.glassesText}</p>
        </article>
      </section>

      <section className={styles.adviceBox}>
        <Info
          size={28}
          strokeWidth={1.7}
        />

        <div>
          <h2>{t.adviceTitle}</h2>

          <p>{t.adviceText}</p>
        </div>
      </section>
    </main>
  );
}

type GuideHeaderProps = {
  icon: ReactNode;
  eyebrow: string;
  title: string;
};

function GuideHeader({
  icon,
  eyebrow,
  title,
}: GuideHeaderProps) {
  return (
    <div className={styles.guideHeader}>
      <span className={styles.guideIcon}>
        {icon}
      </span>

      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

type ResponsiveTableProps = {
  headers: readonly string[];
  rows: string[][];
};

function ResponsiveTable({
  headers,
  rows,
}: ResponsiveTableProps) {
  return (
    <div className={styles.tableWrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map(
              (header, headerIndex) => (
                <th
                  key={`${header}-${headerIndex}`}
                >
                  {header}
                </th>
              ),
            )}
          </tr>
        </thead>

        <tbody>
          {rows.map(
            (row, rowIndex) => (
              <tr
                key={`${row[0]}-${rowIndex}`}
              >
                {row.map(
                  (cell, cellIndex) => (
                    <td
                      key={`${cell}-${cellIndex}`}
                    >
                      {cell}
                    </td>
                  ),
                )}
              </tr>
            ),
          )}
        </tbody>
      </table>
    </div>
  );
}