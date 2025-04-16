import { Outlet } from "react-router-dom";
import MainAside from "./MainAside/MainAside";

export default function Layout() {
  return (
    <div className="flex gap-2 p-5">
      <MainAside />

      <Outlet />
    </div>
  );
}
