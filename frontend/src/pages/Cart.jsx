import { FaArrowRight } from "react-icons/fa6"
import ProductCardCart from "../ui/ProductCardCart"
import NewsletterCard from "../components/NewsletterCard"
import { useEffect, useState } from "react"
import { URL } from "../../data/api"


const Cart = () => {
  // Collect Data from localStorage
  const [cartData, setCartData] = useState(() => {
    const localData = localStorage.getItem("cart")
    return localData ? JSON.parse(localData) : []
  })
  
  const [discount, setDiscount] = useState(false)
  const [priceTotal, setPriceTotal] = useState({
    subtotal: 0,
    discount: 0,
    deliveryFee: 0,
    totalPrice: 0
  })

  useEffect(() => {
   const newSubtotal = cartData.reduce((total, item) => {
    return total + (item.price * item.quantity)
   }, 0)

   const totalQuantity = cartData.reduce((total, item) => {
    return total + item.quantity
   }, 0)
   console.log(totalQuantity)
   
   let newDeliveryFee = 0
    if(totalQuantity > 20) {
      newDeliveryFee = 50
    } else if(totalQuantity > 10) {
      newDeliveryFee = 25
    } else if(totalQuantity > 3) {
      newDeliveryFee = 15
    }

   setPriceTotal({
    subtotal: newSubtotal,
    discount: discount ? 10 : 0,
    deliveryFee: newDeliveryFee,
    totalPrice: newSubtotal - newSubtotal* discount/100
   })
  }, [cartData, discount])

  const [codePromo, setCodePromo] = useState("")

  const handlePromo = (e) => {
    e.preventDefault()
    if(discount && codePromo === "adityapromo") {
      alert("Code already used")
    } else if (codePromo === "adityapromo") {
      setDiscount(true)
      alert("Succes you got 10% discount")
    } else {
      alert("Code promo invalid")
      setDiscount(false)
    }
  }

  //Logic quantity
  const handlePlusQuantity = (index) => {
    const newCartData = cartData.map((item, i) => {
      if(i === index) {
        return { ...item, quantity: item.quantity + 1 }
      }
      return item
    })
    setCartData(newCartData)
    localStorage.setItem("cart", JSON.stringify(newCartData))
  }

  const handleMinusQuantity = (index) => {
    const newCartData = cartData.map((item, i) => {
      if(i === index) {
        return {...item, quantity: item.quantity - 1}
      }
      console.log(item)
      return item
      
    })
    setCartData(newCartData)
    localStorage.setItem("cart", JSON.stringify(newCartData))
  }
  
  return (
    <main className="section-container text-primary mx-auto">
      <h1 className="font-integralcf font-bold text-[32px] md:text-[40px]">Your Cart</h1>
      <article className="flex flex-col md:flex-row w-full md:gap-5">
        {/* Cart */}
        <section className="w-full md:w-1/2 flex-grow">
          <div>
            <div className="w-full h-fit flex flex-col gap-4 p-3.5 border border-primary/10 rounded-[20px] mt-5">
              {cartData.map((product, i) => (
                <ProductCardCart
                  key={i}
                  productName={product.productName}
                  image= {`${URL}/images/${product.imageId}`}
                  size={product.size}
                  color={product.color.name}
                  price={product.price}
                  quantity={product.quantity}
                  index={i}
                  clickPlus={() => handlePlusQuantity(i)}
                  clickMinus={() => handleMinusQuantity(i)}
                />
              ))}
            </div>
          </div>
        </section>
        {/* Order Summary */}
        <section className="w-full md:w-1/3">
          <div className="font-satoshi flex flex-col gap-4 border border-primary/10 p-3.5 rounded-[20px] mt-5">
            <h1 className="font-bold text-[20px] md:text-2xl">Order Summary</h1>
            <div className="flex flex-col gap-5">
              <span className="flex justify-between">
                <h2 className="text-gray-500 md:text-xl">Subtotal</h2>
                <h2 className="font-semibold md:text-xl">${priceTotal.subtotal}</h2>
              </span>
              <span className="flex justify-between">
                <h2 className="text-gray-500 md:text-xl">Discount <span>(-{priceTotal.discount}%)</span></h2>
                <h2 className="font-semibold text-red-600 md:text-xl">-${priceTotal.subtotal * priceTotal.discount/100}</h2>
              </span>
              <span className="flex justify-between">
                <h2 className="text-gray-500 md:text-xl">Delivey Fee</h2>
                <h2 className="font-semibold md:text-xl">${priceTotal.deliveryFee}</h2>
              </span>
              <hr className="text-primary/10"/>
              <span className="flex justify-between">
                <h2 className="font-bold md:text-xl">Total</h2>
                <h2 className="font-semibold text-xl md:text-2xl">${priceTotal.totalPrice}</h2>
              </span>
            </div>
            <div className="flex flex-col gap-4">
              <form className="relative flex gap-3" onSubmit={handlePromo}>
                <input
                  type="text"
                  name="promo"
                  placeholder="Add promo code"
                  className="py-3.5 pl-12 bg-[#F0F0F0] rounded-full"
                  onChange={(e) => setCodePromo(e.target.value)}
                />
                <img src="promo.svg" alt="promo-icon"  className="absolute left-4 top-1/2 -translate-y-1/2"/>
                <button type="submit" className="text-white bg-primary rounded-full py-3 px-4 w-full hover:cursor-pointer">Apply</button>
              </form>
              <button className="text-white bg-primary rounded-full py-4 w-full flex justify-center items-center gap-3">
                <span>Go to Checkout</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </section>

      </article>
      <NewsletterCard />
    </main>
  )
}

export default Cart