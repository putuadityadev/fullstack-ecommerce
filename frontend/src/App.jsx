import { Routes, Route, HashRouter as Router } from "react-router-dom"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"
import Admin from "./pages/Admin"
import ViewProducts from "./components/Admin/viewProducts"
import CreateProducts from "./components/Admin/CreateProducts"


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/admin" element={<Admin/>}>
          <Route path="view-products" element={<ViewProducts />} />
          <Route path="create-product" element={<CreateProducts />} />
        </Route>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  )
}

export default App