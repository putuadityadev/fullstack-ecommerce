import { colors } from "../../data"
import { useState } from "react"
import { FaCheck } from "react-icons/fa6";
import { useParams } from "react-router-dom";

const SelectColor = ({productColors}) => {
  const params = useParams()
  const id = params.id
  const localColor = localStorage.getItem(`color.${id}`)
  const colorFilter = colors.filter(obj => (productColors ?? []).includes(obj.name))
  const [selectedColor, setSelectedColor] = useState(() => {
    return localColor ? JSON.parse(localColor) : {}
  })
  
  const handleClickColor = (color) => {
    if(selectedColor === color) {
      localStorage.setItem(`color.${id}`, "")
      setSelectedColor({})
    } else {
      localStorage.setItem(`color.${id}`, JSON.stringify(color))
      setSelectedColor(color)
    } 
    
  }
  // Selected Color value

  return (
    <div>
      <form className="flex gap-4">
        {colorFilter.map((color) => (
            <button
              key={color.value}
              className={`flex items-center justify-center w-9 h-9 border border-primary/20 rounded-full ${color.color} hover:cursor-pointer`}

              onClick={() => handleClickColor(color)}
              > 
                <FaCheck className={`${color.name == "White" ? 'text-primary' : 'text-white'} w-5 h-5} ${color.value !== selectedColor.value && 'hidden'}`}/>
            </button>
        ))}
      </form>
    </div>
  )
}

export default SelectColor