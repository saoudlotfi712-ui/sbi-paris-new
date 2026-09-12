"use client";

import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

import {
  PRIMARY_CATEGORIES,
  SUBCATEGORIES,
} from "./productCategories";
import SportAssignmentsField, { type SportAssignment } from "./SportAssignmentsField";

type SizeMode = "none" | "pointure" | "taille";

type FormState = {
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  category: string;
  subcategory: string;
  stock: string;
  sizeMode: SizeMode;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPromotion: boolean;
};

const initialForm: FormState = {
  name: "",
  description: "",
  price: "",
  oldPrice: "",
  category: "",
  subcategory: "",
  stock: "0",
  sizeMode: "none",
  isActive: true,
  isFeatured: false,
  isNew: false,
  isPromotion: false,
};

const STORAGE_BUCKET = "products";

const SHOE_SIZES = [
  "38",
  "39",
  "40",
  "41",
  "42",
  "43",
  "44",
  "45",
  "46",
  "47",
  "48",
] as const;

const CLOTHING_SIZES = [
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
] as const;

const ALL_SIZES = [
  ...SHOE_SIZES,
  ...CLOTHING_SIZES,
];

type SizeStockState = Record<string, string>;

const createInitialSizeStocks =
  (): SizeStockState => {
    const result: SizeStockState = {};

    ALL_SIZES.forEach((size) => {
      result[size] = "0";
    });

    return result;
  };

export default function NewProductPage() {
  const router = useRouter();

  const [form, setForm] =
    useState<FormState>(initialForm);

  const [sportAssignments, setSportAssignments] = useState<SportAssignment[]>([]);

  const [sizeStocks, setSizeStocks] =
    useState<SizeStockState>(
      createInitialSizeStocks,
    );

  const [checkingSession, setCheckingSession] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [selectedFiles, setSelectedFiles] =
    useState<File[]>([]);

  const [previewUrls, setPreviewUrls] =
    useState<string[]>([]);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) {
        return;
      }

      if (error || !session) {
        window.location.replace(
          "/admin/login",
        );
        return;
      }

      setCheckingSession(false);
    };

    void checkSession();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    const urls = selectedFiles.map((file) =>
      URL.createObjectURL(file),
    );

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [selectedFiles]);

  const updateField = <
    K extends keyof FormState,
  >(
    field: K,
    value: FormState[K],
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const updateSizeStock = (
    size: string,
    value: string,
  ) => {
    setSizeStocks((current) => ({
      ...current,
      [size]: value,
    }));
  };

  const activeSizes: readonly string[] =
    form.sizeMode === "pointure"
      ? SHOE_SIZES
      : form.sizeMode === "taille"
        ? CLOTHING_SIZES
        : [];

  const totalSizeStock =
    activeSizes.reduce(
      (total, size) => {
        const value = Number(
          sizeStocks[size] || 0,
        );

        if (
          !Number.isFinite(value) ||
          value < 0
        ) {
          return total;
        }

        return total + value;
      },
      0,
    );

  const createSlug = (value: string) => {
    return value
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  };

  const handleImagesChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/"),
    );

    if (imageFiles.length !== files.length) {
      setErrorMessage(
        "Veuillez sélectionner uniquement des images.",
      );
    } else {
      setErrorMessage("");
    }

    setSelectedFiles(imageFiles);
  };

  const removeImage = (index: number) => {
    setSelectedFiles((current) =>
      current.filter(
        (_, fileIndex) => fileIndex !== index,
      ),
    );
  };

  const uploadImages = async (
    productSlug: string,
  ): Promise<string[]> => {
    const uploadedUrls: string[] = [];

    for (
      let index = 0;
      index < selectedFiles.length;
      index += 1
    ) {
      const file = selectedFiles[index];

      const extension =
        file.name.split(".").pop()?.toLowerCase() ||
        "jpg";

      const safeExtension =
        extension.replace(/[^a-z0-9]/g, "") ||
        "jpg";

      const fileName =
        `${Date.now()}-${index}-${crypto.randomUUID()}.${safeExtension}`;

      const filePath =
        `${productSlug}/${fileName}`;

      const { error: uploadError } =
        await supabase.storage
          .from(STORAGE_BUCKET)
          .upload(filePath, file, {
            cacheControl: "3600",
            upsert: false,
            contentType: file.type,
          });

      if (uploadError) {
        throw new Error(
          `Erreur upload image : ${uploadError.message}`,
        );
      }

      const { data } = supabase.storage
        .from(STORAGE_BUCKET)
        .getPublicUrl(filePath);

      if (!data.publicUrl) {
        throw new Error(
          "Impossible de récupérer l'URL publique de l'image.",
        );
      }

      uploadedUrls.push(data.publicUrl);
    }

    return uploadedUrls;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (saving) {
      return;
    }

    setErrorMessage("");

    if (!form.name.trim()) {
      setErrorMessage(
        "Le nom du produit est obligatoire.",
      );
      return;
    }

    if (!form.price.trim()) {
      setErrorMessage(
        "Le prix est obligatoire.",
      );
      return;
    }

    if (!form.category.trim()) {
      setErrorMessage(
        "La catégorie est obligatoire.",
      );
      return;
    }

    if (selectedFiles.length === 0) {
      setErrorMessage(
        "Veuillez sélectionner au moins une image.",
      );
      return;
    }

    const price = Number(
      form.price.replace(",", "."),
    );

    const oldPrice = form.oldPrice.trim()
      ? Number(
          form.oldPrice.replace(",", "."),
        )
      : null;

    const regularStock = Number(
      form.stock || 0,
    );

    if (!Number.isFinite(price) || price < 0) {
      setErrorMessage(
        "Le prix n'est pas valide.",
      );
      return;
    }

    if (
      oldPrice !== null &&
      (!Number.isFinite(oldPrice) ||
        oldPrice < 0)
    ) {
      setErrorMessage(
        "L'ancien prix n'est pas valide.",
      );
      return;
    }

    if (form.sizeMode === "none") {
      if (
        !Number.isInteger(regularStock) ||
        regularStock < 0
      ) {
        setErrorMessage(
          "Le stock doit être un nombre entier positif.",
        );
        return;
      }
    }

    if (form.sizeMode !== "none") {
      for (const size of activeSizes) {
        const stockValue = Number(
          sizeStocks[size] || 0,
        );

        if (
          !Number.isInteger(stockValue) ||
          stockValue < 0
        ) {
          setErrorMessage(
            `Le stock de la taille ${size} n'est pas valide.`,
          );
          return;
        }
      }
    }

    const finalStock =
      form.sizeMode === "none"
        ? regularStock
        : totalSizeStock;

    setSaving(true);

    try {
      const slugBase =
        createSlug(form.name);

      const uniqueSlug =
        `${slugBase || "produit"}-${Date.now()}`;

      const imageUrls =
        await uploadImages(uniqueSlug);

      const mainImage =
        imageUrls[0] ?? null;

      const {
        data: createdProduct,
        error: insertError,
      } = await supabase
        .from("products")
        .insert({
          name: form.name.trim(),
          slug: uniqueSlug,
          description:
            form.description.trim() || null,
          price,
          old_price: oldPrice,
          category: form.category.trim(),
          subcategory:
            form.subcategory.trim() || null,
    sport_assignments: sportAssignments,
          stock: finalStock,
          image: mainImage,
          images: imageUrls,
          is_active: form.isActive,
          is_featured: form.isFeatured,
          is_new: form.isNew,
          is_promotion: form.isPromotion,
        })
        .select("id")
        .single();

      if (
        insertError ||
        !createdProduct
      ) {
        throw new Error(
          `Erreur Supabase : ${
            insertError?.message ||
            "Produit non créé."
          }`,
        );
      }

      if (form.sizeMode !== "none") {
        const sizeRows =
          activeSizes.map((size) => ({
            product_id:
              createdProduct.id,

            size_type:
              form.sizeMode,

            size,

            stock: Number(
              sizeStocks[size] || 0,
            ),

            active: true,
          }));

        const {
          error: sizesError,
        } = await supabase
          .from("product_sizes")
          .insert(sizeRows);

        if (sizesError) {
          await supabase
            .from("products")
            .delete()
            .eq(
              "id",
              createdProduct.id,
            );

          throw new Error(
            `Erreur lors de l'enregistrement des tailles : ${sizesError.message}`,
          );
        }
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(
        "Create product error:",
        error,
      );

      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage(
          "Une erreur inconnue est survenue.",
        );
      }

      setSaving(false);
    }
  };

  if (checkingSession) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f8fafc",
        }}
      >
        <strong>
          Vérification de la session...
        </strong>
      </main>
    );
  }

  const inputStyle = {
    width: "100%",
    boxSizing: "border-box" as const,
    padding: "12px 14px",
    border: "1px solid #cbd5e1",
    borderRadius: 8,
    background: "#ffffff",
    fontSize: 15,
    color: "#0f172a",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 8,
    fontWeight: 700,
    color: "#0f172a",
  };

  const fieldStyle = {
    marginBottom: 20,
  };return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px 24px",
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <Link
          href="/admin/products"
          style={{
            display: "inline-block",
            marginBottom: 20,
            color: "#64748b",
            textDecoration: "none",
          }}
        >
          ← Retour aux produits
        </Link>

        <div style={{ marginBottom: 30 }}>
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 32,
              color: "#0f172a",
            }}
          >
            Ajouter un produit
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Créez un nouveau produit SBI PARIS.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{
            padding: 30,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
          }}
        >
          <div style={fieldStyle}>
            <label style={labelStyle}>
              Nom du produit *
            </label>

            <input
              type="text"
              value={form.name}
              onChange={(event) =>
                updateField(
                  "name",
                  event.target.value,
                )
              }
              placeholder="Ex. Polo Sport"
              required
              style={inputStyle}
            />
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>
              Description
            </label>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value,
                )
              }
              placeholder="Description du produit..."
              rows={5}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 20,
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>
                Prix (€) *
              </label>

              <input
                type="text"
                inputMode="decimal"
                value={form.price}
                onChange={(event) =>
                  updateField(
                    "price",
                    event.target.value,
                  )
                }
                placeholder="129.90"
                required
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Ancien prix (€)
              </label>

              <input
                type="text"
                inputMode="decimal"
                value={form.oldPrice}
                onChange={(event) =>
                  updateField(
                    "oldPrice",
                    event.target.value,
                  )
                }
                placeholder="159.90"
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                {form.sizeMode === "none"
                  ? "Stock"
                  : "Stock total"}
              </label>

              <input
                type="number"
                min="0"
                step="1"
                value={
                  form.sizeMode === "none"
                    ? form.stock
                    : totalSizeStock
                }
                onChange={(event) => {
                  if (
                    form.sizeMode === "none"
                  ) {
                    updateField(
                      "stock",
                      event.target.value,
                    );
                  }
                }}
                readOnly={
                  form.sizeMode !== "none"
                }
                style={{
                  ...inputStyle,
                  background:
                    form.sizeMode !== "none"
                      ? "#f1f5f9"
                      : "#ffffff",
                }}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(250px, 1fr))",
              gap: 20,
            }}
          >
            <div style={fieldStyle}>
              <label style={labelStyle}>
                Catégorie *
              </label>

              <select
                value={form.category}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    category: event.target.value,
                    subcategory: "",
                  }))
                }
                required
                disabled={saving}
                style={inputStyle}
              >
                <option value="">
                  Choisir une catégorie
                </option>

                {PRIMARY_CATEGORIES.map((item) => (
                  <option
                    key={item.value}
                    value={item.value}
                  >
                    {item.label}
                  </option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>
                Sous-catégorie
              </label>

              <select
                value={form.subcategory}
                onChange={(event) =>
                  updateField(
                    "subcategory",
                    event.target.value,
                  )
                }
                required
                disabled={!form.category || saving}
                style={inputStyle}
              >
                <option value="">
                  {form.category
                    ? "Choisir une sous-catégorie"
                    : "Choisir d'abord la catégorie"}
                </option>

                {(SUBCATEGORIES[form.category] ?? []).map(
                  (item) => (
                    <option
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <SportAssignmentsField
            category={form.category}
            subcategory={form.subcategory}
            value={sportAssignments}
            onChange={setSportAssignments}
            disabled={saving}
          />
          <div
            style={{
              marginBottom: 26,
              padding: 22,
              border: "1px solid #cbd5e1",
              borderRadius: 12,
              background: "#f8fafc",
            }}
          >
            <label style={labelStyle}>
              Gestion des tailles
            </label>

            <select
              value={form.sizeMode}
              onChange={(event) =>
                updateField(
                  "sizeMode",
                  event.target.value as SizeMode,
                )
              }
              disabled={saving}
              style={inputStyle}
            >
              <option value="none">
                Aucune taille
              </option>

              <option value="pointure">
                Pointures chaussures — 38 à 48
              </option>

              <option value="taille">
                Tailles vêtements — S à 3XL
              </option>
            </select>

            <small
              style={{
                display: "block",
                marginTop: 8,
                color: "#64748b",
              }}
            >
              Choisissez Pointures pour les
              chaussures ou Tailles vêtements
              pour les habits.
            </small>
          </div>

          {form.sizeMode !== "none" && (
            <div
              style={{
                marginBottom: 28,
                padding: 22,
                border: "1px solid #cbd5e1",
                borderRadius: 12,
                background: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 15,
                  flexWrap: "wrap",
                  marginBottom: 18,
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: "0 0 5px",
                      fontSize: 20,
                      color: "#0f172a",
                    }}
                  >
                    {form.sizeMode ===
                    "pointure"
                      ? "Pointures & stock"
                      : "Tailles & stock"}
                  </h2>

                  <p
                    style={{
                      margin: 0,
                      color: "#64748b",
                      fontSize: 13,
                    }}
                  >
                    Stock indépendant pour
                    chaque taille.
                  </p>
                </div>

                <div
                  style={{
                    padding: "10px 15px",
                    borderRadius: 8,
                    background: "#0f172a",
                    color: "#ffffff",
                    fontWeight: 800,
                  }}
                >
                  Stock total :{" "}
                  {totalSizeStock}
                </div>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    form.sizeMode === "pointure"
                      ? "repeat(auto-fit, minmax(105px, 1fr))"
                      : "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: 12,
                }}
              >
                {activeSizes.map((size) => (
                  <div
                    key={size}
                    style={{
                      padding: 12,
                      border:
                        "1px solid #e2e8f0",
                      borderRadius: 9,
                      background: "#f8fafc",
                    }}
                  >
                    <label
                      htmlFor={`size-${size}`}
                      style={{
                        display: "block",
                        marginBottom: 8,
                        textAlign: "center",
                        color: "#0f172a",
                        fontWeight: 900,
                        fontSize: 16,
                      }}
                    >
                      {size}
                    </label>

                    <input
                      id={`size-${size}`}
                      type="number"
                      min="0"
                      step="1"
                      value={
                        sizeStocks[size] || "0"
                      }
                      onChange={(event) =>
                        updateSizeStock(
                          size,
                          event.target.value,
                        )
                      }
                      disabled={saving}
                      aria-label={`Stock taille ${size}`}
                      style={{
                        ...inputStyle,
                        padding: "9px 8px",
                        textAlign: "center",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}<div style={fieldStyle}>
            <label style={labelStyle}>
              Images du produit *
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImagesChange}
              disabled={saving}
              style={{
                ...inputStyle,
                cursor: "pointer",
              }}
            />

            <small
              style={{
                display: "block",
                marginTop: 8,
                color: "#64748b",
              }}
            >
              Sélectionnez une ou plusieurs
              images. La première sera
              l&apos;image principale.
            </small>
          </div>

          {previewUrls.length > 0 && (
            <div
              style={{
                marginBottom: 24,
              }}
            >
              <strong
                style={{
                  display: "block",
                  marginBottom: 12,
                  color: "#0f172a",
                }}
              >
                Aperçu des images
              </strong>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 14,
                }}
              >
                {previewUrls.map(
                  (previewUrl, index) => (
                    <div
                      key={previewUrl}
                      style={{
                        padding: 8,
                        border:
                          index === 0
                            ? "2px solid #0f172a"
                            : "1px solid #e2e8f0",
                        borderRadius: 10,
                        background: "#ffffff",
                      }}
                    >
                      <img
                        src={previewUrl}
                        alt={`Aperçu ${index + 1}`}
                        style={{
                          width: "100%",
                          height: 130,
                          objectFit: "contain",
                          display: "block",
                          borderRadius: 6,
                        }}
                      />

                      {index === 0 && (
                        <div
                          style={{
                            marginTop: 7,
                            textAlign: "center",
                            fontSize: 12,
                            fontWeight: 700,
                          }}
                        >
                          Image principale
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removeImage(index)
                        }
                        disabled={saving}
                        style={{
                          width: "100%",
                          marginTop: 7,
                          padding: "7px 8px",
                          border:
                            "1px solid #fecaca",
                          borderRadius: 6,
                          background: "#fff",
                          color: "#b91c1c",
                          cursor: "pointer",
                          fontWeight: 700,
                        }}
                      >
                        Supprimer
                      </button>
                    </div>
                  ),
                )}
              </div>
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 14,
              padding: 20,
              marginBottom: 24,
              background: "#f8fafc",
              borderRadius: 10,
            }}
          >
            <label>
              <input
                type="checkbox"
                checked={form.isActive}
                onChange={(event) =>
                  updateField(
                    "isActive",
                    event.target.checked,
                  )
                }
              />{" "}
              Actif
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.isNew}
                onChange={(event) =>
                  updateField(
                    "isNew",
                    event.target.checked,
                  )
                }
              />{" "}
              Nouveau
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.isPromotion}
                onChange={(event) =>
                  updateField(
                    "isPromotion",
                    event.target.checked,
                  )
                }
              />{" "}
              Promotion
            </label>

            <label>
              <input
                type="checkbox"
                checked={form.isFeatured}
                onChange={(event) =>
                  updateField(
                    "isFeatured",
                    event.target.checked,
                  )
                }
              />{" "}
              Sélection
            </label>
          </div>

          {errorMessage && (
            <div
              style={{
                marginBottom: 20,
                padding: 14,
                borderRadius: 8,
                background: "#fee2e2",
                color: "#991b1b",
              }}
            >
              {errorMessage}
            </div>
          )}

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: 12,
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/admin/products"
              style={{
                padding: "12px 20px",
                border:
                  "1px solid #cbd5e1",
                borderRadius: 8,
                color: "#0f172a",
                background: "#ffffff",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Annuler
            </Link>

            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "12px 22px",
                border: 0,
                borderRadius: 8,
                background: "#0f172a",
                color: "#ffffff",
                fontWeight: 700,
                cursor: saving
                  ? "not-allowed"
                  : "pointer",
                opacity: saving ? 0.65 : 1,
              }}
            >
              {saving
                ? "Upload et enregistrement..."
                : "Enregistrer le produit"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}