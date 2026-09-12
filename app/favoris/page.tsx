import Link from "next/link";
import {Heart, ArrowLeft} from "lucide-react";
import {getLocale} from "next-intl/server";
import styles from "./page.module.css";

const texts = {
  fr: {
    title: "Mes favoris",
    description: "Retrouvez bientôt ici tous vos articles préférés SBI PARIS.",
    back: "Retour à l’accueil",
  },
  en: {
    title: "My favorites",
    description: "You will soon find all your favorite SBI PARIS items here.",
    back: "Back to home",
  },
  ar: {
    title: "المفضلة",
    description: "ستجد قريبًا هنا جميع منتجات SBI PARIS المفضلة لديك.",
    back: "العودة إلى الصفحة الرئيسية",
  },
  de: {
    title: "Meine Favoriten",
    description: "Hier finden Sie bald alle Ihre Lieblingsartikel von SBI PARIS.",
    back: "Zur Startseite",
  },
  es: {
    title: "Mis favoritos",
    description: "Pronto encontrarás aquí todos tus artículos favoritos de SBI PARIS.",
    back: "Volver al inicio",
  },
  it: {
    title: "I miei preferiti",
    description: "Presto troverai qui tutti i tuoi articoli SBI PARIS preferiti.",
    back: "Torna alla home",
  },
  zh: {
    title: "我的收藏",
    description: "您很快将在这里找到所有喜爱的 SBI PARIS 商品。",
    back: "返回首页",
  },
} as const;

export default async function FavorisPage() {
  const locale = await getLocale();
  const text = texts[locale as keyof typeof texts] ?? texts.fr;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon}>
          <Heart size={38} strokeWidth={1.5} />
        </div>

        <span className={styles.kicker}>SBI PARIS</span>
        <h1>{text.title}</h1>
        <span className={styles.line} />

        <p>{text.description}</p>

        <Link href={`/${locale}`} className={styles.button}>
          <ArrowLeft size={17} />
          {text.back}
        </Link>
      </section>
    </main>
  );
}