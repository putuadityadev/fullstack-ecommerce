import { IoMdClose } from "react-icons/io"
import { SlArrowRight } from "react-icons/sl";
import { useState } from "react";
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

  return (
    <nav className={`mx-auto ${location.pathname.startsWith("/admin") && 'hidden'}`}>
      {isNavOpen && (
        <div className="w-full h-full fixed inset-0 z-10 bg-primary/10 backdrop-blur-xs" onClick={handleNavOpen}>
          
        </div>
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
            <Link to="/cart">
              <img src="cart.png" alt="cart" className="w-6 h-6" />
            </Link>
            <Link to="/profile">
              <img src="profile.png" alt="profile" className="w-6 h-6"/>
            </Link>
          </div>
        </div>
      </div>
      <hr className="mt-[23px] text-primary opacity-10"/>
    </nav>
  )
}

export default Navbar