"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

/* =========================================================
   TYPES
========================================================= */

type ProOrderItem = {
  id: string;
  product_id: string;
  product_reference: string | null;
  product_name: string;
  category_id: string | null;
  category_name: string;
  quantity: number;
  unit_price: number | string;
  total_ht: number | string;
};

type ProOrder = {
  id: string;
  request_number: string | null;

  full_name: string;
  company: string;
  email: string;
  phone: string;

  country: string;
  city: string;

  activity: string;
  estimated_volume: string;

  website: string | null;
  message: string | null;

  categories: string[] | null;

  total_quantity: number;

  subtotal: number | string;
  discount_percent: number | string;
  discount_amount: number | string;
  total_ht: number | string;

  status: string;

  invoice_number: string | null;
  invoice_generated: boolean;
  invoice_generated_at: string | null;

  created_at: string;

  pro_order_items?: ProOrderItem[];
};

type StoredCustomer = {
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

type StoredProduct = {
  id: string;
  reference: string;
  name: string;
  category: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
};

/* =========================================================
   FORMAT PRIX
========================================================= */

function formatPrice(
  value: number | string | null | undefined,
) {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(
    Number.isFinite(amount) ? amount : 0,
  );
}

/* =========================================================
   FORMAT DATE
========================================================= */

function formatDate(value: string) {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "-";
  }

  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

/* =========================================================
   STATUS
========================================================= */

function getStatusLabel(status: string) {
  switch (status) {
    case "approved":
      return "Validée";

    case "processing":
      return "En traitement";

    case "rejected":
      return "Refusée";

    case "pending":
    default:
      return "En attente";
  }
}

function getStatusColors(status: string) {
  switch (status) {
    case "approved":
      return {
        background: "#dcfce7",
        color: "#166534",
      };

    case "processing":
      return {
        background: "#dbeafe",
        color: "#1e40af",
      };

    case "rejected":
      return {
        background: "#fee2e2",
        color: "#991b1b",
      };

    case "pending":
    default:
      return {
        background: "#fef3c7",
        color: "#92400e",
      };
  }
}

/* =========================================================
   DONNÉES COMMUNES
========================================================= */

function buildCustomer(
  order: ProOrder,
): StoredCustomer {
  return {
    fullName: order.full_name,
    company: order.company,
    email: order.email,
    phone: order.phone,

    country: order.country,
    city: order.city,

    activity: order.activity,
    volume: order.estimated_volume,

    website: order.website ?? "",
    message: order.message ?? "",
  };
}

function buildProducts(
  order: ProOrder,
): StoredProduct[] {
  return (order.pro_order_items ?? []).map(
    (item) => ({
      id: item.product_id,

      reference:
        item.product_reference ?? "",

      name: item.product_name,

      category:
        item.category_name,

      unitPrice:
        Number(item.unit_price),

      quantity:
        item.quantity,

      lineTotal:
        Number(item.total_ht),
    }),
  );
}

/* =========================================================
   FACTURE - NUMÉRO
========================================================= */

function createInvoiceNumber(
  orderId: string,
  createdAt: string,
) {
  const parsedDate =
    new Date(createdAt);

  const date = Number.isNaN(
    parsedDate.getTime(),
  )
    ? new Date()
    : parsedDate;

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      date.getDate(),
    ).padStart(2, "0");

  const idPart = orderId
    .replaceAll("-", "")
    .slice(0, 6)
    .toUpperCase();

  return `SBI-PRO-${year}${month}${day}-${idPart}`;
}

/* =========================================================
   FACTURE - SAUVEGARDE LOCALE
========================================================= */

function saveInvoiceLocally(
  order: ProOrder,
  invoiceNumber: string,
) {
  const invoiceData = {
    customer:
      buildCustomer(order),

    categories:
      order.categories ?? [],

    products:
      buildProducts(order),

    totalQuantity:
      order.total_quantity,

    subtotal:
      Number(order.subtotal),

    discountRate:
      Number(
        order.discount_percent,
      ),

    discountAmount:
      Number(
        order.discount_amount,
      ),

    totalHT:
      Number(order.total_ht),

    currency: "EUR",

    createdAt:
      order.created_at,

    invoiceNumber,

    requestNumber:
      order.request_number,

    proOrderId:
      order.id,
  };

  localStorage.setItem(
    "sbi-pro-invoice",
    JSON.stringify(invoiceData),
  );
}

/* =========================================================
   DEVIS - NUMÉRO
========================================================= */

function createDevisNumber(
  orderId: string,
  createdAt: string,
) {
  const parsedDate =
    new Date(createdAt);

  const date = Number.isNaN(
    parsedDate.getTime(),
  )
    ? new Date()
    : parsedDate;

  const year =
    date.getFullYear();

  const month =
    String(
      date.getMonth() + 1,
    ).padStart(2, "0");

  const day =
    String(
      date.getDate(),
    ).padStart(2, "0");

  const idPart = orderId
    .replaceAll("-", "")
    .slice(0, 6)
    .toUpperCase();

  return `SBI-DEV-${year}${month}${day}-${idPart}`;
}

/* =========================================================
   DEVIS - SAUVEGARDE LOCALE
========================================================= */

function saveDevisLocally(
  order: ProOrder,
  devisNumber: string,
) {
  const devisData = {
    customer:
      buildCustomer(order),

    categories:
      order.categories ?? [],

    products:
      buildProducts(order),

    totalQuantity:
      order.total_quantity,

    subtotal:
      Number(order.subtotal),

    discountRate:
      Number(
        order.discount_percent,
      ),

    discountAmount:
      Number(
        order.discount_amount,
      ),

    totalHT:
      Number(order.total_ht),

    currency: "EUR",

    createdAt:
      order.created_at,

    devisNumber,

    requestNumber:
      order.request_number,

    proOrderId:
      order.id,
  };

  const serialized =
    JSON.stringify(devisData);

  localStorage.setItem(
    "sbi-pro-devis",
    serialized,
  );

  localStorage.setItem(
    `sbi-pro-devis:${order.id}`,
    serialized,
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminProOrdersPage() {
  const [orders, setOrders] =
    useState<ProOrder[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState("");

  const [
    invoiceOrderId,
    setInvoiceOrderId,
  ] = useState<string | null>(
    null,
  );

  const [
    devisOrderId,
    setDevisOrderId,
  ] = useState<string | null>(
    null,
  );

  const [
    deletingOrderId,
    setDeletingOrderId,
  ] = useState<string | null>(
    null,
  );

  const [
    preparedDevisOrderIds,
    setPreparedDevisOrderIds,
  ] = useState<string[]>([]);

  /* =========================================================
     CHARGER LES DEVIS LOCAUX
  ========================================================= */

  useEffect(() => {
    try {
      const ids: string[] = [];

      for (
        let index = 0;
        index < localStorage.length;
        index += 1
      ) {
        const key =
          localStorage.key(index);

        if (
          key?.startsWith(
            "sbi-pro-devis:",
          )
        ) {
          ids.push(
            key.replace(
              "sbi-pro-devis:",
              "",
            ),
          );
        }
      }

      setPreparedDevisOrderIds(
        ids,
      );
    } catch {
      setPreparedDevisOrderIds(
        [],
      );
    }
  }, []);/* =========================================================
     CHARGEMENT DES DEMANDES
  ========================================================= */

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      setLoading(true);
      setErrorMessage("");

      try {
        /* =====================================
           SESSION
        ===================================== */

        const {
          data: { session },
          error: sessionError,
        } =
          await supabase.auth.getSession();

        if (!mounted) {
          return;
        }

        if (
          sessionError ||
          !session
        ) {
          window.location.replace(
            "/admin/login",
          );

          return;
        }

        /* =====================================
           UTILISATEUR
        ===================================== */

        const {
          data: { user },
          error: userError,
        } =
          await supabase.auth.getUser();

        if (!mounted) {
          return;
        }

        if (
          userError ||
          !user
        ) {
          await supabase.auth.signOut();

          window.location.replace(
            "/admin/login",
          );

          return;
        }

        /* =====================================
           DEMANDES PRO
        ===================================== */

        const {
          data,
          error,
        } = await supabase
          .from("pro_orders")
          .select(`
            id,
            request_number,
            full_name,
            company,
            email,
            phone,
            country,
            city,
            activity,
            estimated_volume,
            website,
            message,
            categories,
            total_quantity,
            subtotal,
            discount_percent,
            discount_amount,
            total_ht,
            status,
            invoice_number,
            invoice_generated,
            invoice_generated_at,
            created_at,
            pro_order_items (
              id,
              product_id,
              product_reference,
              product_name,
              category_id,
              category_name,
              quantity,
              unit_price,
              total_ht
            )
          `)
          .order(
            "created_at",
            {
              ascending: false,
            },
          );

        if (!mounted) {
          return;
        }

        if (error) {
          throw new Error(
            error.message ||
              "Impossible de charger les demandes.",
          );
        }

        setOrders(
          (data ?? []) as ProOrder[],
        );
      } catch (error) {
        if (!mounted) {
          return;
        }

        console.warn(
          "Erreur chargement demandes professionnelles :",
          error instanceof Error
            ? error.message
            : error,
        );

        setErrorMessage(
          error instanceof Error
            ? error.message
            : "Une erreur inconnue est survenue.",
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    void loadOrders();

    /* =========================================
       SURVEILLANCE SESSION
    ========================================= */

    const {
      data: { subscription },
    } =
      supabase.auth.onAuthStateChange(
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
     SUPPRIMER
  ========================================================= */

  async function handleDeleteOrder(
    order: ProOrder,
  ) {
    if (
      invoiceOrderId ||
      devisOrderId ||
      deletingOrderId
    ) {
      return;
    }

    const confirmed =
      window.confirm(
        `Supprimer définitivement la demande ${
          order.request_number ??
          order.id
        } ?`,
      );

    if (!confirmed) {
      return;
    }

    setDeletingOrderId(
      order.id,
    );

    try {
      const { error } =
        await supabase.rpc(
          "delete_pro_order",
          {
            p_order_id:
              order.id,
          },
        );

      if (error) {
        throw new Error(
          error.message,
        );
      }

      /* =====================================
         SUPPRESSION DEVIS LOCAL
      ===================================== */

      localStorage.removeItem(
        `sbi-pro-devis:${order.id}`,
      );

      const currentDevis =
        localStorage.getItem(
          "sbi-pro-devis",
        );

      if (currentDevis) {
        try {
          const parsed =
            JSON.parse(
              currentDevis,
            ) as {
              proOrderId?: string;
            };

          if (
            parsed.proOrderId ===
            order.id
          ) {
            localStorage.removeItem(
              "sbi-pro-devis",
            );
          }
        } catch {
          // Rien à faire.
        }
      }

      setPreparedDevisOrderIds(
        (current) =>
          current.filter(
            (id) =>
              id !==
              order.id,
          ),
      );

      setOrders(
        (current) =>
          current.filter(
            (item) =>
              item.id !==
              order.id,
          ),
      );
    } catch (error) {
      window.alert(
        error instanceof Error
          ? error.message
          : "Impossible de supprimer la demande.",
      );
    } finally {
      setDeletingOrderId(
        null,
      );
    }
  }

  /* =========================================================
     FACTURE
  ========================================================= */

  async function handleInvoice(
    order: ProOrder,
  ) {
    if (
      invoiceOrderId ||
      devisOrderId ||
      deletingOrderId
    ) {
      return;
    }

    /* =====================================
       FACTURE DÉJÀ CRÉÉE
    ===================================== */

    if (
      order.invoice_generated &&
      order.invoice_number
    ) {
      saveInvoiceLocally(
        order,
        order.invoice_number,
      );

      window.location.href =
        "/facture";

      return;
    }

    const confirmed =
      window.confirm(
        `Préparer la facture pour la demande ${
          order.request_number ??
          order.id
        } ?`,
      );

    if (!confirmed) {
      return;
    }

    setInvoiceOrderId(
      order.id,
    );

    try {
      const invoiceNumber =
        createInvoiceNumber(
          order.id,
          order.created_at,
        );

      const invoiceGeneratedAt =
        new Date().toISOString();

      const {
        data: updatedOrders,
        error: updateError,
      } = await supabase
        .from("pro_orders")
        .update({
          status:
            "approved",

          invoice_number:
            invoiceNumber,

          invoice_generated:
            true,

          invoice_generated_at:
            invoiceGeneratedAt,
        })
        .eq(
          "id",
          order.id,
        )
        .select(`
          id,
          status,
          invoice_number,
          invoice_generated,
          invoice_generated_at
        `);

      if (updateError) {
        throw new Error(
          updateError.message,
        );
      }

      if (
        !updatedOrders ||
        updatedOrders.length === 0
      ) {
        throw new Error(
          "La facture n'a pas pu être préparée.",
        );
      }

      const updatedOrder:
        ProOrder = {
        ...order,

        status:
          "approved",

        invoice_number:
          invoiceNumber,

        invoice_generated:
          true,

        invoice_generated_at:
          invoiceGeneratedAt,
      };

      setOrders(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              order.id
                ? updatedOrder
                : item,
          ),
      );

      saveInvoiceLocally(
        updatedOrder,
        invoiceNumber,
      );

      window.location.href =
        "/facture";
    } catch (error) {
      console.warn(
        "Erreur préparation facture :",
        error instanceof Error
          ? error.message
          : error,
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Impossible de préparer la facture.",
      );
    } finally {
      setInvoiceOrderId(
        null,
      );
    }
  }

  /* =========================================================
     OUVRIR DEVIS EXISTANT
  ========================================================= */

  function openExistingDevis(
    order: ProOrder,
  ) {
    try {
      const saved =
        localStorage.getItem(
          `sbi-pro-devis:${order.id}`,
        );

      if (!saved) {
        return false;
      }

      localStorage.setItem(
        "sbi-pro-devis",
        saved,
      );

      window.location.href =
        "/devis";

      return true;
    } catch {
      return false;
    }
  }

  /* =========================================================
     DEVIS
  ========================================================= */

  async function handleDevis(
    order: ProOrder,
  ) {
    if (
      invoiceOrderId ||
      devisOrderId ||
      deletingOrderId
    ) {
      return;
    }

    /* =====================================
       DEVIS DÉJÀ CRÉÉ
    ===================================== */

    if (
      preparedDevisOrderIds.includes(
        order.id,
      )
    ) {
      const opened =
        openExistingDevis(
          order,
        );

      if (opened) {
        return;
      }
    }

    const confirmed =
      window.confirm(
        `Préparer le devis pour la demande ${
          order.request_number ??
          order.id
        } ?`,
      );

    if (!confirmed) {
      return;
    }

    setDevisOrderId(
      order.id,
    );

    try {
      const devisNumber =
        createDevisNumber(
          order.id,
          order.created_at,
        );

      let nextStatus =
        order.status;

      /* =====================================
         PENDING -> PROCESSING
      ===================================== */

      if (
        order.status ===
        "pending"
      ) {
        const {
          data: updatedOrders,
          error: updateError,
        } = await supabase
          .from("pro_orders")
          .update({
            status:
              "processing",
          })
          .eq(
            "id",
            order.id,
          )
          .select(
            "id, status",
          );

        if (updateError) {
          throw new Error(
            updateError.message,
          );
        }

        if (
          !updatedOrders ||
          updatedOrders.length === 0
        ) {
          throw new Error(
            "Le devis n'a pas pu être préparé.",
          );
        }

        nextStatus =
          "processing";
      }

      const updatedOrder:
        ProOrder = {
        ...order,
        status:
          nextStatus,
      };

      saveDevisLocally(
        updatedOrder,
        devisNumber,
      );

      setPreparedDevisOrderIds(
        (current) =>
          current.includes(
            order.id,
          )
            ? current
            : [
                ...current,
                order.id,
              ],
      );

      setOrders(
        (current) =>
          current.map(
            (item) =>
              item.id ===
              order.id
                ? updatedOrder
                : item,
          ),
      );

      window.location.href =
        "/devis";
    } catch (error) {
      console.warn(
        "Erreur préparation devis :",
        error instanceof Error
          ? error.message
          : error,
      );

      window.alert(
        error instanceof Error
          ? error.message
          : "Impossible de préparer le devis.",
      );
    } finally {
      setDevisOrderId(
        null,
      );
    }
  }/* =========================================================
     AFFICHAGE
  ========================================================= */

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "#f8fafc",
        color: "#0f172a",
        fontFamily:
          "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 1250,
          margin: "0 auto",
        }}
      >
        <Link
          href="/admin"
          style={{
            color: "#64748b",
            textDecoration: "none",
            fontWeight: 700,
          }}
        >
          ← Administration
        </Link>

        {/* ===================================================
            HEADER
        =================================================== */}

        <header
          style={{
            marginTop: 18,
            marginBottom: 30,
          }}
        >
          <p
            style={{
              margin: "0 0 7px",
              color: "#b38b3f",
              fontSize: 13,
              fontWeight: 800,
              letterSpacing:
                "0.12em",
              textTransform:
                "uppercase",
            }}
          >
            SBI PARIS
          </p>

          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 34,
            }}
          >
            Demandes professionnelles
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Demandes reçues depuis
            l&apos;Espace Pro.
          </p>
        </header>

        {/* ===================================================
            ÉTATS
        =================================================== */}

        {loading ? (
          <div
            style={
              messageBoxStyle
            }
          >
            Chargement des demandes...
          </div>
        ) : errorMessage ? (
          <div
            style={{
              ...messageBoxStyle,
              background:
                "#fef2f2",
              borderColor:
                "#fecaca",
              color:
                "#991b1b",
            }}
          >
            {errorMessage}
          </div>
        ) : orders.length ===
          0 ? (
          <div
            style={
              messageBoxStyle
            }
          >
            Aucune demande professionnelle
            pour le moment.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 22,
            }}
          >
            {orders.map(
              (order) => {
                const statusColors =
                  getStatusColors(
                    order.status,
                  );

                const isInvoiceLoading =
                  invoiceOrderId ===
                  order.id;

                const isDevisLoading =
                  devisOrderId ===
                  order.id;

                const isDeleting =
                  deletingOrderId ===
                  order.id;

                const devisPrepared =
                  preparedDevisOrderIds.includes(
                    order.id,
                  );

                const anyActionLoading =
                  isInvoiceLoading ||
                  isDevisLoading ||
                  isDeleting;

                return (
                  <article
                    key={
                      order.id
                    }
                    style={{
                      overflow:
                        "hidden",

                      background:
                        "#ffffff",

                      border:
                        "1px solid #e2e8f0",

                      borderRadius:
                        14,

                      boxShadow:
                        "0 5px 20px rgba(15, 23, 42, 0.04)",
                    }}
                  >
                    {/* =====================================
                        ENTÊTE DEMANDE
                    ===================================== */}

                    <div
                      style={{
                        padding:
                          "20px 22px",

                        display:
                          "flex",

                        justifyContent:
                          "space-between",

                        alignItems:
                          "flex-start",

                        gap: 20,

                        flexWrap:
                          "wrap",

                        borderBottom:
                          "1px solid #e2e8f0",
                      }}
                    >
                      <div>
                        <div
                          style={{
                            display:
                              "flex",

                            alignItems:
                              "center",

                            gap: 10,

                            flexWrap:
                              "wrap",
                          }}
                        >
                          <h2
                            style={{
                              margin:
                                0,

                              fontSize:
                                21,
                            }}
                          >
                            {
                              order.company
                            }
                          </h2>

                          <span
                            style={{
                              padding:
                                "5px 10px",

                              borderRadius:
                                999,

                              background:
                                statusColors.background,

                              color:
                                statusColors.color,

                              fontSize:
                                12,

                              fontWeight:
                                800,
                            }}
                          >
                            {getStatusLabel(
                              order.status,
                            )}
                          </span>
                        </div>

                        <p
                          style={{
                            margin:
                              "7px 0 0",

                            color:
                              "#64748b",

                            fontSize:
                              14,
                          }}
                        >
                          {order.request_number
                            ? `Demande ${order.request_number}`
                            : order.id}
                        </p>
                      </div>

                      <div
                        style={{
                          textAlign:
                            "right",
                        }}
                      >
                        <strong
                          style={{
                            display:
                              "block",

                            fontSize:
                              21,
                          }}
                        >
                          {formatPrice(
                            order.total_ht,
                          )}
                        </strong>

                        <span
                          style={{
                            color:
                              "#64748b",

                            fontSize:
                              13,
                          }}
                        >
                          {formatDate(
                            order.created_at,
                          )}
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        padding: 22,
                      }}
                    >
                      {/* =====================================
                          CLIENT
                      ===================================== */}

                      <div
                        style={{
                          display:
                            "grid",

                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(190px, 1fr))",

                          gap:
                            18,

                          marginBottom:
                            24,
                        }}
                      >
                        <div>
                          <strong>
                            Contact
                          </strong>

                          <p
                            style={
                              infoTextStyle
                            }
                          >
                            {
                              order.full_name
                            }
                            <br />

                            {
                              order.email
                            }
                            <br />

                            {order.phone ||
                              "-"}
                          </p>
                        </div>

                        <div>
                          <strong>
                            Localisation
                          </strong>

                          <p
                            style={
                              infoTextStyle
                            }
                          >
                            {
                              order.city
                            }
                            <br />

                            {
                              order.country
                            }
                          </p>
                        </div>

                        <div>
                          <strong>
                            Activité
                          </strong>

                          <p
                            style={
                              infoTextStyle
                            }
                          >
                            {
                              order.activity
                            }

                            <br />

                            Volume :{" "}
                            {
                              order.estimated_volume
                            }
                          </p>
                        </div>

                        <div>
                          <strong>
                            Catégories
                          </strong>

                          <p
                            style={
                              infoTextStyle
                            }
                          >
                            {order
                              .categories
                              ?.length
                              ? order.categories.join(
                                  ", ",
                                )
                              : "-"}
                          </p>
                        </div>
                      </div>

                      {/* =====================================
                          TABLE PRODUITS
                      ===================================== */}<div
                        style={{
                          marginBottom:
                            24,

                          overflowX:
                            "auto",

                          border:
                            "1px solid #e2e8f0",

                          borderRadius:
                            10,
                        }}
                      >
                        <table
                          style={{
                            width:
                              "100%",

                            minWidth:
                              700,

                            borderCollapse:
                              "collapse",
                          }}
                        >
                          <thead>
                            <tr
                              style={{
                                background:
                                  "#f8fafc",
                              }}
                            >
                              <th
                                style={
                                  thStyle
                                }
                              >
                                Produit
                              </th>

                              <th
                                style={
                                  thStyle
                                }
                              >
                                Catégorie
                              </th>

                              <th
                                style={
                                  thStyle
                                }
                              >
                                Quantité
                              </th>

                              <th
                                style={
                                  thStyle
                                }
                              >
                                Prix unitaire
                              </th>

                              <th
                                style={
                                  thStyle
                                }
                              >
                                Total HT
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {(
                              order.pro_order_items ??
                              []
                            ).map(
                              (
                                item,
                              ) => (
                                <tr
                                  key={
                                    item.id
                                  }
                                >
                                  <td
                                    style={
                                      tdStyle
                                    }
                                  >
                                    <strong>
                                      {
                                        item.product_name
                                      }
                                    </strong>

                                    {item.product_reference && (
                                      <div
                                        style={{
                                          marginTop:
                                            4,

                                          color:
                                            "#94a3b8",

                                          fontSize:
                                            12,
                                        }}
                                      >
                                        {
                                          item.product_reference
                                        }
                                      </div>
                                    )}
                                  </td>

                                  <td
                                    style={
                                      tdStyle
                                    }
                                  >
                                    {
                                      item.category_name
                                    }
                                  </td>

                                  <td
                                    style={
                                      tdStyle
                                    }
                                  >
                                    {
                                      item.quantity
                                    }
                                  </td>

                                  <td
                                    style={
                                      tdStyle
                                    }
                                  >
                                    {formatPrice(
                                      item.unit_price,
                                    )}
                                  </td>

                                  <td
                                    style={
                                      tdStyle
                                    }
                                  >
                                    <strong>
                                      {formatPrice(
                                        item.total_ht,
                                      )}
                                    </strong>
                                  </td>
                                </tr>
                              ),
                            )}
                          </tbody>
                        </table>
                      </div>

                      {/* =====================================
                          RÉCAPITULATIF
                      ===================================== */}

                      <div
                        style={{
                          display:
                            "grid",

                          gridTemplateColumns:
                            "repeat(auto-fit, minmax(150px, 1fr))",

                          gap:
                            12,

                          padding:
                            18,

                          background:
                            "#f8fafc",

                          borderRadius:
                            10,
                        }}
                      >
                        <Summary
                          label="Quantité totale"
                          value={String(
                            order.total_quantity,
                          )}
                        />

                        <Summary
                          label="Sous-total"
                          value={formatPrice(
                            order.subtotal,
                          )}
                        />

                        <Summary
                          label="Remise"
                          value={`${Number(
                            order.discount_percent,
                          )}%`}
                        />

                        <Summary
                          label="Montant remise"
                          value={`- ${formatPrice(
                            order.discount_amount,
                          )}`}
                        />

                        <Summary
                          label="Total HT"
                          value={formatPrice(
                            order.total_ht,
                          )}
                          strong
                        />
                      </div>

                      {/* =====================================
                          SITE + MESSAGE
                      ===================================== */}

                      {(order.website ||
                        order.message) && (
                        <div
                          style={{
                            display:
                              "grid",

                            gridTemplateColumns:
                              "repeat(auto-fit, minmax(250px, 1fr))",

                            gap:
                              18,

                            marginTop:
                              20,
                          }}
                        >
                          {order.website && (
                            <div>
                              <strong>
                                Site internet
                              </strong>

                              <p
                                style={
                                  infoTextStyle
                                }
                              >
                                {
                                  order.website
                                }
                              </p>
                            </div>
                          )}

                          {order.message && (
                            <div>
                              <strong>
                                Message du client
                              </strong>

                              <p
                                style={
                                  infoTextStyle
                                }
                              >
                                {
                                  order.message
                                }
                              </p>
                            </div>
                          )}
                        </div>
                      )}{/* =====================================
                          ÉTAT DOCUMENTS + ACTIONS
                      ===================================== */}

                      <div
                        style={{
                          marginTop:
                            22,

                          paddingTop:
                            20,

                          borderTop:
                            "1px solid #e2e8f0",

                          display:
                            "flex",

                          justifyContent:
                            "space-between",

                          alignItems:
                            "center",

                          gap:
                            14,

                          flexWrap:
                            "wrap",
                        }}
                      >
                        {/* =================================
                            INFORMATIONS DOCUMENTS
                        ================================= */}

                        <div
                          style={{
                            color:
                              "#64748b",

                            fontSize:
                              13,

                            lineHeight:
                              1.7,
                          }}
                        >
                          <div>
                            Facture :{" "}

                            <strong
                              style={{
                                color:
                                  order.invoice_generated
                                    ? "#166534"
                                    : "#64748b",
                              }}
                            >
                              {order.invoice_generated
                                ? "Préparée"
                                : "Non préparée"}
                            </strong>

                            {order.invoice_number && (
                              <>
                                {" — "}

                                {
                                  order.invoice_number
                                }
                              </>
                            )}
                          </div>

                          <div>
                            Devis :{" "}

                            <strong
                              style={{
                                color:
                                  devisPrepared
                                    ? "#166534"
                                    : "#64748b",
                              }}
                            >
                              {devisPrepared
                                ? "Préparé"
                                : "Non préparé"}
                            </strong>
                          </div>
                        </div>

                        {/* =================================
                            3 BOUTONS
                        ================================= */}

                        <div
                          style={{
                            display:
                              "flex",

                            gap:
                              10,

                            flexWrap:
                              "wrap",
                          }}
                        >
                          {/* ===============================
                              FACTURE
                          =============================== */}

                          <button
                            type="button"
                            onClick={() =>
                              void handleInvoice(
                                order,
                              )
                            }
                            disabled={
                              anyActionLoading
                            }
                            style={{
                              minWidth:
                                120,

                              padding:
                                "11px 20px",

                              border:
                                0,

                              borderRadius:
                                8,

                              background:
                                "#0f172a",

                              color:
                                "#ffffff",

                              fontWeight:
                                800,

                              cursor:
                                anyActionLoading
                                  ? "not-allowed"
                                  : "pointer",

                              opacity:
                                anyActionLoading
                                  ? 0.65
                                  : 1,
                            }}
                          >
                            {isInvoiceLoading
                              ? "Préparation..."
                              : "Facture"}
                          </button>

                          {/* ===============================
                              DEVIS
                          =============================== */}

                          <button
                            type="button"
                            onClick={() =>
                              void handleDevis(
                                order,
                              )
                            }
                            disabled={
                              anyActionLoading
                            }
                            style={{
                              minWidth:
                                120,

                              padding:
                                "11px 20px",

                              border:
                                0,

                              borderRadius:
                                8,

                              background:
                                "#1d4ed8",

                              color:
                                "#ffffff",

                              fontWeight:
                                800,

                              cursor:
                                anyActionLoading
                                  ? "not-allowed"
                                  : "pointer",

                              opacity:
                                anyActionLoading
                                  ? 0.65
                                  : 1,
                            }}
                          >
                            {isDevisLoading
                              ? "Préparation..."
                              : "Devis"}
                          </button>

                          {/* ===============================
                              SUPPRIMER
                          =============================== */}

                          <button
                            type="button"
                            onClick={() =>
                              void handleDeleteOrder(
                                order,
                              )
                            }
                            disabled={
                              anyActionLoading
                            }
                            style={{
                              minWidth:
                                120,

                              padding:
                                "11px 20px",

                              border:
                                "1px solid #fecaca",

                              borderRadius:
                                8,

                              background:
                                "#ffffff",

                              color:
                                "#b91c1c",

                              fontWeight:
                                800,

                              cursor:
                                anyActionLoading
                                  ? "not-allowed"
                                  : "pointer",

                              opacity:
                                anyActionLoading
                                  ? 0.65
                                  : 1,
                            }}
                          >
                            {isDeleting
                              ? "Suppression..."
                              : "Supprimer"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              },
            )}
          </div>
        )}
      </div>
    </main>
  );
}

/* =========================================================
   SUMMARY
========================================================= */

function Summary({
  label,
  value,
  strong = false,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div>
      <span
        style={{
          display:
            "block",

          marginBottom:
            5,

          color:
            "#64748b",

          fontSize:
            12,
        }}
      >
        {label}
      </span>

      <strong
        style={{
          display:
            "block",

          color:
            "#0f172a",

          fontSize:
            strong
              ? 19
              : 16,
        }}
      >
        {value}
      </strong>
    </div>
  );
}

/* =========================================================
   STYLES
========================================================= */

const messageBoxStyle = {
  padding:
    40,

  background:
    "#ffffff",

  border:
    "1px solid #e2e8f0",

  borderRadius:
    12,

  textAlign:
    "center" as const,

  color:
    "#475569",
};

const infoTextStyle = {
  margin:
    "7px 0 0",

  color:
    "#475569",

  lineHeight:
    1.6,
};

const thStyle = {
  padding:
    "13px 15px",

  borderBottom:
    "1px solid #e2e8f0",

  textAlign:
    "left" as const,

  color:
    "#475569",

  fontSize:
    12,

  fontWeight:
    800,
};

const tdStyle = {
  padding:
    "14px 15px",

  borderBottom:
    "1px solid #e2e8f0",

  color:
    "#334155",

  fontSize:
    14,
};