import ProductCard from "../components/ProductCard/ProductCard";
import { ProductCardInterface } from "../types";
import useAxios from "../hooks/useAxios";

interface ProductWithId extends ProductCardInterface {
  _id: string;
}

interface ProductResponse {
  products: ProductWithId[];
}

export default function ProductsPage() {
  const { result, error, isLoading } = useAxios<ProductResponse>("/product", {
    products: [],
  });
  if (error) {
    return <div>Ошибка загрузки сервера</div>;
  }
  return (
    <>
      {isLoading ? (
        <div>Загрузка контента...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {result?.products.map((item) => (
            <ProductCard
              key={item._id}
              title={item.title}
              price={item.price}
              imgUrl={item.imgUrl}
            />
          ))}
        </div>
      )}
    </>
  );
}
