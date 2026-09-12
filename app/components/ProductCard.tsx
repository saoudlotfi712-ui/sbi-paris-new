import Link from "next/link";

import AddToCartButton from "./AddToCartButton";
import styles from "./ProductCard.module.css";

type ProductCardProps = {
  id: string;
  categorySlug: string;
  name: string;
  price: string;
  image: string;
  hoverImage?: string;
  badge?: string;
};

export default function ProductCard({
  id,
  categorySlug,
  name,
  price,
  image,
  hoverImage,
  badge = "NOUVEAU",
}: ProductCardProps) {
  const productHref = `/produit/${categorySlug}/${id}`;

  return (
    <article className={styles.card}>
      {badge && (
        <span className={styles.badge}>{badge}</span>
      )}

      <button
        type="button"
        aria-label={`Ajouter ${name} aux favoris`}
        className={styles.favorite}
      >
        ♡
      </button>

      <Link
        href={productHref}
        className={styles.productLink}
        aria-label={`Voir ${name}`}
      >
        <div className={styles.imageBox}>
          {image ? (
            <img
              className={styles.defaultImg}
              src={image}
              alt={name}
            />
          ) : (
            <div className={styles.imagePlaceholder}>
              SBI PARIS
            </div>
          )}

          {hoverImage && (
            <img
              className={styles.hoverImg}
              src={hoverImage}
              alt=""
              aria-hidden="true"
            />
          )}
        </div>

        <h3>{name}</h3>

        <p>{price}</p>
      </Link>

      <AddToCartButton
        productId={id}
        productName={name}
        productPrice={price}
        productImage={image}
        label="Ajouter au panier"
        addedLabel="Ajouté au panier ✓"
      />
    </article>
  );
}
