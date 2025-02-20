import NewsletterCard from "../components/NewsletterCard"
import ProductCard from "../components/productCard"
import Reviews from "../components/Reviews"


const ProductDetails = () => {
  return (
    <main className="section-container mt-10">
      <article className="mb-12">
        {/* Image Section */}
        <section className="flex flex-col gap-3">
          <div className="w-[358px] h-[290px] rounded-2xl overflow-hidden bg-red-300">
            <img src="tshirt.png" alt="product-image" className="object-cover w-full h-full" />
          </div>
          <div className="flex justify-between">
            <div className="w-[111px] h-[106px] rounded-2xl overflow-hidden border border-primary">
              <img src="tshirt.png" alt="product-image" className="object-cover w-full h-full" />
            </div>
            <div className="w-[111px] h-[106px] rounded-2xl overflow-hidden">
              <img src="tshirt.png" alt="product-image" className="object-cover w-full h-full" />
            </div>
            <div className="w-[111px] h-[106px] rounded-2xl overflow-hidden">
              <img src="tshirt.png" alt="product-image" className="object-cover w-full h-full" />
            </div>
          </div>
        </section>

        {/* Product Detail Section */}
        <section className="mt-5">
          <div className="flex flex-col gap-2">
            <h1 className="font-integralcf font-bold text-primary text-2xl">
              Gradient Graphic shirt
            </h1>
            <div className="flex items-center gap-3">
              <img src="../public/3.5.png" alt="stars" className="w-20 xl:w-24"/>
              <span className="text-sm xl:text-sm">3.5/5</span>
            </div>
            <h2 className="font-satoshi flex gap-2 text-2xl font-semibold items-center xl:text-2xl xl:gap-3">
              $260
              <span className={`opacity-40 line-through`}>$300</span>
              <span className={`text-sm font-light text-red-500 bg-red-100 py-1 px-3 rounded-full xl:text-sm`}>20%</span>
            </h2>
            <p className="font-satoshi text-sm opacity-60 mt-2">
              This graphic t-shirt which is perfect for any occasion. Crafted from a soft and breathable fabric, it offers superior   comfort and style.
            </p>
          </div>
          <hr className="my-6 opacity-10"/>
          <div className="flex flex-col gap-2">
            <h2 className="font-satoshi text-base opacity-60">Select Colors</h2>
            <div className="flex gap-2">
              <button className="w-10 h-10 rounded-full bg-indigo-600"/>
              <button className="w-10 h-10 rounded-full bg-green-600"/>
              <button className="w-10 h-10 rounded-full bg-pink-600"/>
            </div>
          </div>
          <hr className="my-6 opacity-10"/>
          <div className="flex flex-col gap-2">
            <h2 className="font-satoshi text-base opacity-60">Choose Size</h2>
            <div className="flex flex-wrap gap-2">
              <button className="py-[10px] px-5 bg-[#F0F0F0] rounded-full hover:bg-primary hover:text-white font-satoshi text-sm">
                Small
              </button>
              <button className="py-[10px] px-5  rounded-full bg-primary text-white font-satoshi text-sm">
                Medium
              </button>
              <button className="py-[10px] px-5 bg-[#F0F0F0] rounded-full hover:bg-primary hover:text-white font-satoshi text-sm">
                Large
              </button>
            </div>
          </div>
          <hr className="my-6 opacity-10"/>
          <div className="flex w-full gap-3">
            <div className="py-3 px-5 flex justify-between items-center w-[35%] bg-[#F0F0F0] rounded-full">
              <button>
                <img src="minus.png" alt="minus-button" className="w-3 h-3"/>
              </button>
              <span className="font-satoshi text-base text-primary">1</span>
              <button>
                <img src="plus.png" alt="plus-button" className="w-3 h-3"/>
              </button>
            </div>
            <button className="py-3 px-14 bg-primary font-satoshi text-white rounded-full w-[65%]">
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
          <h1 className="font-integralcf text-primary font-bold text-[32px] text-center text-balance leading-9">
            You might also like
          </h1>
          <div className="flex w-full gap-4 overflow-x-auto">
            <ProductCard className="flex-none"/>
            <ProductCard />
            <ProductCard />
            <ProductCard />
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