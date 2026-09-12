export type ProductOption = {
  value: string;
  label: string;
};

export const PRIMARY_CATEGORIES: ProductOption[] = [
  { value: "collection", label: "Collection SBI PARIS" },
  { value: "homme", label: "Homme" },
  { value: "femme", label: "Femme" },
  { value: "enfant", label: "Enfant" },
  { value: "parfum", label: "Parfum" },
  { value: "mobilite", label: "Mobilité électrique" },
  { value: "promotions", label: "Promotions & Nouveautés" },
];

export const SUBCATEGORIES: Record<string, ProductOption[]> = {
  collection: [
    { value: "sacs", label: "Sacs" },
    { value: "maroquinerie", label: "Maroquinerie" },
    { value: "valises", label: "Bagages" },
    { value: "accessoires", label: "Accessoires" },
    { value: "artisanat", label: "Artisanat" },
    { value: "mode-traditionnelle", label: "Mode traditionnelle" },
  ],

  homme: [
    { value: "polos-sport-homme", label: "Style sport - Polos de sport" },
    { value: "debardeurs-homme", label: "Style sport - Débardeurs" },
    { value: "shorts-sport-homme", label: "Style sport - Shorts" },
    { value: "survetements-homme", label: "Style sport - Survêtements" },
    { value: "chaussures-sport-homme", label: "Style sport - Chaussures de sport" },
    { value: "casquettes-homme", label: "Style sport - Casquettes" },
    { value: "polos-homme", label: "Style classique - Polos" },
    { value: "chemises-homme", label: "Style classique - Chemises" },
    { value: "pantalons-homme", label: "Style classique - Pantalons" },
    { value: "vestes-homme", label: "Style classique - Vestes" },
    { value: "chaussures-ville-homme", label: "Style classique - Chaussures de ville" },
    { value: "chaussettes-homme", label: "Essentiels - Chaussettes" },
    { value: "sous-vetements-homme", label: "Essentiels - Sous-vêtements" },
  ],

  femme: [
    { value: "polos-sport-femme", label: "Style sport - Polos de sport" },
    { value: "debardeurs-femme", label: "Style sport - Débardeurs" },
    { value: "shorts-sport-femme", label: "Style sport - Shorts" },
    { value: "survetements-femme", label: "Style sport - Survêtements" },
    { value: "chaussures-sport-femme", label: "Style sport - Chaussures de sport" },
    { value: "casquettes-femme", label: "Style sport - Casquettes" },
    { value: "polos-femme", label: "Style classique - Polos" },
    { value: "chemises-femme", label: "Style classique - Chemises" },
    { value: "robes-femme", label: "Style classique - Robes" },
    { value: "pantalons-femme", label: "Style classique - Pantalons" },
    { value: "vestes-femme", label: "Style classique - Vestes" },
    { value: "chaussures-ville-femme", label: "Style classique - Chaussures de ville" },
    { value: "chaussettes-femme", label: "Essentiels - Chaussettes" },
    { value: "lingerie-femme", label: "Essentiels - Lingerie" },
  ],

  enfant: [
    { value: "polos-garcon", label: "Garçons - Polos" },
    { value: "shorts-garcon", label: "Garçons - Shorts" },
    { value: "pantalons-garcon", label: "Garçons - Pantalons" },
    { value: "vestes-garcon", label: "Garçons - Vestes" },
    { value: "chaussures-garcon", label: "Garçons - Chaussures" },
    { value: "casquettes-garcon", label: "Garçons - Casquettes" },
    { value: "robes-fille", label: "Filles - Robes" },
    { value: "polos-fille", label: "Filles - Polos" },
    { value: "shorts-fille", label: "Filles - Shorts" },
    { value: "pantalons-fille", label: "Filles - Pantalons" },
    { value: "vestes-fille", label: "Filles - Vestes" },
    { value: "chaussures-fille", label: "Filles - Chaussures" },
  ],

  parfum: [
    { value: "parfums-homme", label: "Parfums homme" },
    { value: "parfums-garcon", label: "Parfums garçon" },
    { value: "parfums-femme", label: "Parfums femme" },
    { value: "parfums-fille", label: "Parfums fille" },
  ],

  mobilite: [
    { value: "trottinettes-electriques", label: "Trottinettes électriques" },
    { value: "velos-electriques", label: "Vélos électriques" },
    { value: "valises-electriques", label: "Bagages électriques" },
  ],

  promotions: [
    { value: "promotions", label: "Promotions" },
    { value: "nouveautes", label: "Nouveautés" },
  ],
};
