import Image from "next/image";
import Link from "next/link";

import { supabase } from "@/lib/supabase";
import DeleteProductButton from "./DeleteProductButton";

type Product = {
  id: string;
  name: string;
  price: number | string;
  stock: number | null;
  image: string | null;
  images: string[] | null;
  category: string | null;
  subcategory: string | null;
  is_active: boolean | null;
};

export default async function AdminProductsPage() {
  const { data, error } = await supabase
    .from("products")
    .select(`
      id,
      name,
      price,
      stock,
      image,
      images,
      category,
      subcategory,
      is_active
    `)
    .order("created_at", {
      ascending: false,
    });

  const products = (data ?? []) as Product[];

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 20,
            marginBottom: 30,
            flexWrap: "wrap",
          }}
        >
          <div>
            <Link
              href="/admin"
              style={{
                color: "#64748b",
                textDecoration: "none",
              }}
            >
              ← Administration
            </Link>

            <h1
              style={{
                fontSize: 32,
                marginTop: 12,
                marginBottom: 6,
              }}
            >
              Produits
            </h1>

            <p
              style={{
                color: "#64748b",
                margin: 0,
              }}
            >
              Gestion du catalogue SBI PARIS
            </p>
          </div>

          <Link
            href="/admin/products/new"
            style={{
              background: "#0f172a",
              color: "#ffffff",
              padding: "12px 20px",
              borderRadius: 8,
              textDecoration: "none",
              fontWeight: 700,
            }}
          >
            + Ajouter un produit
          </Link>
        </div>

        {error ? (
          <div
            style={{
              padding: 20,
              background: "#fee2e2",
              borderRadius: 10,
              color: "#991b1b",
            }}
          >
            Erreur Supabase : {error.message}
          </div>
        ) : products.length === 0 ? (
          <div
            style={{
              padding: 40,
              background: "#ffffff",
              border: "1px solid #e2e8f0",
              borderRadius: 12,
              textAlign: "center",
            }}
          >
            Aucun produit.
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gap: 16,
            }}
          >
            {products.map((product) => {
              const productImage =
                product.image ||
                product.images?.[0] ||
                null;

              return (
                <article
                  key={product.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "100px minmax(180px, 1fr) 140px 100px 120px 110px 110px",
                    alignItems: "center",
                    gap: 20,
                    padding: 16,
                    background: "#ffffff",
                    border: "1px solid #e2e8f0",
                    borderRadius: 12,
                  }}
                >
                  <div
                    style={{
                      position: "relative",
                      width: 90,
                      height: 90,
                      background: "#f1f5f9",
                      borderRadius: 8,
                      overflow: "hidden",
                    }}
                  >
                    {productImage ? (
                      <Image
                        src={productImage}
                        alt={product.name}
                        fill
                        sizes="90px"
                        unoptimized
                        style={{
                          objectFit: "contain",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 12,
                          color: "#64748b",
                        }}
                      >
                        Sans image
                      </div>
                    )}
                  </div>

                  <div>
                    <h2
                      style={{
                        fontSize: 18,
                        margin: "0 0 8px",
                      }}
                    >
                      {product.name}
                    </h2>

                    <p
                      style={{
                        margin: 0,
                        color: "#64748b",
                        fontSize: 14,
                      }}
                    >
                      {product.category ?? "Sans catégorie"}
                      {product.subcategory
                        ? ` / ${product.subcategory}`
                        : ""}
                    </p>
                  </div>

                  <strong>
                    {Number(product.price).toFixed(2)} €
                  </strong>

                  <span>
                    Stock : {product.stock ?? 0}
                  </span>

                  <span
                    style={{
                      padding: "7px 10px",
                      borderRadius: 999,
                      textAlign: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      background: product.is_active
                        ? "#dcfce7"
                        : "#fee2e2",
                      color: product.is_active
                        ? "#166534"
                        : "#991b1b",
                    }}
                  >
                    {product.is_active
                      ? "Actif"
                      : "Inactif"}
                  </span>

                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    style={{
                      padding: "9px 14px",
                      borderRadius: 8,
                      textDecoration: "none",
                      textAlign: "center",
                      fontWeight: 700,
                      background: "#0f172a",
                      color: "#ffffff",
                    }}
                  >
                    Modifier
                  </Link>

                  <DeleteProductButton
                    productId={product.id}
                    productName={product.name}
                  />
                </article>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}