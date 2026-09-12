"use client";

import { useState } from "react";

export type SportAudience =
  | "homme"
  | "femme";

export type SportDiscipline =
  | "football"
  | "basketball"
  | "tennis"
  | "padel"
  | "running";

export type SportProductType =
  | "maillots-polos"
  | "shorts"
  | "survetements"
  | "chaussures"
  | "accessoires";

export type SportAssignment = {
  audience: SportAudience;
  discipline: SportDiscipline;
  product_type: SportProductType;
};

type Props = {
  category: string;
  subcategory: string;
  value: SportAssignment[];
  onChange: (value: SportAssignment[]) => void;
  disabled?: boolean;
};

const AUDIENCES: Array<{
  value: SportAudience;
  label: string;
}> = [
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
];

const DISCIPLINES: Array<{
  value: SportDiscipline;
  label: string;
}> = [
  { value: "football", label: "Football" },
  { value: "basketball", label: "Basketball" },
  { value: "tennis", label: "Tennis" },
  { value: "padel", label: "Padel" },
  { value: "running", label: "Running" },
];

const GROUPS: Array<{
  value: SportProductType;
  label: string;
}> = [
  {
    value: "maillots-polos",
    label: "Maillots / Polos",
  },
  {
    value: "shorts",
    label: "Shorts",
  },
  {
    value: "survetements",
    label: "Survêtements",
  },
  {
    value: "chaussures",
    label: "Chaussures",
  },
  {
    value: "accessoires",
    label: "Accessoires",
  },
];

function audienceLabel(
  value: SportAudience,
) {
  return (
    AUDIENCES.find(
      (item) => item.value === value,
    )?.label ?? value
  );
}

function disciplineLabel(
  value: SportDiscipline,
) {
  return (
    DISCIPLINES.find(
      (item) => item.value === value,
    )?.label ?? value
  );
}

function groupLabel(
  value: SportProductType,
) {
  return (
    GROUPS.find(
      (item) => item.value === value,
    )?.label ?? value
  );
}

export default function SportAssignmentsField({
  value,
  onChange,
  disabled = false,
}: Props) {
  const [audience, setAudience] =
    useState<SportAudience | "">("");

  const [discipline, setDiscipline] =
    useState<SportDiscipline | "">("");

  const [productType, setProductType] =
    useState<SportProductType | "">("");

  const alreadyAdded = Boolean(
    audience &&
      discipline &&
      productType &&
      value.some(
        (item) =>
          item.audience === audience &&
          item.discipline === discipline &&
          item.product_type === productType,
      ),
  );

  const canAdd =
    Boolean(audience) &&
    Boolean(discipline) &&
    Boolean(productType) &&
    !alreadyAdded &&
    !disabled;

  function addAssignment() {
    if (
      !audience ||
      !discipline ||
      !productType ||
      alreadyAdded
    ) {
      return;
    }

    onChange([
      ...value,
      {
        audience,
        discipline,
        product_type: productType,
      },
    ]);

    // On garde Homme/Femme et le groupe :
    // pratique pour ajouter Football puis Tennis,
    // Basketball, etc.
    setDiscipline("");
  }

  function removeAssignment(
    index: number,
  ) {
    onChange(
      value.filter(
        (_, itemIndex) =>
          itemIndex !== index,
      ),
    );
  }

  return (
    <section
      style={{
        marginTop: 18,
        marginBottom: 18,
        padding: 20,
        border: "1px solid #dbe3ee",
        borderRadius: 12,
        background: "#f8fafc",
      }}
    >
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color: "#082760",
          }}
        >
          Univers Sport
        </div>

        <div
          style={{
            marginTop: 4,
            fontSize: 13,
            color: "#64748b",
          }}
        >
          Optionnel — classement sportif indépendant
          de la catégorie normale du produit.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(190px, 1fr))",
          gap: 14,
          alignItems: "end",
        }}
      >
        <div>
          <label
            style={{
              display: "block",
              marginBottom: 7,
              fontWeight: 700,
            }}
          >
            Homme / Femme
          </label>

          <select
            value={audience}
            disabled={disabled}
            onChange={(event) =>
              setAudience(
                event.target.value as
                  | SportAudience
                  | "",
              )
            }
            style={{
              width: "100%",
              padding: 13,
              border: "1px solid #cbd5e1",
              borderRadius: 9,
              background: "#fff",
            }}
          >
            <option value="">
              Choisir
            </option>

            {AUDIENCES.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: 7,
              fontWeight: 700,
            }}
          >
            Discipline
          </label>

          <select
            value={discipline}
            disabled={disabled}
            onChange={(event) =>
              setDiscipline(
                event.target.value as
                  | SportDiscipline
                  | "",
              )
            }
            style={{
              width: "100%",
              padding: 13,
              border: "1px solid #cbd5e1",
              borderRadius: 9,
              background: "#fff",
            }}
          >
            <option value="">
              Choisir une discipline
            </option>

            {DISCIPLINES.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            style={{
              display: "block",
              marginBottom: 7,
              fontWeight: 700,
            }}
          >
            Groupe produit
          </label>

          <select
            value={productType}
            disabled={disabled}
            onChange={(event) =>
              setProductType(
                event.target.value as
                  | SportProductType
                  | "",
              )
            }
            style={{
              width: "100%",
              padding: 13,
              border: "1px solid #cbd5e1",
              borderRadius: 9,
              background: "#fff",
            }}
          >
            <option value="">
              Choisir le groupe
            </option>

            {GROUPS.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          disabled={!canAdd}
          onClick={addAssignment}
          style={{
            minHeight: 46,
            padding: "0 16px",
            border: 0,
            borderRadius: 9,
            background: canAdd
              ? "#082760"
              : "#cbd5e1",
            color: "#fff",
            fontWeight: 800,
            cursor: canAdd
              ? "pointer"
              : "not-allowed",
          }}
        >
          {alreadyAdded
            ? "Déjà ajouté"
            : "+ Ajouter"}
        </button>
      </div>

      {value.length > 0 && (
        <div
          style={{
            marginTop: 18,
          }}
        >
          <div
            style={{
              marginBottom: 9,
              fontSize: 13,
              fontWeight: 700,
              color: "#475569",
            }}
          >
            Affectations Univers Sport
          </div>

          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 9,
            }}
          >
            {value.map((item, index) => (
              <div
                key={`${item.audience}-${item.discipline}-${item.product_type}-${index}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 9,
                  padding: "9px 12px",
                  borderRadius: 999,
                  border:
                    "1px solid #dbe3ee",
                  background: "#fff",
                  color: "#082760",
                  fontSize: 13,
                  fontWeight: 700,
                }}
              >
                <span>
                  {audienceLabel(
                    item.audience,
                  )}
                  {" • "}
                  {disciplineLabel(
                    item.discipline,
                  )}
                  {" • "}
                  {groupLabel(
                    item.product_type,
                  )}
                </span>

                <button
                  type="button"
                  disabled={disabled}
                  onClick={() =>
                    removeAssignment(index)
                  }
                  title="Supprimer"
                  style={{
                    border: 0,
                    background: "transparent",
                    color: "#b91c1c",
                    fontWeight: 900,
                    cursor: "pointer",
                  }}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}