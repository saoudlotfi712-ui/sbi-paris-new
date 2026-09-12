import ProductCard from "./ProductCard";
import { products } from "../lib/products";

export default function ProductGrid() {
  return (
    <section className="productGrid">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          categorySlug={product.categorySlug}
          name={product.name}
          price={`${product.price.toFixed(2)} €`}
          image={product.images[0]}
          hoverImage={product.images[1] ?? product.images[0]}
          badge={product.badge}
        />
      ))}
    </section>
  );
}
