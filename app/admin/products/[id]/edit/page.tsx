"use client";

import Link from "next/link";
import {
  ChangeEvent,
  FormEvent,
  useEffect,
  useState,
} from "react";
import { useParams, useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

type FormState = {
  name: string;
  description: string;
  price: string;
  oldPrice: string;
  category: string;
  subcategory: string;
  stock: string;
  isActive: boolean;
  isFeatured: boolean;
  isNew: boolean;
  isPromotion: boolean;
};

const STORAGE_BUCKET = "products";

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const productId = params.id;

  const [form, setForm] = useState<FormState>({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    subcategory: "",
    stock: "0",
    isActive: true,
    isFeatured: false,
    isNew: false,
    isPromotion: false,
  });

  const [existingImages, setExistingImages] =
    useState<string[]>([]);

  const [selectedFiles, setSelectedFiles] =
    useState<File[]>([]);

  const [previewUrls, setPreviewUrls] =
    useState<string[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    const urls = selectedFiles.map((file) =>
      URL.createObjectURL(file),
    );

    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) =>
        URL.revokeObjectURL(url),
      );
    };
  }, [selectedFiles]);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setErrorMessage("");

      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError || !session) {
        window.location.replace("/admin/login");
        return;
      }

      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          description,
          price,
          old_price,
          category,
          subcategory,
          stock,
          image,
          images,
          is_active,
          is_featured,
          is_new,
          is_promotion
        `)
        .eq("id", productId)
        .maybeSingle();

      if (error) {
        setErrorMessage(
          `Erreur Supabase : ${error.message}`,
        );
        setLoading(false);
        return;
      }

      if (!data) {
        setErrorMessage(
          "Produit introuvable.",
        );
        setLoading(false);
        return;
      }

      setForm({
        name: data.name ?? "",
        description: data.description ?? "",
        price:
          data.price !== null &&
          data.price !== undefined
            ? String(data.price)
            : "",
        oldPrice:
          data.old_price !== null &&
          data.old_price !== undefined
            ? String(data.old_price)
            : "",
        category: data.category ?? "",
        subcategory: data.subcategory ?? "",
        stock:
          data.stock !== null &&
          data.stock !== undefined
            ? String(data.stock)
            : "0",
        isActive: data.is_active ?? true,
        isFeatured: data.is_featured ?? false,
        isNew: data.is_new ?? false,
        isPromotion: data.is_promotion ?? false,
      });

      const currentImages = Array.isArray(
        data.images,
      )
        ? data.images.filter(
            (image): image is string =>
              typeof image === "string" &&
              image.trim().length > 0,
          )
        : data.image
          ? [data.image]
          : [];

      setExistingImages(currentImages);

      setLoading(false);
    };

    void loadProduct();
  }, [productId]);

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

  const handleImagesChange = (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    const files = Array.from(
      event.target.files ?? [],
    );

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/"),
    );

    setSelectedFiles(imageFiles);
  };

  const removeExistingImage = (
    index: number,
  ) => {
    setExistingImages((current) =>
      current.filter(
        (_, imageIndex) =>
          imageIndex !== index,
      ),
    );
  };

  const removeNewImage = (index: number) => {
    setSelectedFiles((current) =>
      current.filter(
        (_, imageIndex) =>
          imageIndex !== index,
      ),
    );
  };

  const uploadNewImages = async () => {
    const uploadedUrls: string[] = [];

    for (
      let index = 0;
      index < selectedFiles.length;
      index += 1
    ) {
      const file = selectedFiles[index];

      const extension =
        file.name
          .split(".")
          .pop()
          ?.toLowerCase() || "jpg";

      const safeExtension =
        extension.replace(
          /[^a-z0-9]/g,
          "",
        ) || "jpg";

      const fileName =
        `${Date.now()}-${index}-${crypto.randomUUID()}.${safeExtension}`;

      const filePath =
        `${productId}/${fileName}`;

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

    const price = Number(
      form.price.replace(",", "."),
    );

    const oldPrice = form.oldPrice.trim()
      ? Number(
          form.oldPrice.replace(",", "."),
        )
      : null;

    const stock = Number(form.stock || 0);

    if (!Number.isFinite(price)) {
      setErrorMessage(
        "Le prix n'est pas valide.",
      );
      return;
    }

    setSaving(true);

    try {
      const newImageUrls =
        await uploadNewImages();

      const allImages = [
        ...existingImages,
        ...newImageUrls,
      ];

      const mainImage =
        allImages[0] ?? null;

      const { error } = await supabase
        .from("products")
        .update({
          name: form.name.trim(),
          description:
            form.description.trim() || null,
          price,
          old_price: oldPrice,
          category: form.category.trim(),
          subcategory:
            form.subcategory.trim() || null,
          stock,
          image: mainImage,
          images: allImages,
          is_active: form.isActive,
          is_featured:
            form.isFeatured,
          is_new: form.isNew,
          is_promotion:
            form.isPromotion,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", productId);

      if (error) {
        throw new Error(
          `Erreur Supabase : ${error.message}`,
        );
      }

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error(error);

      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Une erreur est survenue.",
      );

      setSaving(false);
    }
  };

  if (loading) {
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
          Chargement du produit...
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
    fontSize: 15,
  };

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
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        <Link
          href="/admin/products"
          style={{
            textDecoration: "none",
            color: "#64748b",
          }}
        >
          ← Retour aux produits
        </Link>

        <h1
          style={{
            fontSize: 32,
            marginBottom: 24,
          }}
        >
          Modifier le produit
        </h1>

        <form
          onSubmit={handleSubmit}
          style={{
            background: "#ffffff",
            padding: 30,
            borderRadius: 14,
            border:
              "1px solid #e2e8f0",
          }}
        >
          <label>
            Nom du produit
          </label>

          <input
            value={form.name}
            onChange={(event) =>
              updateField(
                "name",
                event.target.value,
              )
            }
            style={{
              ...inputStyle,
              marginBottom: 18,
            }}
          />

          <label>
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
            rows={5}
            style={{
              ...inputStyle,
              resize: "vertical",
              marginBottom: 18,
            }}
          />

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            <div>
              <label>Prix (€)</label>

              <input
                value={form.price}
                onChange={(event) =>
                  updateField(
                    "price",
                    event.target.value,
                  )
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label>
                Ancien prix (€)
              </label>

              <input
                value={form.oldPrice}
                onChange={(event) =>
                  updateField(
                    "oldPrice",
                    event.target.value,
                  )
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label>Stock</label>

              <input
                type="number"
                min="0"
                value={form.stock}
                onChange={(event) =>
                  updateField(
                    "stock",
                    event.target.value,
                  )
                }
                style={inputStyle}
              />
            </div>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "1fr 1fr",
              gap: 16,
              marginTop: 18,
            }}
          >
            <div>
              <label>
                Catégorie
              </label>

              <input
                value={form.category}
                onChange={(event) =>
                  updateField(
                    "category",
                    event.target.value,
                  )
                }
                style={inputStyle}
              />
            </div>

            <div>
              <label>
                Sous-catégorie
              </label>

              <input
                value={form.subcategory}
                onChange={(event) =>
                  updateField(
                    "subcategory",
                    event.target.value,
                  )
                }
                style={inputStyle}
              />
            </div>
          </div>

          {existingImages.length > 0 && (
            <div
              style={{
                marginTop: 24,
              }}
            >
              <strong>
                Images actuelles
              </strong>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 12,
                  marginTop: 12,
                }}
              >
                {existingImages.map(
                  (image, index) => (
                    <div key={image}>
                      <img
                        src={image}
                        alt=""
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit:
                            "contain",
                        }}
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingImage(
                            index,
                          )
                        }
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
              marginTop: 24,
            }}
          >
            <label>
              Ajouter de nouvelles images
            </label>

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={
                handleImagesChange
              }
              style={{
                ...inputStyle,
                marginTop: 8,
              }}
            />
          </div>

          {previewUrls.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns:
                  "repeat(auto-fill, minmax(130px, 1fr))",
                gap: 12,
                marginTop: 16,
              }}
            >
              {previewUrls.map(
                (image, index) => (
                  <div key={image}>
                    <img
                      src={image}
                      alt=""
                      style={{
                        width: "100%",
                        height: 120,
                        objectFit:
                          "contain",
                      }}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeNewImage(
                          index,
                        )
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                ),
              )}
            </div>
          )}

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(4, 1fr)",
              gap: 12,
              marginTop: 24,
              padding: 18,
              background: "#f8fafc",
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
                marginTop: 20,
                padding: 14,
                background: "#fee2e2",
                color: "#991b1b",
                borderRadius: 8,
              }}
            >
              {errorMessage}
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            style={{
              marginTop: 24,
              width: "100%",
              padding: 14,
              border: 0,
              borderRadius: 8,
              background: "#0f172a",
              color: "#ffffff",
              fontWeight: 700,
              cursor: saving
                ? "not-allowed"
                : "pointer",
            }}
          >
            {saving
              ? "Enregistrement..."
              : "Enregistrer les modifications"}
          </button>
        </form>
      </div>
    </main>
  );
}