import React, { useState, useEffect } from "react";

const Home = () => {
  const banners = [
     "https://maxsecureltd.com/wp-content/uploads/2022/09/security-trained-photo.webp",   
     "https://eagleprotectivegroup.com/wp-content/uploads/2015/05/securityservices-1.jpg",
    "https://www.checkxperts.com/blog/_next/image?url=https%3A%2F%2Fcxp-blog-images.s3.ap-southeast-1.amazonaws.com%2F1724492696_2024-08-24_14-44-20.jpeg&w=3840&q=75",
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="h-[550px] w-full relative">
      {/* Banner Images */}
      <div className="h-full w-full overflow-hidden relative">
        {banners.map((banner, index) => (
          <img
            key={index}
            src={banner}
            alt={`Banner ${index + 1}`}
            className={`absolute h-full w-full object-cover transition-opacity duration-1000 ${
              index === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-70">
        <h1 className="text-white text-4xl md:text-6xl font-bold tracking-wider">
          Welcome to <span className="text-orange-500">NSS</span>
        </h1>
        <p className="text-white text-xl tracking-widest">National Security Supply & Service </p>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <div
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Home;
