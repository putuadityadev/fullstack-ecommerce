import { Outlet, useLocation } from "react-router-dom"

const Admin = () => {
  const location = useLocation();

  return (
    <main>
      <div className="flex items-center justify-center mb-4">
        <h1 className="font-integralcf text-primary text-5xl">
          {
            location.pathname === "/admin/create-product" ? "Create Product"
              : location.pathname === "/admin/view-products" ? "View All Products"
              : "Admin Dashboard"
          }
        </h1>

      </div>
      <Outlet />
    </main>
  )
}

export default Admin