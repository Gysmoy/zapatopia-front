import { Route, Routes } from "react-router-dom"
import DashboardPage from "./Pages/Admin/DashboardPage"
import BrandsPage from "./Pages/Admin/BrandsPage"
import CategoriesPage from "./Pages/Admin/CategoriesPage"
import ProductsPage from "./Pages/Admin/ProductsPage"
import UsersPage from "./Pages/Admin/UsersPage"
import TrazabilityPage from "./Pages/Admin/TrazabilityPage"
import WarehousePage from "./Pages/Admin/WarehousePage"

const Admin = () => {
    return (
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/trazability" element={<TrazabilityPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/brands" element={<BrandsPage />} />
        <Route path="/categories" element={<CategoriesPage />} />
        <Route path="/warehouse" element={<WarehousePage />} />
        <Route path="/users" element={<UsersPage />} />
      </Routes>
    )
}

export default Admin