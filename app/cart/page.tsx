"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import styles from "./page.module.css";

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
  size?: number;
  color?: string;
};

const FREE_DELIVERY_FROM = 200;
const DELIVERY_PRICE = 29;

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const saved =
      localStorage.getItem("sbi-cart");

    if (saved) {
      setCart(JSON.parse(saved));
    }
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
      cart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };


  const decrease = (id: string) => {
    updateCart(
      cart.map((item) =>
        item.id === id &&
        item.quantity > 1
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item,
      ),
    );
  };


  const removeItem = (id: string) => {
    updateCart(
      cart.filter(
        (item) => item.id !== id,
      ),
    );
  };


  const subtotal = useMemo(() => {
    return cart.reduce(
      (total, item) =>
        total +
        Number(item.price) *
          item.quantity,
      0,
    );
  }, [cart]);


  const delivery =
    subtotal >= FREE_DELIVERY_FROM ||
    subtotal === 0
      ? 0
      : DELIVERY_PRICE;


  const total =
    subtotal + delivery;


  if (cart.length === 0) {
    return (
      <main className={styles.empty}>
        <h1>
          Votre panier est vide
        </h1>

        <Link href="/">
          Continuer mes achats
        </Link>
      </main>
    );
  }


  return (
    <main className={styles.page}>

      <div className={styles.container}>

        <h1>
          Votre panier
        </h1>


        <div className={styles.layout}>


          <section className={styles.items}>

            {cart.map((item) => (

              <article
                key={item.id}
                className={styles.item}
              >

                <Image
                  src={item.image}
                  alt={item.name}
                  width={120}
                  height={120}
                />


                <div className={styles.details}>

                  <h2>
                    {item.name}
                  </h2>

                  {item.size && (
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
                    {item.price} €
                  </strong>


                  <div className={styles.quantity}>

                    <button
                      type="button"
                      onClick={() =>
                        decrease(item.id)
                      }
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
                    >
                      <Plus size={16} />
                    </button>


                  </div>

                </div>


                <button
                  type="button"
                  className={styles.delete}
                  onClick={() =>
                    removeItem(item.id)
                  }
                  aria-label="Supprimer"
                >
                  <Trash2 size={20} />
                </button>


              </article>

            ))}

          </section>



          <aside className={styles.summary}>

            <h2>
              Résumé
            </h2>


            <div>
              Sous-total:
              <strong>
                {subtotal.toFixed(2)} €
              </strong>
            </div>


            <div>
              Livraison:
              <strong>
                {delivery === 0
                  ? "Gratuite"
                  : `${delivery} €`}
              </strong>
            </div>


            <hr />


            <h3>
              Total:
              <span>
                {total.toFixed(2)} €
              </span>
            </h3>


            <Link
              href="/checkout"
              className={styles.checkout}
            >
              Passer la commande
            </Link>


          </aside>


        </div>

      </div>

    </main>
  );
}
