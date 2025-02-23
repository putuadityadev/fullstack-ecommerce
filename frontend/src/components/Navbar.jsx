import { IoMdClose } from "react-icons/io"
import { SlArrowRight } from "react-icons/sl";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const navItems = [
    {
      name: "Shop",
      path: "/shop"
    },
    {
      name: "On Sale",
      path: "/onsale"
    },
    {
      name: "New Arrivals",
      path: "/newarrivals"
    },
    {
      name: "Brands",
      path: "/brands"
    }
  ]

  const [isNavOpen, setIsNavOpen] = useState(false)

  const handleNavOpen = () => {
    !isNavOpen ? setIsNavOpen(true) : setIsNavOpen(false)
  }

  const location = useLocation();
  const [cartQuantity, setCartQuantity] = useState(
    JSON.parse(localStorage.getItem("cartQuantity")) || 0
  )

  useEffect(() => {
    const handleStorageChange = (e) => {
      if(e.key === "cartQuantity") {
        setCartQuantity(JSON.parse(e.newValue))
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => {
      window.removeEventListener('storage', handleStorageChange)
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      const newQuantity = JSON.parse(localStorage.getItem("cartQuantity")) || 0;
      if(newQuantity !== cartQuantity) {
        setCartQuantity(newQuantity);
      }
    }, 300);
    
    return () => clearInterval(interval);
  }, [cartQuantity]);

  return (
    <nav className={`mx-auto ${location.pathname.startsWith("/admin") || location.pathname.startsWith("/auth") && 'hidden'}  fixed z-50 bg-white top-0 left-0 right-0`}>
      {isNavOpen && (
        <div className="w-full h-full fixed inset-0 z-10 bg-primary/10 backdrop-blur-xs" onClick={handleNavOpen}/>

      )}
      <div className="w-full flex justify-center items-center py-[9px] bg-primary h-[34px] relative">
        <h3 className="font-satoshi text-xs text-white font-extralight">Sign up and get 20% off to your first order. <span className="font-semibold underline">Sign Up Now</span></h3>
      </div>
      <div className="flex items-center justify-between px-[15px] mt-[23px] md:px-[100px] max-w-[1440px] mx-auto">
        <div className="flex gap-4 items-center">
          <button onClick={handleNavOpen} className="md:hidden">
            <img src="hamburger.png" alt="hamburger" width={24} height={24}/>
          </button>
          <img src="SHOP.CO.png" alt="logo" className="w-[126px]"/>
        </div>
        <ul className={`${!isNavOpen ? 'hidden' : ''} absolute md:static bg-primary md:bg-transparent text-white font-satoshi pb-8 px-5 top-12 rounded-2xl z-20 md:flex md:pb-0 md:gap-6`}>
          <button onClick={handleNavOpen} className="p-0 mb-10 md:hidden">
            <IoMdClose className="w-10 h-10 absolute left-2 top-2 "/>
          </button>
          {navItems.map((item, i) => (
            <div key={i} className="w-[45vw] md:w-fit md:flex">
              <Link to={item.path} onClick={isNavOpen && handleNavOpen} className="flex items-center justify-between">
                  <li className={`font-satoshi text-2xl mb-2 md:text-primary md:text-base md:mb-0 hover:cursor-pointer ${location.pathname === item.path ? 'font-bold' : "hover:underline opacity-50 hover:opacity-100"}`}>{item.name}</li>
                  <SlArrowRight className="md:hidden" />
              </Link>
            <hr className="mb-2 md:hidden"/>
            </div>
          ))}
          
        </ul>
        
        <div className="flex gap-[14px] md:gap-[40px] items-center">
          <div className="relative">
            <img src="search.png" alt="search-logo" className="w-6 h-6 md:absolute left-4 top-1/2 md:-translate-y-1/2"/>
            <input type="text" className="hidden md:flex font-satoshi rounded-full py-3 pr-4 pl-12 w-[577px] bg-gray-100 text-primary" placeholder="Search for products..."/>
          </div>
          <div className="flex gap-[14px]">
            <Link to="/cart" className="relative">
              <span className="-top-1 -right-3 absolute bg-red-600 w-fit h-4 px-1 rounded-full flex items-center justify-center text-white text-xs font-satoshi font-bold">{cartQuantity}</span>
              <img src="cart.svg" alt="cart" className="w-6 h-6" />
            </Link>
            <Link to="/profile">
              <img src="profile.svg" alt="profile" className="w-6 h-6"/>
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-[23px] text-primary opacity-10"/>
    </nav>
  )
}

export default Navbar