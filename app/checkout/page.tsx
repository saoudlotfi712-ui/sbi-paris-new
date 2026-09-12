"use client";

import Image from "next/image";
import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";
import styles from "./page.module.css";

type CheckoutProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  size?: string | number;
  color?: string;
  quantity: number;
};

type CheckoutStep = 1 | 2 | 3;

const DELIVERY_PRICE = 29;
const FREE_DELIVERY_FROM = 200;

export default function CheckoutPage() {
  const [product, setProduct] =
    useState<CheckoutProduct | null>(null);

  const [currentStep, setCurrentStep] =
    useState<CheckoutStep>(1);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("France");

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] =
    useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "checkoutProduct",
      );

      if (!saved) {
        return;
      }

      const parsedProduct = JSON.parse(
        saved,
      ) as CheckoutProduct;

      if (
        !parsedProduct ||
        !parsedProduct.id ||
        !parsedProduct.name ||
        typeof parsedProduct.price !== "number" ||
        typeof parsedProduct.quantity !== "number"
      ) {
        return;
      }

      setProduct(parsedProduct);
    } catch (storageError) {
      console.error(
        "Erreur lors du chargement du produit :",
        storageError,
      );
    }
  }, []);

  const subtotal = useMemo(() => {
    if (!product) {
      return 0;
    }

    return product.price * product.quantity;
  }, [product]);

  const shipping = useMemo(() => {
    if (subtotal <= 0) {
      return 0;
    }

    return subtotal >= FREE_DELIVERY_FROM
      ? 0
      : DELIVERY_PRICE;
  }, [subtotal]);

  const total = subtotal + shipping;

  const formatPrice = (value: number) =>
    new Intl.NumberFormat("fr-FR", {
      style: "currency",
      currency: "EUR",
    }).format(value);

  function validateDeliveryInformation() {
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !phone.trim() ||
      !address.trim() ||
      !postalCode.trim() ||
      !city.trim() ||
      !country.trim()
    ) {
      setError(
        "Veuillez remplir toutes les informations de livraison.",
      );

      return false;
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email.trim())) {
      setError(
        "Veuillez saisir une adresse e-mail valide.",
      );

      return false;
    }

    setError("");
    return true;
  }

  function continueToConfirmation(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!validateDeliveryInformation()) {
      return;
    }

    setCurrentStep(2);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function confirmOrder() {
    if (!product || isSubmitting) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const { error: orderError } = await supabase
        .from("orders")
        .insert({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
          email: email.trim(),
          phone: phone.trim() || null,
          address: address.trim(),
          postal_code: postalCode.trim(),
          city: city.trim(),
          country: country.trim(),
          product_id: product.id,
          product_name: product.name,
          size: product.size !== undefined ? String(product.size) : null,
          quantity: product.quantity,
          subtotal,
          shipping,
          total,
          status: "pending",
        });

      if (orderError) {
        console.error(
          "Order creation error:",
          orderError,
        );

        setError(
          `Erreur lors de l'enregistrement de la commande : ${orderError.message}`,
        );

        return;
      }

      const { error: stockError } =
        await supabase.rpc(
          "decrease_product_stock",
          {
            p_product_id: product.id,
            p_quantity: product.quantity,
          },
        );

      if (stockError) {
        console.error(
          "Stock update error:",
          stockError,
        );

        setError(
          `La commande a été enregistrée, mais une erreur de stock est survenue : ${stockError.message}`,
        );

        return;
      }

      const lastOrder = {
        product,
        customer: {
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          address: address.trim(),
          postalCode: postalCode.trim(),
          city: city.trim(),
          country: country.trim(),
        },
        subtotal,
        shipping,
        total,
        createdAt: new Date().toISOString(),
      };

      localStorage.setItem(
        "lastOrder",
        JSON.stringify(lastOrder),
      );

      localStorage.removeItem(
        "checkoutProduct",
      );

      setCurrentStep(3);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (unknownError) {
      console.error(
        "Unexpected checkout error:",
        unknownError,
      );

      setError(
        "Une erreur inattendue est survenue. Veuillez réessayer.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!product && currentStep !== 3) {
    return (
      <main className={styles.loading}>
        Produit indisponible ou panier vide.
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.steps}>
          <div
            className={
              currentStep === 1
                ? styles.stepActive
                : styles.step
            }
          >
            <span>1</span>
            <p>Livraison</p>
          </div>

          <div
            className={
              currentStep === 2
                ? styles.stepActive
                : styles.step
            }
          >
            <span>2</span>
            <p>Validation</p>
          </div>

          <div
            className={
              currentStep === 3
                ? styles.stepActive
                : styles.step
            }
          >
            <span>3</span>
            <p>Confirmation</p>
          </div>
        </div>

        <div className={styles.content}>
          {currentStep === 1 && (
            <form
              className={styles.formSection}
              onSubmit={continueToConfirmation}
            >
              <h1>
                Informations de livraison
              </h1>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label htmlFor="firstName">
                    Prénom
                  </label>

                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(
                        event.target.value,
                      )
                    }
                    placeholder="Jean"
                    autoComplete="given-name"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="lastName">
                    Nom
                  </label>

                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(
                        event.target.value,
                      )
                    }
                    placeholder="Dupont"
                    autoComplete="family-name"
                    required
                  />
                </div>
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label htmlFor="email">
                    E-mail
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(
                        event.target.value,
                      )
                    }
                    placeholder="jean@email.com"
                    autoComplete="email"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">
                    Téléphone
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(
                        event.target.value,
                      )
                    }
                    placeholder="+33 6 00 00 00 00"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="address">
                  Adresse complète
                </label>

                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(event) =>
                    setAddress(
                      event.target.value,
                    )
                  }
                  placeholder="12 rue de Paris, appartement 4"
                  autoComplete="street-address"
                  required
                />
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label htmlFor="postalCode">
                    Code postal
                  </label>

                  <input
                    id="postalCode"
                    type="text"
                    value={postalCode}
                    onChange={(event) =>
                      setPostalCode(
                        event.target.value,
                      )
                    }
                    placeholder="75001"
                    autoComplete="postal-code"
                    required
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="city">
                    Ville
                  </label>

                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(event) =>
                      setCity(
                        event.target.value,
                      )
                    }
                    placeholder="Paris"
                    autoComplete="address-level2"
                    required
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="country">
                  Pays
                </label>

                <select
                  id="country"
                  value={country}
                  onChange={(event) =>
                    setCountry(
                      event.target.value,
                    )
                  }
                  autoComplete="country-name"
                >
                  <option value="France">
                    France
                  </option>

                  <option value="Belgique">
                    Belgique
                  </option>

                  <option value="Luxembourg">
                    Luxembourg
                  </option>

                  <option value="Suisse">
                    Suisse
                  </option>
                </select>
              </div>

              {error && (
                <p
                  style={{
                    color: "#c62828",
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={
                  styles.continueButton
                }
              >
                Continuer
              </button>
            </form>
          )}

          {currentStep === 2 && product && (
            <section
              className={styles.formSection}
            >
              <h1>Valider la commande</h1>

              <p>
                Vérifiez vos informations avant
                de confirmer votre commande.
              </p>

              <div
                style={{
                  marginTop: 24,
                  marginBottom: 24,
                  lineHeight: 1.8,
                }}
              >
                <p>
                  <strong>Client :</strong>{" "}
                  {firstName} {lastName}
                </p>

                <p>
                  <strong>E-mail :</strong>{" "}
                  {email}
                </p>

                <p>
                  <strong>Téléphone :</strong>{" "}
                  {phone}
                </p>

                <p>
                  <strong>Adresse :</strong>{" "}
                  {address}, {postalCode} {city},{" "}
                  {country}
                </p>

                <p>
                  <strong>Produit :</strong>{" "}
                  {product.name}
                </p>

                <p>
                  <strong>Quantité :</strong>{" "}
                  {product.quantity}
                </p>

                <p>
                  <strong>Total :</strong>{" "}
                  {formatPrice(total)}
                </p>
              </div>

              {error && (
                <p
                  style={{
                    color: "#c62828",
                    marginBottom: 14,
                    fontWeight: 600,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="button"
                className={
                  styles.continueButton
                }
                onClick={confirmOrder}
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Enregistrement..."
                  : "Confirmer la commande"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setCurrentStep(1);
                }}
                disabled={isSubmitting}
                style={{
                  marginTop: 12,
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Modifier mes informations
              </button>
            </section>
          )}

          {currentStep === 3 && (
            <section
              className={styles.formSection}
            >
              <h1>Commande confirmée ✓</h1>

              <p>
                Merci {firstName}. Votre commande
                a bien été enregistrée.
              </p>

              <p>
                Votre commande sera traitée par
                SBI PARIS.
              </p>

              <button
                type="button"
                className={
                  styles.continueButton
                }
                onClick={() => {
                  window.location.href = "/";
                }}
              >
                Retour à l’accueil
              </button>
            </section>
          )}

          {product && currentStep !== 3 && (
            <aside className={styles.summary}>
              <h2>Résumé de la commande</h2>

              <div className={styles.product}>
                {product.image &&
                product.image.trim() !== "" ? (
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={90}
                    height={90}
                    unoptimized
                    style={{
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: 90,
                      height: 90,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#f1f5f9",
                      borderRadius: 8,
                      fontSize: 12,
                      color: "#64748b",
                      textAlign: "center",
                    }}
                  >
                    Sans image
                  </div>
                )}

                <div>
                  <h3>{product.name}</h3>

                  {product.size !== undefined && (
                    <p>
                      Taille : {product.size}
                    </p>
                  )}

                  {product.color && (
                    <p>
                      Couleur : {product.color}
                    </p>
                  )}

                  <p>
                    Quantité : {product.quantity}
                  </p>
                </div>
              </div>

              <div className={styles.line}>
                <span>Sous-total</span>

                <strong>
                  {formatPrice(subtotal)}
                </strong>
              </div>

              <div className={styles.line}>
                <span>Livraison</span>

                <strong>
                  {shipping === 0
                    ? "Gratuite"
                    : formatPrice(shipping)}
                </strong>
              </div>

              <div className={styles.total}>
                <span>Total</span>

                <strong>
                  {formatPrice(total)}
                </strong>
              </div>

              {shipping === 0 ? (
                <div
                  className={
                    styles.freeShipping
                  }
                >
                  🎉 Livraison offerte pour toute
                  commande supérieure ou égale à
                  200 €.
                </div>
              ) : (
                <div
                  className={
                    styles.shippingInfo
                  }
                >
                  Livraison à 29 €. Elle devient
                  gratuite dès 200 € d’achat.
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}