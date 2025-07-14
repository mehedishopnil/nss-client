import React, { useEffect, useState } from "react";
import AllGard1 from "../../../assets/image/BannerImg/AllGards-1.jpg";
import AllGard2 from "../../../assets/image/BannerImg/AllGards-2.jpg";
import AllGard3 from "../../../assets/image/BannerImg/AllGards-3.jpg";



const BannerSection = () => {
  const banners = [AllGard1, AllGard2, AllGard3];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="h-[450px] md:h-[550px] w-full relative">
      {/* Banner Images. Fit image width to screen and center it */}
      <div className="h-full w-full overflow-hidden relative flex items-center justify-center">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className={`absolute w-full h-auto object-cover object-center transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-60 px-4 text-center">
        <h1 className="text-white text-3xl md:text-5xl font-bold tracking-wider">
          Welcome to <span className="text-orange-500">NSS</span>
        </h1>
        <p className="text-white text-base md:text-xl md:tracking-widest mt-2">
          National Security Supply & Service
        </p>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-3 md:bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default BannerSection;
