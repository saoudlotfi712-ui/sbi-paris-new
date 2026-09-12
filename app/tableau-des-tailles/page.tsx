import Link from "next/link";
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

const shoeSizes = [
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

const hommeSizes = [
  ["XS", "84-88", "70-74", "86-90"],
  ["S", "88-92", "74-78", "90-94"],
  ["M", "92-98", "78-84", "94-100"],
  ["L", "98-104", "84-90", "100-106"],
  ["XL", "104-110", "90-96", "106-112"],
  ["XXL", "110-116", "96-102", "112-118"],
  ["3XL", "116-122", "102-108", "118-124"],
];

const femmeSizes = [
  ["XS", "78-82", "60-64", "86-90"],
  ["S", "82-86", "64-68", "90-94"],
  ["M", "86-92", "68-74", "94-100"],
  ["L", "92-98", "74-80", "100-106"],
  ["XL", "98-104", "80-86", "106-112"],
  ["XXL", "104-110", "86-92", "112-118"],
];

const enfantSizes = [
  ["2 ans", "92 cm"],
  ["4 ans", "104 cm"],
  ["6 ans", "116 cm"],
  ["8 ans", "128 cm"],
  ["10 ans", "140 cm"],
  ["12 ans", "152 cm"],
  ["14 ans", "164 cm"],
];

const textileSizes = [
  ["5XS", "< 6 ans / 104 cm", "—"],
  ["4XS", "6 ans / 116 cm", "—"],
  ["3XS", "8 ans / 128 cm", "—"],
  ["2XS", "10 ans / 140 cm", "—"],
  ["XS", "12 ans / 152 cm", "—"],
  ["S", "14 ans / 164 cm", "166 / 174 cm"],
  ["M", "—", "174 / 182 cm"],
  ["L", "—", "182 / 190 cm"],
  ["XL", "—", "190 / 198 cm"],
  ["2XL", "—", "198 / 206 cm"],
  ["3XL", "—", "> 206 cm"],
  ["4XL", "—", "> 206 cm"],
];

const runningSizes = [
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

export default function TableauDesTaillesPage() {
  return (
    <main className={styles.page}>
      <div className={styles.breadcrumb}>
        <Link href="/">
          <Home size={15} aria-hidden="true" />
          Accueil
        </Link>

        <span aria-hidden="true">›</span>
        <strong>Tableau des tailles</strong>
      </div>

      <section className={styles.hero}>
        <span className={styles.kicker}>GUIDE DES TAILLES</span>

        <h1>Tableau des tailles</h1>

        <span className={styles.titleLine} />

        <p>
          Trouvez facilement la taille idéale pour tous nos univers et
          profitez d’un confort parfaitement adapté.
        </p>
      </section>

      <nav className={styles.categoryNav} aria-label="Catégories de tailles">
        <a href="#chaussures">
          <Footprints size={25} strokeWidth={1.6} />
          <span>Chaussures</span>
        </a>

        <a href="#vetements">
          <Shirt size={25} strokeWidth={1.6} />
          <span>Vêtements</span>
        </a>

        <a href="#enfant">
          <Baby size={25} strokeWidth={1.6} />
          <span>Enfant</span>
        </a>

        <a href="#accessoires">
          <Glasses size={25} strokeWidth={1.6} />
          <span>Accessoires</span>
        </a>
      </nav>

      <section id="chaussures" className={styles.guideCard}>
        <GuideHeader
          icon={<Footprints size={29} strokeWidth={1.6} />}
          eyebrow="GUIDE DES TAILLES"
          title="CHAUSSURES DE BASKET"
        />

        <ResponsiveTable
          headers={["Pointure adulte", "Taille US", "Taille UK", "Longueur du pied (cm)"]}
          rows={shoeSizes}
        />
      </section>

      <section id="vetements" className={styles.guideCard}>
        <GuideHeader
          icon={<Shirt size={29} strokeWidth={1.6} />}
          eyebrow="GRILLE DE TAILLE"
          title="TEXTILE"
        />

        <ResponsiveTable
          headers={["Taille", "Textile junior", "Textile adulte"]}
          rows={textileSizes}
        />
      </section>

      <section className={styles.doubleGrid}>
        <article className={styles.guideCard}>
          <GuideHeader
            icon={<Shirt size={27} strokeWidth={1.6} />}
            eyebrow="VÊTEMENTS"
            title="HOMME"
          />

          <ResponsiveTable
            headers={["Taille", "Poitrine", "Taille", "Hanches"]}
            rows={hommeSizes}
          />
        </article>

        <article className={styles.guideCard}>
          <GuideHeader
            icon={<Shirt size={27} strokeWidth={1.6} />}
            eyebrow="VÊTEMENTS"
            title="FEMME"
          />

          <ResponsiveTable
            headers={["Taille", "Poitrine", "Taille", "Hanches"]}
            rows={femmeSizes}
          />
        </article>
      </section>

      <section id="enfant" className={styles.guideCard}>
        <GuideHeader
          icon={<Baby size={29} strokeWidth={1.6} />}
          eyebrow="GRILLE DE TAILLE"
          title="ENFANT"
        />

        <ResponsiveTable
          headers={["Âge", "Taille recommandée"]}
          rows={enfantSizes}
        />
      </section>

      <section className={styles.guideCard}>
        <GuideHeader
          icon={<Ruler size={29} strokeWidth={1.6} />}
          eyebrow="GRILLE DE TAILLE"
          title="RUNNING"
        />

        <ResponsiveTable
          headers={["Pointure adulte", "Taille du pied (cm)"]}
          rows={runningSizes}
        />
      </section>

      <section id="accessoires" className={styles.accessoryGrid}>
        <article>
          <BriefcaseBusiness size={31} strokeWidth={1.5} />
          <h2>Sacs</h2>
          <p>
            Mini, Small, Medium, Large et XL. Vérifiez toujours les dimensions
            indiquées sur la fiche produit.
          </p>
        </article>

        <article>
          <Ruler size={31} strokeWidth={1.5} />
          <h2>Ceintures</h2>
          <p>
            Mesurez votre tour de taille à l’endroit où vous portez
            habituellement votre ceinture.
          </p>
        </article>

        <article>
          <Glasses size={31} strokeWidth={1.5} />
          <h2>Lunettes</h2>
          <p>
            Consultez la largeur de la monture, du pont et des branches sur
            chaque fiche produit.
          </p>
        </article>
      </section>

      <section className={styles.adviceBox}>
        <Info size={28} strokeWidth={1.7} />

        <div>
          <h2>Conseil SBI PARIS</h2>
          <p>
            Si vous hésitez entre deux tailles, nous vous conseillons de choisir
            la taille supérieure pour davantage de confort.
          </p>
        </div>
      </section>
    </main>
  );
}

type GuideHeaderProps = {
  icon: React.ReactNode;
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
      <span className={styles.guideIcon}>{icon}</span>

      <div>
        <span>{eyebrow}</span>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

type ResponsiveTableProps = {
  headers: string[];
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
            {headers.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
