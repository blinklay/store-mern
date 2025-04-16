import { Link } from "react-router-dom";
import LogoPic from "../../asstes/logo.png";
import UserNavigate from "./UserNavigate";
import MainNavigate from "./MainNavigate";

export default function MainAside() {
  return (
    <aside className="h-[100vh] flex items-center flex-col gap-3">
      <Link to="/">
        <img className="w-[10em]" src={LogoPic} alt="logo" />
      </Link>

      <UserNavigate />
      <MainNavigate />
    </aside>
  );
}
