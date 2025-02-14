

const SizeButton = ({size, isSelected, onClick, i}) => {
  return (
    <button 
    onClick={() => onClick(i)}
    className={`${isSelected ? 'bg-primary text-white' : ''} py-[10px] px-5 bg-[F0F0F0] rounded-full hover:bg-primary hover:text-white font-satoshi text-sm`}>
      {size}
    </button>
  )
}

export default SizeButton