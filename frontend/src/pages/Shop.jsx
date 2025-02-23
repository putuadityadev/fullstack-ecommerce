import ProductCard from "../components/productCard"
import { FaAngleRight } from "react-icons/fa6";
import SliderPrice from "../ui/Slider";
import CheckBoxColor from "../ui/CheckBoxColor";
import { useState, useEffect } from "react";
import SizeButton from "../ui/SizeButton";
import Pagenation from "../components/Pagenation";
import { filterList, colors, sizes, dressStyles } from "../../data";
import { getProducts } from "../../data/api"
import NewsletterCard from "../components/NewsletterCard";


const Shop = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [products, setProducts] = useState([])
  const [sizeSelected, setSizeSelected] = useState(null);
  const [filterOpenned, setFilterOpenned] = useState(false)

  const handleCheckColor = (value) => {
    setSelectedValue(selectedValue === value ? null : value)
  }
  
  const handleCheckSize = (i) => {
    setSizeSelected(sizeSelected === i ? null : i)
  }

  function toggleFilter() {
    !filterOpenned ? setFilterOpenned(true) : setFilterOpenned(false)
  }

  const [currentPage, setCurrentPage] = useState(1)
  const [postPerPage, setPostPerPage] = useState(8)

  const lastPostIndex = currentPage * postPerPage;
  const firstPostIndex = lastPostIndex  - postPerPage;
  const currentPosts = products.slice(firstPostIndex, lastPostIndex)

  useEffect(() => {
    async function loadProducts() {
      let data = await getProducts()
      setProducts(data)
    }
    loadProducts()
  }, [])

  // add to cart
  const [cartData, setCartData] = useState(() => {
    const localData = localStorage.getItem("cart")
    return localData ? JSON.parse(localData) : []
  })
  const handleAddToCart = (id) => {
    const product = products.find(p => p._id === id)
    const updatedCart = cartData.some(item => item.id === id)
      ? cartData.map(item => 
        item.id === id
          ? {...item, quantity: item.quantity + 1}
          : item
      )
      : [
        ...cartData,
          {
            id: product.id,
            color: product.colors[0],
            imageId: product.imageId,
            price: product.price,
            productName: product.productName,
            quantity: 1,
            size: product.sizes[0]
          }
      ]
    console.log(updatedCart)
    setCartData(updatedCart)
    localStorage.setItem("cart", JSON.stringify(updatedCart))
  }
  useEffect(() =>{
    const totalQuantity = cartData.reduce((total, item) => total + item.quantity, 0);
    localStorage.setItem("cartQuantity", totalQuantity);
  }, [cartData])
  
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
                      {filter.name}
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
                {colors.map((color) => (
                  <CheckBoxColor 
                    key={color.value}
                    value={color.value}
                    color={color.color}
                    isSelected={selectedValue === color.value}
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
                   size={size.size}
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
                      {style.name}
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
          <div className="w-full md:w-[75dvw] mt-5 h-fit">
            <div className="flex justify-between items-center"> 
              <div className="flex gap-2 items-end">
                <h2 className="font-satoshi text-2xl text-primary font-bold leading-none">Casual</h2>
                <span className="font-satoshi text-sm text-primary opacity-60 leading-none">Showing 1-{postPerPage} of {products.length} Products</span>
              </div>
              <button className="w-8 h-8 bg-[#F0F0F0] flex items-center justify-center rounded-full md:hidden" onClick={toggleFilter}>
                <img src="/filter-icon.png" alt="filter-icon" className="object-contain"/>
              </button>
            </div>

            <div>
              <div className="grid grid-cols-2 md:grid-cols-3 mt-7 gap-x-[14px] gap-y-6 md:gap-x-5 md:gap-y-9">
                {currentPosts.map(({_id, productName, price, description, sizes, colors, imageId, discount}) => (
                  <ProductCard
                    key={_id}
                    productName={productName}
                    price={price}
                    description={description}
                    sizes={sizes}
                    colors={colors}
                    imageId={imageId}
                    discount={discount}
                    id={_id}
                    clickAddToCart={() => handleAddToCart(_id)}
                  />
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

        <NewsletterCard />      
        
      </div>
    </section>
  )
}

export default Shop