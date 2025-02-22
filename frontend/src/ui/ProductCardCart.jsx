

const ProductCardCart = ({productName, image, size, color, price, quantity, clickMinus, clickPlus, index}) => {
  return (
    <div>
      <div className="flex gap-3.5">
        <div className="w-[99px] h-[99px] md:w-[124px] md:h-[124px] overflow-hidden flex justify-center items-center rounded-lg" >
          <img src={image} alt="product-image" className="object-cover"/>
        </div>
        <div className="flex-grow flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <div className="flex flex-col font-satoshi">
              <h1 className="font-semibold text-base md:text-xl leading-none">{productName}</h1>
              <h2 className="text-xs md:text-sm mt-1">Size: <span className="opacity-60 text-black">{size}</span></h2>
              <h2 className="text-xs md:text-sm">Color: <span className="opacity-60 text-black">{color}</span></h2>
            </div>
            <img src="delete.svg" alt="delete-icon" />
          </div>
          <div className="flex justify-between">
            <h2 className="font-semibold text-xl md:text-2xl">${price}</h2>
            <div className="h-[31px] w-[105px] p-4 flex justify-between items-center bg-[#F0F0F0] rounded-full">
              <button  className="hover:cursor-pointer" onClick={() => clickMinus(index)}>
                <img src="minus.png" alt="minus-button" className="w-3 h-3"/>
              </button>
              <span className="font-satoshi text-base text-primary">{quantity}</span>
              <button className="hover:cursor-pointer" onClick={() => clickPlus(index)}>
                <img src="plus.png" alt="plus-button" className="w-3 h-3"/>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-primary/10 my-4"/>
    </div>
  )
}

export default ProductCardCart