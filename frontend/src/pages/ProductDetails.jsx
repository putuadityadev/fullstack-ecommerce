import NewsletterCard from "../components/NewsletterCard"
import ProductCard from "../components/productCard"
import Reviews from "../components/Reviews"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { getProduct, getProducts, URL } from "../../data/api"
import { discountCal, colors } from "../../data"


const ProductDetails = () => {
  let params = useParams()
  let id = params.id
  const [product, setProduct] = useState({})
  const [recProduct, setRecProduct] = useState([])
  const [randomProducts, setRandomProducts] = useState([])

  useEffect(() => {
    const loadProduct = async () => {
      try{
        let productData = await getProduct(id)
        setProduct(productData)
      } catch (err) {
        console.error("Error fetching product details:", err);
        throw err;
      }
    }
    loadProduct()
  }, [id])


  useEffect(() => {
    const loadAllProducts = async () => {
      try{
        let productData = await getProducts()
        setRecProduct(productData)
      } catch (err) {
        console.error("Error fetching product details:", err);
        throw err;
      }
    }
    loadAllProducts()
  })

  // Shuffle Random Products
  const [hasRandom, setHasRandom] = useState(false)
  useEffect(() => {
    if(recProduct.length > 0 && !hasRandom) {
      const shuffled = recProduct && [...recProduct].sort(() => 0.5 - Math.random())
      setRandomProducts(shuffled.slice(0,5))
      setHasRandom(true)
    } else {
      return
    }
  }, [recProduct, hasRandom])

  const imageProduct = `${URL}/images/${product.imageId}`
  const colorFilter = colors.filter(obj => (product.colors ?? []).includes(obj.name))
  
  

  return (
    <main className="section-container mt-10 mx-auto">
      <article className="mb-12 w-full flex flex-col md:flex-row gap-10">
        {/* Image Section */}
        <section className="flex flex-col gap-3 md:flex-row w-fit h-fit">
          <div className="w-[358px] h-[290px] md:w-[444px] md:h-[530px] rounded-2xl overflow-hidden md:order-2">
            <img src={imageProduct} alt="product-image" className="object-cover w-full h-full" />
          </div>
          <div className="flex justify-between md:order-1 md:flex-col">
            <div className="w-[111px] h-[106px] md:w-[152px] md:h-[167px] rounded-2xl overflow-hidden border border-primary">
              <img src={imageProduct} alt="product-image" className="object-cover w-full h-full" />
            </div>
            <div className="w-[111px] h-[106px] md:w-[152px] md:h-[167px] rounded-2xl overflow-hidden">
              <img src={imageProduct} alt="product-image" className="object-cover w-full h-full" />
            </div>
            <div className="w-[111px] h-[106px] md:w-[152px] md:h-[167px] rounded-2xl overflow-hidden">
              <img src={imageProduct} alt="product-image" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>

        {/* Product Detail Section */}
        <section className="mt-5 md:mt-0">
          <div className="flex flex-col gap-2">
            <h1 className="font-integralcf font-bold text-primary text-2xl md:text-[40px]  md:-mt-4">
              {product.productName}
            </h1>
            <div className="flex items-center gap-3">
              <img src="../public/4.5.svg" alt="stars" className="w-20 md:w-[139px]"/>
              <span className="text-sm xl:text-sm">4.5/5</span>
            </div>
            <h2 className="font-satoshi flex gap-2 text-2xl font-semibold items-center md:text-[32px] xl:gap-3">
              ${discountCal(product.discount, product.price)}
              <span className={`${product.discount == 0 && 'hidden'} opacity-40 line-through`}>{product.price}</span>
              <span className={`${product.discount == 0 && 'hidden'} text-sm font-light text-red-500 bg-red-100 py-1 px-3 rounded-full xl:text-sm`}>{product.discount}%</span>
            </h2>
            <p className="font-satoshi text-sm md:text-base opacity-60 mt-2">
              {product.description && product.description.slice(0, 200)}...
            </p>
          </div>
          <hr className="my-6 opacity-10"/>
          <div className="flex flex-col gap-2">
            <h2 className="font-satoshi text-base opacity-60">Select Colors</h2>
            <div className="flex gap-2">
              {colorFilter.map((color) => (
                <button key={color.value} className={`w-10 h-10 rounded-full border border-primary/20 ${color.color}`}/>
              ))}
            </div>
          </div>
          <hr className="my-6 opacity-10"/>
          <div className="flex flex-col gap-2">
            <h2 className="font-satoshi text-base opacity-60">Choose Size</h2>
            <div className="flex flex-wrap gap-2">
              {(product.sizes ?? []).map((size) => (
                <button
                  key={size}
                  className="py-[10px] px-5 bg-[#F0F0F0] rounded-full hover:bg-primary hover:text-white font-satoshi text-sm"
                >
                {size}
              </button>
              ))}
            </div>
          </div>
          <hr className="my-6 opacity-10"/>
          <div className="flex w-full gap-3">
            <div className="py-3 px-5 md:py-4 flex justify-between items-center w-[35%] bg-[#F0F0F0] rounded-full">
              <button>
                <img src="minus.png" alt="minus-button" className="w-3 h-3 md:w-6 md:h-6"/>
              </button>
              <span className="font-satoshi text-base font-bold text-primary">1</span>
              <button>
                <img src="plus.png" alt="plus-button" className="w-3 h-3 md:w-6 md:h-6"/>
              </button>
            </div>
            <button className="py-3 px-14 md:py-4 bg-primary font-satoshi text-white rounded-full w-[65%]">
              Add to Cart
            </button>
          </div>
        </section>
      </article>

      {/* Detail, Rating, FAQs */}
      <article>
        <nav>
          <div className="flex justify-between relative">
            <button className="flex flex-col font-satoshi text-base opacity-60">
              <span className="mb-3">Product Details</span>
            </button>
            <button className="flex flex-col font-satoshi text-base text-primary font-semibold opacity-100 border-b-2">
              <span className="mb-3">Rating & Reviews</span>
            </button>
            <button className="flex flex-col font-satoshi text-base opacity-60">
              <span className="mb-3">FAQs</span>
            </button>
            <hr className="absolute bottom-0 left-0 right-0 opacity-10"/>
          </div>
        </nav>
        <section className="flex flex-col justify-center items-center gap-5">
          <Reviews />
          <button className="border border-gray-200 rounded-full py-3.5 px-9 font-satoshi text-sm text-primary">
            Load More Reviews
          </button>
        </section>

        <section className="mt-12 flex flex-col gap-9">
          <h1 className="font-integralcf text-primary font-bold text-[32px] md:text-5xl text-center text-balance leading-9">
            You might also like
          </h1>
          <div className="flex w-full gap-4 overflow-x-auto " style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none', 
          }}>
            {randomProducts.map(({_id, productName, price, imageId, discount}) => (
              <div key={_id}>
                <ProductCard
                  productName={productName}
                  price={price}
                  imageId={imageId}
                  discount={discount}
                  id={_id}
                />
              </div>
            ))}
          </div>  
        </section>

        <section className="mt-12">
          <NewsletterCard />
        </section>
      </article>
    </main>
  )
}

export default ProductDetails