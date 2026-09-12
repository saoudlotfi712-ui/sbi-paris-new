import Link from "next/link";
import {
  Building2,
  Cookie,
  Copyright,
  ExternalLink,
  Gavel,
  Home,
  Link2,
  Mail,
  Scale,
  Server,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import styles from "./mentions-legales.module.css";

const navigationItems = [
  {
    number: "1",
    label: "Éditeur du site",
    href: "#editeur",
    icon: Building2,
  },
  {
    number: "2",
    label: "Directeur de la publication",
    href: "#directeur",
    icon: UserRound,
  },
  {
    number: "3",
    label: "Hébergement",
    href: "#hebergement",
    icon: Server,
  },
  {
    number: "4",
    label: "Propriété intellectuelle",
    href: "#propriete",
    icon: Copyright,
  },
  {
    number: "5",
    label: "Responsabilité",
    href: "#responsabilite",
    icon: Scale,
  },
  {
    number: "6",
    label: "Données personnelles",
    href: "#donnees",
    icon: ShieldCheck,
  },
  {
    number: "7",
    label: "Cookies",
    href: "#cookies",
    icon: Cookie,
  },
  {
    number: "8",
    label: "Liens hypertextes",
    href: "#liens",
    icon: Link2,
  },
  {
    number: "9",
    label: "Droit applicable",
    href: "#droit",
    icon: Gavel,
  },
  {
    number: "10",
    label: "Nous contacter",
    href: "#contact",
    icon: Mail,
  },
];

export default function MentionsLegalesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">
          <Home size={15} aria-hidden="true" />
          Accueil
        </Link>

        <span aria-hidden="true">›</span>
        <strong>Mentions légales</strong>
      </div>

      <section className={styles.hero}>
        <span className={styles.kicker}>INFORMATIONS LÉGALES</span>

        <h1>Mentions légales</h1>

        <span className={styles.titleLine} />

        <p>
          Les présentes mentions légales définissent les informations
          relatives à l’éditeur, à l’hébergement et à l’utilisation du site
          internet SBI PARIS.
        </p>
      </section>

      <div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Dans cette page</h2>
            <span />
          </div>

          <nav aria-label="Sommaire des mentions légales">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={index === 0 ? styles.activeLink : undefined}
                >
                  <Icon size={19} strokeWidth={1.6} aria-hidden="true" />

                  <span>
                    {item.number}. {item.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </aside>

        <section className={styles.legalCard}>
          <LegalSection
            id="editeur"
            number="1"
            title="Éditeur du site"
          >
            <p>
              Le présent site internet est édité par :
            </p>

            <dl className={styles.companyDetails}>
              <div>
                <dt>Dénomination sociale</dt>
                <dd>SARL BEN ISSIA PARIS</dd>
              </div>

              <div>
                <dt>Forme juridique</dt>
                <dd>Société à responsabilité limitée</dd>
              </div>

              <div>
                <dt>Capital social</dt>
                <dd>30 000 euros</dd>
              </div>

              <div>
                <dt>Siège social</dt>
                <dd>
                  139 Rue André Karman
                  <br />
                  93300 Aubervilliers, France
                </dd>
              </div>

              <div>
                <dt>RCS</dt>
                <dd>398 514 737 RCS Bobigny</dd>
              </div>

              <div>
                <dt>Date d’immatriculation</dt>
                <dd>7 octobre 1994</dd>
              </div>

              <div>
                <dt>Téléphone</dt>
                <dd>
                  <a href="tel:+33622196858">
                    +33 6 22 19 68 58
                  </a>
                </dd>
              </div>

              <div>
                <dt>Adresse électronique</dt>
                <dd>
                  <a href="mailto:contactsbiparis@gmail.com">
                    contactsbiparis@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </LegalSection>

          <LegalSection
            id="directeur"
            number="2"
            title="Directeur de la publication"
          >
            <p>
              Le directeur de la publication du site est :
            </p>

            <p className={styles.highlightText}>
              Monsieur Habib BEN ISSIA, en qualité de gérant de la société
              SARL BEN ISSIA PARIS.
            </p>
          </LegalSection>

          <LegalSection
            id="hebergement"
            number="3"
            title="Hébergement"
          >
            <p>Le site est hébergé par :</p>

            <address className={styles.address}>
              <strong>OVH SAS</strong>
              <span>2 rue Kellermann</span>
              <span>59100 Roubaix</span>
              <span>France</span>

              <a
                href="https://www.ovhcloud.com/fr/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Consulter le site de l’hébergeur
                <ExternalLink size={14} aria-hidden="true" />
              </a>
            </address>
          </LegalSection>

          <LegalSection
            id="propriete"
            number="4"
            title="Propriété intellectuelle"
          >
            <p>
              L’ensemble des éléments présents sur ce site, notamment les
              textes, photographies, illustrations, créations graphiques,
              vidéos, logos, marques, noms commerciaux, bases de données,
              structures et logiciels, est protégé par les dispositions
              françaises et internationales relatives à la propriété
              intellectuelle.
            </p>

            <p>
              Sauf autorisation écrite préalable de SARL BEN ISSIA PARIS,
              toute reproduction, représentation, adaptation, modification,
              diffusion ou exploitation, totale ou partielle, de ces éléments
              est interdite.
            </p>

            <p>
              La marque et l’identité visuelle SBI PARIS ne peuvent être
              utilisées sans autorisation écrite préalable.
            </p>
          </LegalSection>

          <LegalSection
            id="responsabilite"
            number="5"
            title="Responsabilité"
          >
            <p>
              SARL BEN ISSIA PARIS s’efforce de fournir sur ce site des
              informations exactes, complètes et régulièrement mises à jour.
              Toutefois, la société ne peut garantir l’absence totale
              d’erreurs, d’omissions ou d’indisponibilités temporaires.
            </p>

            <p>
              L’utilisateur reste responsable de l’utilisation qu’il fait des
              informations disponibles sur le site. SARL BEN ISSIA PARIS ne
              pourra être tenue responsable des dommages directs ou indirects
              résultant de l’accès au site, de son utilisation ou de
              l’impossibilité d’y accéder.
            </p>
          </LegalSection>

          <LegalSection
            id="donnees"
            number="6"
            title="Protection des données personnelles"
          >
            <p>
              Les données personnelles collectées sur le site sont traitées
              conformément à la réglementation applicable en matière de
              protection des données personnelles.
            </p>

            <p>
              Pour connaître les catégories de données collectées, les
              finalités des traitements, leur durée de conservation et les
              modalités d’exercice de vos droits, consultez notre{" "}
              <Link href="/politique-de-confidentialite">
                Politique de confidentialité
              </Link>
              .
            </p>
          </LegalSection>

          <LegalSection
            id="cookies"
            number="7"
            title="Cookies"
          >
            <p>
              Le site peut utiliser des cookies ou technologies similaires
              nécessaires à son fonctionnement, à la mesure de son audience,
              à l’amélioration de l’expérience utilisateur et, lorsque vous
              l’acceptez, à la personnalisation des contenus.
            </p>

            <p>
              Vous pouvez modifier ou retirer vos choix à tout moment depuis
              l’outil de gestion des cookies disponible sur le site.
            </p>
          </LegalSection>

          <LegalSection
            id="liens"
            number="8"
            title="Liens hypertextes"
          >
            <p>
              Le site peut contenir des liens vers des sites internet édités
              par des tiers. SARL BEN ISSIA PARIS n’exerce aucun contrôle sur
              ces sites externes et ne peut être tenue responsable de leur
              contenu, de leur disponibilité ou de leurs pratiques.
            </p>

            <p>
              La création d’un lien hypertexte vers le présent site ne doit
              pas porter atteinte à l’image, aux droits ou aux intérêts de SBI
              PARIS.
            </p>
          </LegalSection>

          <LegalSection
            id="droit"
            number="9"
            title="Droit applicable"
          >
            <p>
              Les présentes mentions légales ainsi que l’utilisation du site
              sont soumises au droit français.
            </p>

            <p>
              En cas de différend, les parties rechercheront en priorité une
              solution amiable. À défaut d’accord, le litige sera porté devant
              les juridictions compétentes conformément aux règles légales
              applicables.
            </p>
          </LegalSection>

          <LegalSection
            id="contact"
            number="10"
            title="Nous contacter"
          >
            <p>
              Pour toute question relative au site ou aux présentes mentions
              légales, vous pouvez contacter SARL BEN ISSIA PARIS :
            </p>

            <div className={styles.contactGrid}>
              <a href="mailto:contactsbiparis@gmail.com">
                <Mail size={22} strokeWidth={1.6} aria-hidden="true" />

                <span>
                  <strong>E-mail</strong>
                  <small>contactsbiparis@gmail.com</small>
                </span>
              </a>

              <a href="tel:+33622196858">
                <UserRound
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />

                <span>
                  <strong>Téléphone</strong>
                  <small>+33 6 22 19 68 58</small>
                </span>
              </a>

              <div>
                <Building2
                  size={22}
                  strokeWidth={1.6}
                  aria-hidden="true"
                />

                <span>
                  <strong>Adresse</strong>
                  <small>
                    139 Rue André Karman
                    <br />
                    93300 Aubervilliers, France
                  </small>
                </span>
              </div>
            </div>
          </LegalSection>

          <div className={styles.updateNotice}>
            Dernière mise à jour : 15 juillet 2026
          </div>
        </section>
      </div>
    </main>
  );
}

type LegalSectionProps = {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
};

function LegalSection({
  id,
  number,
  title,
  children,
}: LegalSectionProps) {
  return (
    <article id={id} className={styles.legalSection}>
      <div className={styles.sectionHeading}>
        <span>{number}</span>
        <h2>{title}</h2>
      </div>

      <div className={styles.sectionContent}>
        {children}
      </div>
    </article>
  );
}
