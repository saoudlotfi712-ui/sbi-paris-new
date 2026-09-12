"use client";

import { useState } from "react";
import styles from "../produits/[slug]/page.module.css";

type AddToCartButtonProps = {
  productId: string;
  productName: string;
  productPrice?: string;
  productImage?: string;
  label: string;
  addedLabel: string;
};

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  quantity: number;
};

export default function AddToCartButton({
  productId,
  productName,
  productPrice = "0 €",
  productImage = "",
  label,
  addedLabel,
}: AddToCartButtonProps) {
  const [added, setAdded] = useState(false);

  function addToCart() {
    try {
      const raw = window.localStorage.getItem("sbi-cart");

      const parsedCart = raw ? JSON.parse(raw) : [];
      const cart: CartItem[] = Array.isArray(parsedCart)
        ? parsedCart
        : [];

      const existing = cart.find(
        (item) => item.id === productId
      );

      if (existing) {
        existing.quantity += 1;

        if (!existing.price) {
          existing.price = productPrice;
        }

        if (!existing.image) {
          existing.image = productImage;
        }
      } else {
        cart.push({
          id: productId,
          name: productName,
          price: productPrice,
          image: productImage,
          quantity: 1,
        });
      }

      window.localStorage.setItem(
        "sbi-cart",
        JSON.stringify(cart)
      );

      window.dispatchEvent(
        new Event("sbi-cart-updated")
      );

      window.dispatchEvent(
        new Event("sbi-cart-open")
      );

      setAdded(true);

      window.setTimeout(() => {
        setAdded(false);
      }, 1600);
    } catch (error) {
      console.error(
        "Erreur lors de l'ajout au panier :",
        error
      );
    }
  }

  return (
    <button
      type="button"
      className={styles.addToCart}
      onClick={addToCart}
    >
      {added ? addedLabel : label}
    </button>
  );
}
