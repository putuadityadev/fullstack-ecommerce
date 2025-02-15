import { Outlet } from "react-router-dom"

const Admin = () => {
  return (
    <main>
      <div className="flex items-center justify-center mb-4">
        <h1 className="font-integralcf text-primary text-5xl">Admin Dashboard</h1>
      </div>
      <Outlet />
    </main>
  )
}

export default Admin