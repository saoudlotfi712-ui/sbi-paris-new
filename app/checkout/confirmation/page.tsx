"use client";

import Link from "next/link";
import { CheckCircle, Package, Truck } from "lucide-react";
import { useEffect, useState } from "react";

import styles from "./page.module.css";

type OrderProduct = {
  name: string;
  price: number;
  size: number;
  color: string;
  quantity: number;
};

export default function ConfirmationPage() {
  const [product, setProduct] =
    useState<OrderProduct | null>(null);

  const [orderNumber, setOrderNumber] =
    useState("");

  const [orderDate, setOrderDate] =
    useState("");

  useEffect(() => {
    const savedProduct =
      localStorage.getItem("checkoutProduct");

    if (savedProduct) {
      setProduct(JSON.parse(savedProduct));
    }

    let savedOrder =
      localStorage.getItem("sbi-order-number");

    if (!savedOrder) {
      savedOrder = `SBI-${Math.floor(
        100000 + Math.random() * 900000
      )}`;

      localStorage.setItem(
        "sbi-order-number",
        savedOrder
      );
    }

    setOrderNumber(savedOrder);

    setOrderDate(
      new Intl.DateTimeFormat("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }).format(new Date())
    );

    localStorage.removeItem("checkoutProduct");
  }, []);

  const total =
    product
      ? product.price * product.quantity
      : 0;

  return (
    <main className={styles.page}>
      <div className={styles.container}>

        <div className={styles.successIcon}>
          <CheckCircle size={70} />
        </div>

        <h1>
          Merci pour votre commande !
        </h1>

        <p className={styles.message}>
          Votre commande a été enregistrée avec succès.
          Vous recevrez bientôt toutes les informations
          concernant votre livraison.
        </p>


        <div className={styles.orderBox}>

          <h2>
            Détails de la commande
          </h2>


          <p>
            Numéro de commande :
            <strong>
              {" "}
              {orderNumber}
            </strong>
          </p>


          <p>
            Date :
            <strong>
              {" "}
              {orderDate}
            </strong>
          </p>


          {product && (
            <div className={styles.product}>

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
                Quantité : {product.quantity}
              </p>

              <strong>
                {total.toFixed(2)} €
              </strong>

            </div>
          )}

        </div>


        <div className={styles.infoCards}>

          <div>
            <Truck size={28} />

            <h3>
              Livraison
            </h3>

            <p>
              Votre colis sera livré rapidement
              à l'adresse indiquée.
            </p>
          </div>


          <div>
            <Package size={28} />

            <h3>
              Préparation
            </h3>

            <p>
              Notre équipe prépare votre commande
              avec soin.
            </p>
          </div>

        </div>


        <Link
          href="/"
          className={styles.button}
        >
          Continuer mes achats
        </Link>


      </div>
    </main>
  );
}
