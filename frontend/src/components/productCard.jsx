

const ProductCard = () => {
  return (
    <div className="flex flex-col w-[172px] gap-[10px] md:w-fit section-container">
      <div className="bg-[#F0EEED] w-[172px] h-[172px] rounded-xl overflow-hidden flex items-center justify-center md:w-[295px] md:h-[298px]">
        <img
        src="../public/tshirt.png"
        alt=""
        className="object-cover"
        />
      </div>

      <div className="flex flex-col md:gap-2">
        <h1 className="font-satoshi text-base font-bold truncate md:text-xl">Graident Graphic T-shirt</h1>
        <p className="flex items-center gap-3">
          <img src="../public/3.5.png" alt="stars" className="md:w-24"/>
          <span className="text-xs md:text-sm">3.5/5</span>
        </p>
        <h2 className="font-satoshi flex gap-1 text-xl font-semibold items-center md:text-2xl md:gap-3">
          $145
          <span className="opacity-40 line-through">$242</span>
          <span className="text-xs font-light text-red-500 bg-red-100 py-1 px-2 rounded-full md:text-sm">-20%</span>
        </h2>
      </div>
    </div>
  )
}

export default ProductCard