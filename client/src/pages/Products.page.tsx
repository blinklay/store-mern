import ProductCard from "../components/ProductCard/ProductCard";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-5 gap-4">
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
