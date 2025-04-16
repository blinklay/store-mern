interface CartButtonProp {
  id: string;
}

export default function CartButton({ id }: CartButtonProp) {
  console.log(id);

  return (
    <button className="px-8 py-4 bg-black text-white mt-4">В корзину</button>
  );
}
