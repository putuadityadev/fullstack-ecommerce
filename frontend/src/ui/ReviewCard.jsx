

const ReviewCard = () => {
  return (
    <div className="w-full h-fit border border-gray-200 p-6 rounded-[20px]">
      <div className="flex flex-col gap-3">
        <img src="4.5.svg" alt="star" className="w-[107px]"/>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <h2 className="font-satoshi text-base font-bold">Samantha D.</h2>
              <img src="verify.svg" alt="verify" />
            </div>
            <p className="font-satoshi text-sm font-extralight opacity-50">
            &quot;I absolutely love this t shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It&apos;s become my favorite go-to shirt.&quot;
            </p>
          </div>
          <span className="font-satoshi text-sm ">Posted on August 14, 2023</span>
        </div>
      </div>
    </div>
  )
}

export default ReviewCard