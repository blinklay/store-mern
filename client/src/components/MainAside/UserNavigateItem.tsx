import { NavLink } from "react-router-dom";
import { NavigateItemProp } from "../../types";

export default function UserNavigateItem({ children, to }: NavigateItemProp) {
  return (
    <li>
      <NavLink to={to}>{children}</NavLink>
    </li>
  );
}
