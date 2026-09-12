"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
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

  const [paymentMethod, setPaymentMethod] =
    useState("card");

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

  const handlePayment = () => {
    localStorage.setItem(
      "orderCompleted",
      "true"
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
            <p>Paiement</p>
          </div>

          <div className={styles.step}>
            <span>3</span>
            <p>Confirmation</p>
          </div>

        </div>


        <div className={styles.layout}>

          <section className={styles.paymentBox}>

            <h1>
              Paiement sécurisé
            </h1>

            <p className={styles.subtitle}>
              Choisissez votre moyen de paiement
            </p>


            <button
              type="button"
              className={
                paymentMethod === "card"
                  ? styles.methodActive
                  : styles.method
              }
              onClick={() =>
                setPaymentMethod("card")
              }
            >
              💳 Carte bancaire
            </button>


            {paymentMethod === "card" && (
              <div className={styles.cardForm}>

                <label>
                  Numéro de carte
                </label>

                <input
                  placeholder="1234 5678 9012 3456"
                />


                <div className={styles.grid}>

                  <div>
                    <label>
                      Date expiration
                    </label>

                    <input
                      placeholder="MM / AA"
                    />
                  </div>


                  <div>
                    <label>
                      Code sécurité
                    </label>

                    <input
                      placeholder="CVV"
                    />
                  </div>

                </div>


                <label>
                  Nom sur la carte
                </label>

                <input
                  placeholder="Nom complet"
                />

              </div>
            )}


            <button
              type="button"
              className={
                paymentMethod === "paypal"
                  ? styles.methodActive
                  : styles.method
              }
              onClick={() =>
                setPaymentMethod("paypal")
              }
            >
              PayPal
            </button>


            <button
              type="button"
              className={
                paymentMethod === "apple"
                  ? styles.methodActive
                  : styles.method
              }
              onClick={() =>
                setPaymentMethod("apple")
              }
            >
               Apple Pay
            </button>


            <button
              type="button"
              className={styles.payButton}
              onClick={handlePayment}
            >
              <span>
                Payer maintenant
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


            <div className={styles.secure}>
              🔒 Paiement 100% sécurisé
            </div>


          </aside>

        </div>

      </div>
    </main>
  );
}
