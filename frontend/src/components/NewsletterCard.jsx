

const NewsletterCard = () => {
  return (
    <div className="w-full bg-primary flex flex-col md:flex-row gap-8 py-7 px-6 rounded-3xl md:gap-[212px] md:py-9 md:px-16 mt-5">
      <h1 className="text-[32px] md:text-[40px] text-white font-integralcf leading-9 md:leading-11">Stay Upto Date About Our Latest Offers</h1>
      <div className="flex flex-col gap-3 md:w-1/2">
        <form className="relative">
          <img src="emailLogo.png" alt="emaillogo" className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input type="email" placeholder="Enter your email address" className="py-3 pr-4 pl-12 bg-white rounded-full w-full"/>
        </form>
        <button type="submit" className="w-full py-3 bg-white rounded-full font-satoshi">Subscribe to Newsletter</button>
      </div>
    </div>
  )
}

export default NewsletterCard