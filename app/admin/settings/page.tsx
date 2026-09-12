"use client";

import { FormEvent, useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function AdminSettingsPage() {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] =
    useState("");

  useEffect(() => {
    async function loadUser() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session) {
        window.location.replace("/admin/login");
        return;
      }

      setEmail(session.user.email ?? "");
      setLoading(false);
    }

    void loadUser();
  }, []);

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (saving) {
      return;
    }

    setMessage("");
    setErrorMessage("");

    const password = newPassword.trim();
    const confirmation = confirmPassword.trim();

    if (!password) {
      setErrorMessage(
        "Veuillez saisir le nouveau mot de passe.",
      );
      return;
    }

    if (password.length < 6) {
      setErrorMessage(
        "Le nouveau mot de passe doit contenir au moins 6 caractères.",
      );
      return;
    }

    if (password !== confirmation) {
      setErrorMessage(
        "Les deux mots de passe ne correspondent pas.",
      );
      return;
    }

    setSaving(true);

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      if (
        error.message
          .toLowerCase()
          .includes("different from the old password")
      ) {
        setErrorMessage(
          "Cette nouvelle كلمة de passe est identique à l'ancienne. Choisissez-en une autre.",
        );
      } else {
        setErrorMessage(
          `Erreur : ${error.message}`,
        );
      }

      setSaving(false);
      return;
    }

    setNewPassword("");
    setConfirmPassword("");

    setMessage(
      "Mot de passe modifié avec succès. Vous allez être redirigé vers la connexion.",
    );

    setSaving(false);

    await supabase.auth.signOut();

    window.setTimeout(() => {
      window.location.replace("/admin/login");
    }, 1500);
  }

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
        Chargement...
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
          width: "100%",
          maxWidth: 700,
          margin: "0 auto",
        }}
      >
        <a
          href="/admin"
          style={{
            display: "inline-block",
            marginBottom: 20,
            color: "#64748b",
            textDecoration: "none",
          }}
        >
          ← Administration
        </a>

        <div
          style={{
            marginBottom: 28,
          }}
        >
          <h1
            style={{
              margin: "0 0 8px",
              fontSize: 32,
              color: "#0f172a",
            }}
          >
            Paramètres
          </h1>

          <p
            style={{
              margin: 0,
              color: "#64748b",
            }}
          >
            Gestion du compte administrateur SBI PARIS.
          </p>
        </div>

        <div
          style={{
            padding: 28,
            background: "#ffffff",
            border: "1px solid #e2e8f0",
            borderRadius: 14,
          }}
        >
          <div
            style={{
              marginBottom: 24,
            }}
          >
            <strong
              style={{
                display: "block",
                marginBottom: 8,
              }}
            >
              Email administrateur
            </strong>

            <div
              style={{
                padding: "12px 14px",
                borderRadius: 8,
                background: "#f8fafc",
                color: "#475569",
              }}
            >
              {email}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div
              style={{
                marginBottom: 18,
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                Nouveau mot de passe
              </label>

              <input
                type="password"
                value={newPassword}
                onChange={(event) =>
                  setNewPassword(event.target.value)
                }
                autoComplete="new-password"
                required
                style={inputStyle}
              />
            </div>

            <div
              style={{
                marginBottom: 20,
              }}
            >
              <label
                style={{
                  display: "block",
                  marginBottom: 8,
                  fontWeight: 700,
                }}
              >
                Confirmer le nouveau mot de passe
              </label>

              <input
                type="password"
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                autoComplete="new-password"
                required
                style={inputStyle}
              />
            </div>

            {errorMessage && (
              <div
                style={{
                  marginBottom: 18,
                  padding: 12,
                  borderRadius: 8,
                  background: "#fee2e2",
                  color: "#991b1b",
                }}
              >
                {errorMessage}
              </div>
            )}

            {message && (
              <div
                style={{
                  marginBottom: 18,
                  padding: 12,
                  borderRadius: 8,
                  background: "#dcfce7",
                  color: "#166534",
                }}
              >
                {message}
              </div>
            )}

            <button
              type="submit"
              disabled={saving}
              style={{
                padding: "12px 20px",
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
                ? "Enregistrement..."
                : "Modifier le mot de passe"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}