import { FaArrowLeft, FaArrowRight } from "react-icons/fa6"

const Pagenation = ({ totalPosts, postsPerPage, setCurrentPage, currentPage }) => {
  let pages = [];

  for(let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pages.push(i);
  }

  const handleNext = () => {
    if(currentPage < pages.length) {
      setCurrentPage(currentPage + 1)
    } else {
      return
    }
  }

  const handlePrevious = () => {
    if(currentPage >= pages[1]) {
      setCurrentPage(currentPage -1)
    } else {
      return
    }
  }

  return (
    <div className="my-5 flex gap-2 justify-between">
      <button
        className="flex items-center gap-2 py-2 px-3 border rounded-lg border-gray-300 font-satoshi text-primary text-xs"
        onClick={handlePrevious}
      >
        <FaArrowLeft className="w-4 h-4"/>
        Previous
      </button>
      {pages.map((page, i) => (
        <button 
          key={i}
          className={`${page === currentPage ? 'bg-gray-200' : ''}  text-primary w-9 h-9 flex items-center justify-center rounded-lg hover:cursor-pointer`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}
      <button
        className="flex items-center gap-2 py-2 px-3 border rounded-lg border-gray-300 font-satoshi text-primary text-xs"
        onClick={handleNext}
      >
        Next
        <FaArrowRight className="w-4 h-4"/>
      </button>
    </div>
  )
}

export default Pagenation