import Link from "next/link";
import {UserRound, ArrowLeft} from "lucide-react";
import {getLocale} from "next-intl/server";
import styles from "./page.module.css";

const texts = {
  fr: {
    title: "Mon compte",
    description: "Votre espace client SBI PARIS sera disponible prochainement.",
    back: "Retour à l’accueil",
  },
  en: {
    title: "My account",
    description: "Your SBI PARIS customer area will be available soon.",
    back: "Back to home",
  },
  ar: {
    title: "حسابي",
    description: "ستتوفر مساحة حسابك في SBI PARIS قريبًا.",
    back: "العودة إلى الصفحة الرئيسية",
  },
  de: {
    title: "Mein Konto",
    description: "Ihr SBI PARIS Kundenbereich wird bald verfügbar sein.",
    back: "Zur Startseite",
  },
  es: {
    title: "Mi cuenta",
    description: "Tu espacio de cliente SBI PARIS estará disponible próximamente.",
    back: "Volver al inicio",
  },
  it: {
    title: "Il mio account",
    description: "La tua area cliente SBI PARIS sarà presto disponibile.",
    back: "Torna alla home",
  },
  zh: {
    title: "我的账户",
    description: "您的 SBI PARIS 客户专区即将上线。",
    back: "返回首页",
  },
} as const;

export default async function ComptePage() {
  const locale = await getLocale();
  const text = texts[locale as keyof typeof texts] ?? texts.fr;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <div className={styles.icon}>
          <UserRound size={38} strokeWidth={1.5} />
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