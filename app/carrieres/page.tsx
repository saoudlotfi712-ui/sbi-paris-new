import Link from "next/link";
import {useTranslations} from "next-intl";
import {ArrowRight,BriefcaseBusiness,Gem,GraduationCap,Heart,Lightbulb,Mail,Megaphone,Monitor,ShoppingBag,TrendingUp,Users} from "lucide-react";
import styles from "./carrieres.module.css";

export default function CarrieresPage(){
  const t=useTranslations("careersPage");
  const values=[{key:"team",icon:Users},{key:"growth",icon:TrendingUp},{key:"excellence",icon:Gem},{key:"innovation",icon:Lightbulb},{key:"passion",icon:Heart}];
  const reasons=[{key:"brand",icon:ShoppingBag},{key:"environment",icon:Users},{key:"opportunities",icon:GraduationCap},{key:"benefits",icon:BriefcaseBusiness}];
  const jobs=[{key:"sales",icon:ShoppingBag},{key:"manager",icon:BriefcaseBusiness},{key:"ecommerce",icon:Monitor},{key:"marketing",icon:Megaphone},{key:"service",icon:Users}];

  return <main className={styles.page}><div className={styles.container}>
    <div className={styles.breadcrumb}><Link href="/">{t("breadcrumb.home")}</Link><span aria-hidden="true">›</span><strong>{t("breadcrumb.current")}</strong></div>
    <section className={styles.hero}><h1>{t("title")}</h1><span className={styles.titleLine}/><p>{t("description")}</p></section>

    <section className={styles.valuesGrid}>
      {values.map(({key,icon:Icon})=><article className={styles.valueCard} key={key}><span className={styles.valueIcon}><Icon size={27} strokeWidth={1.6}/></span><div><h2>{t(`values.${key}.title`)}</h2><p>{t(`values.${key}.text`)}</p></div></article>)}
    </section>

    <section className={styles.mainGrid}>
      <aside className={styles.reasonsPanel}>
        <h2>{t("reasons.title")}</h2><span className={styles.sectionLine}/>
        <div className={styles.reasonsList}>
          {reasons.map(({key,icon:Icon})=><article className={styles.reasonItem} key={key}><span className={styles.reasonIcon}><Icon size={28} strokeWidth={1.5}/></span><div><h3>{t(`reasons.items.${key}.title`)}</h3><p>{t(`reasons.items.${key}.text`)}</p></div></article>)}
        </div>
        <div className={styles.eiffelDecoration} aria-hidden="true"/>
      </aside>

      <div className={styles.jobsPanel}>
        <div className={styles.jobsHeader}><div><h2>{t("jobs.title")}</h2><span className={styles.sectionLine}/></div><Link href="/carrieres" className={styles.allJobsLink}>{t("jobs.viewAll")}<ArrowRight size={17}/></Link></div>
        <div className={styles.jobsList}>
          {jobs.map(({key,icon:Icon})=><article className={styles.jobCard} key={key}>
            <span className={styles.jobIcon}><Icon size={22} strokeWidth={1.6}/></span>
            <div className={styles.jobInfo}><h3>{t(`jobs.items.${key}.title`)}</h3><p>{t(`jobs.items.${key}.category`)}<span>•</span>{t(`jobs.items.${key}.location`)}</p></div>
            <span className={styles.contract}>{t(`jobs.items.${key}.contract`)}</span>
            <button type="button" className={styles.jobButton}>{t("jobs.viewOffer")}</button>
          </article>)}
        </div>
      </div>
    </section>

    <section className={styles.spontaneous}>
      <div className={styles.spontaneousText}><span className={styles.mailIcon}><Mail size={25} strokeWidth={1.6}/></span><div><h2>{t("spontaneous.title")}</h2><p>{t("spontaneous.text")}</p></div></div>
      <a href="mailto:contactsbiparis@gmail.com?subject=Candidature spontanée" className={styles.applyButton}>{t("spontaneous.button")}<ArrowRight size={18}/></a>
    </section>
  </div></main>;
}
