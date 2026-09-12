import Link from "next/link";
import {
  Building2,
  Clock3,
  Cookie,
  Database,
  FilePenLine,
  Gavel,
  Globe2,
  Home,
  LockKeyhole,
  Mail,
  Scale,
  Share2,
  ShieldCheck,
  Target,
  UserRound,
} from "lucide-react";

import styles from "./politique.module.css";

const navigationItems = [
  {
    number: "1",
    label: "Responsable du traitement",
    href: "#responsable",
    icon: Building2,
  },
  {
    number: "2",
    label: "Données collectées",
    href: "#donnees",
    icon: Database,
  },
  {
    number: "3",
    label: "Finalités",
    href: "#finalites",
    icon: Target,
  },
  {
    number: "4",
    label: "Bases légales",
    href: "#bases-legales",
    icon: Gavel,
  },
  {
    number: "5",
    label: "Destinataires",
    href: "#destinataires",
    icon: Share2,
  },
  {
    number: "6",
    label: "Durées de conservation",
    href: "#conservation",
    icon: Clock3,
  },
  {
    number: "7",
    label: "Vos droits",
    href: "#droits",
    icon: UserRound,
  },
  {
    number: "8",
    label: "Sécurité",
    href: "#securite",
    icon: ShieldCheck,
  },
  {
    number: "9",
    label: "Cookies",
    href: "#cookies",
    icon: Cookie,
  },
  {
    number: "10",
    label: "Transferts hors UE",
    href: "#transferts",
    icon: Globe2,
  },
  {
    number: "11",
    label: "Modifications",
    href: "#modifications",
    icon: FilePenLine,
  },
  {
    number: "12",
    label: "Contact",
    href: "#contact",
    icon: Mail,
  },
];

export default function PolitiqueConfidentialitePage() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">
          <Home size={15} aria-hidden="true" />
          Accueil
        </Link>

        <span aria-hidden="true">›</span>

        <strong>Politique de confidentialité</strong>
      </div>

      <section className={styles.hero}>
        <span className={styles.kicker}>
          PROTECTION DE VOS DONNÉES
        </span>

        <h1>Politique de confidentialité</h1>

        <span className={styles.titleLine} />

        <p>
          Chez SBI PARIS, la protection de vos données personnelles est une
          priorité. Cette politique vous informe sur la manière dont nous
          collectons, utilisons, conservons et protégeons vos informations.
        </p>
      </section><div className={styles.layout}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <h2>Dans cette page</h2>
            <span />
          </div>

          <nav aria-label="Sommaire de la politique de confidentialité">
            {navigationItems.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.href}
                  href={item.href}
                  className={index === 0 ? styles.activeLink : undefined}
                >
                  <Icon
                    size={19}
                    strokeWidth={1.6}
                    aria-hidden="true"
                  />

                  <span>
                    {item.number}. {item.label}
                  </span>
                </a>
              );
            })}
          </nav>
        </aside>

        <section className={styles.policyCard}>
          <PolicySection
            id="responsable"
            number="1"
            title="Responsable du traitement"
          >
            <p>
              Le responsable du traitement des données personnelles collectées
              sur le site SBI PARIS est :
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
                <dt>Adresse électronique</dt>
                <dd>
                  <a href="mailto:contact@sbiparis.com">
                    contact@sbiparis.com
                  </a>
                </dd>
              </div>
            </dl>
          </PolicySection>

          <PolicySection
            id="donnees"
            number="2"
            title="Données personnelles collectées"
          >
            <p>
              Selon les services que vous utilisez, nous pouvons collecter les
              catégories de données suivantes :
            </p>

            <ul className={styles.list}>
              <li>
                Données d’identification : nom, prénom et civilité.
              </li>

              <li>
                Coordonnées : adresse postale, adresse e-mail et numéro de
                téléphone.
              </li>

              <li>
                Données liées à votre compte client : identifiant, historique
                des commandes, préférences et demandes adressées au service
                client.
              </li><li>
                Données relatives aux commandes : produits commandés, montant,
                livraison, retours, échanges et remboursements.
              </li>

              <li>
                Données de paiement limitées aux informations nécessaires au
                suivi de la transaction. Les données bancaires complètes sont
                traitées par les prestataires de paiement et ne sont pas
                conservées directement par SBI PARIS.
              </li>

              <li>
                Données de navigation : adresse IP, type d’appareil, navigateur,
                pages consultées et informations issues des cookies autorisés.
              </li>

              <li>
                Données transmises volontairement dans un formulaire, une
                candidature ou un échange avec notre service client.
              </li>
            </ul>
          </PolicySection>

          <PolicySection
            id="finalites"
            number="3"
            title="Finalités des traitements"
          >
            <p>
              Vos données peuvent être utilisées pour les finalités suivantes :
            </p>

            <ul className={styles.list}>
              <li>Créer et gérer votre compte client.</li>

              <li>
                Enregistrer, préparer, expédier et suivre vos commandes.
              </li>

              <li>
                Gérer les paiements, factures, retours, échanges et
                remboursements.
              </li>

              <li>
                Répondre à vos questions et assurer le service après-vente.
              </li>

              <li>
                Prévenir la fraude, sécuriser les transactions et protéger le
                site.
              </li>

              <li>
                Respecter nos obligations comptables, fiscales et légales.
              </li>

              <li>
                Envoyer des communications commerciales lorsque vous y avez
                consenti ou lorsque la réglementation l’autorise.
              </li>

              <li>
                Mesurer l’audience et améliorer le fonctionnement, les contenus
                et l’ergonomie du site.
              </li>

              <li>
                Étudier les candidatures reçues dans le cadre d’un recrutement.
              </li>
            </ul>
          </PolicySection>

          <PolicySection
            id="bases-legales"
            number="4"
            title="Bases légales des traitements"
          >
            <p>
              Selon la finalité concernée, les traitements reposent sur une ou
              plusieurs des bases légales suivantes :
            </p>

            <div className={styles.legalBases}>
              <div>
                <Scale size={22} strokeWidth={1.6} />
                <span>
                  <strong>Exécution du contrat</strong>
                  <small>
                    Gestion des commandes, paiements, livraisons, retours et
                    service après-vente.
                  </small>
                </span>
              </div>

              <div>
                <Gavel size={22} strokeWidth={1.6} />
                <span>
                  <strong>Obligation légale</strong>
                  <small>
                    Conservation des factures, obligations comptables,
                    fiscales et réglementaires.
                  </small>
                </span>
              </div>

              <div>
                <ShieldCheck size={22} strokeWidth={1.6} />
                <span>
                  <strong>Intérêt légitime</strong>
                  <small>
                    Sécurité du site, lutte contre la fraude, amélioration des
                    services et défense de nos droits.
                  </small>
                </span>
              </div>

              <div>
                <UserRound size={22} strokeWidth={1.6} />
                <span>
                  <strong>Consentement</strong>
                  <small>
                    Newsletter, cookies non essentiels et communications
                    nécessitant votre accord.
                  </small>
                </span>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            id="destinataires"
            number="5"
            title="Destinataires des données"
          >
            <p>
              Vos données sont accessibles uniquement aux personnes et
              organismes qui en ont besoin pour assurer les services demandés.
            </p>

            <p>
              Elles peuvent notamment être transmises, dans la limite de leurs
              missions, aux catégories de destinataires suivantes :
            </p>

            <ul className={styles.list}>
              <li>Services internes habilités de SBI PARIS.</li>

              <li>Prestataires de paiement.</li>

              <li>Transporteurs et partenaires logistiques.</li>

              <li>Prestataires d’hébergement et de maintenance informatique.</li>

              <li>
                Prestataires chargés de l’envoi des e-mails et communications.
              </li>

              <li>
                Conseils professionnels, autorités administratives ou
                judiciaires lorsque la loi l’exige.
              </li>
            </ul>

            <p>
              SBI PARIS ne vend pas vos données personnelles.
            </p>
          </PolicySection>

          <PolicySection
            id="conservation"
            number="6"
            title="Durées de conservation"
          >
            <p>
              Les données sont conservées pendant une durée proportionnée aux
              finalités pour lesquelles elles ont été collectées, puis
              supprimées ou archivées conformément aux obligations légales.
            </p>

            <div className={styles.durationTable}>
              <div className={styles.durationHeader}>
                <strong>Catégorie de données</strong>
                <strong>Durée indicative</strong>
              </div>

              <div>
                <span>Compte client actif</span>
                <span>
                  Pendant la relation commerciale, puis selon la durée
                  nécessaire à la gestion des obligations et contentieux.
                </span>
              </div>

              <div>
                <span>Commandes et factures</span>
                <span>
                  Durée requise par les obligations comptables, fiscales et
                  commerciales applicables.
                </span>
              </div>

              <div>
                <span>Prospection commerciale</span>
                <span>
                  Jusqu’au retrait du consentement ou pendant la durée autorisée
                  par la réglementation.
                </span>
              </div>

              <div>
                <span>Demandes au service client</span>
                <span>
                  Pendant la durée nécessaire au traitement de la demande et au
                  suivi éventuel du dossier.
                </span>
              </div>

              <div>
                <span>Candidatures</span>
                <span>
                  Pendant la durée nécessaire au recrutement, sauf accord pour
                  une conservation plus longue.
                </span>
              </div>

              <div>
                <span>Cookies</span>
                <span>
                  Selon leur finalité, la durée affichée dans l’outil de gestion
                  des cookies.
                </span>
              </div>
            </div>
          </PolicySection>

          <PolicySection
            id="droits"
            number="7"
            title="Vos droits"
          >
            <p>
              Selon les conditions prévues par la réglementation, vous pouvez
              disposer des droits suivants :
            </p>

            <ul className={styles.list}>
              <li>Droit d’accès à vos données personnelles.</li>
              <li>Droit de rectification des informations inexactes.</li>
              <li>Droit à l’effacement dans les cas prévus par la loi.</li>
              <li>Droit à la limitation du traitement.</li>
              <li>Droit d’opposition à certains traitements.</li>
              <li>Droit à la portabilité lorsque celui-ci est applicable.</li>
              <li>Droit de retirer votre consentement à tout moment.</li>
              <li>
                Droit de définir des directives relatives au sort de vos
                données après votre décès.
              </li>
            </ul>

            <p>
              Pour exercer vos droits, écrivez à{" "}
              <a href="mailto:contact@sbiparis.com">
                contact@sbiparis.com
              </a>{" "}
              en précisant votre demande. Une preuve d’identité pourra être
              demandée uniquement lorsque cela est nécessaire pour vérifier
              votre identité.
            </p>

            <p>
              Vous pouvez également introduire une réclamation auprès de la
              Commission nationale de l’informatique et des libertés (CNIL).
            </p>
          </PolicySection>

          <PolicySection
            id="securite"
            number="8"
            title="Sécurité des données">
            <div className={styles.securityBox}>
              <LockKeyhole size={32} strokeWidth={1.5} />

              <div>
                <h3>Protection technique et organisationnelle</h3>

                <p>
                  Nous mettons en œuvre des mesures adaptées afin de protéger
                  vos données contre la perte, l’altération, l’accès non
                  autorisé, la divulgation ou la destruction.
                </p>
              </div>
            </div>

            <p>
              Ces mesures peuvent notamment comprendre le contrôle des accès,
              la sécurisation des connexions, la limitation des habilitations,
              la sauvegarde des données et le recours à des prestataires soumis
              à des obligations de sécurité et de confidentialité.
            </p>
          </PolicySection>

          <PolicySection
            id="cookies"
            number="9"
            title="Cookies et technologies similaires"
          >
            <p>
              Le site utilise des cookies nécessaires à son fonctionnement.
              D’autres cookies peuvent être utilisés, sous réserve de votre
              choix, pour mesurer l’audience, personnaliser les contenus ou
              améliorer l’expérience utilisateur.
            </p>

            <p>
              Lorsqu’un consentement est requis, les cookies concernés ne sont
              déposés qu’après votre accord. Vous pouvez modifier ou retirer
              vos choix à tout moment depuis l’outil de gestion des cookies
              présent sur le site.
            </p>
          </PolicySection>

          <PolicySection
            id="transferts"
            number="10"
            title="Transferts de données hors de l’Union européenne"
          >
            <p>
              Certains de nos prestataires peuvent traiter des données depuis
              un pays situé en dehors de l’Union européenne ou de l’Espace
              économique européen.
            </p>

            <p>
              Dans ce cas, nous veillons à ce que ces transferts reposent sur
              un mécanisme reconnu par la réglementation applicable, tel qu’une
              décision d’adéquation, des clauses contractuelles types ou toute
              autre garantie appropriée.
            </p>
          </PolicySection>

          <PolicySection
            id="modifications"
            number="11"
            title="Modification de la politique"
          >
            <p>
              La présente politique peut être modifiée afin de tenir compte
              d’une évolution légale, réglementaire, technique ou de nos
              services.
            </p>

            <p>
              En cas de modification importante, une information adaptée pourra
              être affichée sur le site. La version applicable est celle
              disponible en ligne à la date de votre consultation.
            </p>
          </PolicySection>

          <PolicySection
            id="contact"
            number="12"
            title="Nous contacter"
          >
            <p>
              Pour toute question relative à la protection de vos données ou
              pour exercer vos droits, vous pouvez contacter :
            </p>

            <div className={styles.contactGrid}>
              <a href="mailto:contact@sbiparis.com">
                <Mail size={22} strokeWidth={1.6} aria-hidden="true" />

                <span>
                  <strong>E-mail</strong>
                  <small>contact@sbiparis.com</small>
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
                  <strong>Adresse postale</strong>

                  <small>
                    SARL BEN ISSIA PARIS
                    <br />
                    139 Rue André Karman
                    <br />
                    93300 Aubervilliers, France
                  </small>
                </span>
              </div>
            </div>
          </PolicySection>

          <div className={styles.updateNotice}>
            Dernière mise à jour : 15 juillet 2026
          </div>
        </section>
      </div>
    </main>
  );
}

type PolicySectionProps = {
  id: string;
  number: string;
  title: string;
  children: React.ReactNode;
};

function PolicySection({
  id,
  number,
  title,
  children,
}: PolicySectionProps) {
  return (
    <article id={id} className={styles.policySection}>
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
