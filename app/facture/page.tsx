"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FileText,
  Folder,
  Globe2,
  Info,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Printer,
  ShieldCheck,
  Tag,
  UserRound,
} from "lucide-react";

type InvoiceCustomer = {
  fullName: string;
  company: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  activity: string;
  volume: string;
  website: string;
  message: string;
};

type InvoiceProduct = {
  id: string;
  reference?: string;
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

type InvoiceData = {
  customer: InvoiceCustomer;
  categories: string[];
  products: InvoiceProduct[];
  totalQuantity: number;
  subtotal: number;
  discountRate: number;
  discountAmount: number;
  totalHT: number;
  currency: string;
  createdAt: string;
  invoiceNumber?: string;
  requestNumber?: string | null;
  proOrderId?: string;
};

function formatPrice(value: number) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number.isFinite(amount) ? amount : 0);
}

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function formatTime(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(date);
}

function formatDateTime(value: string) {
  const date = formatDate(value);
  const time = formatTime(value);

  if (!date) return "";
  if (!time) return date;

  return `${date} à ${time}`;
}

function addDays(value: string, days: number) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  date.setDate(date.getDate() + days);

  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date);
}

function createInvoiceNumber(createdAt: string) {
  const parsedDate = new Date(createdAt);

  const date = Number.isNaN(parsedDate.getTime())
    ? new Date()
    : parsedDate;

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `SBI-PRO-${year}${month}${day}-${hours}${minutes}`;
}

function categoryLabel(category: string) {
  const labels: Record<string, string> = {
    Collection: "Collection SBI PARIS",
    Homme: "Mode Homme",
    Femme: "Mode Femme",
    Enfant: "Mode Enfant",
    Sport: "Univers Sport",
    Parfum: "Parfum",
    Mobilite: "Mobilité électrique",
  };

  return labels[category] ?? category;
}

export default function FacturePage() {
  const [invoice, setInvoice] =
    useState<InvoiceData | null>(null);

  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "sbi-pro-invoice",
      );

      if (!saved) {
        return;
      }

      const parsed = JSON.parse(saved) as InvoiceData;

      setInvoice(parsed);
    } catch (error) {
      console.error(
        "Erreur chargement facture :",
        error,
      );

      setInvoice(null);
    } finally {
      setLoaded(true);
    }
  }, []);

  const invoiceNumber = useMemo(() => {
    if (!invoice) {
      return "";
    }

    return (
      invoice.invoiceNumber ||
      createInvoiceNumber(invoice.createdAt)
    );
  }, [invoice]);

  if (!loaded) {
    return (
      <main style={s.statePage}>
        Chargement de la facture...
      </main>
    );
  }

  if (!invoice) {
    return (
      <main style={s.statePage}>
        <div style={s.emptyCard}>
          <FileText size={38} />

          <h1 style={s.emptyTitle}>
            Aucune facture disponible
          </h1>

          <p style={s.emptyText}>
            Générez d&apos;abord une facture depuis
            l&apos;administration SBI PARIS.
          </p>

          <Link
            href="/espace-pro"
            style={s.returnButton}
          >
            <ArrowLeft size={17} />
            Retour à l&apos;Espace Pro
          </Link>
        </div>
      </main>
    );
  }

  const {
    customer,
    categories,
    products,
    totalQuantity,
    subtotal,
    discountRate,
    discountAmount,
    totalHT,
    createdAt,
  } = invoice;

  function handlePrintInvoice() {
    const invoiceElement =
      document.querySelector<HTMLElement>(
        ".invoice-sheet",
      );

    if (!invoiceElement) {
      window.alert(
        "Impossible de préparer la facture.",
      );
      return;
    }

    const printWindow = window.open(
      "",
      "_blank",
      "width=900,height=1200",
    );

    if (!printWindow) {
      window.alert(
        "Veuillez autoriser les fenêtres pop-up pour imprimer la facture.",
      );
      return;
    }

    const invoiceHtml = invoiceElement.outerHTML;
    const baseUrl = `${window.location.origin}/`;

    printWindow.document.open();

    printWindow.document.write(`
      <!DOCTYPE html>
      <html lang="fr">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
          />
          <base href="${baseUrl}" />
          <title>${invoiceNumber}</title>

          <style>
            @page {
              size: A4 portrait;
              margin: 0;
            }

            * {
              box-sizing: border-box;
            }

            html,
            body {
              width: 210mm;
              height: 297mm;
              margin: 0;
              padding: 0;
              background: #ffffff;
              overflow: hidden;
            }

            body {
              font-family: Arial, Helvetica, sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }

            .invoice-sheet {
              position: relative !important;
              width: 210mm !important;
              height: 297mm !important;
              min-height: 297mm !important;
              max-height: 297mm !important;
              margin: 0 !important;
              padding: 6mm 8mm 5mm !important;
              overflow: hidden !important;
              background: #ffffff !important;
              box-shadow: none !important;
              border: 0 !important;
              transform: none !important;
            }

            img {
              max-width: 100%;
            }

            table {
              border-collapse: collapse;
            }

            header,
            section,
            table,
            tr,
            td,
            th {
              break-inside: avoid;
              page-break-inside: avoid;
            }
          </style>
        </head>

        <body>
          ${invoiceHtml}
        </body>
      </html>
    `);

    printWindow.document.close();

    const launchPrint = () => {
      window.setTimeout(() => {
        printWindow.focus();
        printWindow.print();
      }, 500);
    };

    if (printWindow.document.readyState === "complete") {
      launchPrint();
    } else {
      printWindow.onload = launchPrint;
    }
  }

  return (
    <main className="invoice-page" style={s.page}>
      <div
        className="invoice-actions"
        style={s.actions}
      >
        <Link
          href="/espace-pro"
          style={s.backLink}
        >
          <ArrowLeft size={17} />
          Retour
        </Link>

        <button
          type="button"
          onClick={handlePrintInvoice}
          style={s.printButton}
        >
          <Printer size={17} />
          Imprimer / PDF
        </button>
      </div>

      <div className="invoice-screen-wrapper">
        <article
          className="invoice-sheet"
          style={s.sheet}
        >
          <header style={s.header}>
            <div style={s.brandSide}>
              <img
                src="/logo.png"
                alt="SBI PARIS"
                style={s.logo}
              />

              <div style={s.brandDivider} />

              <div style={s.companyIdentity}>
                <div style={s.brandTitle}>
                  <span style={s.brandBlue}>SBI</span>{" "}
                  <span style={s.brandRed}>PARIS</span>
                </div>

                <div style={s.proLabel}>
                  ESPACE PROFESSIONNEL
                </div>

                <div style={s.smallRedLine} />

                <div style={s.legalName}>
                  SARL BEN ISSIA PARIS
                </div>

                <div style={s.legalLine}>
                  Société à responsabilité limitée
                </div>

                <div style={s.legalLine}>
                  Capital social : 30 000 €
                </div>

                <div style={s.legalLine}>
                  RCS Bobigny 398 514 737
                </div>

                <div style={s.legalLine}>
                  Immatriculation : 07/10/1994
                </div>

                <div style={s.contactList}>
                  <div style={s.contactRow}>
                    <MapPin size={15} />
                    <span>
                      139 Rue André Karman, 93300
                      Aubervilliers, France
                    </span>
                  </div>

                  <div style={s.contactRow}>
                    <Phone size={15} />
                    <span>+33 6 43 02 10 21</span>
                  </div>

                  <div style={s.contactRow}>
                    <Mail size={15} />
                    <span>
                      contactprosbiparis@gmail.com
                    </span>
                  </div>

                  <div style={s.contactRow}>
                    <Globe2 size={15} />
                    <span>www.sbiparis.com</span>
                  </div>
                </div>
              </div>
            </div><div style={s.invoiceMeta}>
              <div style={s.invoiceBadge}>
                FACTURE
              </div>

              <div style={s.metaLine}>
                <div style={s.metaLabel}>
                  <FileText size={16} />
                  <strong>N° FACTURE :</strong>
                </div>

                <strong style={s.invoiceNumber}>
                  {invoiceNumber}
                </strong>
              </div>

              <div style={s.metaLine}>
                <div style={s.metaLabel}>
                  <CalendarDays size={16} />
                  <strong>DATE :</strong>
                </div>

                <span>
                  {formatDate(createdAt)}
                </span>
              </div>

              <div style={s.metaLine}>
                <div style={s.metaLabel}>
                  <Clock3 size={16} />
                  <strong>HEURE :</strong>
                </div>

                <span>
                  {formatTime(createdAt)}
                </span>
              </div>

              <div style={s.metaLineLast}>
                <div style={s.metaLabel}>
                  <Clock3 size={16} />
                  <strong>ÉCHÉANCE :</strong>
                </div>

                <span>
                  {addDays(createdAt, 30)}
                </span>
              </div>
            </div>
          </header>

          <section style={s.clientBox}>
            <div style={s.clientTitle}>
              <UserRound size={20} />
              CLIENT
            </div>

            <div style={s.clientGrid}>
              <div style={s.clientColumn}>
                <div style={s.clientRow}>
                  <UserRound size={17} />
                  <strong>Nom complet</strong>
                  <span>:</span>
                  <span>
                    {customer.fullName || "—"}
                  </span>
                </div>

                <div style={s.clientRow}>
                  <Building2 size={17} />
                  <strong>Société</strong>
                  <span>:</span>
                  <span>
                    {customer.company || "—"}
                  </span>
                </div>

                <div style={s.clientRow}>
                  <Phone size={17} />
                  <strong>Téléphone</strong>
                  <span>:</span>
                  <span>
                    {customer.phone || "—"}
                  </span>
                </div>
              </div>

              <div style={s.clientVerticalLine} />

              <div style={s.clientColumn}>
                <div style={s.clientRow}>
                  <Mail size={17} />
                  <strong>Email</strong>
                  <span>:</span>
                  <span>
                    {customer.email || "—"}
                  </span>
                </div>

                <div style={s.clientRow}>
                  <Globe2 size={17} />
                  <strong>Pays / Ville</strong>
                  <span>:</span>

                  <span>
                    {[
                      customer.country,
                      customer.city,
                    ]
                      .filter(Boolean)
                      .join(" / ") || "—"}
                  </span>
                </div>

                <div style={s.clientRow}>
                  <Building2 size={17} />
                  <strong>Activité</strong>
                  <span>:</span>
                  <span>
                    {customer.activity || "—"}
                  </span>
                </div>

                <div style={s.clientRow}>
                  <Folder size={17} />
                  <strong>Volume estimé</strong>
                  <span>:</span>
                  <span>
                    {customer.volume || "—"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section style={s.categorySection}>
            <div style={s.categoryHeading}>
              <Tag size={18} />

              <strong>
                CATÉGORIES SÉLECTIONNÉES
              </strong>
            </div>

            <div style={s.categoryTags}>
              {categories.map((category) => (
                <span
                  key={category}
                  style={s.categoryTag}
                >
                  {categoryLabel(category)}
                </span>
              ))}
            </div>
          </section>

          <section style={s.tableSection}>
            <table style={s.table}>
              <thead>
                <tr>
                  <th style={s.thRef}>
                    RÉF.
                  </th>

                  <th style={s.th}>
                    PRODUIT
                  </th>

                  <th style={s.th}>
                    CATÉGORIE
                  </th>

                  <th style={s.thCenter}>
                    QTÉ
                  </th>

                  <th style={s.thRight}>
                    PRIX UNIT.
                    <br />
                    (€)
                  </th>

                  <th style={s.thRight}>
                    TOTAL HT
                    <br />
                    (€)
                  </th>
                </tr>
              </thead>

              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td style={s.tdRef}>
                      {product.reference ||
                        product.id.toUpperCase()}
                    </td>

                    <td style={s.td}>
                      {product.name}
                    </td>

                    <td style={s.td}>
                      {categoryLabel(
                        product.category,
                      )}
                    </td>

                    <td style={s.tdCenter}>
                      {product.quantity}
                    </td>

                    <td style={s.tdRight}>
                      {formatPrice(
                        product.unitPrice,
                      )}
                    </td>

                    <td style={s.tdRightBold}>
                      {formatPrice(
                        product.lineTotal,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <section style={s.summaryGrid}>
            <div style={s.requestBox}>
              <div style={s.boxHeading}>
                <Info size={17} />

                <strong>
                  INFORMATIONS DE LA DEMANDE
                </strong>
              </div>

              <div style={s.requestRow}>
                <span>
                  Nombre total d&apos;articles
                </span>

                <strong>{totalQuantity}</strong>
              </div>

              <div style={s.requestRow}>
                <span>Volume estimé</span>

                <strong>
                  {customer.volume || "—"}
                </strong>
              </div>

              <div style={s.requestRow}>
                <span>Date de création</span>

                <strong>
                  {formatDate(createdAt)}
                </strong>
              </div>

              <div style={s.requestRowLast}>
                <span>Heure de création</span>

                <strong>
                  {formatTime(createdAt)}
                </strong>
              </div>
            </div>

            <div style={s.totalBox}>
              <div style={s.totalLine}>
                <span>Sous-total HT</span>

                <strong>
                  {formatPrice(subtotal)} €
                </strong>
              </div>

              <div style={s.discountLine}>
                <span>
                  Remise professionnelle (
                  {discountRate} %)
                </span>

                <strong>
                  - {formatPrice(discountAmount)} €
                </strong>
              </div>

              <div style={s.grandTotal}>
                <strong>TOTAL HT</strong>

                <strong>
                  {formatPrice(totalHT)} €
                </strong>
              </div>
            </div>
          </section><section style={s.messageBox}>
            <div style={s.messageHeading}>
              <MessageCircle size={18} />

              <strong>
                MESSAGE DU CLIENT
              </strong>
            </div>

            <p style={s.messageText}>
              {customer.message ||
                "Aucun message particulier."}
            </p>
          </section>

          <section style={s.conditions}>
            <div style={s.conditionsHeading}>
              <ShieldCheck size={18} />

              <strong>
                CONDITIONS PROFESSIONNELLES
              </strong>
            </div>

            <div style={s.conditionsGrid}>
              <div style={s.conditionItem}>
                <CheckCircle2 size={16} />

                <span>
                  Paiement à réception
                  de la facture.
                </span>
              </div>

              <div style={s.conditionDivider} />

              <div style={s.conditionItem}>
                <CheckCircle2 size={16} />

                <span>
                  Délai de livraison :
                  <br />
                  3 à 7 jours ouvrables.
                </span>
              </div>

              <div style={s.conditionDivider} />

              <div style={s.conditionItem}>
                <CheckCircle2 size={16} />

                <span>
                  Les produits restent la propriété
                  de SBI PARIS jusqu&apos;au paiement
                  complet.
                </span>
              </div>
            </div>
          </section>

          <div style={s.thanks}>
            Merci pour votre confiance.
          </div>

          <section style={s.signatureBox}>
            <div style={s.signatureColumn}>
              <strong>
                Cachet et signature
                <br />
                SARL BEN ISSIA PARIS
              </strong>

              <div style={s.signatureSpace} />
              <div style={s.signatureLine} />
            </div>

            <div style={s.signatureDivider} />

            <div style={s.signatureColumn}>
              <strong>
                Signature du client
              </strong>

              <div style={s.signatureSpace} />
              <div style={s.signatureLine} />
            </div>
          </section>

          <div style={s.documentFooter}>
            <span>
              Document généré le{" "}
              <strong>
                {formatDateTime(createdAt)}
              </strong>
            </span>

            <span>
              Facture{" "}
              <strong>
                {invoiceNumber}
              </strong>
            </span>
          </div>

          <div style={s.flagLine}>
            <span style={s.flagBlue} />
            <span style={s.flagWhite} />
            <span style={s.flagRed} />
          </div>
        </article>
      </div>

      <style jsx global>{`
        * {
          box-sizing: border-box;
        }

        html,
        body {
          margin: 0;
          padding: 0;
        }

        .invoice-screen-wrapper {
          width: 210mm;
          margin: 0 auto;
        }

        /*
         * IMPORTANT :
         * Le bouton Imprimer / PDF utilise une fenêtre
         * indépendante contenant uniquement la facture.
         * Ce bloc sert seulement si quelqu'un utilise
         * directement Ctrl+P sur cette page.
         */
        @media print {
          .invoice-actions {
            display: none !important;
          }
        }

        @media screen and (max-width: 850px) {
          .invoice-page {
            overflow-x: auto !important;
          }

          .invoice-screen-wrapper {
            width: 210mm !important;
            margin: 0 auto !important;
          }
        }
      `}</style>
    </main>
  );
}

const NAVY = "#082760";
const RED = "#d71920";
const LIGHT = "#f4f7fc";
const BORDER = "#aebbd0";
const TEXT = "#0d2a59";

const s: Record<string, CSSProperties> = {
  page: {
    minHeight: "100vh",
    background: "#eef1f5",
    padding: "22px 12px 45px",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: TEXT,
  },

  statePage: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#eef1f5",
    fontFamily: "Arial, Helvetica, sans-serif",
    color: NAVY,
  },

  emptyCard: {
    width: "min(500px, 92%)",
    padding: 40,
    textAlign: "center",
    background: "#fff",
    borderRadius: 14,
  },

  emptyTitle: {
    margin: "18px 0 8px",
  },

  emptyText: {
    color: "#667085",
    lineHeight: 1.6,
  },

  returnButton: {
    marginTop: 20,
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "12px 18px",
    background: NAVY,
    color: "#fff",
    textDecoration: "none",
    borderRadius: 7,
  },

  actions: {
    width: "min(210mm, 100%)",
    margin: "0 auto 14px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },

  backLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: 7,
    color: NAVY,
    textDecoration: "none",
    fontWeight: 700,
  },

  printButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    border: 0,
    borderRadius: 7,
    padding: "11px 17px",
    background: NAVY,
    color: "#fff",
    fontWeight: 700,
    cursor: "pointer",
  },

  sheet: {
    width: "210mm",
    height: "297mm",
    minHeight: "297mm",
    maxHeight: "297mm",
    margin: "0 auto",
    padding: "6mm 8mm 5mm",
    background: "#fff",
    boxShadow: "0 16px 50px rgba(0,0,0,.12)",
    overflow: "hidden",
  },

  header: {
    display: "grid",
    gridTemplateColumns: "1.5fr .9fr",
    gap: "6mm",
    alignItems: "stretch",
  },

  brandSide: {
    display: "flex",
    alignItems: "flex-start",
    minWidth: 0,
  },

  logo: {
    width: "27mm",
    height: "31mm",
    objectFit: "contain",
    flexShrink: 0,
  },

  brandDivider: {
    width: 1,
    alignSelf: "stretch",
    background: NAVY,
    margin: "0 4mm 0 2mm",
  },

  companyIdentity: {
    minWidth: 0,
    paddingTop: 1,
  },

  brandTitle: {
    fontFamily: "Georgia, serif",
    fontWeight: 700,
    fontSize: "11.5mm",
    lineHeight: 0.9,
    whiteSpace: "nowrap",
  },

  brandBlue: {
    color: NAVY,
  },

  brandRed: {
    color: RED,
  },

  proLabel: {
    marginTop: "1.5mm",
    letterSpacing: ".24em",
    fontWeight: 800,
    fontSize: "2.8mm",
  },

  smallRedLine: {
    width: "14mm",
    height: 2,
    background: RED,
    margin: "2mm 0",
  },

  legalName: {
    fontWeight: 800,
    fontSize: "3.2mm",
  },

  legalLine: {
    fontSize: "2.5mm",
    lineHeight: 1.35,
  },

  contactList: {
    marginTop: "2.5mm",
    display: "grid",
    gap: "1.2mm",
  },

  contactRow: {
    display: "flex",
    alignItems: "center",
    gap: "2mm",
    fontSize: "2.35mm",
  },invoiceMeta: {
    border: `1px solid ${BORDER}`,
    borderRadius: "2mm",
    overflow: "hidden",
  },

  invoiceBadge: {
    padding: "3.4mm 4mm",
    background: NAVY,
    color: "#fff",
    textAlign: "center",
    fontWeight: 800,
    fontSize: "8mm",
  },

  metaLine: {
    minHeight: "13mm",
    padding: "0 3.5mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderBottom: `1px dotted ${BORDER}`,
    fontSize: "2.45mm",
  },

  metaLineLast: {
    minHeight: "13mm",
    padding: "0 3.5mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    fontSize: "2.45mm",
  },

  metaLabel: {
    display: "flex",
    alignItems: "center",
    gap: "1.7mm",
  },

  invoiceNumber: {
    color: RED,
    textAlign: "right",
    fontSize: "2.2mm",
  },

  clientBox: {
    marginTop: "4mm",
    padding: "3.2mm 5mm",
    background: LIGHT,
    border: `1px solid ${BORDER}`,
    borderRadius: "2.2mm",
  },

  clientTitle: {
    display: "flex",
    alignItems: "center",
    gap: "2mm",
    fontWeight: 800,
    fontSize: "2.9mm",
    marginBottom: "1.8mm",
  },

  clientGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1px 1.08fr",
    gap: "6mm",
    alignItems: "stretch",
  },

  clientVerticalLine: {
    background: BORDER,
  },

  clientColumn: {
    display: "grid",
    gap: "1.5mm",
  },

  clientRow: {
    display: "grid",
    gridTemplateColumns: "5mm 24mm 3mm 1fr",
    alignItems: "center",
    columnGap: "1mm",
    fontSize: "2.4mm",
    minWidth: 0,
  },

  categorySection: {
    minHeight: "10mm",
    marginTop: "2.8mm",
    padding: "1.5mm 3mm 2mm",
    display: "flex",
    alignItems: "center",
    gap: "5mm",
    borderBottom: `1px solid ${NAVY}`,
  },

  categoryHeading: {
    display: "flex",
    alignItems: "center",
    gap: "2mm",
    fontSize: "2.55mm",
    whiteSpace: "nowrap",
  },

  categoryTags: {
    display: "flex",
    flexWrap: "wrap",
    gap: "1.5mm",
  },

  categoryTag: {
    border: "1px solid #edb3b5",
    borderRadius: "1.5mm",
    padding: "1mm 2.2mm",
    color: RED,
    fontWeight: 700,
    fontSize: "2.2mm",
  },

  tableSection: {
    marginTop: "2.5mm",
  },

  table: {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
    fontSize: "2.25mm",
  },

  thRef: {
    width: "16%",
    padding: "2mm 1.3mm",
    background: NAVY,
    color: "#fff",
    border: `1px solid ${BORDER}`,
    textAlign: "center",
  },

  th: {
    padding: "2mm 1.3mm",
    background: NAVY,
    color: "#fff",
    border: `1px solid ${BORDER}`,
    textAlign: "center",
  },

  thCenter: {
    width: "11%",
    padding: "2mm 1mm",
    background: NAVY,
    color: "#fff",
    border: `1px solid ${BORDER}`,
    textAlign: "center",
  },

  thRight: {
    width: "14%",
    padding: "2mm 1mm",
    background: NAVY,
    color: "#fff",
    border: `1px solid ${BORDER}`,
    textAlign: "center",
  },

  tdRef: {
    padding: "2mm 1.3mm",
    border: `1px solid ${BORDER}`,
    fontSize: "1.95mm",
    overflowWrap: "anywhere",
  },

  td: {
    padding: "2mm 1.3mm",
    border: `1px solid ${BORDER}`,
    textAlign: "center",
  },

  tdCenter: {
    padding: "2mm 1mm",
    border: `1px solid ${BORDER}`,
    textAlign: "center",
  },

  tdRight: {
    padding: "2mm 1.2mm",
    border: `1px solid ${BORDER}`,
    textAlign: "right",
  },

  tdRightBold: {
    padding: "2mm 1.2mm",
    border: `1px solid ${BORDER}`,
    textAlign: "right",
    fontWeight: 800,
  },

  summaryGrid: {
    marginTop: "3mm",
    display: "grid",
    gridTemplateColumns: ".9fr 1.1fr",
    gap: "4mm",
  },

  requestBox: {
    padding: "2.7mm 3.5mm",
    background: LIGHT,
    border: `1px solid ${BORDER}`,
    borderRadius: "2mm",
  },

  boxHeading: {
    display: "flex",
    alignItems: "center",
    gap: "2mm",
    marginBottom: "1mm",
    fontWeight: 800,
    fontSize: "2.45mm",
  },

  requestRow: {
    minHeight: "7mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    borderBottom: `1px dotted ${BORDER}`,
    fontSize: "2.25mm",
  },

  requestRowLast: {
    minHeight: "7mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
    fontSize: "2.25mm",
  },

  totalBox: {
    border: `1px solid ${BORDER}`,
    borderRadius: "2mm",
    overflow: "hidden",
  },

  totalLine: {
    minHeight: "9mm",
    padding: "0 3.5mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: `1px dotted ${BORDER}`,
    fontSize: "2.5mm",
  },

  discountLine: {
    minHeight: "9mm",
    padding: "0 3.5mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: RED,
    fontWeight: 800,
    fontSize: "2.5mm",
  },

  grandTotal: {
    minHeight: "11mm",
    padding: "0 3.5mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: NAVY,
    color: "#fff",
    fontSize: "4.6mm",
  },

  messageBox: {
    marginTop: "2.8mm",
    minHeight: "14mm",
    padding: "2.5mm 3.5mm",
    border: `1px solid ${NAVY}`,
    borderRadius: "2mm",
  },

  messageHeading: {
    display: "flex",
    alignItems: "center",
    gap: "2mm",
    fontWeight: 800,
    fontSize: "2.45mm",
  },

  messageText: {
    margin: "1.5mm 0 0 7mm",
    fontSize: "2.25mm",
    lineHeight: 1.3,
  },

  conditions: {
    marginTop: "2.8mm",
  },

  conditionsHeading: {
    display: "flex",
    alignItems: "center",
    gap: "2mm",
    fontWeight: 800,
    fontSize: "2.45mm",
    marginBottom: "1.5mm",
  },

  conditionsGrid: {
    display: "grid",
    gridTemplateColumns:
      "1fr 1px 1fr 1px 1.15fr",
    gap: "3.5mm",
    alignItems: "center",
  },

  conditionDivider: {
    height: "8mm",
    background: BORDER,
  },

  conditionItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "1.7mm",
    fontSize: "2.1mm",
    lineHeight: 1.3,
  },

  thanks: {
    marginTop: "2.5mm",
    textAlign: "center",
    color: NAVY,
    fontFamily: "Georgia, serif",
    fontSize: "5.5mm",
    fontWeight: 700,
    fontStyle: "italic",
  },

  signatureBox: {
    marginTop: "2mm",
    height: "27mm",
    display: "grid",
    gridTemplateColumns: "1fr 1px 1fr",
    border: `1px solid ${BORDER}`,
    borderRadius: "2mm",
    overflow: "hidden",
  },

  signatureColumn: {
    padding: "2.5mm 4mm",
    textAlign: "center",
    fontSize: "2.7mm",
    display: "flex",
    flexDirection: "column",
  },

  signatureDivider: {
    background: BORDER,
  },

  signatureSpace: {
    flex: 1,
    minHeight: "13mm",
  },

  signatureLine: {
    width: "72%",
    height: 1,
    margin: "0 auto",
    background: "#d7dce5",
  },

  documentFooter: {
    marginTop: "1.5mm",
    minHeight: "5mm",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "5mm",
    fontSize: "1.9mm",
    color: "#65728a",
  },

  flagLine: {
    height: "1.7mm",
    marginTop: "1mm",
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
  },

  flagBlue: {
    background: "#002395",
  },

  flagWhite: {
    background: "#ffffff",
    borderTop: "1px solid #ddd",
    borderBottom: "1px solid #ddd",
  },

  flagRed: {
    background: "#ed2939",
  },
};