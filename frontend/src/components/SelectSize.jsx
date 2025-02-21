import { useState } from "react"
import { useParams } from "react-router-dom"

const SelectSize = ({productSizes}) => {
  const params = useParams()
  const id = params.id
  const [selectedSize, setSelectedSize] = useState(() => {
    return localStorage.getItem(`size.${id}`) || ""
  })
  

  const handleSelectSize = (size) => {
    if(selectedSize === size) {
      setSelectedSize("")
      localStorage.setItem(`size.${id}`, "")
    } else {
      localStorage.setItem(`size.${id}`, size)

      setSelectedSize(size)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {(productSizes ?? []).map((size) => (
        <button
          key={size}
          className={`${size === selectedSize ? 'bg-primary text-white' : 'bg-[#F0F0F0] text-primary hover:bg-primary/10'} py-[10px] px-5 rounded-full  font-satoshi text-sm hover:cursor-pointer`}
          onClick={() => handleSelectSize(size)}
        >
          {size} 
        </button>
      ))}
    </div>
  )
}

export default SelectSize