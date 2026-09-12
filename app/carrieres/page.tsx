import Link from "next/link";
import {
  ArrowRight,
  BriefcaseBusiness,
  Gem,
  GraduationCap,
  Heart,
  Lightbulb,
  Mail,
  Megaphone,
  Monitor,
  ShoppingBag,
  TrendingUp,
  Users,
} from "lucide-react";

import styles from "./carrieres.module.css";

const values = [
  {
    title: "Esprit d’équipe",
    text: "Nous croyons en la collaboration et au respect mutuel.",
    icon: Users,
  },
  {
    title: "Évolution",
    text: "Nous accompagnons votre développement professionnel.",
    icon: TrendingUp,
  },
  {
    title: "Excellence",
    text: "Nous visons l’excellence dans chaque détail.",
    icon: Gem,
  },
  {
    title: "Innovation",
    text: "Nous encourageons les idées nouvelles et la créativité.",
    icon: Lightbulb,
  },
  {
    title: "Passion",
    text: "Nous partageons la passion de la mode et du service.",
    icon: Heart,
  },
];

const reasons = [
  {
    title: "Une marque élégante et ambitieuse",
    text: "SBI PARIS est une marque parisienne en pleine croissance, reconnue pour son exigence et son savoir-faire.",
    icon: ShoppingBag,
  },
  {
    title: "Un environnement stimulant",
    text: "Intégrez des équipes passionnées dans un environnement dynamique et bienveillant.",
    icon: Users,
  },
  {
    title: "Des opportunités d’évolution",
    text: "Nous offrons de réelles perspectives d’évolution et de formation continue.",
    icon: GraduationCap,
  },
  {
    title: "Des avantages attractifs",
    text: "Avantages salariés, réductions sur nos collections, primes de performance et plus encore.",
    icon: BriefcaseBusiness,
  },
];

const jobs = [
  {
    title: "Conseiller(ère) de vente",
    category: "Retail",
    location: "Paris, France",
    contract: "CDI",
    icon: ShoppingBag,
  },
  {
    title: "Responsable de boutique",
    category: "Retail",
    location: "Paris, France",
    contract: "CDI",
    icon: BriefcaseBusiness,
  },
  {
    title: "Chargé(e) e-commerce",
    category: "Digital",
    location: "Paris, France",
    contract: "CDI",
    icon: Monitor,
  },
  {
    title: "Assistant(e) marketing",
    category: "Marketing",
    location: "Paris, France",
    contract: "CDI",
    icon: Megaphone,
  },
  {
    title: "Service client",
    category: "Relation client",
    location: "Paris, France",
    contract: "CDD",
    icon: Users,
  },
];

export default function CarrieresPage() {
  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.breadcrumb}>
          <Link href="/">Accueil</Link>
          <span aria-hidden="true">›</span>
          <strong>Carrières</strong>
        </div>

        <section className={styles.hero}>
          <h1>Carrières</h1>
          <span className={styles.titleLine} />

          <p>
            Rejoignez l’aventure SBI PARIS et participez à une histoire
            d’élégance, de passion et d’innovation. Ensemble, construisons
            l’avenir.
          </p>
        </section>

        <section className={styles.valuesGrid}>
          {values.map((item) => {
            const Icon = item.icon;

            return (
              <article className={styles.valueCard} key={item.title}>
                <span className={styles.valueIcon}>
                  <Icon size={27} strokeWidth={1.6} />
                </span>

                <div>
                  <h2>{item.title}</h2>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </section>

        <section className={styles.mainGrid}>
          <aside className={styles.reasonsPanel}>
            <h2>Pourquoi nous rejoindre ?</h2>
            <span className={styles.sectionLine} />

            <div className={styles.reasonsList}>
              {reasons.map((item) => {
                const Icon = item.icon;

                return (
                  <article className={styles.reasonItem} key={item.title}>
                    <span className={styles.reasonIcon}>
                      <Icon size={28} strokeWidth={1.5} />
                    </span>

                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>

            <div
              className={styles.eiffelDecoration}
              aria-hidden="true"
            />
          </aside>

          <div className={styles.jobsPanel}>
            <div className={styles.jobsHeader}>
              <div>
                <h2>Nos offres d’emploi</h2>
                <span className={styles.sectionLine} />
              </div>

              <Link href="/carrieres" className={styles.allJobsLink}>
                Voir toutes les offres
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className={styles.jobsList}>
              {jobs.map((job) => {
                const Icon = job.icon;

                return (
                  <article className={styles.jobCard} key={job.title}>
                    <span className={styles.jobIcon}>
                      <Icon size={22} strokeWidth={1.6} />
                    </span>

                    <div className={styles.jobInfo}>
                      <h3>{job.title}</h3>

                      <p>
                        {job.category}
                        <span>•</span>
                        {job.location}
                      </p>
                    </div>

                    <span className={styles.contract}>
                      {job.contract}
                    </span>

                    <button type="button" className={styles.jobButton}>
                      VOIR L’OFFRE
                    </button>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.spontaneous}>
          <div className={styles.spontaneousText}>
            <span className={styles.mailIcon}>
              <Mail size={25} strokeWidth={1.6} />
            </span>

            <div>
              <h2>Vous ne trouvez pas le poste idéal ?</h2>
              <p>
                Envoyez-nous votre candidature spontanée, nous étudions toutes
                les candidatures avec attention.
              </p>
            </div>
          </div>

          <a
            href="mailto:contact@sbiparis.com?subject=Candidature spontanée"
            className={styles.applyButton}
          >
            ENVOYER MA CANDIDATURE
            <ArrowRight size={18} />
          </a>
        </section>
      </div>
    </main>
  );
}
