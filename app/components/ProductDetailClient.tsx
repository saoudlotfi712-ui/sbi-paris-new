"use client";

import { useMemo, useState } from "react";
import {
  Heart,
  Minus,
  Plus,
  Ruler,
  ShieldCheck,
  RefreshCcw,
  Truck,
  ShoppingBag,
  Zap,
} from "lucide-react";

import styles from "../produit/[id]/page.module.css";

type ProductDetailClientProps = {
  id: string;
  name: string;
  price: string;
  description: string;
  images: string[];
  colors: string[];
  sizes: number[];
};

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  color: string;
  size: number | null;
  quantity: number;
};

export default function ProductDetailClient({
  id,
  name,
  price,
  description,
  images,
  colors,
  sizes,
}: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(colors[0] ?? "Noir");
  const [selectedSize, setSelectedSize] = useState<number | null>(
    sizes[0] ?? null
  );
  const [quantity, setQuantity] = useState(1);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [added, setAdded] = useState(false);

  const currentImage = useMemo(
    () => images[selectedImage] ?? images[0] ?? "",
    [images, selectedImage]
  );

  function decreaseQuantity() {
    setQuantity((current) => Math.max(1, current - 1));
  }

  function increaseQuantity() {
    setQuantity((current) => current + 1);
  }

  function addToCart(goToCheckout = false) {
    try {
      const raw = window.localStorage.getItem("sbi-cart");
      const parsed = raw ? JSON.parse(raw) : [];
      const cart: CartItem[] = Array.isArray(parsed) ? parsed : [];

      const existing = cart.find(
        (item) =>
          item.id === id &&
          item.color === selectedColor &&
          item.size === selectedSize
      );

      if (existing) {
        existing.quantity += quantity;
      } else {
        cart.push({
          id,
          name,
          price,
          image: currentImage,
          color: selectedColor,
          size: selectedSize,
          quantity,
        });
      }

      window.localStorage.setItem("sbi-cart", JSON.stringify(cart));
      window.dispatchEvent(new Event("sbi-cart-updated"));

      setAdded(true);
      window.setTimeout(() => setAdded(false), 1500);

      if (goToCheckout) {
        window.location.href = "/checkout";
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout au panier :", error);
    }
  }

  return (
    <>
      <section className={styles.productLayout}>
        <div className={styles.gallery}>
          <div className={styles.thumbnails}>
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                className={`${styles.thumbnailButton} ${
                  selectedImage === index ? styles.thumbnailActive : ""
                }`}
                onClick={() => setSelectedImage(index)}
                aria-label={`Afficher l’image ${index + 1}`}
              >
                <img src={image} alt="" />
              </button>
            ))}
          </div>

          <div className={styles.mainImageBox}>
            <span className={styles.badge}>Nouveau</span>

            {currentImage ? (
              <img
                src={currentImage}
                alt={name}
                className={styles.mainImage}
              />
            ) : (
              <div className={styles.imagePlaceholder}>SBI PARIS</div>
            )}
          </div>
        </div>

        <div className={styles.details}>
          <div className={styles.titleRow}>
            <div>
              <h1>{name}</h1>

              <div className={styles.rating}>
                <span>★★★★★</span>
                <small>(128 avis)</small>
              </div>
            </div>

            <button
              type="button"
              className={styles.favoriteButton}
              aria-label="Ajouter aux favoris"
            >
              <Heart size={23} strokeWidth={1.7} />
            </button>
          </div>

          <p className={styles.productPrice}>{price}</p>
          <p className={styles.taxText}>Taxes incluses.</p>
          <p className={styles.description}>{description}</p>

          <div className={styles.divider} />

          <div className={styles.optionBlock}>
            <p className={styles.optionTitle}>
              Couleur : <strong>{selectedColor}</strong>
            </p>

            <div className={styles.colorList}>
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  title={color}
                  aria-label={`Choisir la couleur ${color}`}
                  onClick={() => setSelectedColor(color)}
                  className={`${styles.colorButton} ${
                    selectedColor === color ? styles.colorActive : ""
                  }`}
                  style={{
                    background:
                      color === "Noir"
                        ? "#111111"
                        : color === "Blanc"
                          ? "#ffffff"
                          : color === "Marron"
                            ? "#8b4513"
                            : "#d8d8d8",
                  }}
                />
              ))}
            </div>
          </div>

          {sizes.length > 0 && (
            <div className={styles.optionBlock}>
              <div className={styles.sizeHeader}>
                <p className={styles.optionTitle}>Taille</p>

                <button
                  type="button"
                  className={styles.sizeGuideButton}
                  onClick={() => setSizeGuideOpen((open) => !open)}
                >
                  <Ruler size={18} strokeWidth={1.7} />
                  Tableau des tailles
                </button>
              </div>

              <div className={styles.sizeGrid}>
                {sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`${styles.sizeButton} ${
                      selectedSize === size ? styles.sizeActive : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.optionBlock}>
            <p className={styles.optionTitle}>Quantité</p>

            <div className={styles.quantity}>
              <button
                type="button"
                onClick={decreaseQuantity}
                aria-label="Diminuer la quantité"
              >
                <Minus size={18} />
              </button>

              <span>{quantity}</span>

              <button
                type="button"
                onClick={increaseQuantity}
                aria-label="Augmenter la quantité"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.addButton}
              onClick={() => addToCart(false)}
            >
              <ShoppingBag size={20} strokeWidth={1.7} />
              {added ? "Ajouté au panier ✓" : "Ajouter au panier"}
            </button>

            <button
              type="button"
              className={styles.buyButton}
              onClick={() => addToCart(true)}
            >
              <Zap size={20} strokeWidth={1.8} />
              Acheter maintenant
            </button>
          </div>

          <div className={styles.services}>
            <div>
              <ShieldCheck size={24} strokeWidth={1.6} />
              <span>Paiement sécurisé</span>
            </div>

            <div>
              <RefreshCcw size={24} strokeWidth={1.6} />
              <span>Retours sous 14 jours</span>
            </div>

            <div>
              <Truck size={24} strokeWidth={1.6} />
              <span>Livraison rapide</span>
            </div>
          </div>
        </div>
      </section>

      {sizeGuideOpen && (
        <section className={styles.sizeGuide}>
          <div className={styles.sizeGuideTop}>
            <div>
              <h2>Tableau des tailles</h2>
              <p>Mesurez votre pied du talon jusqu’au bout du gros orteil.</p>
            </div>

            <button
              type="button"
              onClick={() => setSizeGuideOpen(false)}
              aria-label="Fermer le tableau des tailles"
            >
              ×
            </button>
          </div>

          <div className={styles.tableWrapper}>
            <table>
              <thead>
                <tr>
                  <th>Taille EU</th>
                  {sizes.map((size) => (
                    <th key={size}>{size}</th>
                  ))}
                </tr>
              </thead>

              <tbody>
                <tr>
                  <th>Longueur du pied (cm)</th>
                  {sizes.map((size) => (
                    <td key={size}>
                      {(24 + (size - 38) * 0.65).toFixed(1)}
                    </td>
                  ))}
                </tr>

                <tr>
                  <th>Longueur semelle (cm)</th>
                  {sizes.map((size) => (
                    <td key={size}>
                      {(25.5 + (size - 38) * 0.65).toFixed(1)}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      )}
    </>
  );
}
