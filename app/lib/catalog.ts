import { products } from "./products";

export type CatalogCategory = {
  slug: string;
  namespace: string;
  titleKey: string;
  parentHref: string;
  productPrefix: string;
};

const category = (
  slug: string,
  namespace: string,
  titleKey: string,
  parentHref: string,
  productPrefix: string,
): CatalogCategory => ({
  slug,
  namespace,
  titleKey,
  parentHref,
  productPrefix,
});

export const catalogCategories: CatalogCategory[] = [
  category(
    "polos-sport-homme",
    "hommePage",
    "sections.sportive.items.polosSport",
    "/homme",
    "Polo Sport",
  ),
  category(
    "debardeurs-homme",
    "hommePage",
    "sections.sportive.items.tankTops",
    "/homme",
    "Débardeur",
  ),
  category(
    "shorts-sport-homme",
    "hommePage",
    "sections.sportive.items.shorts",
    "/homme",
    "Short Sport",
  ),
  category(
    "survetements-homme",
    "hommePage",
    "sections.sportive.items.tracksuits",
    "/homme",
    "Survêtement",
  ),
  category(
    "chaussures-sport-homme",
    "hommePage",
    "sections.sportive.items.sportShoes",
    "/homme",
    "Chaussure Sport",
  ),
  category(
    "casquettes-homme",
    "hommePage",
    "sections.sportive.items.caps",
    "/homme",
    "Casquette",
  ),
  category(
    "polos-homme",
    "hommePage",
    "sections.classique.items.polos",
    "/homme",
    "Polo",
  ),
  category(
    "chemises-homme",
    "hommePage",
    "sections.classique.items.shirts",
    "/homme",
    "Chemise",
  ),
  category(
    "pantalons-homme",
    "hommePage",
    "sections.classique.items.trousers",
    "/homme",
    "Pantalon",
  ),
  category(
    "vestes-homme",
    "hommePage",
    "sections.classique.items.jackets",
    "/homme",
    "Veste",
  ),
  category(
    "chaussures-ville-homme",
    "hommePage",
    "sections.classique.items.cityShoes",
    "/homme",
    "Chaussure Ville",
  ),
  category(
    "chaussettes-homme",
    "hommePage",
    "sections.essentiels.items.socks",
    "/homme",
    "Chaussettes",
  ),
  category(
    "sous-vetements-homme",
    "hommePage",
    "sections.essentiels.items.underwear",
    "/homme",
    "Essentiel",
  ),

  category(
    "polos-sport-femme",
    "femmePage",
    "sections.sportive.items.polosSport",
    "/femme",
    "Polo Sport Femme",
  ),
  category(
    "debardeurs-femme",
    "femmePage",
    "sections.sportive.items.tankTops",
    "/femme",
    "Débardeur Femme",
  ),
  category(
    "shorts-sport-femme",
    "femmePage",
    "sections.sportive.items.shorts",
    "/femme",
    "Short Sport Femme",
  ),
  category(
    "survetements-femme",
    "femmePage",
    "sections.sportive.items.tracksuits",
    "/femme",
    "Survêtement Femme",
  ),
  category(
    "chaussures-sport-femme",
    "femmePage",
    "sections.sportive.items.sportShoes",
    "/femme",
    "Chaussure Sport Femme",
  ),
  category(
    "casquettes-femme",
    "femmePage",
    "sections.sportive.items.caps",
    "/femme",
    "Casquette Femme",
  ),
  category(
    "polos-femme",
    "femmePage",
    "sections.classique.items.polos",
    "/femme",
    "Polo Femme",
  ),
  category(
    "chemises-femme",
    "femmePage",
    "sections.classique.items.shirts",
    "/femme",
    "Chemise Femme",
  ),
  category(
    "robes-femme",
    "femmePage",
    "sections.classique.items.dresses",
    "/femme",
    "Robe",
  ),
  category(
    "pantalons-femme",
    "femmePage",
    "sections.classique.items.trousers",
    "/femme",
    "Pantalon Femme",
  ),
  category(
    "vestes-femme",
    "femmePage",
    "sections.classique.items.jackets",
    "/femme",
    "Veste Femme",
  ),
  category(
    "chaussures-ville-femme",
    "femmePage",
    "sections.classique.items.cityShoes",
    "/femme",
    "Chaussure Ville Femme",
  ),
  category(
    "chaussettes-femme",
    "femmePage",
    "sections.essentiels.items.socks",
    "/femme",
    "Chaussettes Femme",
  ),
  category(
    "lingerie-femme",
    "femmePage",
    "sections.essentiels.items.lingerie",
    "/femme",
    "Lingerie",
  ),

  category(
    "polos-garcon",
    "enfantPage",
    "sections.boy.items.polos",
    "/enfant",
    "Polo Garçon",
  ),
  category(
    "shorts-garcon",
    "enfantPage",
    "sections.boy.items.shorts",
    "/enfant",
    "Short Garçon",
  ),
  category(
    "pantalons-garcon",
    "enfantPage",
    "sections.boy.items.trousers",
    "/enfant",
    "Pantalon Garçon",
  ),
  category(
    "vestes-garcon",
    "enfantPage",
    "sections.boy.items.jackets",
    "/enfant",
    "Veste Garçon",
  ),
  category(
    "chaussures-garcon",
    "enfantPage",
    "sections.boy.items.shoes",
    "/enfant",
    "Chaussure Garçon",
  ),
  category(
    "casquettes-garcon",
    "enfantPage",
    "sections.boy.items.caps",
    "/enfant",
    "Casquette Garçon",
  ),
  category(
    "robes-fille",
    "enfantPage",
    "sections.girl.items.dresses",
    "/enfant",
    "Robe Fille",
  ),
  category(
    "polos-fille",
    "enfantPage",
    "sections.girl.items.polos",
    "/enfant",
    "Polo Fille",
  ),
  category(
    "shorts-fille",
    "enfantPage",
    "sections.girl.items.shorts",
    "/enfant",
    "Short Fille",
  ),
  category(
    "pantalons-fille",
    "enfantPage",
    "sections.girl.items.trousers",
    "/enfant",
    "Pantalon Fille",
  ),
  category(
    "vestes-fille",
    "enfantPage",
    "sections.girl.items.jackets",
    "/enfant",
    "Veste Fille",
  ),
  category(
    "chaussures-fille",
    "enfantPage",
    "sections.girl.items.shoes",
    "/enfant",
    "Chaussure Fille",
  ),

  category(
    "parfums-homme",
    "parfumPage",
    "sections.men.items.perfumes",
    "/parfum",
    "Eau de Parfum Homme",
  ),
  category(
    "parfums-garcon",
    "parfumPage",
    "sections.men.items.boysPerfumes",
    "/parfum",
    "Parfum Garçon",
  ),
  category(
    "parfums-femme",
    "parfumPage",
    "sections.women.items.perfumes",
    "/parfum",
    "Eau de Parfum Femme",
  ),
  category(
    "parfums-fille",
    "parfumPage",
    "sections.women.items.girlsPerfumes",
    "/parfum",
    "Parfum Fille",
  ),

  category(
    "trottinettes-electriques",
    "mobilitePage",
    "section.items.electricScooters",
    "/mobilite",
    "Trottinette Électrique",
  ),
  category(
    "velos-electriques",
    "mobilitePage",
    "section.items.electricBikes",
    "/mobilite",
    "Vélo Électrique",
  ),
  category(
    "valises-electriques",
    "mobilitePage",
    "section.items.electricLuggage",
    "/mobilite",
    "Valise Électrique",
  ),

  category(
    "sacs",
    "collectionPage",
    "sections.quotidien.items.bags",
    "/collection",
    "Sac",
  ),
  category(
    "maroquinerie",
    "collectionPage",
    "sections.quotidien.items.leatherGoods",
    "/collection",
    "Maroquinerie",
  ),
  category(
    "valises",
    "collectionPage",
    "sections.quotidien.items.luggage",
    "/collection",
    "Valise",
  ),
  category(
    "accessoires",
    "collectionPage",
    "sections.quotidien.items.accessories",
    "/collection",
    "Accessoire",
  ),
  category(
    "artisanat",
    "collectionPage",
    "sections.signature.items.craftsmanship",
    "/collection",
    "Création Artisanale",
  ),
  category(
    "mode-traditionnelle",
    "collectionPage",
    "sections.signature.items.traditionalFashion",
    "/collection",
    "Mode Traditionnelle",
  ),

  category(
    "promotions",
    "promotionsPage",
    "sections.promotions.items.promotions",
    "/promotions",
    "Promotion",
  ),
  category(
    "nouveautes",
    "promotionsPage",
    "sections.news.items.news",
    "/promotions",
    "Nouveauté",
  ),
];

export const catalogBySlug = new Map(
  catalogCategories.map((item) => [item.slug, item]),
);

export type CatalogProduct = {
  id: string;
  categorySlug: string;
  name: string;
  price: string;
  badge?: string;
  image?: string;
  hoverImage?: string;
};

export function getProducts(
  catalogCategory: CatalogCategory,
): CatalogProduct[] {
  return products
    .filter((product) => product.categorySlug === catalogCategory.slug)
    .map((product) => ({
      id: product.id,
      categorySlug: product.categorySlug,
      name: product.name,
      price: `${product.price.toFixed(2).replace(".", ",")} €`,
      badge: product.badge,
      image: product.images[0] ?? "",
      hoverImage: product.images[1] ?? product.images[0] ?? "",
    }));
}
