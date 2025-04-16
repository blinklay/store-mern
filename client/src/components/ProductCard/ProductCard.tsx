import { Link } from "react-router-dom";
import { ProductCardInterface } from "../../types";

export default function ProductCard({
  _id,
  title,
  price,
  imageUrl,
}: ProductCardInterface) {
  return (
    <div className="w-full max-w-sm bg-white p-4 rounded shadow-xl overflow-hidden flex flex-col justify-between">
      <Link to={`/product/${_id}`}>
        <img
          className="w-full h-48 object-contain rounded"
          src={imageUrl}
          alt="Изображение товара"
        />
      </Link>

      <div className="mt-auto">
        <Link to={`/product/${_id}`}>
          <p className="font-bold">{title}</p>
        </Link>

        <p className="text-sm">{price} ₽</p>
      </div>
    </div>
  );
}
