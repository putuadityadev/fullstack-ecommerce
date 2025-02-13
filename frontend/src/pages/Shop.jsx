import ProductCard from "../components/productCard"
import { IoIosClose } from "react-icons/io";
import { FaAngleRight } from "react-icons/fa6";
import SliderPrice from "../ui/Slider";
import CheckBoxColor from "../ui/CheckBoxColor";
import { useState } from "react";
import SizeButton from "../ui/SizeButton";

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

  return (
    <section className="section-container mt-10 overflow-hidden mx-auto">
      <div>
        <div>
          <span>Home</span>
          <span>Casual</span>
        </div>

        <div className="flex flex-col md:w-full">
          <div className="w-full md:w-[25dvw] bg-gray-100 absolute right-0 left-0 p-4 rounded-2xl">
            {/* Filter */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-satoshi text-xl font-bold text-primary">Filter</h2>
                <IoIosClose className="w-10 h-10 text-gray-500" />
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
            <div className="mt-5">
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
            <div>

            </div>
            <button>

            </button>
          </div>

          <div className="md:w-[75dvw] bg-purple-300">
            kanan
          </div>



        </div>







      </div>
    </section>
  )
}

export default Shop