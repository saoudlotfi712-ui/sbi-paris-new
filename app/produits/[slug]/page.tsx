import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getLocale,
  getTranslations,
} from "next-intl/server";

import { supabase } from "@/lib/supabase";
import {
  createMetadata,
  type SeoLocale,
} from "@/app/lib/seo";

import AddToCartButton from "../../components/AddToCartButton";
import {
  catalogBySlug,
  catalogCategories,
} from "../../lib/catalog";

import styles from "./page.module.css";

type ProductsPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

type Product = {
  id: string;
  name: string;
  slug: string | null;
  description: string | null;
  price: number | string;
  old_price: number | string | null;
  image: string | null;
  images: string[] | null;
  category: string | null;
  subcategory: string | null;
  stock: number | null;
  is_active: boolean | null;
  is_featured: boolean | null;
  is_new: boolean | null;
  is_promotion: boolean | null;
};

export function generateStaticParams() {
  return catalogCategories.map((category) => ({
    slug: category.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProductsPageProps) {
  const { slug } = await params;

  const locale =
    (await getLocale()) as SeoLocale;

  const category = catalogBySlug.get(slug);

  if (!category) {
    return createMetadata({
      title: "Catalogue",
      description: "Catalogue SBI PARIS.",
      path: `/produits/${slug}`,
      noIndex: true,
      locale,
    });
  }

  const categoryTranslations =
    await getTranslations(category.namespace);

  const title = categoryTranslations(
    category.titleKey,
  );

  return createMetadata({
    title,
    description:
      `Découvrez ${title} chez SBI PARIS : une sélection de produits soigneusement choisis.`,
    path: `/produits/${slug}`,
    locale,
  });
}

function formatPrice(
  value: number | string | null,
): string {
  const price = Number(value ?? 0);

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function getProductBadge(
  product: Product,
): string | null {
  if (product.is_promotion) {
    return "Promotion";
  }

  if (product.is_new) {
    return "Nouveau";
  }

  if (product.is_featured) {
    return "Sélection";
  }

  return null;
}

async function getProductsForSection(
  slug: string,
): Promise<Product[]> {
  let query = supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      price,
      old_price,
      image,
      images,
      category,
      subcategory,
      stock,
      is_active,
      is_featured,
      is_new,
      is_promotion
    `)
    .eq("is_active", true);

  if (slug === "parfums-femme") {
    query = query
      .eq("category", "parfum")
      .eq("subcategory", "femme");
  } else if (slug === "parfums-homme") {
    query = query
      .eq("category", "parfum")
      .eq("subcategory", "homme");
  } else if (slug === "parfums-fille") {
    query = query
      .eq("category", "parfum")
      .eq("subcategory", "fille");
  } else if (slug === "parfums-garcon") {
    query = query
      .eq("category", "parfum")
      .eq("subcategory", "garcon");
  } else {
    query = query.eq("category", slug);
  }

  const { data, error } = await query.order(
    "created_at",
    {
      ascending: false,
    },
  );

  if (error) {
    console.error(
      "Supabase section error:",
      error,
    );

    return [];
  }

  return (data ?? []) as Product[];
}

async function getDemoProduct(): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      slug,
      description,
      price,
      old_price,
      image,
      images,
      category,
      subcategory,
      stock,
      is_active,
      is_featured,
      is_new,
      is_promotion
    `)
    .eq("is_active", true)
    .not("images", "is", null)
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error(
      "Supabase demo product error:",
      error,
    );

    return null;
  }

  return data as Product | null;
}

export default async function ProductsPage({
  params,
}: ProductsPageProps) {
  const { slug } = await params;

  const category = catalogBySlug.get(slug);

  if (!category) {
    notFound();
  }

  const categoryTranslations =
    await getTranslations(category.namespace);

  const t = await getTranslations("catalog");

  const title = categoryTranslations(
    category.titleKey,
  );

  const realProducts =
    await getProductsForSection(slug);

  let products = realProducts;

  if (products.length === 0) {
    const demoProduct = await getDemoProduct();

    if (demoProduct) {
      products = [
        {
          ...demoProduct,
          name: category.productPrefix,
          is_promotion: false,
          is_new: true,
          is_featured: true,
        },
      ];
    }
  }

  return (
    <main className={styles.page}>
      <nav
        className={styles.breadcrumb}
        aria-label="Fil d’Ariane"
      >
        <Link href="/">
          {t("home")}
        </Link>

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

      {products.length === 0 ? (
        <section className={styles.grid}>
          <p>
            Aucun produit disponible pour le moment.
          </p>
        </section>
      ) : (
        <section
          className={styles.grid}
          aria-label={title}
        >
          {products.map((product) => {
            const productImage =
              product.image ??
              product.images?.[0] ??
              "";

            const productHref =
              `/produit/${slug}/${product.id}`;

            const formattedPrice =
              formatPrice(product.price);

            const badge =
              getProductBadge(product);

            return (
              <article
                className={styles.card}
                key={`${slug}-${product.id}`}
              >
                {badge && (
                  <span className={styles.badge}>
                    {badge}
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
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={product.name}
                        width={600}
                        height={600}
                        unoptimized
                        className={
                          styles.productImage
                        }
                      />
                    ) : (
                      <div
                        className={
                          styles.placeholder
                        }
                      >
                        {t("imageLater")}
                      </div>
                    )}
                  </div>

                  <h2>{product.name}</h2>

                  <p className={styles.price}>
                    {formattedPrice}
                  </p>

                  {product.old_price !== null &&
                    Number(product.old_price) >
                      Number(product.price) && (
                      <p
                        style={{
                          textDecoration:
                            "line-through",
                          opacity: 0.6,
                        }}
                      >
                        {formatPrice(
                          product.old_price,
                        )}
                      </p>
                    )}
                </Link>

                <AddToCartButton
                  productId={product.id}
                  productName={product.name}
                  productPrice={
                    formattedPrice
                  }
                  productImage={productImage}
                  label={t("addToCart")}
                  addedLabel={
                    t("addedToCart")
                  }
                />

                <Link
                  href={productHref}
                  className={styles.productLink}
                >
                  Voir le produit
                </Link>
              </article>
            );
          })}
        </section>
      )}
    </main>
  );
}