import {supabase} from "@/lib/supabase";
import {
  createMetadata,
  type SeoLocale,
} from "@/app/lib/seo";
import {
  BreadcrumbJsonLd,
  ProductJsonLd,
} from "@/app/components/SeoJsonLd";
import {getLocale} from "next-intl/server";
import {catalogBySlug} from "@/app/lib/catalog";

import ProductPageClient, {
  type ProductPageProduct,
} from "./ProductPageClient";

type ProductPageProps = {
  params: Promise<{
    categorySlug: string;
    productId: string;
  }>;
};

type DatabaseProduct = {
  id: string;
  name: string;
  description: string | null;
  price: number | string;
  old_price: number | string | null;
  category: string | null;
  subcategory: string | null;
  images: string[] | null;
  stock: number | null;
  is_active: boolean | null;
  is_new: boolean | null;
  is_promotion: boolean | null;
  is_featured: boolean | null;
};

const homeLabels: Record<SeoLocale, string> = {
  fr: "Accueil",
  en: "Home",
  de: "Startseite",
  es: "Inicio",
  it: "Home",
  ar: "الرئيسية",
  zh: "首页",
};

export async function generateMetadata({
  params,
}: ProductPageProps) {
  const {categorySlug, productId} = await params;

  const locale =
    (await getLocale()) as SeoLocale;

  const {data, error} = await supabase
    .from("products")
    .select("name, description, is_active")
    .eq("id", productId)
    .eq("is_active", true)
    .maybeSingle();

  const path =
    `/produit/${categorySlug}/${productId}`;

  if (error || !data) {
    return createMetadata({
      title: "Produit",
      description: "Produit SBI PARIS.",
      path,
      noIndex: true,
      locale,
    });
  }

  const productName =
    String(data.name ?? "Produit SBI PARIS").trim();

  const rawDescription =
    typeof data.description === "string"
      ? data.description
      : "";

  const cleanDescription =
    rawDescription
      .replace(/\s+/g, " ")
      .trim();

  const description =
    cleanDescription.length > 0
      ? cleanDescription.slice(0, 160)
      : `Découvrez ${productName} chez SBI PARIS.`;

  return createMetadata({
    title: productName,
    description,
    path,
    locale,
  });
}

export default async function ProductPage({
  params,
}: ProductPageProps) {
  const {categorySlug, productId} = await params;

  const locale =
    (await getLocale()) as SeoLocale;

  const {data, error} = await supabase
    .from("products")
    .select(`
      id,
      name,
      description,
      price,
      old_price,
      category,
      subcategory,
      images,
      stock,
      is_active,
      is_new,
      is_promotion,
      is_featured
    `)
    .eq("id", productId)
    .eq("is_active", true)
    .maybeSingle();

  if (error) {
    return (
      <main
        style={{
          maxWidth: 900,
          margin: "60px auto",
          padding: 32,
        }}
      >
        <h1 style={{marginBottom: 16}}>
          Erreur Supabase
        </h1>

        <pre
          style={{
            padding: 20,
            overflowX: "auto",
            whiteSpace: "pre-wrap",
            borderRadius: 10,
            background: "#f1f5f9",
            color: "#b91c1c",
          }}
        >
          {JSON.stringify(error, null, 2)}
        </pre>
      </main>
    );
  }

  if (!data) {
    return (
      <main
        style={{
          maxWidth: 900,
          margin: "60px auto",
          padding: 32,
        }}
      >
        <h1 style={{marginBottom: 12}}>
          Produit introuvable
        </h1>

        <p>
          Aucun produit actif trouvé avec cet identifiant :
        </p>

        <code
          style={{
            display: "block",
            marginTop: 16,
            padding: 16,
            borderRadius: 8,
            background: "#f1f5f9",
          }}
        >
          {productId}
        </code>
      </main>
    );
  }

  const databaseProduct = data as DatabaseProduct;

  const {
    data: productSizeRows,
    error: productSizeError,
  } = await supabase
    .from("product_sizes")
    .select("size, size_type, stock, active")
    .eq("product_id", productId)
    .eq("active", true)
    .gt("stock", 0);

  const availableSizes = productSizeError
    ? []
    : (productSizeRows ?? [])
        .map((row) => String(row.size).trim())
        .filter((size) => size.length > 0)
        .sort((a, b) => {
          const order = [
            "S",
            "M",
            "L",
            "XL",
            "2XL",
            "3XL",
          ];

          const ai = order.indexOf(a.toUpperCase());
          const bi = order.indexOf(b.toUpperCase());

          if (ai !== -1 && bi !== -1) {
            return ai - bi;
          }

          if (ai !== -1) return -1;
          if (bi !== -1) return 1;

          return a.localeCompare(b, "fr", {
            numeric: true,
          });
        });

  const sizeType =
    productSizeError
      ? null
      : (productSizeRows ?? []).some(
            (row) => row.size_type === "pointure",
          )
        ? "pointure"
        : (productSizeRows ?? []).some(
              (row) => row.size_type === "taille",
            )
          ? "taille"
          : null;

  const catalogCategory =
    catalogBySlug.get(categorySlug);

  const displayName =
    catalogCategory?.productPrefix ??
    databaseProduct.name;

  const badge = databaseProduct.is_promotion
    ? "Promotion"
    : databaseProduct.is_new
      ? "Nouveau"
      : databaseProduct.is_featured
        ? "Sélection"
        : undefined;

  const product: ProductPageProduct = {
    id: databaseProduct.id,

    categorySlug,

    name: displayName,

    shortName:
      catalogCategory?.productPrefix ??
      databaseProduct.subcategory ??
      undefined,

    description:
      databaseProduct.description ??
      "Produit SBI PARIS",

    price: Number(databaseProduct.price),

    oldPrice:
      databaseProduct.old_price !== null
        ? Number(databaseProduct.old_price)
        : null,

    images: Array.isArray(databaseProduct.images)
      ? databaseProduct.images.filter(
          (image): image is string =>
            typeof image === "string" &&
            image.trim().length > 0,
        )
      : [],

    sizes: availableSizes,
    sizeType,
    colors: [],

    stock: databaseProduct.stock ?? 0,

    rating: 5,
    reviewCount: 0,

    badge,

    features: [
      "Qualité premium SBI PARIS",
      "Livraison rapide",
      "Retour sous 14 jours",
      "Paiement sécurisé",
    ],
  };

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ??
    "https://www.sbiparis.com";

  const productUrl =
    `${siteUrl}/${locale}/produit/${categorySlug}/${productId}`;

  const productImage =
    product.images.length > 0
      ? product.images[0]
      : undefined;

  const productDescription =
    product.description
      .replace(/\s+/g, " ")
      .trim();

  const productPrice =
    Number.isFinite(product.price)
      ? product.price
      : undefined;

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          {
            name: homeLabels[locale],
            url: `${siteUrl}/${locale}`,
          },
          {
            name: displayName,
            url: productUrl,
          },
        ]}
      />

      <ProductJsonLd
        name={displayName}
        description={productDescription}
        image={productImage}
        url={productUrl}
        price={productPrice}
        currency="EUR"
        availability={
          product.stock > 0
            ? "InStock"
            : "OutOfStock"
        }
      />

      <ProductPageClient product={product} />
    </>
  );
}