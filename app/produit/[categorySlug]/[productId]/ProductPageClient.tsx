"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Heart,
  LockKeyhole,
  Minus,
  Plus,
  RefreshCcw,
  ShoppingBag,
  Truck,
  Zap,
} from "lucide-react";
import {
  type MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { catalogBySlug } from "../../../lib/catalog";

import styles from "./page.module.css";

type ProductColor = {
  id: string;
  label: string;
  className: string;
};

export type ProductPageProduct = {
  id: string;
  categorySlug: string;

  name: string;
  shortName?: string;

  description: string;

  price: number;
  oldPrice?: number | null;

  images: string[];

  sizes: string[];
  sizeType: "pointure" | "taille" | null;
  colors: ProductColor[];

  stock: number;

  rating: number;
  reviewCount: number;

  badge?: string;

  features: string[];
};

type ProductPageClientProps = {
  product: ProductPageProduct;
};

type CartItem = {
  id: string;
  categorySlug?: string;
  name: string;
  price: string;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function readCart(): CartItem[] {
  const savedCart = localStorage.getItem("sbi-cart");

  if (!savedCart) {
    return [];
  }

  try {
    const parsedCart: unknown = JSON.parse(savedCart);

    return Array.isArray(parsedCart)
      ? (parsedCart as CartItem[])
      : [];
  } catch {
    return [];
  }
}

export default function ProductPageClient({
  product,
}: ProductPageClientProps) {
  const router = useRouter();

  const catalogCategory = useMemo(
    () => catalogBySlug.get(product.categorySlug),
    [product.categorySlug],
  );

  const availableImages = useMemo(
    () => product.images.filter(Boolean),
    [product.images],
  );

  const firstImage = availableImages[0] ?? "";

  const [selectedImage, setSelectedImage] =
    useState(firstImage);

  const [selectedSize, setSelectedSize] = useState<
    string | undefined
  >(product.sizes[0]);

  const [selectedColor, setSelectedColor] =
    useState<string>(product.colors[0]?.id ?? "");

  const [quantity, setQuantity] = useState(
  product.stock > 0 ? 1 : 0,
);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    setSelectedImage(firstImage);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]?.id ?? "");
    setQuantity(product.stock > 0 ? 1 : 0);
    setIsZooming(false);
    setZoomPosition({
      x: 50,
      y: 50,
    });
  }, [
    firstImage,
    product.id,
    product.colors,
    product.sizes,
  ]);

  const selectedColorData = useMemo(
    () =>
      product.colors.find(
        (color) => color.id === selectedColor,
      ) ?? product.colors[0],
    [product.colors, selectedColor],
  );

  const displayedImage = selectedImage || firstImage;

  const maximumQuantity = Math.max(
  0,
  product.stock ?? 0,
);

  const decreaseQuantity = useCallback(() => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    );
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity((currentQuantity) =>
      Math.min(
        maximumQuantity,
        currentQuantity + 1,
      ),
    );
  }, [maximumQuantity]);

  const handleZoomMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      if (!displayedImage) {
        return;
      }

      const bounds =
        event.currentTarget.getBoundingClientRect();

      const x =
        ((event.clientX - bounds.left) /
          bounds.width) *
        100;

      const y =
        ((event.clientY - bounds.top) /
          bounds.height) *
        100;

      setZoomPosition({
        x: Math.max(0, Math.min(100, x)),
        y: Math.max(0, Math.min(100, y)),
      });
    },
    [displayedImage],
  );

  const handleAddToCart = useCallback(() => {
    if (!displayedImage) {
      setCartMessage(
        "Aucune image disponible pour ce produit.",
      );

      return;
    }

    const cart = readCart();

    const newProduct: CartItem = {
      id: product.id,
      categorySlug: product.categorySlug,
      name: product.name,
      price: product.price.toFixed(2),
      image: displayedImage,
      size: selectedSize,
      color: selectedColorData?.label,
      quantity,
    };

    const existingProduct = cart.find(
      (item) =>
        item.id === newProduct.id &&
        item.categorySlug ===
          newProduct.categorySlug &&
        item.size === newProduct.size &&
        item.color === newProduct.color,
    );

    if (existingProduct) {
      existingProduct.quantity = Math.min(
        maximumQuantity,
        existingProduct.quantity + quantity,
      );
    } else {
      cart.push(newProduct);
    }

    localStorage.setItem(
      "sbi-cart",
      JSON.stringify(cart),
    );

    window.dispatchEvent(
      new Event("sbi-cart-updated"),
    );

    setCartMessage(
      `${quantity} article${
        quantity > 1 ? "s" : ""
      } ajouté${quantity > 1 ? "s" : ""} au panier`,
    );

    window.setTimeout(() => {
      setCartMessage("");
    }, 3000);
  }, [
    displayedImage,
    maximumQuantity,
    product.categorySlug,
    product.id,
    product.name,
    product.price,
    quantity,
    selectedColorData?.label,
    selectedSize,
  ]);

  const handleBuyNow = useCallback(() => {
    if (!displayedImage) {
      setCartMessage(
        "Aucune image disponible pour ce produit.",
      );

      return;
    }

    const checkoutProduct = {
      id: product.id,
      categorySlug: product.categorySlug,
      name: product.name,
      image: displayedImage,
      price: product.price,
      size: selectedSize,
      color: selectedColorData?.label,
      colorId: selectedColor,
      quantity,
    };

    localStorage.setItem(
      "checkoutProduct",
      JSON.stringify(checkoutProduct),
    );

    router.push("/checkout");
  }, [
    displayedImage,
    product.categorySlug,
    product.id,
    product.name,
    product.price,
    quantity,
    router,
    selectedColor,
    selectedColorData?.label,
    selectedSize,
  ]);

  const displayedStars = "★".repeat(
    Math.max(
      0,
      Math.min(5, Math.round(product.rating)),
    ),
  );

  const emptyStars = "☆".repeat(
    Math.max(
      0,
      5 -
        Math.max(
          0,
          Math.min(5, Math.round(product.rating)),
        ),
    ),
  );

  const categoryLabel =
    product.shortName ??
    catalogCategory?.productPrefix ??
    product.name;

  const parentHref =
    catalogCategory?.parentHref ?? "/";

  const parentLabel =
    parentHref === "/homme"
      ? "Homme"
      : parentHref === "/femme"
        ? "Femme"
        : parentHref === "/enfant"
          ? "Enfant"
          : parentHref === "/parfum"
            ? "Parfum"
            : parentHref === "/mobilite"
              ? "Mobilité"
              : "Collection";

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav
          className={styles.breadcrumb}
          aria-label="Fil d’Ariane"
        >
          <Link href="/">Accueil</Link>

          <span>/</span>

          <Link href={parentHref}>
            {parentLabel}
          </Link>

          <span>/</span>

          <Link
            href={`/produits/${product.categorySlug}`}
          >
            {categoryLabel}
          </Link>

          <span>/</span>

          <span>{product.name}</span>
        </nav>

        <section className={styles.productLayout}>
          <div
            className={styles.thumbnails}
            aria-label="Images du produit"
          >
            {availableImages.map((image, index) => {
              const isActive =
                displayedImage === image;

              return (
                <button
                  key={`${image}-${index}`}
                  type="button"
                  className={`${
                    styles.thumbnailButton
                  } ${
                    isActive
                      ? styles.thumbnailActive
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedImage(image);
                    setIsZooming(false);
                    setZoomPosition({
                      x: 50,
                      y: 50,
                    });
                  }}
                  aria-label={`Afficher la vue ${
                    index + 1
                  }`}
                >
                 <Image
  src={image}
  alt={`${product.name} - Vue ${index + 1}`}
  width={82}
  height={82}
  unoptimized
/>
                </button>
              );
            })}
          </div>

          <div
            className={styles.mainImageBox}
            onMouseEnter={() => {
              if (displayedImage) {
                setIsZooming(true);
              }
            }}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleZoomMove}
          >
            {product.badge && (
              <span className={styles.newBadge}>
                {product.badge}
              </span>
            )}

            {displayedImage ? (
              <>
              <Image
  key={displayedImage}
  src={displayedImage}
  alt={product.name}
  width={900}
  height={900}
  priority
  unoptimized
  className={`${styles.mainProductImage} ${
    isZooming ? styles.imageHidden : ""
  }`}
/>

                {isZooming && (
                  <div
                    className={styles.zoomLayer}
                    style={{
                      backgroundImage: `url("${displayedImage}")`,
                      backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }}
                    aria-hidden="true"
                  />
                )}
              </>
            ) : (
              <div
                style={{
                  minHeight: 480,
                  display: "grid",
                  placeItems: "center",
                  color: "#64748b",
                  textAlign: "center",
                  padding: 30,
                }}
              >
                Image du produit indisponible
              </div>
            )}
          </div>

          <div className={styles.productInfo}>
            <h1 className={styles.title}>
              {product.name}
            </h1>

            <div className={styles.rating}>
              <span className={styles.stars}>
                {displayedStars}
                {emptyStars}
              </span>

              <span className={styles.reviewCount}>
                ({product.reviewCount} avis)
              </span>
            </div>

            <p className={styles.price}>
              {formatPrice(product.price)}
            </p>

            {product.oldPrice &&
              product.oldPrice > product.price && (
                <p
                  style={{
                    marginTop: -8,
                    color: "#94a3b8",
                    textDecoration: "line-through",
                  }}
                >
                  {formatPrice(product.oldPrice)}
                </p>
              )}

            <p className={styles.description}>
              {product.description}
            </p>

            <div className={styles.separator} />

            {product.colors.length > 0 && (
              <>
                <h2 className={styles.optionTitle}>
                  COULEUR :
                  <span>
                    {" "}
                    {selectedColorData?.label}
                  </span>
                </h2>

                <div className={styles.colors}>
                  {product.colors.map((color) => {
                    const colorStyle =
                      styles[color.className] ?? "";

                    return (
                      <button
                        key={color.id}
                        type="button"
                        aria-label={color.label}
                        title={color.label}
                        className={`${
                          styles.colorButton
                        } ${colorStyle} ${
                          selectedColor === color.id
                            ? styles.colorActive
                            : ""
                        }`}
                        onClick={() =>
                          setSelectedColor(color.id)
                        }
                      />
                    );
                  })}
                </div>
              </>
            )}

            {product.sizes.length > 0 && (
              <>
                <div className={styles.sizeHeading}>
                  <h2
                    className={styles.optionTitle}
                  >
                    {product.sizeType === "pointure"
                      ? "POINTURE :"
                      : "TAILLE :"}
                  </h2>

                  <Link
                    href="/tableau-des-tailles"
                    className={styles.sizeGuide}
                  >
                    Tableau des tailles
                  </Link>
                </div>

                <div className={styles.sizes}>
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      className={`${
                        styles.sizeButton
                      } ${
                        selectedSize === size
                          ? styles.sizeActive
                          : ""
                      }`}
                      onClick={() =>
                        setSelectedSize(size)
                      }
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </>
            )}

            <div className={styles.quantitySection}>
              <h2 className={styles.optionTitle}>
                QUANTITÉ :
              </h2>

              <div className={styles.quantity}>
                <button
                  type="button"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                  aria-label="Diminuer la quantité"
                >
                  <Minus size={17} />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >= maximumQuantity ||
                    product.stock <= 0
                  }
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

            {product.stock <= 0 && (
              <p
                style={{
                  marginTop: 12,
                  fontWeight: 700,
                  color: "#dc2626",
                }}
              >
            Rupture de stock
              </p>
            )}

            {cartMessage && (
              <div
                className={styles.cartMessage}
                role="status"
                aria-live="polite"
              >
                {cartMessage}
              </div>
            )}

            <div className={styles.actions}>
              <button
                type="button"
                className={styles.addToCart}
                onClick={handleAddToCart}
                disabled={
                  product.stock <= 0 ||
                  !displayedImage
                }
              >
                <ShoppingBag size={18} />
                Ajouter au panier
              </button>

              <button
                type="button"
                className={styles.favoriteButton}
                onClick={() =>
                  setIsFavorite(
                    (current) => !current,
                  )
                }
                aria-label={
                  isFavorite
                    ? "Retirer des favoris"
                    : "Ajouter aux favoris"
                }
              >
                <Heart
                  size={22}
                  fill={
                    isFavorite
                      ? "currentColor"
                      : "none"
                  }
                />
              </button>

              <button
                type="button"
                className={styles.buyNow}
                onClick={handleBuyNow}
                disabled={
                  product.stock <= 0 ||
                  !displayedImage
                }
              >
                Acheter maintenant
              </button>
            </div>

            <div className={styles.services}>
              <div>
                <Truck size={22} />

                <span>
                  Livraison rapide
                  <small>24 à 72 h</small>
                </span>
              </div>

              <div>
                <RefreshCcw size={22} />

                <span>
                  Retour gratuit
                  <small>14 jours</small>
                </span>
              </div>

              <div>
                <LockKeyhole size={22} />

                <span>
                  Paiement sécurisé
                  <small>100 % sécurisé</small>
                </span>
              </div>
            </div>

            <div
              style={{
                marginTop: 24,
                padding: 18,
                border: "1px solid #e2e8f0",
                borderRadius: 10,
                background: "#fafafa",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  fontWeight: 700,
                  color: "#0a1931",
                }}
              >
                <Zap size={18} />
                Pourquoi choisir SBI PARIS ?
              </div>

              <ul
                style={{
                  marginTop: 14,
                  paddingLeft: 18,
                  color: "#475569",
                  lineHeight: 1.8,
                }}
              >
                {product.features.map((feature) => (
                  <li key={feature}>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}