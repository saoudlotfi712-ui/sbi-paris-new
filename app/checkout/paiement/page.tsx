"use client";

import Image from "next/image";
import {useRouter} from "next/navigation";
import {useEffect, useMemo, useState} from "react";
import styles from "./page.module.css";

type CheckoutProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
};

const DELIVERY_PRICE = 29;
const FREE_DELIVERY_FROM = 200;

export default function PaymentPage() {
  const router = useRouter();

  const [product, setProduct] =
    useState<CheckoutProduct | null>(null);

  useEffect(() => {
    const saved =
      localStorage.getItem("checkoutProduct");

    if (saved) {
      setProduct(JSON.parse(saved));
    }
  }, []);

  const subtotal = useMemo(() => {
    if (!product) return 0;

    return product.price * product.quantity;
  }, [product]);

  const shipping =
    subtotal >= FREE_DELIVERY_FROM
      ? 0
      : DELIVERY_PRICE;

  const total = subtotal + shipping;

  const handleConfirmation = () => {
    localStorage.setItem(
      "orderCompleted",
      "true",
    );

    router.push("/checkout/confirmation");
  };

  if (!product) {
    return (
      <main className={styles.loading}>
        Chargement...
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.steps}>
          <div className={styles.done}>
            <span>✓</span>
            <p>Livraison</p>
          </div>

          <div className={styles.active}>
            <span>2</span>
            <p>Validation</p>
          </div>

          <div className={styles.step}>
            <span>3</span>
            <p>Confirmation</p>
          </div>
        </div>

        <div className={styles.layout}>
          <section className={styles.paymentBox}>
            <h1>
              Validation de la commande
            </h1>

            <p className={styles.subtitle}>
              Vérifiez votre commande avant de la confirmer.
            </p>

            <p>
              Aucun paiement en ligne n&apos;est effectué
              à cette étape.
            </p>

            <button
              type="button"
              className={styles.payButton}
              onClick={handleConfirmation}
            >
              <span>
                Confirmer la commande
              </span>

              <strong>
                {total.toFixed(2)} €
              </strong>
            </button>
          </section>

          <aside className={styles.summary}>
            <h2>
              Résumé de commande
            </h2>

            <div className={styles.product}>
              <Image
                src={product.image}
                alt={product.name}
                width={90}
                height={90}
              />

              <div>
                <h3>
                  {product.name}
                </h3>

                <p>
                  Taille : {product.size}
                </p>

                <p>
                  Couleur : {product.color}
                </p>

                <p>
                  Qté : {product.quantity}
                </p>
              </div>
            </div>

            <div className={styles.line}>
              <span>
                Sous-total
              </span>

              <strong>
                {subtotal.toFixed(2)} €
              </strong>
            </div>

            <div className={styles.line}>
              <span>
                Livraison
              </span>

              <strong>
                {shipping === 0
                  ? "Gratuite"
                  : `${shipping} €`}
              </strong>
            </div>

            <div className={styles.total}>
              <span>
                Total
              </span>

              <strong>
                {total.toFixed(2)} €
              </strong>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}