"use client";

import Image from "next/image";
import Link from "next/link";
import {
  useParams,
  useRouter,
} from "next/navigation";
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
  useMemo,
  useState,
} from "react";

import { catalogBySlug } from "../../../lib/catalog";
import { getProductById } from "../../../lib/products";

import styles from "./page.module.css";

type CartItem = {
  id: string;
  name: string;
  price: string;
  image: string;
  size?: number;
  color?: string;
  quantity: number;
};

function getRouteValue(
  value: string | string[] | undefined,
): string {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}

function formatPrice(price: number): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

export default function ProductPage() {
  const router = useRouter();

  const params = useParams<{
    categorySlug: string | string[];
    productId: string | string[];
  }>();

  const categorySlug = getRouteValue(
    params.categorySlug,
  );

  const productId = getRouteValue(params.productId);

  const product = useMemo(
    () => getProductById(categorySlug, productId),
    [categorySlug, productId],
  );

  const catalogCategory = useMemo(
    () => catalogBySlug.get(categorySlug),
    [categorySlug],
  );

  const [selectedImage, setSelectedImage] = useState(
    product?.images[0] ?? "",
  );

  const [selectedSize, setSelectedSize] = useState<
    number | undefined
  >(product?.sizes[0]);

  const [selectedColor, setSelectedColor] =
    useState<string>(
      product?.colors[0]?.id ?? "",
    );

  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const [zoomPosition, setZoomPosition] = useState({
    x: 50,
    y: 50,
  });

  const selectedColorData = useMemo(
    () =>
      product?.colors.find(
        (color) => color.id === selectedColor,
      ) ??
      product?.colors[0],
    [product, selectedColor],
  );

  const decreaseQuantity = useCallback(() => {
    setQuantity((currentQuantity) =>
      Math.max(1, currentQuantity - 1),
    );
  }, []);

  const increaseQuantity = useCallback(() => {
    setQuantity((currentQuantity) =>
      Math.min(
        product?.stock ?? 10,
        currentQuantity + 1,
      ),
    );
  }, [product?.stock]);

  const handleZoomMove = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
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
    [],
  );

  const handleAddToCart = useCallback(() => {
    if (!product || !selectedImage) {
      return;
    }

    const savedCart =
      localStorage.getItem("sbi-cart");

    let cart: CartItem[] = [];

    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          cart = parsedCart;
        }
      } catch {
        cart = [];
      }
    }

    const newProduct: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price.toFixed(2),
      image: selectedImage,
      size: selectedSize,
      color: selectedColorData?.label,
      quantity,
    };

    const existingProduct = cart.find(
      (item) =>
        item.id === newProduct.id &&
        item.size === newProduct.size &&
        item.color === newProduct.color,
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
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
    product,
    quantity,
    selectedColorData,
    selectedImage,
    selectedSize,
  ]);

  const handleBuyNow = useCallback(() => {
    if (!product || !selectedImage) {
      return;
    }

    const checkoutProduct = {
      id: product.id,
      categorySlug: product.categorySlug,
      name: product.name,
      image: selectedImage,
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
    product,
    quantity,
    router,
    selectedColor,
    selectedColorData,
    selectedImage,
    selectedSize,
  ]);

  if (!product) {
    return (
      <main className={styles.page}>
        <div className={styles.container}>
          <div
            style={{
              maxWidth: 620,
              margin: "80px auto",
              padding: 32,
              textAlign: "center",
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 14,
            }}
          >
            <h1
              style={{
                marginBottom: 12,
                color: "#0a1931",
              }}
            >
              Produit introuvable
            </h1>

            <p
              style={{
                marginBottom: 24,
                color: "#64748b",
              }}
            >
              Ce produit n’existe pas ou n’est plus
              disponible.
            </p>

            <Link
              href="/"
              style={{
                display: "inline-flex",
                padding: "12px 22px",
                borderRadius: 8,
                background: "#0a1931",
                color: "#ffffff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Retour à l’accueil
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const displayedImage =
    selectedImage || product.images[0];

  const displayedStars = "★".repeat(
    Math.max(0, Math.min(5, product.rating)),
  );

  const emptyStars = "☆".repeat(
    Math.max(0, 5 - product.rating),
  );

  const categoryLabel =
    product.shortName ??
    catalogCategory?.productPrefix ??
    product.name;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav
          className={styles.breadcrumb}
          aria-label="Fil d’Ariane"
        >
          <Link href="/">Accueil</Link>

          <span>/</span>

          <Link
            href={
              catalogCategory?.parentHref ?? "/homme"
            }
          >
            Homme
          </Link>

          <span>/</span>

          <span>{categoryLabel}</span>

          <span>/</span>

          <span>{product.name}</span>
        </nav>

        <section className={styles.productLayout}>
          <div
            className={styles.thumbnails}
            aria-label="Images du produit"
          >
            {product.images.map((image, index) => {
              const isActive =
                displayedImage === image;

              return (
                <button
                  key={image}
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
                    alt={`${product.name} - Vue ${
                      index + 1
                    }`}
                    width={82}
                    height={82}
                  />
                </button>
              );
            })}
          </div>

          <div
            className={styles.mainImageBox}
            onMouseEnter={() => setIsZooming(true)}
            onMouseLeave={() => setIsZooming(false)}
            onMouseMove={handleZoomMove}
          >
            {product.badge && (
              <span className={styles.newBadge}>
                {product.badge}
              </span>
            )}

            <Image
              key={displayedImage}
              src={displayedImage}
              alt={product.name}
              width={900}
              height={900}
              priority
              className={`${
                styles.mainProductImage
              } ${
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

            {product.oldPrice && (
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
                    TAILLE :
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
                  disabled={quantity === 1}
                  aria-label="Diminuer la quantité"
                >
                  <Minus size={17} />
                </button>

                <span>{quantity}</span>

                <button
                  type="button"
                  onClick={increaseQuantity}
                  disabled={
                    quantity >= (product.stock ?? 10)
                  }
                  aria-label="Augmenter la quantité"
                >
                  <Plus size={17} />
                </button>
              </div>
            </div>

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
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}