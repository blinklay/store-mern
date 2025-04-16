import { Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import CurrentProductPage from "./pages/CurrentProduct.page";

const HomePage = lazy(() => import("./pages/Home.page"));
const ProductsPage = lazy(() => import("./pages/Products.page"));
const CartPage = lazy(() => import("./pages/Cart.page"));
const FavoritesPage = lazy(() => import("./pages/Favorites.page"));
const UserPage = lazy(() => import("./pages/User.page"));
const SearchPage = lazy(() => import("./pages/Search.page"));
const CategoriesPage = lazy(() => import("./pages/Categories.page"));
const Layout = lazy(() => import("./components/Layout"));

export default function App() {
  return (
    <Suspense fallback={<div> Загрузка...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/user" element={<UserPage />} />
          <Route path="/categories" element={<CategoriesPage />} />
          <Route path="/product/:id" element={<CurrentProductPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
