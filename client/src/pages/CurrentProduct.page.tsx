import { useParams } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { ProductCardInterface } from "../types";
import ProductTabs from "../components/ProductTabs";
import CartButton from "../components/CartButton";

interface ProductBrandInterface {
  _id: string;
  name: string;
  logoUrl: string;
}

interface ProductCardFullInterface extends ProductCardInterface {
  sale: number;
  count: number;
  brand: ProductBrandInterface;
  description: string;
}

interface ResponseInterface {
  product: ProductCardFullInterface;
}

export default function CurrentProductPage() {
  const { id } = useParams();

  const { result, error, isLoading } = useAxios<ResponseInterface>(
    `/product/${id}`
  );

  if (isLoading) {
    return <div>Загрузка контента...</div>;
  }

  if (!result) {
    return <div>Данных нет...</div>;
  }

  if (error) {
    return <div>Ошибка при запросе...</div>;
  }
  return (
    <div className="flex gap-5">
      <img
        className="h-[40em] object-contain"
        src={result?.product.imageUrl}
        alt="Изображение товара"
      />

      <div className="w-full">
        <h2 className="text-3xl font-bold">{result?.product.title}</h2>
        <p className="text-2xl mt-5">{result?.product.price} ₽</p>

        <CartButton id={String(id)} />
        <ProductTabs description={result?.product.description} />
      </div>
    </div>
  );
}
