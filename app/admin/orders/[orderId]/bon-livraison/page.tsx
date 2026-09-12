"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

type Order = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  address: string;
  postal_code: string;
  city: string;
  country: string;
  product_id: string | null;
  product_name: string;
  size: string | null;
  quantity: number;
  status: string;
  created_at: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(new Date(value));
}

function formatTime(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function statusLabel(status: string) {
  switch (status) {
    case "pending":
      return "En attente";
    case "confirmed":
      return "Confirmée";
    case "processing":
      return "En préparation";
    case "shipped":
      return "Expédiée";
    case "delivered":
      return "Livrée";
    case "cancelled":
      return "Annulée";
    default:
      return status || "En attente";
  }
}

export default function BonLivraisonPage() {
  const params = useParams<{ orderId: string }>();
  const orderId = params.orderId;

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadOrder() {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!mounted) return;

      if (sessionError || !session) {
        window.location.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          first_name,
          last_name,
          email,
          phone,
          address,
          postal_code,
          city,
          country,
          product_id,
          product_name,
          size,
          quantity,
          status,
          created_at
        `)
        .eq("id", orderId)
        .maybeSingle();

      if (!mounted) return;

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (!data) {
        setErrorMessage("Commande introuvable.");
        setLoading(false);
        return;
      }

      setOrder(data as Order);
      setLoading(false);
    }

    void loadOrder();

    return () => {
      mounted = false;
    };
  }, [orderId]);

  const bonNumber = useMemo(() => {
    if (!order) return "";

    const date = new Date(order.created_at);

    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");

    return `SBI-BL-${y}${m}${d}-${order.id.slice(0, 6).toUpperCase()}`;
  }, [order]);

  if (loading) {
    return (
      <main className={styles.centerMessage}>
        Chargement du bon de livraison...
      </main>
    );
  }

  if (errorMessage || !order) {
    return (
      <main className={styles.centerMessage}>
        <h1>Bon de livraison</h1>
        <p>{errorMessage || "Commande introuvable."}</p>

        <Link href="/admin/orders">
          Retour aux commandes
        </Link>
      </main>
    );
  }

  const sizeIsPointure =
    order.size !== null &&
    /^\d+$/.test(order.size.trim());

  const productRef = order.product_id
    ? `SBI-${order.product_id.slice(0, 8).toUpperCase()}`
    : `SBI-${order.id.slice(0, 8).toUpperCase()}`;

  return (
    <main className={styles.screen}>
      <div className={styles.toolbar}>
        <Link
          href="/admin/orders"
          className={styles.backButton}
        >
          ← Retour
        </Link>

        <button
          type="button"
          className={styles.printButton}
          onClick={() => window.print()}
        >
          Imprimer / PDF
        </button>
      </div>

      <article className={styles.sheet}>
        <header className={styles.header}>
          <div className={styles.brand}>
            <Image
              src="/logo.png"
              alt="SBI PARIS"
              width={160}
              height={160}
              className={styles.logo}
              priority
            />

            <div className={styles.company}>
              <h2>SARL BEN ISSIA PARIS</h2>
              <p>Société à responsabilité limitée</p>
              <p>Capital social : 30 000 €</p>
              <p>RCS Bobigny 398 514 737</p>
              <p>Immatriculation : 07/10/1994</p>

              <div className={styles.companyContact}>
                <p>139 Rue André Karman, 93300 Aubervilliers, France</p>
                <p>+33 6 43 02 10 21</p>
                <p>contactprosibiparis@gmail.com</p>
                <p>www.sibiparis.com</p>
              </div>
            </div>
          </div>

          <div className={styles.documentInfo}>
            <div className={styles.documentTitle}>
              BON DE LIVRAISON
            </div>

            <dl>
              <div>
                <dt>N° BL</dt>
                <dd className={styles.redText}>
                  {bonNumber}
                </dd>
              </div>

              <div>
                <dt>Commande N°</dt>
                <dd>
                  CMD-{order.id.slice(0, 8).toUpperCase()}
                </dd>
              </div>

              <div>
                <dt>Date de commande</dt>
                <dd>{formatDate(order.created_at)}</dd>
              </div>

              <div>
                <dt>Heure</dt>
                <dd>{formatTime(order.created_at)}</dd>
              </div>
            </dl>
          </div>
        </header>

        <div className={styles.tricolorLine}>
          <span />
          <span />
          <span />
        </div>

        <section className={styles.twoColumns}>
          <div className={styles.infoBox}>
            <h3>CLIENT</h3>

            <div className={styles.infoRows}>
              <p>
                <strong>Nom complet</strong>
                <span>
                  {order.first_name} {order.last_name}
                </span>
              </p>

              <p>
                <strong>Téléphone</strong>
                <span>{order.phone || "-"}</span>
              </p>

              <p>
                <strong>E-mail</strong>
                <span>{order.email}</span>
              </p>
            </div>
          </div>

          <div className={styles.infoBox}>
            <h3>ADRESSE DE LIVRAISON</h3>

            <div className={styles.infoRows}>
              <p>
                <strong>Adresse</strong>
                <span>{order.address}</span>
              </p>

              <p>
                <strong>Ville</strong>
                <span>{order.city}</span>
              </p>

              <p>
                <strong>Code postal</strong>
                <span>{order.postal_code}</span>
              </p>

              <p>
                <strong>Pays</strong>
                <span>{order.country}</span>
              </p>
            </div>
          </div>
        </section>

        <section className={styles.productsSection}>
          <table className={styles.productsTable}>
            <thead>
              <tr>
                <th>RÉF.</th>
                <th>PRODUIT</th>
                <th>TAILLE / POINTURE</th>
                <th>QTÉ</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>{productRef}</td>

                <td className={styles.productName}>
                  {order.product_name}
                </td>

                <td>
                  {order.size ? (
                    <>
                      <span className={styles.sizeType}>
                        {sizeIsPointure
                          ? "Pointure"
                          : "Taille"}
                      </span>
                      {order.size}
                    </>
                  ) : (
                    "-"
                  )}
                </td>

                <td>{order.quantity}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className={styles.deliverySummary}>
          <div>
            <strong>Nombre total d’articles</strong>
            <span>{order.quantity}</span>
          </div>

          <div>
            <strong>Transporteur</strong>
            <span>________________</span>
          </div>

          <div>
            <strong>N° de suivi</strong>
            <span>________________</span>
          </div>

          <div>
            <strong>Statut</strong>
            <span className={styles.redText}>
              {statusLabel(order.status)}
            </span>
          </div>
        </section>

        <section className={styles.signatures}>
          <div>
            <h4>LIVRÉ PAR</h4>
            <p>Nom : _______________________</p>
            <p>Date : ____ / ____ / ______</p>
            <p>Signature :</p>
          </div>

          <div>
            <h4>REÇU PAR LE CLIENT</h4>
            <p>Nom : _______________________</p>
            <p>Date : ____ / ____ / ______</p>
            <p>Signature :</p>
          </div>

          <div>
            <h4>CACHET SBI PARIS</h4>
          </div>
        </section>

        <footer className={styles.footer}>
          <div className={styles.thanks}>
            Merci pour votre confiance.
          </div>

          <p>
            Document généré automatiquement par SBI PARIS
            le {formatDate(new Date().toISOString())}.
          </p>

          <div className={styles.footerLine}>
            <span />
            <span />
            <span />
          </div>
        </footer>
      </article>
    </main>
  );
}