"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { createClient } from "@supabase/supabase-js";
import {
  BadgePercent,
  CheckCircle2,
  FileText,
  Globe2,
  Headphones,
  ShieldCheck,
  Truck,
  UserPlus,
} from "lucide-react";
import {
  type FormEvent,
  useMemo,
  useState,
} from "react";

import styles from "./page.module.css";

/* =========================================================
   SUPABASE PUBLIC
========================================================= */

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL;

const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "Configuration Supabase manquante.",
  );
}

const publicSupabase = createClient(
  supabaseUrl,
  supabaseKey,
  {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
      detectSessionInUrl: false,
    },
  },
);

/* =========================================================
   TYPES
========================================================= */

type ProductCategory =
  | "Collection"
  | "Homme"
  | "Femme"
  | "Enfant"
  | "Sport"
  | "Parfum"
  | "Mobilite";

type Product = {
  id: string;
  name: string;
  price: number;
  category: ProductCategory;
};

type RpcItem = {
  product_id: string;
  product_reference: string;
  product_name: string;
  category_id: string;
  category_name: string;
  quantity: number;
  unit_price: number;
  total_ht: number;
};

/* =========================================================
   PRODUITS
========================================================= */

const PRODUCTS: Product[] = [
  {
    id: "chaussure-sport-homme",
    name: "Chaussure Sport Homme",
    price: 89.9,
    category: "Homme",
  },

  /*
   * Ajoutez les futurs produits ici.
   *
   * Exemple :
   *
   * {
   *   id: "produit-1",
   *   name: "Nom du produit",
   *   price: 49.9,
   *   category: "Collection",
   * },
   */
];

/* =========================================================
   CATÉGORIES
========================================================= */

const CATEGORIES: {
  id: ProductCategory;
  label: string;
}[] = [
  {
    id: "Collection",
    label: "Collection SBI PARIS",
  },
  {
    id: "Homme",
    label: "Mode Homme",
  },
  {
    id: "Femme",
    label: "Mode Femme",
  },
  {
    id: "Enfant",
    label: "Mode Enfant",
  },
  {
    id: "Sport",
    label: "Univers Sport",
  },
  {
    id: "Parfum",
    label: "Parfum",
  },
  {
    id: "Mobilite",
    label: "Mobilité électrique",
  },
];

/* =========================================================
   REMISE INTERNE

   Elle est calculée pour la demande Admin,
   mais elle n'est PAS affichée au client.
========================================================= */

function getDiscountRate(quantity: number) {
  if (quantity >= 10000) return 50;
  if (quantity >= 5000) return 30;
  if (quantity >= 2500) return 20;
  if (quantity >= 1000) return 10;
  if (quantity >= 500) return 5;
  if (quantity >= 100) return 1;

  return 0;
}

function roundMoney(value: number) {
  return Number(value.toFixed(2));
}

/* =========================================================
   PAGE
========================================================= */

export default function EspaceProPage() {
  const t = useTranslations("espacePro");

  const [isSubmitting, setIsSubmitting] =
    useState(false);

  const [requestSent, setRequestSent] =
    useState(false);

  const [requestError, setRequestError] =
    useState("");

  const [
    selectedCategories,
    setSelectedCategories,
  ] = useState<ProductCategory[]>([]);

  const [
    selectedProductIds,
    setSelectedProductIds,
  ] = useState<string[]>([]);

  const [quantities, setQuantities] =
    useState<Record<string, number>>({});

  /* =========================================================
     PRODUITS DISPONIBLES
  ========================================================= */

  const availableProducts = useMemo(() => {
    if (selectedCategories.length === 0) {
      return [];
    }

    return PRODUCTS.filter((product) =>
      selectedCategories.includes(
        product.category,
      ),
    );
  }, [selectedCategories]);

  const selectedProducts = useMemo(
    () =>
      PRODUCTS.filter((product) =>
        selectedProductIds.includes(
          product.id,
        ),
      ),
    [selectedProductIds],
  );

  /* =========================================================
     CALCULS INTERNES

     Ces montants ne sont jamais affichés au client.
  ========================================================= */

  const totalQuantity = useMemo(
    () =>
      selectedProducts.reduce(
        (total, product) =>
          total +
          (quantities[product.id] ?? 1),
        0,
      ),
    [selectedProducts, quantities],
  );

  const subtotal = useMemo(
    () =>
      selectedProducts.reduce(
        (total, product) => {
          const quantity =
            quantities[product.id] ?? 1;

          return (
            total +
            product.price * quantity
          );
        },
        0,
      ),
    [selectedProducts, quantities],
  );

  const discountRate = useMemo(
    () =>
      getDiscountRate(totalQuantity),
    [totalQuantity],
  );

  const discountAmount = useMemo(
    () =>
      subtotal *
      (discountRate / 100),
    [subtotal, discountRate],
  );

  const totalHT = useMemo(
    () =>
      subtotal - discountAmount,
    [subtotal, discountAmount],
  );

  /* =========================================================
     CATÉGORIES
  ========================================================= */

  function toggleCategory(
    category: ProductCategory,
  ) {
    setRequestSent(false);
    setRequestError("");

    setSelectedCategories((current) => {
      if (current.includes(category)) {
        const productIdsToRemove =
          PRODUCTS.filter(
            (product) =>
              product.category === category,
          ).map((product) => product.id);

        setSelectedProductIds(
          (currentProducts) =>
            currentProducts.filter(
              (id) =>
                !productIdsToRemove.includes(
                  id,
                ),
            ),
        );

        setQuantities(
          (currentQuantities) => {
            const next = {
              ...currentQuantities,
            };

            productIdsToRemove.forEach(
              (productId) => {
                delete next[productId];
              },
            );

            return next;
          },
        );

        return current.filter(
          (item) => item !== category,
        );
      }

      return [...current, category];
    });
  }

  /* =========================================================
     PRODUITS
  ========================================================= */

  function toggleProduct(
    productId: string,
  ) {
    setRequestSent(false);
    setRequestError("");

    setSelectedProductIds((current) => {
      if (current.includes(productId)) {
        setQuantities(
          (currentQuantities) => {
            const next = {
              ...currentQuantities,
            };

            delete next[productId];

            return next;
          },
        );

        return current.filter(
          (id) => id !== productId,
        );
      }

      setQuantities(
        (currentQuantities) => ({
          ...currentQuantities,
          [productId]:
            currentQuantities[
              productId
            ] ?? 1,
        }),
      );

      return [...current, productId];
    });
  }

  function updateQuantity(
    productId: string,
    value: number,
  ) {
    setRequestSent(false);
    setRequestError("");

    const safeQuantity =
      Number.isFinite(value)
        ? Math.max(
            1,
            Math.floor(value),
          )
        : 1;

    setQuantities((current) => ({
      ...current,
      [productId]: safeQuantity,
    }));
  }/* =========================================================
     ENVOI DEMANDE PROFESSIONNELLE
     VIA RPC create_pro_order
  ========================================================= */

  async function handleProfessionalRequest(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    setRequestSent(false);
    setRequestError("");

    if (selectedCategories.length === 0) {
      setRequestError(
        "Veuillez sélectionner au moins une catégorie.",
      );
      return;
    }

    if (selectedProducts.length === 0) {
      setRequestError(
        "Veuillez sélectionner au moins un produit.",
      );
      return;
    }

    if (totalQuantity <= 0) {
      setRequestError(
        "La quantité totale doit être supérieure à zéro.",
      );
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);

    const fullName = String(
      formData.get("Nom complet") ?? "",
    ).trim();

    const company = String(
      formData.get("Société") ?? "",
    ).trim();

    const email = String(
      formData.get("Email") ?? "",
    )
      .trim()
      .toLowerCase();

    const phone = String(
      formData.get("Téléphone") ?? "",
    ).trim();

    const country = String(
      formData.get("Pays") ?? "",
    ).trim();

    const city = String(
      formData.get("Ville") ?? "",
    ).trim();

    const activity = String(
      formData.get("Activité") ?? "",
    ).trim();

    const estimatedVolume = String(
      formData.get("Volume estimé") ?? "",
    ).trim();

    const website = String(
      formData.get("Site internet") ?? "",
    ).trim();

    const message = String(
      formData.get("Message") ?? "",
    ).trim();

    if (
      !fullName ||
      !company ||
      !email ||
      !phone ||
      !country ||
      !city ||
      !activity ||
      !estimatedVolume
    ) {
      setRequestError(
        "Veuillez remplir tous les champs obligatoires.",
      );
      return;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      setRequestError(
        "Veuillez saisir une adresse e-mail valide.",
      );
      return;
    }

    const items: RpcItem[] =
      selectedProducts.map((product) => {
        const quantity =
          quantities[product.id] ?? 1;

        const category =
          CATEGORIES.find(
            (item) =>
              item.id === product.category,
          );

        return {
          product_id: product.id,

          product_reference:
            product.id.toUpperCase(),

          product_name:
            product.name,

          category_id:
            product.category,

          category_name:
            category?.label ??
            product.category,

          quantity,

          unit_price:
            roundMoney(product.price),

          total_ht:
            roundMoney(
              product.price * quantity,
            ),
        };
      });

    setIsSubmitting(true);

    try {
      const { data, error } =
        await publicSupabase.rpc(
          "create_pro_order",
          {
            p_full_name:
              fullName,

            p_company:
              company,

            p_email:
              email,

            p_phone:
              phone,

            p_country:
              country,

            p_city:
              city,

            p_activity:
              activity,

            p_estimated_volume:
              estimatedVolume,

            p_website:
              website || null,

            p_message:
              message || null,

            p_categories:
              selectedCategories,

            p_total_quantity:
              totalQuantity,

            p_subtotal:
              roundMoney(subtotal),

            p_discount_percent:
              discountRate,

            p_discount_amount:
              roundMoney(
                discountAmount,
              ),

            p_total_ht:
              roundMoney(totalHT),

            p_items:
              items,
          },
        );

      if (error) {
        console.error(
          "Erreur RPC create_pro_order :",
          {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          },
        );

        throw new Error(
          error.message ||
            "Impossible d'envoyer la demande.",
        );
      }

      if (!data) {
        console.warn(
          "create_pro_order n'a retourné aucune donnée.",
        );
      }

      setRequestSent(true);
      setRequestError("");

      form.reset();

      setSelectedCategories([]);
      setSelectedProductIds([]);
      setQuantities({});

      document
        .getElementById("contact")
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    } catch (error) {
      console.error(
        "Erreur demande professionnelle :",
        error,
      );

      setRequestError(
        error instanceof Error
          ? error.message
          : "Une erreur inconnue est survenue.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  /* =========================================================
     CONTENU ESPACE PRO
  ========================================================= */

  const advantages = [
    {
      title: t(
        "advantages.items.prices.title",
      ),
      description: t(
        "advantages.items.prices.description",
      ),
      icon: BadgePercent,
    },
    {
      title: t(
        "advantages.items.delivery.title",
      ),
      description: t(
        "advantages.items.delivery.description",
      ),
      icon: Globe2,
    },
    {
      title: t(
        "advantages.items.support.title",
      ),
      description: t(
        "advantages.items.support.description",
      ),
      icon: Headphones,
    },
    {
      title: t(
        "advantages.items.quality.title",
      ),
      description: t(
        "advantages.items.quality.description",
      ),
      icon: ShieldCheck,
    },
  ];

  const universes = [
    {
      title: t(
        "universes.items.men",
      ),
      image:
        "/espace-pro/images/partner.jpg",
      href: "/homme",
    },
    {
      title: t(
        "universes.items.women",
      ),
      image:
        "/espace-pro/images/warehouse.jpg",
      href: "/femme",
    },
    {
      title: t(
        "universes.items.children",
      ),
      image:
        "/espace-pro/images/hero.jpg",
      href: "/enfant",
    },
    {
      title: t(
        "universes.items.sport",
      ),
      image:
        "/univers-sport/femme/products/running.jpg",
      href:
        "/univers-sport-femme",
    },
    {
      title: t(
        "universes.items.perfume",
      ),
      image:
        "/espace-pro/images/warehouse.jpg",
      href: "/parfum",
    },
    {
      title: t(
        "universes.items.mobility",
      ),
      image:
        "/espace-pro/images/partner.jpg",
      href: "/mobilite",
    },
  ];

  const steps = [
    {
      number: "01",
      title: t(
        "steps.items.account.title",
      ),
      description: t(
        "steps.items.account.description",
      ),
      icon: UserPlus,
    },
    {
      number: "02",
      title: t(
        "steps.items.quote.title",
      ),
      description: t(
        "steps.items.quote.description",
      ),
      icon: FileText,
    },
    {
      number: "03",
      title: t(
        "steps.items.order.title",
      ),
      description: t(
        "steps.items.order.description",
      ),
      icon: CheckCircle2,
    },
    {
      number: "04",
      title: t(
        "steps.items.delivery.title",
      ),
      description: t(
        "steps.items.delivery.description",
      ),
      icon: Truck,
    },
  ];

  const stats = [
    {
      value: "1994",
      label: t(
        "stats.creation",
      ),
    },
    {
      value: "30+",
      label: t(
        "stats.countries",
      ),
    },
  ];

  return (
    <main className={styles.page}>
      {/* =====================
          HERO
      ===================== */}

      <section
        className={
          styles.hero
        }
      >
        <Image
          src="/espace-pro/images/hero.jpg"
          alt={t(
            "hero.imageAlt",
          )}
          fill
          priority
          sizes="100vw"
          className={
            styles.heroImage
          }
        />

        <div
          className={
            styles.heroOverlay
          }
        />

        <div
          className={
            styles.heroContainer
          }
        >
          <div
            className={
              styles.heroContent
            }
          >
            <p
              className={
                styles.kicker
              }
            >
              {t(
                "hero.kicker",
              )}
            </p>

            <h1>
              {t(
                "hero.title.line1",
              )}
              <br />

              {t(
                "hero.title.line2",
              )}
              <br />

              {t(
                "hero.title.line3",
              )}{" "}

              <span>
                SBI PARIS
              </span>
            </h1>

            <p
              className={
                styles.heroDescription
              }
            >
              {t(
                "hero.description",
              )}
            </p>

            <div
              className={
                styles.heroActions
              }
            >
              <Link
                href="#avantages"
                className={
                  styles.primaryButton
                }
              >
                {t(
                  "hero.buttons.advantages",
                )}
              </Link>

              <Link
                href="#contact"
                className={
                  styles.secondaryButton
                }
              >
                {t(
                  "hero.buttons.quote",
                )}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================
          AVANTAGES
      ===================== */}

      <section
        id="avantages"
        className={
          styles.section
        }
      >
        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.sectionTitle
            }
          >
            <h2>
              {t(
                "advantages.title",
              )}
            </h2>

            <span />
          </div>

          <div
            className={
              styles.advantagesGrid
            }
          >
            {advantages.map(
              (item) => {
                const Icon =
                  item.icon;

                return (
                  <article
                    key={
                      item.title
                    }
                    className={
                      styles.advantageCard
                    }
                  >
                    <Icon
                      className={
                        styles.advantageIcon
                      }
                    />

                    <h3>
                      {
                        item.title
                      }
                    </h3>

                    <p>
                      {
                        item.description
                      }
                    </p>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* =====================
          UNIVERS
      ===================== */}

      <section
        className={
          styles.universSection
        }
      >
        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.sectionTitle
            }
          >
            <h2>
              {t(
                "universes.title",
              )}
            </h2>

            <span />
          </div>

          <div
            className={
              styles.universGrid
            }
          >
            {universes.map(
              (item) => (
                <Link
                  key={
                    item.title
                  }
                  href={
                    item.href
                  }
                  className={
                    styles.universeCard
                  }
                >
                  <Image
                    src={
                      item.image
                    }
                    alt={
                      item.title
                    }
                    fill
                    sizes="(max-width: 700px) 50vw, 17vw"
                    className={
                      styles.universeImage
                    }
                  />

                  <div
                    className={
                      styles.universeOverlay
                    }
                  />

                  <div
                    className={
                      styles.universeContent
                    }
                  >
                    <h3>
                      {
                        item.title
                      }
                    </h3>

                    <span />
                  </div>
                </Link>
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================
          ÉTAPES
      ===================== */}

      <section
        className={
          styles.stepsSection
        }
      >
        <div
          className={
            styles.container
          }
        >
          <div
            className={
              styles.sectionTitle
            }
          >
            <h2>
              {t(
                "steps.title",
              )}
            </h2>

            <span />
          </div>

          <div
            className={
              styles.stepsGrid
            }
          >
            {steps.map(
              (
                step,
                index,
              ) => {
                const Icon =
                  step.icon;

                return (
                  <article
                    key={
                      step.number
                    }
                    className={
                      styles.step
                    }
                  >
                    <div
                      className={
                        styles.stepTop
                      }
                    >
                      <span
                        className={
                          styles.stepNumber
                        }
                      >
                        {
                          step.number
                        }
                      </span>

                      {index <
                        steps.length -
                          1 && (
                        <span
                          className={
                            styles.stepLine
                          }
                        />
                      )}
                    </div>

                    <Icon
                      className={
                        styles.stepIcon
                      }
                      size={42}
                    />

                    <h3>
                      {
                        step.title
                      }
                    </h3>

                    <p>
                      {
                        step.description
                      }
                    </p>
                  </article>
                );
              },
            )}
          </div>
        </div>
      </section>

      {/* =====================
          STATISTIQUES
      ===================== */}

      <section
        className={
          styles.statsSection
        }
      >
        <div
          className={
            styles.statsContainer
          }
        >
          {stats.map(
            (stat) => (
              <div
                key={
                  stat.label
                }
                className={
                  styles.stat
                }
              >
                <strong>
                  {
                    stat.value
                  }
                </strong>

                <span>
                  {
                    stat.label
                  }
                </span>
              </div>
            ),
          )}
        </div>
      </section>{/* =====================
          FORMULAIRE
      ===================== */}

      <section
        id="contact"
        className={styles.formSection}
      >
        <div className={styles.formContainer}>
          <div className={styles.formColumn}>
            <p className={styles.formKicker}>
              {t("form.kicker")}
            </p>

            <h2>
              {t("form.title.line1")}
              <br />
              {t("form.title.line2")}
            </h2>

            <div className={styles.titleLine} />

            <form
              className={styles.form}
              onSubmit={handleProfessionalRequest}
            >
              {/* =====================
                  INFORMATIONS CLIENT
              ===================== */}

              <div className={styles.formGrid}>
                <label>
                  <span>
                    {t("form.fields.fullName")}
                  </span>

                  <input
                    type="text"
                    name="Nom complet"
                    placeholder={t(
                      "form.placeholders.fullName",
                    )}
                    disabled={isSubmitting}
                    required
                  />
                </label>

                <label>
                  <span>
                    {t("form.fields.company")}
                  </span>

                  <input
                    type="text"
                    name="Société"
                    placeholder={t(
                      "form.placeholders.company",
                    )}
                    disabled={isSubmitting}
                    required
                  />
                </label>

                <label>
                  <span>
                    {t("form.fields.email")}
                  </span>

                  <input
                    type="email"
                    name="Email"
                    placeholder={t(
                      "form.placeholders.email",
                    )}
                    disabled={isSubmitting}
                    required
                  />
                </label>

                <label>
                  <span>
                    {t("form.fields.phone")}
                  </span>

                  <input
                    type="tel"
                    name="Téléphone"
                    placeholder={t(
                      "form.placeholders.phone",
                    )}
                    disabled={isSubmitting}
                    required
                  />
                </label>

                <label>
                  <span>
                    {t("form.fields.country")}
                  </span>

                  <input
                    type="text"
                    name="Pays"
                    placeholder={t(
                      "form.placeholders.country",
                    )}
                    disabled={isSubmitting}
                    required
                  />
                </label>

                <label>
                  <span>
                    {t("form.fields.city")}
                  </span>

                  <input
                    type="text"
                    name="Ville"
                    placeholder={t(
                      "form.placeholders.city",
                    )}
                    disabled={isSubmitting}
                    required
                  />
                </label>

                <label>
                  <span>
                    {t("form.fields.activity")}
                  </span>

                  <select
                    name="Activité"
                    defaultValue=""
                    disabled={isSubmitting}
                    required
                  >
                    <option
                      value=""
                      disabled
                    >
                      {t(
                        "form.activity.placeholder",
                      )}
                    </option>

                    <option value="Grossiste">
                      {t(
                        "form.activity.grossiste",
                      )}
                    </option>

                    <option value="Distributeur">
                      {t(
                        "form.activity.distributeur",
                      )}
                    </option>

                    <option value="Importateur">
                      {t(
                        "form.activity.importateur",
                      )}
                    </option>

                    <option value="Boutique">
                      {t(
                        "form.activity.boutique",
                      )}
                    </option>

                    <option value="Marketplace">
                      {t(
                        "form.activity.marketplace",
                      )}
                    </option>

                    <option value="Autre">
                      {t(
                        "form.activity.other",
                      )}
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    {t("form.fields.volume")}
                  </span>

                  <select
                    name="Volume estimé"
                    defaultValue=""
                    disabled={isSubmitting}
                    required
                  >
                    <option
                      value=""
                      disabled
                    >
                      {t(
                        "form.volume.placeholder",
                      )}
                    </option>

                    <option value="Moins de 5 000 €">
                      {t(
                        "form.volume.less5000",
                      )}
                    </option>

                    <option value="5 000 € - 15 000 €">
                      {t(
                        "form.volume.from5000to15000",
                      )}
                    </option>

                    <option value="15 000 € - 50 000 €">
                      {t(
                        "form.volume.from15000to50000",
                      )}
                    </option>

                    <option value="Plus de 50 000 €">
                      {t(
                        "form.volume.more50000",
                      )}
                    </option>
                  </select>
                </label>

                <label>
                  <span>
                    {t("form.fields.website")}
                  </span>

                  <input
                    type="url"
                    name="Site internet"
                    placeholder={t(
                      "form.placeholders.website",
                    )}
                    disabled={isSubmitting}
                  />
                </label>
              </div>

              {/* =================================================
                  CATÉGORIES

                  Aucun prix ni remise n'est affiché au client.
              ================================================= */}

              <div
                style={{
                  marginTop: 28,
                  padding: 24,
                  border:
                    "1px solid #dfe3ea",
                  borderRadius: 10,
                  background: "#ffffff",
                }}
              >
                <h3
                  style={{
                    margin: "0 0 8px",
                    color: "#081a35",
                    fontFamily:
                      "Georgia, serif",
                    fontSize: 22,
                  }}
                >
                  Catégories recherchées
                </h3>

                <p
                  style={{
                    margin: "0 0 18px",
                    color: "#667085",
                    fontSize: 13,
                  }}
                >
                  Vous pouvez choisir plusieurs
                  catégories.
                </p>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns:
                      "repeat(2, minmax(0, 1fr))",
                    gap: 12,
                  }}
                >
                  {CATEGORIES.map(
                    (category) => (
                      <label
                        key={category.id}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          alignItems: "center",
                          gap: 10,
                          padding: "12px 14px",
                          border:
                            "1px solid #e1e5eb",
                          borderRadius: 8,
                          cursor:
                            isSubmitting
                              ? "not-allowed"
                              : "pointer",
                          opacity:
                            isSubmitting
                              ? 0.65
                              : 1,
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(
                            category.id,
                          )}
                          disabled={isSubmitting}
                          onChange={() =>
                            toggleCategory(
                              category.id,
                            )
                          }
                          style={{
                            width: 18,
                            height: 18,
                          }}
                        />

                        <span>
                          {category.label}
                        </span>
                      </label>
                    ),
                  )}
                </div>
              </div>

              {/* =================================================
                  PRODUITS

                  Le client choisit uniquement produit + quantité.
                  Aucun prix, total ou remise n'est affiché.
              ================================================= */}

              {selectedCategories.length >
                0 && (
                <div
                  style={{
                    marginTop: 24,
                    padding: 24,
                    border:
                      "1px solid #dfe3ea",
                    borderRadius: 10,
                    background: "#f8fafc",
                  }}
                >
                  <h3
                    style={{
                      margin: "0 0 8px",
                      color: "#081a35",
                      fontFamily:
                        "Georgia, serif",
                      fontSize: 22,
                    }}
                  >
                    Produits
                  </h3>

                  <p
                    style={{
                      margin: "0 0 20px",
                      color: "#667085",
                      fontSize: 13,
                    }}
                  >
                    Sélectionnez les produits et
                    indiquez la quantité souhaitée.
                  </p>

                  {availableProducts.length ===
                  0 ? (
                    <p
                      style={{
                        margin: 0,
                        color: "#667085",
                      }}
                    >
                      Aucun produit disponible pour
                      cette catégorie pour le moment.
                    </p>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        gap: 14,
                      }}
                    >
                      {availableProducts.map(
                        (product) => {
                          const isSelected =
                            selectedProductIds.includes(
                              product.id,
                            );

                          return (
                            <div
                              key={product.id}
                              style={{
                                padding: 16,
                                border:
                                  "1px solid #e1e5eb",
                                borderRadius: 8,
                                background:
                                  "#ffffff",
                              }}
                            >
                              <label
                                style={{
                                  display: "flex",
                                  flexDirection:
                                    "row",
                                  alignItems:
                                    "center",
                                  gap: 10,
                                  cursor:
                                    isSubmitting
                                      ? "not-allowed"
                                      : "pointer",
                                }}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    isSelected
                                  }
                                  disabled={
                                    isSubmitting
                                  }
                                  onChange={() =>
                                    toggleProduct(
                                      product.id,
                                    )
                                  }
                                  style={{
                                    width: 18,
                                    height: 18,
                                  }}
                                />

                                <span
                                  style={{
                                    fontWeight: 700,
                                  }}
                                >
                                  {product.name}
                                </span>
                              </label>

                              {isSelected && (
                                <label
                                  style={{
                                    display:
                                      "block",
                                    marginTop: 14,
                                  }}
                                >
                                  <span>
                                    Quantité
                                  </span>

                                  <input
                                    type="number"
                                    min={1}
                                    step={1}
                                    value={
                                      quantities[
                                        product.id
                                      ] ?? 1
                                    }
                                    disabled={
                                      isSubmitting
                                    }
                                    onChange={(
                                      event,
                                    ) =>
                                      updateQuantity(
                                        product.id,
                                        Number(
                                          event
                                            .target
                                            .value,
                                        ),
                                      )
                                    }
                                    required
                                  />
                                </label>
                              )}
                            </div>
                          );
                        },
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* =====================
                  MESSAGE
              ===================== */}<label
                className={
                  styles.messageField
                }
              >
                <span>
                  {t(
                    "form.fields.message",
                  )}
                </span>

                <textarea
                  name="Message"
                  rows={6}
                  placeholder={t(
                    "form.placeholders.message",
                  )}
                  disabled={isSubmitting}
                />
              </label>

              {/* =====================
                  ERREUR
              ===================== */}

              {requestError && (
                <div
                  role="alert"
                  style={{
                    marginTop: 18,
                    padding: "15px 18px",
                    border:
                      "1px solid #fecaca",
                    borderRadius: 8,
                    background: "#fef2f2",
                    color: "#991b1b",
                    lineHeight: 1.6,
                  }}
                >
                  <strong>
                    La demande n&apos;a pas été
                    envoyée.
                  </strong>

                  <div
                    style={{
                      marginTop: 4,
                    }}
                  >
                    {requestError}
                  </div>
                </div>
              )}

              {/* =====================
                  CONFIRMATION
              ===================== */}

              {requestSent && (
                <div
                  role="status"
                  style={{
                    marginTop: 18,
                    padding: "18px 20px",
                    border:
                      "1px solid #bbf7d0",
                    borderRadius: 8,
                    background: "#f0fdf4",
                    color: "#166534",
                    lineHeight: 1.7,
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      marginBottom: 4,
                    }}
                  >
                    Votre demande a bien été
                    envoyée.
                  </strong>

                  <div>
                    Notre équipe SBI PARIS va
                    vérifier votre demande. Après
                    validation, votre facture
                    professionnelle vous sera
                    transmise.
                  </div>
                </div>
              )}

              {/* =====================
                  ENVOI
              ===================== */}

              <button
                type="submit"
                className={
                  styles.submitButton
                }
                disabled={isSubmitting}
                style={{
                  opacity:
                    isSubmitting
                      ? 0.65
                      : 1,
                  cursor:
                    isSubmitting
                      ? "not-allowed"
                      : "pointer",
                }}
              >
                {isSubmitting
                  ? "ENVOI EN COURS..."
                  : "ENVOYER MA DEMANDE"}
              </button>
            </form>
          </div>

          {/* =====================
              IMAGE FORMULAIRE
          ===================== */}

          <div
            className={
              styles.formImageWrapper
            }
          >
            <Image
              src="/espace-pro/images/warehouse.jpg"
              alt={t("form.imageAlt")}
              fill
              sizes="(max-width: 1100px) 100vw, 45vw"
              className={
                styles.formImage
              }
            />

            <div
              className={
                styles.formImageOverlay
              }
            />

            <div
              className={
                styles.imageBadge
              }
            >
              <Truck size={34} />

              <div>
                <strong>
                  {t(
                    "form.badge.title",
                  )}
                </strong>

                <span>
                  {t(
                    "form.badge.description",
                  )}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================
          PARTENAIRE
      ===================== */}

      <section
        className={
          styles.partnerSection
        }
      >
        <Image
          src="/espace-pro/images/partner.jpg"
          alt={t("partner.imageAlt")}
          fill
          sizes="100vw"
          className={
            styles.partnerImage
          }
        />

        <div
          className={
            styles.partnerOverlay
          }
        />

        <div
          className={
            styles.partnerContainer
          }
        >
          <div
            className={
              styles.partnerContent
            }
          >
            <p
              className={
                styles.partnerKicker
              }
            >
              {t("partner.kicker")}
            </p>

            <h2>
              {t(
                "partner.title.line1",
              )}

              <span>
                SBI PARIS
              </span>
            </h2>

            <p
              className={
                styles.partnerDescription
              }
            >
              {t(
                "partner.description",
              )}
            </p>

            <Link
              href="#contact"
              className={
                styles.partnerButton
              }
            >
              {t("partner.button")}
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}