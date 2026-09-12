export type ProductColor = {
  id: string;
  label: string;
  className: string;
};

export type Product = {
  id: string;
  categorySlug: string;

  name: string;
  shortName?: string;

  price: number;
  oldPrice?: number;

  badge?: string;

  description: string;

  images: string[];

  sizes: number[];

  colors: ProductColor[];

  rating: number;
  reviewCount: number;

  stock?: number;

  features: string[];
};

export const products: Product[] = [
  {
    id: "chaussure-sport-homme",
    categorySlug: "chaussures-sport-homme",

    name: "Chaussure Sport Homme",
    shortName: "Chaussure Sport",

    price: 89.9,

    badge: "NOUVEAU",

    description:
      "Chaussure sportive confortable, légère et élégante conçue pour accompagner vos journées.",

    images: [
      "/products/chaussures-sport-homme/1.webp",
      "/products/chaussures-sport-homme/2.webp",
      "/products/chaussures-sport-homme/3.webp",
      "/products/chaussures-sport-homme/4.webp",
      "/products/chaussures-sport-homme/5.webp",
      "/products/chaussures-sport-homme/6.webp",
      "/products/chaussures-sport-homme/7.webp",
      "/products/chaussures-sport-homme/8.webp",
    ],

    sizes: [
      38,
      39,
      40,
      41,
      42,
      43,
      44,
      45,
      46,
      47,
      48,
    ],

    colors: [
      {
        id: "black",
        label: "Noir",
        className: "black",
      },
      {
        id: "white",
        label: "Blanc",
        className: "white",
      },
      {
        id: "brown",
        label: "Marron",
        className: "brown",
      },
    ],

    rating: 5,
    reviewCount: 125,

    stock: 10,

    features: [
      "Design moderne et élégant.",
      "Confort exceptionnel au quotidien.",
      "Matériaux de haute qualité.",
      "Livraison rapide partout en Europe.",
      "Paiement 100 % sécurisé.",
    ],
  },
];

export function getProductById(
  categorySlug: string,
  productId: string,
): Product | undefined {
  return products.find(
    (product) =>
      product.categorySlug === categorySlug &&
      product.id === productId,
  );
}

export function getProductsByCategory(
  categorySlug: string,
): Product[] {
  return products.filter(
    (product) =>
      product.categorySlug === categorySlug,
  );
}