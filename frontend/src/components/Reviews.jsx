import ReviewCard from "../ui/ReviewCard"


const Reviews = () => {
  return (
    <div className="flex flex-col gap-5 w-full">
      <div className="mt-5 flex justify-between">
        <div className="flex items-center gap-2">
          <h2 className="font-satoshi text-[20px] font-semibold">
            All Reviews
          </h2>
          <span className="font-satoshi text-sm opacity-60">
            (451)
          </span>
        </div>
        <div className="flex gap-2">
          <button className="w-10 h-10 rounded-full bg-[#F0F0F0] flex items-center justify-center">
            <img src="filter.svg" alt="" />
          </button>
          <button className="bg-primary text-white font-satoshi text-xs rounded-full py-3 px-4">
            Write a Review
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
        <ReviewCard />
      </div>
      
    </div>
  )
}

export default Reviews