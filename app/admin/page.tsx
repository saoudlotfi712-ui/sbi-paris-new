"use client";

import Link from "next/link";
import {
  type CSSProperties,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

/* =========================================================
   TYPES
========================================================= */

type OrderRow = {
  status: string | null;
  total: number | string | null;
};

type SupabaseErrorLike = {
  code?: string;
  message?: string;
};

/* =========================================================
   HELPERS
========================================================= */

function isJwtExpiredError(
  error: SupabaseErrorLike | null | undefined,
) {
  if (!error) {
    return false;
  }

  const code = String(error.code ?? "").toUpperCase();

  const message = String(
    error.message ?? "",
  ).toLowerCase();

  return (
    code === "PGRST303" ||
    message.includes("jwt expired") ||
    message.includes("expired jwt") ||
    message.includes("token has expired")
  );
}

/* =========================================================
   PAGE ADMIN
========================================================= */

export default function AdminPage() {
  const [loading, setLoading] = useState(true);

  const [loggingOut, setLoggingOut] =
    useState(false);

  const [email, setEmail] = useState("");

  const [productCount, setProductCount] =
    useState(0);

  const [orderCount, setOrderCount] =
    useState(0);

  const [pendingCount, setPendingCount] =
    useState(0);

  const [orders, setOrders] =
    useState<OrderRow[]>([]);

  const [
    dashboardWarning,
    setDashboardWarning,
  ] = useState("");

  /* =========================================================
     VÉRIFICATION SESSION ADMIN
     + CHARGEMENT DASHBOARD
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function redirectToLogin() {
      try {
        await supabase.auth.signOut();
      } catch {
        // Aucun blocage nécessaire ici.
      }

      if (mounted) {
        window.location.replace(
          "/admin/login",
        );
      }
    }

    async function refreshCurrentSession() {
      const {
        data,
        error,
      } = await supabase.auth.refreshSession();

      if (error || !data.session) {
        if (error) {
          console.warn(
            "Impossible de renouveler la session Supabase :",
            error.message,
          );
        }

        return null;
      }

      return data.session;
    }

    async function loadDashboardData() {
      return Promise.all([
        supabase
          .from("products")
          .select("id", {
            count: "exact",
            head: true,
          }),

        supabase
          .from("orders")
          .select("status, total"),
      ]);
    }

    async function loadDashboard() {
      try {
        setDashboardWarning("");

        /* =========================================
           1. SESSION SUPABASE
        ========================================= */

        const {
          data: sessionData,
          error: sessionError,
        } = await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        if (
          sessionError ||
          !sessionData.session
        ) {
          if (sessionError) {
            console.warn(
              "Session Supabase indisponible :",
              sessionError.message,
            );
          }

          await redirectToLogin();

          return;
        }

        let session = sessionData.session;

        /* =========================================
           2. CONTRÔLE EXPIRATION JWT
        ========================================= */

        const now = Math.floor(
          Date.now() / 1000,
        );

        const expiresAt =
          session.expires_at ?? 0;

        /*
         * On renouvelle uniquement lorsque
         * le token expire dans moins de 60 secondes.
         */
        if (
          !expiresAt ||
          expiresAt <= now + 60
        ) {
          const refreshedSession =
            await refreshCurrentSession();

          if (!mounted) {
            return;
          }

          if (!refreshedSession) {
            await redirectToLogin();

            return;
          }

          session = refreshedSession;
        }

        /* =========================================
           3. VÉRIFICATION UTILISATEUR
        ========================================= */

        const {
          data: userData,
          error: userError,
        } = await supabase.auth.getUser();

        if (!mounted) {
          return;
        }

        if (
          userError ||
          !userData.user
        ) {
          if (userError) {
            console.warn(
              "Utilisateur Supabase non valide :",
              userError.message,
            );
          }

          await redirectToLogin();

          return;
        }

        setEmail(
          userData.user.email ??
            session.user.email ??
            "",
        );

        /* =========================================
           4. CHARGEMENT DES DONNÉES
        ========================================= */

        let [
          productsResult,
          ordersResult,
        ] = await loadDashboardData();

        if (!mounted) {
          return;
        }

        /* =========================================
           5. SI JWT EXPIRÉ PENDANT LA REQUÊTE :
              REFRESH + UNE SEULE NOUVELLE TENTATIVE
        ========================================= */

        const jwtExpired =
          isJwtExpiredError(
            productsResult.error,
          ) ||
          isJwtExpiredError(
            ordersResult.error,
          );

        if (jwtExpired) {
          const refreshedSession =
            await refreshCurrentSession();

          if (!mounted) {
            return;
          }

          if (!refreshedSession) {
            await redirectToLogin();

            return;
          }

          session = refreshedSession;

          const retryResults =
            await loadDashboardData();

          if (!mounted) {
            return;
          }

          productsResult =
            retryResults[0];

          ordersResult =
            retryResults[1];
        }

        /* =========================================
           6. PRODUITS
        ========================================= */

        if (productsResult.error) {
          console.warn(
            "Produits non chargés :",
            productsResult.error.message,
            productsResult.error.code,
          );

          setProductCount(0);

          setDashboardWarning(
            "Le nombre de produits n'a pas pu être chargé.",
          );
        } else {
          setProductCount(
            productsResult.count ?? 0,
          );
        }

        /* =========================================
           7. COMMANDES
        ========================================= */

        if (ordersResult.error) {
          console.warn(
            "Commandes non chargées :",
            ordersResult.error.message,
            ordersResult.error.code,
          );

          setOrders([]);
          setOrderCount(0);
          setPendingCount(0);

          setDashboardWarning(
            (
              currentWarning,
            ) =>
              currentWarning ||
              "Les commandes n'ont pas pu être chargées.",
          );
        } else {
          const rows =
            (ordersResult.data ??
              []) as OrderRow[];

          setOrders(rows);

          setOrderCount(
            rows.length,
          );

          const pending =
            rows.filter(
              (order) =>
                order.status ===
                "pending",
            ).length;

          setPendingCount(
            pending,
          );
        }
      } catch (error) {
        if (
          error instanceof Error
        ) {
          console.warn(
            "Erreur tableau de bord admin :",
            error.message,
          );
        } else {
          console.warn(
            "Erreur inconnue dans le tableau de bord admin.",
          );
        }

        if (mounted) {
          setDashboardWarning(
            "Certaines données du tableau de bord n'ont pas pu être chargées.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadDashboard();

    /* =======================================================
       SURVEILLANCE DE LA SESSION
    ======================================================= */

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (!mounted) {
          return;
        }

        if (
          event === "SIGNED_OUT" ||
          !session
        ) {
          window.location.replace(
            "/admin/login",
          );
        }
      },
    );

    return () => {
      mounted = false;

      subscription.unsubscribe();
    };
  }, []);

  /* =========================================================
     CHIFFRE D'AFFAIRES
  ========================================================= */

  const totalRevenue = useMemo(
    () => {
      return orders.reduce(
        (total, order) => {
          const value = Number(
            order.total ?? 0,
          );

          if (
            !Number.isFinite(value)
          ) {
            return total;
          }

          return total + value;
        },
        0,
      );
    },
    [orders],
  );

  /* =========================================================
     FORMAT PRIX
  ========================================================= */

  function formatPrice(
    value: number,
  ) {
    return new Intl.NumberFormat(
      "fr-FR",
      {
        style: "currency",
        currency: "EUR",
      },
    ).format(value);
  }

  /* =========================================================
     DÉCONNEXION
  ========================================================= */

  async function handleLogout() {
    if (loggingOut) {
      return;
    }

    setLoggingOut(true);

    try {
      const { error } =
        await supabase.auth.signOut();

      if (error) {
        console.warn(
          "Erreur de déconnexion :",
          error.message,
        );

        setLoggingOut(false);

        return;
      }

      window.location.replace(
        "/admin/login",
      );
    } catch (error) {
      if (
        error instanceof Error
      ) {
        console.warn(
          "Erreur de déconnexion :",
          error.message,
        );
      }

      setLoggingOut(false);
    }
  }/* =========================================================
     CHARGEMENT
  ========================================================= */

  if (loading) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f8fafc",
          fontFamily:
            "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            textAlign: "center",
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 18,
              fontWeight: 700,
              color: "#0f172a",
            }}
          >
            Chargement du tableau de bord...
          </p>
        </div>
      </main>
    );
  }

  /* =========================================================
     STYLES
  ========================================================= */

  const cardStyle: CSSProperties = {
    padding: 22,
    background: "#ffffff",
    border:
      "1px solid #e2e8f0",
    borderRadius: 12,
  };

  const navigationCardStyle:
    CSSProperties = {
    padding: 24,
    minHeight: 110,
    display: "flex",
    alignItems: "center",
    background: "#ffffff",
    border:
      "1px solid #e2e8f0",
    borderRadius: 12,
    textDecoration: "none",
    color: "#0f172a",
    fontWeight: 700,
    transition:
      "transform .15s ease, box-shadow .15s ease",
  };

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main
      style={{
        minHeight: "100vh",
        padding:
          "40px 24px",
        background: "#f8fafc",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* ===================================================
            HEADER
        =================================================== */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "flex-start",
            gap: 20,
            marginBottom: 32,
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                margin:
                  "0 0 10px",
                fontSize: 32,
                color: "#0f172a",
              }}
            >
              SBI PARIS Admin
            </h1>

            <p
              style={{
                margin: 0,
                color: "#64748b",
              }}
            >
              Gestion de votre boutique
              SBI PARIS.
            </p>

            {email && (
              <p
                style={{
                  margin:
                    "8px 0 0",
                  color: "#94a3b8",
                  fontSize: 14,
                }}
              >
                Connecté : {email}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleLogout}
            disabled={loggingOut}
            style={{
              border:
                "1px solid #cbd5e1",
              background:
                "#ffffff",
              color:
                "#0f172a",
              borderRadius: 8,
              padding:
                "10px 16px",
              fontWeight: 700,
              cursor:
                loggingOut
                  ? "not-allowed"
                  : "pointer",
              opacity:
                loggingOut
                  ? 0.6
                  : 1,
            }}
          >
            {loggingOut
              ? "Déconnexion..."
              : "Se déconnecter"}
          </button>
        </div>

        {/* ===================================================
            MESSAGE D'AVERTISSEMENT
        =================================================== */}

        {dashboardWarning && (
          <div
            style={{
              marginBottom: 22,
              padding:
                "13px 16px",
              background:
                "#fff7ed",
              border:
                "1px solid #fed7aa",
              borderRadius: 10,
              color:
                "#9a3412",
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            {dashboardWarning}
          </div>
        )}

        {/* ===================================================
            STATISTIQUES
        =================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 16,
            marginBottom: 28,
          }}
        >
          <div style={cardStyle}>
            <p
              style={{
                margin:
                  "0 0 8px",
                color: "#64748b",
              }}
            >
              Produits
            </p>

            <strong
              style={{
                fontSize: 30,
                color: "#0f172a",
              }}
            >
              {productCount}
            </strong>
          </div>

          <div style={cardStyle}>
            <p
              style={{
                margin:
                  "0 0 8px",
                color: "#64748b",
              }}
            >
              Commandes
            </p>

            <strong
              style={{
                fontSize: 30,
                color: "#0f172a",
              }}
            >
              {orderCount}
            </strong>
          </div>

          <div style={cardStyle}>
            <p
              style={{
                margin:
                  "0 0 8px",
                color: "#64748b",
              }}
            >
              En attente
            </p>

            <strong
              style={{
                fontSize: 30,
                color: "#0f172a",
              }}
            >
              {pendingCount}
            </strong>
          </div>

          <div style={cardStyle}>
            <p
              style={{
                margin:
                  "0 0 8px",
                color: "#64748b",
              }}
            >
              Chiffre d&apos;affaires
            </p>

            <strong
              style={{
                fontSize: 30,
                color: "#0f172a",
              }}
            >
              {formatPrice(
                totalRevenue,
              )}
            </strong>
          </div>
        </div>

        {/* ===================================================
            NAVIGATION ADMIN
        =================================================== */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 20,
          }}
        >
          <Link
            href="/admin/products"
            style={
              navigationCardStyle
            }
          >
            Produits
          </Link>

          <Link
            href="/admin/orders"
            style={
              navigationCardStyle
            }
          >
            Commandes
          </Link>

          <Link
            href="/admin/pro-orders"
            style={
              navigationCardStyle
            }
          >
            Demandes professionnelles
          </Link>

          <Link
            href="/admin/settings"
            style={
              navigationCardStyle
            }
          >
            Paramètres
          </Link>
        </div>
      </div>
    </main>
  );
}