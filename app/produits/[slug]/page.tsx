import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import AddToCartButton from "../../components/AddToCartButton";

import {
  catalogBySlug,
  catalogCategories,
  getProducts,
} from "../../lib/catalog";

import styles from "./page.module.css";

type ProductsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return catalogCategories.map((category) => ({
    slug: category.slug,
  }));
}

export default async function ProductsPage({
  params,
}: ProductsPageProps) {
  const { slug } = await params;
  const category = catalogBySlug.get(slug);

  if (!category) {
    notFound();
  }

  const categoryTranslations = await getTranslations(
    category.namespace,
  );

  const t = await getTranslations("catalog");

  const title = categoryTranslations(category.titleKey);
  const products = getProducts(category);

  return (
    <main className={styles.page}>
      <nav
        className={styles.breadcrumb}
        aria-label="Fil d’Ariane"
      >
        <Link href="/">{t("home")}</Link>

        <span>/</span>

        <Link href={category.parentHref}>
          {t("catalog")}
        </Link>

        <span>/</span>

        <span>{title}</span>
      </nav>

      <header className={styles.header}>
        <div>
          <h1>{title}</h1>
          <p>{t("description")}</p>
        </div>

        <span className={styles.count}>
          {t("productCount", {
            count: products.length,
          })}
        </span>
      </header>

      <section
        className={styles.grid}
        aria-label={title}
      >
        {products.map((product) => {
          const productHref = `/produit/${category.slug}/${product.id}`;

          return (
            <article
              className={styles.card}
              key={product.id}
            >
              {product.badge && (
                <span className={styles.badge}>
                  {product.badge}
                </span>
              )}

              <button
                className={styles.favorite}
                type="button"
                aria-label={t("addFavorite")}
              >
                ♡
              </button>

              <Link
                href={productHref}
                className={styles.productLink}
              >
                <div className={styles.imageBox}>
                  {product.image ? (
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={600}
                      height={600}
                      className={styles.productImage}
                    />
                  ) : (
                    <div className={styles.placeholder}>
                      {t("imageLater")}
                    </div>
                  )}
                </div>

                <h2>{product.name}</h2>

                <p className={styles.price}>
                  {product.price}
                </p>
              </Link>

              <AddToCartButton
                productId={`${category.slug}-${product.id}`}
                productName={product.name}
                productPrice={product.price}
                productImage={product.image ?? ""}
                label={t("addToCart")}
                addedLabel={t("addedToCart")}
              />

              <Link
                href={productHref}
                className={styles.productLink}
                aria-label={`Voir ${product.name}`}
              >
                Voir le produit
              </Link>
            </article>
          );
        })}
      </section>
    </main>
  );
}