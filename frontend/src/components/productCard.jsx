

const ProductCard = () => {
  return (
    <div className="flex flex-col w-[172px] gap-[10px] xl:w-fit">
      <div className="bg-[#F0EEED] w-[172px] h-[172px] rounded-xl overflow-hidden flex items-center justify-center xl:w-[295px] xl:h-[298px]">
        <img
        src="../public/tshirt.png"
        alt=""
        className="object-cover"
        />
      </div>

      <div className="flex flex-col xl:gap-2">
        <h1 className="font-satoshi text-base font-bold truncate xl:text-xl">Graident Graphic T-shirt</h1>
        <p className="flex items-center gap-3">
          <img src="../public/3.5.png" alt="stars" className="xl:w-24"/>
          <span className="text-xs xl:text-sm">3.5/5</span>
        </p>
        <h2 className="font-satoshi flex gap-1 text-xl font-semibold items-center xl:text-2xl xl:gap-3">
          $145
          <span className="opacity-40 line-through">$242</span>
          <span className="text-xs font-light text-red-500 bg-red-100 py-1 px-2 rounded-full xl:text-sm">-20%</span>
        </h2>
      </div>
    </div>
  )
}

export default ProductCard