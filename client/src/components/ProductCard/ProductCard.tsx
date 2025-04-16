import { Link } from "react-router-dom";

export default function ProductCard() {
  return (
    <div className="w-full max-w-sm bg-white p-4 rounded shadow overflow-hidden flex flex-col justify-between">
      <Link to="/product/id">
        <img
          className="w-full h-48 object-contain rounded"
          src="https://www.muztorg.ru/files/5zk/jmc/q7y/18o/ccs/00s/kks/cgw/g/5zkjmcq7y18occs00skkscgwg.jpg"
          alt="Изображение товара"
        />
      </Link>

      <div className="mt-auto">
        <Link to="/product/id">
          <p className="font-bold">product title</p>
        </Link>

        <p className="text-sm">28,000 ₽</p>
      </div>
    </div>
  );
}
