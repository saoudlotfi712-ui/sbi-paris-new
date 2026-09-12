import Link from "next/link";
import {useTranslations} from "next-intl";
import {ArrowRight, Mail, MessageCircle, Phone} from "lucide-react";
import styles from "./faq.module.css";

export default function FaqPage() {
  const t = useTranslations("faqPage");
  const faqItems = t.raw("items") as Array<{question:string;answer:string}>;

  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">{t("breadcrumb.home")}</Link>
        <span aria-hidden="true">›</span>
        <strong>{t("breadcrumb.current")}</strong>
      </div>

      <section className={styles.hero}>
        <h1>{t("hero.title")}</h1>
        <span className={styles.titleLine} />
        <p>{t("hero.line1")}<br />{t("hero.line2")}</p>
      </section>

      <section className={styles.content}>
        <aside className={styles.helpPanel}>
          <div className={styles.helpContent}>
            <span className={styles.kicker}>{t("help.kicker")}</span>
            <h2>{t("help.title1")}<br />{t("help.title2")}</h2>
            <p>{t("help.description")}</p>

            <div className={styles.contactList}>
              <ContactItem title={t("contact.phone")} value="+33 6 22 19 68 58" href="tel:+33622196858" icon={<Phone size={21} strokeWidth={1.6} />} />
              <ContactItem title={t("contact.whatsapp")} value="+33 6 43 02 10 21" href="https://wa.me/33643021021" icon={<MessageCircle size={21} strokeWidth={1.6} />} external />
              <ContactItem title={t("contact.email")} value="contactsbiparis@gmail.com" href="mailto:contactsbiparis@gmail.com" icon={<Mail size={21} strokeWidth={1.6} />} />
            </div>

            <Link href="/contact" className={styles.contactButton}>
              {t("contact.button")}<ArrowRight size={17} />
            </Link>
          </div>
          <div className={styles.eiffelDecoration} aria-hidden="true" />
        </aside>

        <div className={styles.faqList}>
          {faqItems.map((item,index)=>(
            <details className={styles.faqItem} key={item.question} open={index===0}>
              <summary>
                <span>{index+1}. {item.question}</span>
                <span className={styles.toggleIcon} aria-hidden="true" />
              </summary>
              <div className={styles.answer}><p>{item.answer}</p></div>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

type ContactItemProps={title:string;value:string;href:string;icon:React.ReactNode;external?:boolean};

function ContactItem({title,value,href,icon,external=false}:ContactItemProps){
  return <a href={href} target={external?"_blank":undefined} rel={external?"noopener noreferrer":undefined} className={styles.contactItem}>
    <span className={styles.iconCircle}>{icon}</span>
    <span className={styles.contactText}><strong>{title}</strong><small>{value}</small></span>
  </a>;
}
