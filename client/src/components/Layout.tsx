import { Outlet } from "react-router-dom";
import MainAside from "./MainAside/MainAside";

export default function Layout() {
  return (
    <div className="flex gap-4 p-5">
      <MainAside />

      <div className="w-full p-2">
        <Outlet />
      </div>
    </div>
  );
}
