import { Routes, Route, HashRouter as Router } from "react-router-dom"
import Home from "./pages/Home"
import Shop from "./pages/Shop"
import ProductDetails from "./pages/ProductDetails"
import Cart from "./pages/Cart"
import Profile from "./pages/Profile"
import Navbar from "./components/Navbar"


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
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