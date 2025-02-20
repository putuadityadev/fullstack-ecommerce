import { Image } from "@heroui/react"
import { URL } from "../../data/api"
import { Link } from "react-router-dom"

const ProductCard = ({productName, price,  imageId, discount, id}) => {
  return (
    <Link to={`/product/${id}`} className="flex flex-col w-[172px] gap-[10px] xl:w-fit">
      <div className="bg-[#F0EEED] w-[172px] h-[172px] rounded-xl overflow-hidden flex items-center justify-center xl:w-[295px] xl:h-[298px]">
        <Image
        isZoomed
        src={`${URL}/images/${imageId}`}
        alt=""
        className="object-cover"
        />
      </div>

      <div className="flex flex-col xl:gap-2">
        <h1 className="font-satoshi text-base font-bold truncate xl:text-xl">{productName}</h1>
        <p className="flex items-center gap-3">
          <img src="../public/3.5.png" alt="stars" className="xl:w-24"/>
          <span className="text-xs xl:text-sm">3.5/5</span>
        </p>
        <h2 className="font-satoshi flex gap-1 text-xl font-semibold items-center xl:text-2xl xl:gap-3">
          ${price - (price * (discount / 100))}
          <span className={`${discount === 0 ? 'hidden' : ''} opacity-40 line-through`}>${price}</span>
          <span className={`${discount === 0 ? 'hidden' : ''} text-xs font-light text-red-500 bg-red-100 py-1 px-2 rounded-full xl:text-sm`}>{discount}%</span>
        </h2>
      </div>

      <div className="flex gap-2 flex-col md:flex-row">
        <button className="border py-2 px-5 rounded-xl border-primary font-satoshi hover:cursor-pointer">Add to Cart</button>
        <button className="py-2 px-5 bg-primary/10 text-primary rounded-xl font-semibold hover:cursor-pointer">Buy Now</button>
      </div>
    </Link>
  )
}

export default ProductCard