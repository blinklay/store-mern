import MainNavigateItem from "./MainNavigateItem";

export default function MainNavigate() {
  return (
    <nav className="mt-4 text-sm">
      <ul className="flex flex-col items-center gap-2">
        <MainNavigateItem to="/products">Товары</MainNavigateItem>
        <MainNavigateItem to="/categories">Категории</MainNavigateItem>
      </ul>
    </nav>
  );
}
