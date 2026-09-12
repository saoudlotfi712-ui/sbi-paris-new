"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";
import OrderStatus from "./OrderStatus";
import DeleteOrderButton from "./DeleteOrderButton";
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
  product_name: string;
  size: string | null;
  quantity: number;
  subtotal: number | string;
  shipping: number | string;
  total: number | string;
  status: string;
  created_at: string;
};

function formatPrice(value: number | string) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(Number(value));
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadOrders() {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

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
          product_name,
          size,
          quantity,
          subtotal,
          shipping,
          total,
          status,
          created_at
        `)
        .order("created_at", {
          ascending: false,
        });

      if (!mounted) {
        return;
      }

      if (error) {
  window.alert(
    `Code: ${error.code ?? "N/A"}
Message: ${error.message ?? "N/A"}
Details: ${error.details ?? "N/A"}
Hint: ${error.hint ?? "N/A"}`,
  );

  setErrorMessage(error.message);
  setLoading(false);
  return;
}

      setOrders((data ?? []) as Order[]);
      setLoading(false);
    }

    void loadOrders();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <Link
          href="/admin"
          style={{
            color: "#64748b",
            textDecoration: "none",
          }}
        >
          ← Administration
        </Link>

        <div
          style={{
            marginTop: 16,
            marginBottom: 30,
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 32,
            }}
          >
            Commandes
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Gestion des commandes SBI PARIS
          </p>
        </div>

        {loading ? (
          <div
            style={{
              padding: 40,
              borderRadius: 12,
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            Chargement des commandes...
          </div>
        ) : errorMessage ? (
          <div
            style={{
              padding: 20,
              borderRadius: 10,
              background: "#fee2e2",
              color: "#991b1b",
            }}
          >
            Erreur Supabase : {errorMessage}
          </div>
        ) : orders.length === 0 ? (
          <div
            style={{
              padding: 40,
              borderRadius: 12,
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              textAlign: "center",
            }}
          >
            Aucune commande pour le moment.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 18,
            }}
          >
            {orders.map((order) => (
              <article
                key={order.id}
                style={{
                  padding: 20,
                  background: "#ffffff",
                  border: "1px solid #e2e8f0",
                  borderRadius: 12,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 20,
                    flexWrap: "wrap",
                    marginBottom: 16,
                  }}
                >
                  <div>
                    <h2
                      style={{
                        margin: "0 0 6px",
                        fontSize: 20,
                      }}
                    >
                      {order.first_name}{" "}
                      {order.last_name}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                      }}
                    >
                      {order.email}
                    </p>
                  </div>

                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <strong>
                      {formatPrice(order.total)}
                    </strong>

                    <p
                      style={{
                        margin: "4px 0 0",
                        color: "#64748b",
                        fontSize: 13,
                      }}
                    >
                      {formatDate(order.created_at)}
                    </p>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: 16,
                    paddingTop: 16,
                    borderTop: "1px solid #e2e8f0",
                  }}
                >
                  <div>
                    <strong>Produit</strong>
                    <p>{order.product_name}</p>
                  </div>

                  <div>
                    <strong>Quantité</strong>
                    <p>{order.quantity}</p>
                  </div>

                  <div>
                    <strong>Livraison</strong>
                    <p>
                      {formatPrice(order.shipping)}
                    </p>
                  </div>

                  <div>
                    <strong>Statut</strong>

                    <div style={{ marginTop: 8 }}>
                      <OrderStatus
                        orderId={order.id}
                        currentStatus={order.status}
                      />
                      <Link
                        href={`/admin/orders/${order.id}/bon-livraison`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          marginTop: 10,
                          marginRight: 10,
                          padding: "9px 14px",
                          borderRadius: 8,
                          background: "#082760",
                          color: "#ffffff",
                          textDecoration: "none",
                          fontSize: 13,
                          fontWeight: 800,
                        }}
                      >
                        Bon de livraison
                      </Link>
                      <DeleteOrderButton orderId={order.id} />
                    </div>
                  </div>

                  <div>
                    <strong>Téléphone</strong>
                    <p>{order.phone ?? "-"}</p>
                  </div>

                  <div>
                    <strong>Adresse</strong>

                    <p>
                      {order.address}
                      <br />
                      {order.postal_code}{" "}
                      {order.city}
                      <br />
                      {order.country}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}