"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

type CartItem = {
  id: string;
  name: string;
  price: string;
  image?: string;
  quantity: number;
  size?: number;
  color?: string;
  stock?: number;
};

type ProductStock = {
  id: string;
  stock: number | null;
  is_active: boolean | null;
};

const FREE_DELIVERY_FROM = 200;
const DELIVERY_PRICE = 29;

function readSavedCart(): CartItem[] {
  const saved = localStorage.getItem("sbi-cart");

  if (!saved) {
    return [];
  }

  try {
    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter(
      (item): item is CartItem =>
        typeof item === "object" &&
        item !== null &&
        "id" in item &&
        "name" in item &&
        "price" in item &&
        "quantity" in item,
    );
  } catch {
    return [];
  }
}

function getNumericPrice(price: string): number {
  const normalized = price
    .replace(/\s/g, "")
    .replace("€", "")
    .replace(",", ".");

  const value = Number.parseFloat(normalized);

  return Number.isFinite(value) ? value : 0;
}

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stockError, setStockError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadCartWithStock() {
      const savedCart = readSavedCart();

      if (savedCart.length === 0) {
        if (mounted) {
          setCart([]);
          setLoading(false);
        }

        return;
      }

      const productIds = [
        ...new Set(
          savedCart.map((item) => item.id),
        ),
      ];

      const { data, error } = await supabase
        .from("products")
        .select("id, stock, is_active")
        .in("id", productIds);

      if (!mounted) {
        return;
      }

      if (error) {
        console.error(
          "Erreur chargement stock :",
          error,
        );

        setCart(savedCart);
        setStockError(
          "Impossible de vérifier le stock pour le moment.",
        );
        setLoading(false);
        return;
      }

      const products =
        (data ?? []) as ProductStock[];

      const stockMap = new Map(
        products.map((product) => [
          product.id,
          product.is_active === false
            ? 0
            : Math.max(0, product.stock ?? 0),
        ]),
      );

      const updatedCart = savedCart.map((item) => {
        const stock = stockMap.get(item.id) ?? 0;

        return {
          ...item,
          stock,
          quantity:
            stock > 0
              ? Math.min(
                  Math.max(1, item.quantity),
                  stock,
                )
              : 0,
        };
      });

      setCart(updatedCart);

      localStorage.setItem(
        "sbi-cart",
        JSON.stringify(updatedCart),
      );

      window.dispatchEvent(
        new Event("sbi-cart-updated"),
      );

      setLoading(false);
    }

    void loadCartWithStock();

    return () => {
      mounted = false;
    };
  }, []);

  const updateCart = (newCart: CartItem[]) => {
    setCart(newCart);

    localStorage.setItem(
      "sbi-cart",
      JSON.stringify(newCart),
    );

    window.dispatchEvent(
      new Event("sbi-cart-updated"),
    );
  };

  const increase = (id: string) => {
    updateCart(
      cart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const stock = item.stock ?? 0;

        if (
          stock <= 0 ||
          item.quantity >= stock
        ) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity + 1,
        };
      }),
    );
  };

  const decrease = (id: string) => {
    updateCart(
      cart.map((item) => {
        if (item.id !== id) {
          return item;
        }

        if (item.quantity <= 1) {
          return item;
        }

        return {
          ...item,
          quantity: item.quantity - 1,
        };
      }),
    );
  };

  const removeItem = (id: string) => {
    updateCart(
      cart.filter((item) => item.id !== id),
    );
  };

  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        getNumericPrice(item.price) *
          item.quantity,
      0,
    );
  }, [cart]);

  const delivery =
    subtotal >= FREE_DELIVERY_FROM ||
    subtotal === 0
      ? 0
      : DELIVERY_PRICE;

  const total = subtotal + delivery;

  const hasUnavailableProduct = cart.some(
    (item) =>
      (item.stock ?? 0) <= 0 ||
      item.quantity <= 0,
  );

  if (loading) {
    return (
      <main className={styles.empty}>
        <h1>Chargement du panier...</h1>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className={styles.empty}>
        <h1>Votre panier est vide</h1>

        <Link href="/">
          Continuer mes achats
        </Link>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <h1>Votre panier</h1>

        {stockError && (
          <div
            style={{
              marginBottom: 20,
              padding: 14,
              borderRadius: 8,
              background: "#fee2e2",
              color: "#991b1b",
              fontWeight: 600,
            }}
          >
            {stockError}
          </div>
        )}

        <div className={styles.layout}>
          <section className={styles.items}>
            {cart.map((item) => {
              const stock = item.stock ?? 0;
              const outOfStock = stock <= 0;

              return (
                <article
                  key={`${item.id}-${item.size ?? "no-size"}-${item.color ?? "no-color"}`}
                  className={styles.item}
                >
                  {item.image?.trim() ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={120}
                      height={120}
                      unoptimized
                    />
                  ) : (
                    <div
                      style={{
                        width: 120,
                        height: 120,
                        display: "grid",
                        placeItems: "center",
                        background: "#f1f5f9",
                        color: "#64748b",
                        borderRadius: 8,
                        fontSize: 12,
                        textAlign: "center",
                        padding: 8,
                        flexShrink: 0,
                      }}
                    >
                      Image indisponible
                    </div>
                  )}

                  <div className={styles.details}>
                    <h2>{item.name}</h2>

                    {item.size !== undefined && (
                      <p>
                        Taille : {item.size}
                      </p>
                    )}

                    {item.color && (
                      <p>
                        Couleur : {item.color}
                      </p>
                    )}

                    <strong>
                      {getNumericPrice(
                        item.price,
                      ).toFixed(2)}{" "}
                      €
                    </strong>

                    {outOfStock ? (
                      <p
                        style={{
                          marginTop: 12,
                          marginBottom: 0,
                          color: "#dc2626",
                          fontWeight: 700,
                        }}
                      >
                        Rupture de stock
                      </p>
                    ) : (
                      <>
                        <p
                          style={{
                            marginTop: 10,
                            marginBottom: 8,
                            color: "#64748b",
                            fontSize: 13,
                          }}
                        >
                          Stock disponible : {stock}
                        </p>

                        <div
                          className={styles.quantity}
                        >
                          <button
                            type="button"
                            onClick={() =>
                              decrease(item.id)
                            }
                            disabled={
                              item.quantity <= 1
                            }
                            aria-label="Diminuer la quantité"
                          >
                            <Minus size={16} />
                          </button>

                          <span>
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increase(item.id)
                            }
                            disabled={
                              item.quantity >= stock
                            }
                            aria-label="Augmenter la quantité"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        {item.quantity >= stock && (
                          <p
                            style={{
                              marginTop: 8,
                              marginBottom: 0,
                              color: "#64748b",
                              fontSize: 12,
                            }}
                          >
                            Quantité maximale atteinte
                          </p>
                        )}
                      </>
                    )}
                  </div>

                  <button
                    type="button"
                    className={styles.delete}
                    onClick={() =>
                      removeItem(item.id)
                    }
                    aria-label={`Supprimer ${item.name}`}
                  >
                    <Trash2 size={20} />
                  </button>
                </article>
              );
            })}
          </section>

          <aside className={styles.summary}>
            <h2>Résumé</h2>

            <div>
              <span>Sous-total :</span>

              <strong>
                {subtotal.toFixed(2)} €
              </strong>
            </div>

            <div>
              <span>Livraison :</span>

              <strong>
                {delivery === 0
                  ? "Gratuite"
                  : `${delivery.toFixed(2)} €`}
              </strong>
            </div>

            <hr />

            <h3>
              Total :

              <span>
                {total.toFixed(2)} €
              </span>
            </h3>

            {hasUnavailableProduct ? (
              <div
                style={{
                  marginTop: 16,
                  padding: 14,
                  borderRadius: 8,
                  background: "#fee2e2",
                  color: "#991b1b",
                  fontWeight: 700,
                  textAlign: "center",
                }}
              >
                Retirez les produits en rupture de
                stock avant de commander.
              </div>
            ) : (
              <Link
                href="/checkout"
                className={styles.checkout}
                onClick={() => {
                  if (cart.length === 1) {
                    const item = cart[0];

                    localStorage.setItem(
                      "checkoutProduct",
                      JSON.stringify({
                        id: item.id,
                        name: item.name,
                        image: item.image ?? "",
                        price: getNumericPrice(
                          item.price,
                        ),
                        size: item.size,
                        color: item.color,
                        quantity: item.quantity,
                      }),
                    );
                  }
                }}
              >
                Passer la commande
              </Link>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}