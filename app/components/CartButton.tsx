"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import styles from "./Header.module.css";

export default function CartButton({ label }: { label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const update = () => {
      try {
        const raw = localStorage.getItem("sbi-cart");
        const cart: Array<{ quantity?: number }> = raw
          ? JSON.parse(raw)
          : [];

        setCount(
          cart.reduce((sum, item) => sum + (item.quantity ?? 1), 0)
        );
      } catch {
        setCount(0);
      }
    };

    update();

    window.addEventListener("sbi-cart-updated", update);
    window.addEventListener("storage", update);

    return () => {
      window.removeEventListener("sbi-cart-updated", update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return (
    <Link
      href="/cart"
      aria-label={`${label} (${count})`}
      className={`${styles.iconButton} ${styles.cartButton}`}
    >
      <ShoppingBag size={30} strokeWidth={1.8} />

      {count > 0 && (
        <span className={styles.cartCount}>
          {count}
        </span>
      )}
    </Link>
  );
}
