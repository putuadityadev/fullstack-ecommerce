import ProductCard from "../components/productCard"
import { IoIosClose } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import SliderPrice from "../ui/Slider";
import CheckBoxColor from "../ui/CheckBoxColor";
import { useState } from "react";
import SizeButton from "../ui/SizeButton";
import Pagenation from "../components/Pagenation";

const Shop = () => {
  const filterList = [
    'T-shirt',
    'Short',
    'Shirt',
    'Hoodie',
    'Jeans',
  ]

  const [selectedValue, setSelectedValue] = useState(null);

  const handleCheckColor = (value) => {
    setSelectedValue(selectedValue === value ? null : value)
  }

  const [sizeSelected, setSizeSelected] = useState(null);

  const handleCheckSize = (i) => {
    setSizeSelected(sizeSelected === i ? null : i)
  }

  const checkboxes = [
    { value: 1, color: 'bg-green-500' },  
    { value: 2, color: 'bg-red-500' },     
    { value: 3, color: 'bg-yellow-400' },  
    { value: 4, color: 'bg-orange-500' },  
    { value: 5, color: 'bg-sky-400' },     
    { value: 6, color: 'bg-blue-600' },    
    { value: 7, color: 'bg-purple-600' }, 
    { value: 8, color: 'bg-pink-500' },     
    { value: 9, color: 'bg-white' },        
    { value: 10, color: 'bg-black' }        
  ];

  const sizes = [
    "XX-Small",
    "X-Small",
    "Small",
    "Medium",
    "Large",
    "X-Large",
    "XX-Large",
    "3X-Large",
    "4X-Large"
  ];

  const dressStyles = [
    "Casual",
    "Formal",
    "Party",
    "Gym"
  ]

  const products = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20
  ]


  const [filterOpenned, setFilterOpenned] = useState(false)

  function toggleFilter() {
    !filterOpenned ? setFilterOpenned(true) : setFilterOpenned(false)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(8)

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex  - postPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex)

  return (
    <section className="section-container mt-10 mx-auto">
      <div>
        <div className="hidden">
          <span>Home</span>
          <span>Casual</span>
        </div>

       
        <div className="flex flex-col md:w-full md:flex-row md:gap-5">
          {/* Filtering Menu*/}
          <div className={`${!filterOpenned ? 'hidden' : ''} md:block w-full md:w-[25dvw] md:border border-gray-300 bg-[#F0F0F0] md:relative absolute right-0 left-0 p-4 rounded-2xl z-10 mt-5 max-h-fit`}>
            {/* Filter */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-satoshi text-xl font-bold text-primary">Filter</h2>
                <button onClick={toggleFilter}>
                  <img src="/closebutton.png" alt="" />
                </button>
              </div>
              <hr className="opacity-10"/>
              <div className="mt-5">
                <ul className="font-satoshi font-light opacity-60 flex flex-col gap-5">
                  {filterList.map((filter, i) => (
                    <li key={i} className="flex justify-between">
                      {filter}
                      <FaAngleRight />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            {/* Price */}
            <div className="mt-5 mb-16">
              <hr className="opacity-10 mb-5"/>
              <div>
              <h2 className="font-satoshi text-xl font-bold text-primary">Price</h2>
              <SliderPrice />
              </div>
            </div>
            {/* Colors */}
            <div className="mt-5">
              <hr className="opacity-10 mb-5"/>
              <div>
              <h2 className="font-satoshi text-xl font-bold text-primary">Colors</h2>
              <div className="flex flex-wrap gap-4 mt-4">
                {checkboxes.map((checkbox) => (
                  <CheckBoxColor 
                    key={checkbox.value}
                    value={checkbox.value}
                    color={checkbox.color}
                    isSelected={selectedValue === checkbox.value}
                    onClick={handleCheckColor}
                  />
                ))}
              </div>
              </div>
            </div>
            {/* Size */}
            <div className="mt-5">
              <hr className="opacity-10 mb-5"/>
              <div>
                <h2 className="font-satoshi text-xl font-bold text-primary">Size</h2>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {sizes.map((size, i) => (
                  <SizeButton
                   key={i}
                   size={size}
                   isSelected={sizeSelected === i}
                   onClick={handleCheckSize}
                   i={i}
                  />
                ))}
              </div>
            </div>
            {/* Dress Style */}
            <div className="mt-5">
              <hr className="opacity-10 mb-5"/>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-satoshi text-xl font-bold text-primary">Dress Style</h2>
              </div>
              <div className="mt-5">
                <ul className="font-satoshi font-light opacity-60 flex flex-col gap-5">
                  {dressStyles.map((style, i) => (
                    <li key={i} className="flex justify-between">
                      {style}
                      <FaAngleRight />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <button className="mt-5 w-full py-4 bg-primary text-white rounded-full font-satoshi text-sm">
              Apply Filter
            </button>
          </div>
          

          {/* Products Grid */}
          <div className="w-full md:w-[75dvw] mt-5 h-fit overflow-hidden">
            <div className="flex justify-between items-center"> 
              <div className="flex gap-2 items-end">
                <h2 className="font-satoshi text-2xl text-primary font-bold leading-none">Casual</h2>
                <span className="font-satoshi text-sm text-primary opacity-60 leading-none">Showing 1-10 of 100 Products</span>
              </div>
              <button className="w-8 h-8 bg-[#F0F0F0] flex items-center justify-center rounded-full md:hidden" onClick={toggleFilter}>
                <img src="/filter-icon.png" alt="filter-icon" className="object-contain"/>
              </button>
            </div>

            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 mt-7 gap-x-[14px] gap-y-6 md:gap-x-5 md:gap-y-9">
                {currentPosts.map((p) => (
                  <ProductCard key={p}/>
                ))}
              </div>
            </div>
            <div>
              <hr className="opacity-10 my-5"/>
              <Pagenation
                totalPosts= {products.length}
                postsPerPage= {postPerPage}
                setCurrentPage= {setCurrentPage}
                currentPage= {currentPage}
              />
            </div>
          </div>
          
        </div>


        <div className="w-full bg-primary flex flex-col md:flex-row gap-8 py-7 px-6 rounded-3xl md:gap-[212px] md:py-9 md:px-16 mt-5">
          <h1 className="text-[32px] md:text-[40px] text-white font-integralcf leading-9 md:leading-11">Stay Upto Date About Our Latest Offers</h1>
          <div className="flex flex-col gap-3 md:w-1/2">
            <form className="relative">
              <img src="emailLogo.png" alt="emaillogo" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input type="email" placeholder="Enter your email address" className="py-3 pr-4 pl-12 bg-white rounded-full w-full"/>
            </form>
            <button type="submit" className="w-full py-3 bg-white rounded-full font-satoshi">Subscribe to Newsletter</button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Shop