
import { FaCheck } from "react-icons/fa6";

const CheckBoxColor = ({ isSelected, onClick, value, color = 'bg-purple-900' }) => {
  return (
    <div>
      <button 
        onClick={() => onClick(value)}
        className={`w-9 h-9 ${color} rounded-full flex items-center justify-center ${color === 'bg-white' ? 'text-black' : 'text-white'} transition-all hover:opacity-90 border-primary border`}
      >
        <FaCheck className={`${!isSelected ? 'hidden' : ''} `}/>
      </button>
    </div>
  );
};

export default CheckBoxColor;