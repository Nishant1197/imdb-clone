import React from 'react';
import Image from "./BannerImg.jpg"
function Banner() {
  return (
  
    <div className={`bg-[url(${Image})] h-[42vh] md:h-[62vh]
    bg-center bg-cover flex justify-center items-end`}>
      <div className='text-white bg-black text-xl md:text-3xl px-4 bg-opacity-50 py-4' >Spider Man: No way Home</div>
  </div>
  )
}

export default Banner;
