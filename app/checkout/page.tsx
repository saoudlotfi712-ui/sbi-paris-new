"use client";

import Image from "next/image";
import { FormEvent, useEffect, useMemo, useState } from "react";
import styles from "./page.module.css";

type CheckoutProduct = {
  id: string;
  name: string;
  image: string;
  price: number;
  size: number;
  color: string;
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

  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [securityCode, setSecurityCode] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("checkoutProduct");

      if (!saved) {
        return;
      }

      const parsedProduct = JSON.parse(saved);

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

    if (!email.includes("@")) {
      setError("Veuillez saisir une adresse e-mail valide.");

      return false;
    }

    setError("");
    return true;
  }

  function continueToPayment(event: FormEvent<HTMLFormElement>) {
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

  function confirmPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (
      !cardName.trim() ||
      !cardNumber.trim() ||
      !expiryDate.trim() ||
      !securityCode.trim()
    ) {
      setError(
        "Veuillez remplir toutes les informations de paiement.",
      );

      return;
    }

    setError("");

    const order = {
      product,
      customer: {
        firstName,
        lastName,
        email,
        phone,
        address,
        postalCode,
        city,
        country,
      },
      payment: {
        cardName,
        cardNumberLastDigits: cardNumber.slice(-4),
      },
      subtotal,
      shipping,
      total,
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem(
      "lastOrder",
      JSON.stringify(order),
    );

    localStorage.removeItem("checkoutProduct");

    setCurrentStep(3);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  if (!product && currentStep !== 3) {
    return (
      <main className={styles.loading}>
        Chargement...
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
            <p>Paiement</p>
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
              onSubmit={continueToPayment}
            >
              <h1>Informations de livraison</h1>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label htmlFor="firstName">Prénom</label>

                  <input
                    id="firstName"
                    type="text"
                    value={firstName}
                    onChange={(event) =>
                      setFirstName(event.target.value)
                    }
                    placeholder="Jean"
                    autoComplete="given-name"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="lastName">Nom</label>

                  <input
                    id="lastName"
                    type="text"
                    value={lastName}
                    onChange={(event) =>
                      setLastName(event.target.value)
                    }
                    placeholder="Dupont"
                    autoComplete="family-name"
                  />
                </div>
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label htmlFor="email">E-mail</label>

                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    placeholder="jean@email.com"
                    autoComplete="email"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="phone">Téléphone</label>

                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value)
                    }
                    placeholder="+33 6 00 00 00 00"
                    autoComplete="tel"
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
                    setAddress(event.target.value)
                  }
                  placeholder="12 rue de Paris, appartement 4"
                  autoComplete="street-address"
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
                      setPostalCode(event.target.value)
                    }
                    placeholder="75001"
                    autoComplete="postal-code"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="city">Ville</label>

                  <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(event) =>
                      setCity(event.target.value)
                    }
                    placeholder="Paris"
                    autoComplete="address-level2"
                  />
                </div>
              </div>

              <div className={styles.field}>
                <label htmlFor="country">Pays</label>

                <select
                  id="country"
                  value={country}
                  onChange={(event) =>
                    setCountry(event.target.value)
                  }
                  autoComplete="country-name"
                >
                  <option value="France">France</option>
                  <option value="Belgique">Belgique</option>
                  <option value="Luxembourg">
                    Luxembourg
                  </option>
                  <option value="Suisse">Suisse</option>
                </select>
              </div>

              {error && (
                <p
                  style={{
                    color: "#c62828",
                    marginBottom: "14px",
                    fontWeight: 600,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={styles.continueButton}
              >
                Continuer vers le paiement
              </button>
            </form>
          )}

          {currentStep === 2 && (
            <form
              className={styles.formSection}
              onSubmit={confirmPayment}
            >
              <h1>Paiement sécurisé</h1>

              <div className={styles.field}>
                <label htmlFor="cardName">
                  Nom sur la carte
                </label>

                <input
                  id="cardName"
                  type="text"
                  value={cardName}
                  onChange={(event) =>
                    setCardName(event.target.value)
                  }
                  placeholder="Jean Dupont"
                  autoComplete="cc-name"
                />
              </div>

              <div className={styles.field}>
                <label htmlFor="cardNumber">
                  Numéro de carte
                </label>

                <input
                  id="cardNumber"
                  type="text"
                  inputMode="numeric"
                  value={cardNumber}
                  onChange={(event) =>
                    setCardNumber(
                      event.target.value
                        .replace(/\D/g, "")
                        .slice(0, 16),
                    )
                  }
                  placeholder="1234 5678 9012 3456"
                  autoComplete="cc-number"
                />
              </div>

              <div className={styles.grid2}>
                <div className={styles.field}>
                  <label htmlFor="expiryDate">
                    Date d’expiration
                  </label>

                  <input
                    id="expiryDate"
                    type="text"
                    value={expiryDate}
                    onChange={(event) =>
                      setExpiryDate(event.target.value)
                    }
                    placeholder="MM/AA"
                    autoComplete="cc-exp"
                  />
                </div>

                <div className={styles.field}>
                  <label htmlFor="securityCode">
                    Cryptogramme
                  </label>

                  <input
                    id="securityCode"
                    type="password"
                    inputMode="numeric"
                    value={securityCode}
                    onChange={(event) =>
                      setSecurityCode(
                        event.target.value
                          .replace(/\D/g, "")
                          .slice(0, 4),
                      )
                    }
                    placeholder="123"
                    autoComplete="cc-csc"
                  />
                </div>
              </div>

              {error && (
                <p
                  style={{
                    color: "#c62828",
                    marginBottom: "14px",
                    fontWeight: 600,
                  }}
                >
                  {error}
                </p>
              )}

              <button
                type="submit"
                className={styles.continueButton}
              >
                Payer {formatPrice(total)}
              </button>

              <button
                type="button"
                onClick={() => {
                  setError("");
                  setCurrentStep(1);
                }}
                style={{
                  marginTop: "12px",
                  width: "100%",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  textDecoration: "underline",
                }}
              >
                Retour aux informations de livraison
              </button>
            </form>
          )}

          {currentStep === 3 && (
            <section className={styles.formSection}>
              <h1>Commande confirmée ✓</h1>

              <p>
                Merci {firstName}. Votre commande a bien été
                enregistrée.
              </p>

              <p>
                Un message de confirmation sera envoyé à{" "}
                <strong>{email}</strong>.
              </p>

              <button
                type="button"
                className={styles.continueButton}
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
                <Image
                  src={product.image}
                  alt={product.name}
                  width={90}
                  height={90}
                />

                <div>
                  <h3>{product.name}</h3>
                  <p>Taille : {product.size}</p>
                  <p>Couleur : {product.color}</p>
                  <p>Quantité : {product.quantity}</p>
                </div>
              </div>

              <div className={styles.line}>
                <span>Sous-total</span>
                <strong>{formatPrice(subtotal)}</strong>
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
                <strong>{formatPrice(total)}</strong>
              </div>

              {shipping === 0 ? (
                <div className={styles.freeShipping}>
                  🎉 Livraison offerte pour toute commande
                  supérieure ou égale à 200 €.
                </div>
              ) : (
                <div className={styles.shippingInfo}>
                  Livraison à 29 €. Elle devient gratuite dès
                  200 € d’achat.
                </div>
              )}
            </aside>
          )}
        </div>
      </div>
    </main>
  );
}