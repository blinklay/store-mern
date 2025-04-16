import ProductCard from "../components/ProductCard/ProductCard";
import { ProductCardInterface } from "../types";
import useAxios from "../hooks/useAxios";
import ProductCardSkeleton from "../components/ProductCard/ProductCardSkeleton";
import { motion } from "framer-motion";

interface ProductResponse {
  products: ProductCardInterface[];
}

export default function ProductsPage() {
  const { result, error, isLoading } = useAxios<ProductResponse>("/product", {
    products: [],
  });

  if (error) {
    return <div>Ошибка загрузки товаров!</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {isLoading ? (
        <>
          {new Array(5).fill("").map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </>
      ) : (
        <>
          {result?.products.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
            >
              <ProductCard
                _id={item._id}
                key={item._id}
                title={item.title}
                imageUrl={item.imageUrl}
                price={item.price}
              />
            </motion.div>
          ))}
        </>
      )}
    </div>
  );
}
