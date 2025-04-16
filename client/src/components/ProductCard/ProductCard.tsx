import { Link } from "react-router-dom";
import { ProductCardInterface } from "../../types";

export default function ProductCard({
  title,
  price,
  imgUrl,
}: ProductCardInterface) {
  return (
    <div className="w-full max-w-sm bg-white p-4 rounded shadow overflow-hidden flex flex-col justify-between">
      <Link to="/product/id">
        <img
          className="w-full h-48 object-contain rounded"
          src={imgUrl}
          alt="Изображение товара"
        />
      </Link>

      <div className="mt-auto">
        <Link to="/product/id">
          <p className="font-bold">{title}</p>
        </Link>

        <p className="text-sm">{price}</p>
      </div>
    </div>
  );
}
