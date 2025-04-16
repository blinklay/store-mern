import UserNavigateItem from "./UserNavigateItem";
import UserIcon from "../../asstes/icons/user.svg";
import CartIcon from "../../asstes/icons/cart.svg";
import SearchIcon from "../../asstes/icons/search.svg";

export default function UserNavigate() {
  return (
    <nav>
      <ul className="flex gap-4 items-center">
        <UserNavigateItem to="/user">
          <img src={UserIcon} alt="иконка пользователя" />
        </UserNavigateItem>
        <UserNavigateItem to="/search">
          <img src={SearchIcon} alt="иконка поиска" />
        </UserNavigateItem>
        <UserNavigateItem to="/cart">
          <img src={CartIcon} alt="иконка корзины" />
        </UserNavigateItem>
      </ul>
    </nav>
  );
}
