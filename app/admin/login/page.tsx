"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setErrorMessage("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#f8fafc",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 32,
          background: "#ffffff",
          border: "1px solid #e2e8f0",
          borderRadius: 16,
          boxShadow: "0 20px 45px rgba(15, 23, 42, 0.08)",
        }}
      >
        <h1
          style={{
            margin: "0 0 8px",
            fontSize: 30,
          }}
        >
          SBI PARIS Admin
        </h1>

        <p
          style={{
            margin: "0 0 28px",
            color: "#64748b",
          }}
        >
          Connectez-vous à votre espace d’administration.
        </p>

        <label
          style={{
            display: "block",
            marginBottom: 18,
          }}
        >
          <span
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            Email
          </span>

          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
            autoComplete="email"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              fontSize: 16,
              boxSizing: "border-box",
            }}
          />
        </label>

        <label
          style={{
            display: "block",
            marginBottom: 20,
          }}
        >
          <span
            style={{
              display: "block",
              marginBottom: 8,
              fontWeight: 700,
            }}
          >
            Mot de passe
          </span>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            autoComplete="current-password"
            style={{
              width: "100%",
              padding: "12px 14px",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              fontSize: 16,
              boxSizing: "border-box",
            }}
          />
        </label>

        {errorMessage && (
          <div
            style={{
              marginBottom: 18,
              padding: 12,
              background: "#fee2e2",
              color: "#991b1b",
              borderRadius: 8,
              fontSize: 14,
            }}
          >
            {errorMessage}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            padding: "13px 18px",
            border: 0,
            borderRadius: 8,
            background: "#0f172a",
            color: "#ffffff",
            fontWeight: 700,
            fontSize: 16,
            cursor: loading ? "not-allowed" : "pointer",
            opacity: loading ? 0.7 : 1,
          }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </form>
    </main>
  );
}