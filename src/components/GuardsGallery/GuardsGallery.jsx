import { useState, useEffect } from 'react';

const GuardsGallery = () => {
  // Sample guard data - you can replace with actual data
  const guards = [
    {
      id: 1,
      name: "Professional Security Guard",
      image: "/src/assets/image/BannerImg/AllGards-1.jpg",
      role: "Corporate Security"
    },
    {
      id: 2,
      name: "Residential Security Expert",
      image: "/src/assets/image/BannerImg/AllGards-2.jpg",
      role: "Residential Security"
    },
    {
      id: 3,
      name: "Event Security Specialist",
      image: "/src/assets/image/BannerImg/AllGards-3.jpg",
      role: "Event Security"
    },
    {
      id: 4,
      name: "Personal Protection Officer",
      image: "/src/assets/image/BannerImg/AllGards-4.jpg",
      role: "Personal Security"
    },
    {
      id: 5,
      name: "Security Team Leader",
      image: "/src/assets/image/Guard-1.png",
      role: "Team Leadership"
    },
    {
      id: 6,
      name: "Night Security Guard",
      image: "/src/assets/image/BannerImg/AllGards-1.jpg",
      role: "Night Security"
    },
    {
      id: 7,
      name: "Mobile Security Patrol",
      image: "/src/assets/image/BannerImg/AllGards-2.jpg",
      role: "Mobile Patrol"
    },
    {
      id: 8,
      name: "Access Control Specialist",
      image: "/src/assets/image/BannerImg/AllGards-3.jpg",
      role: "Access Control"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 8 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        // For desktop (4 cards), move by 4. For mobile (2 cards), move by 2
        const cardsPerView = window.innerWidth >= 768 ? 4 : 2;
        const nextIndex = prevIndex + cardsPerView;
        return nextIndex >= guards.length ? 0 : nextIndex;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, [guards.length]);


  const nextSlide = () => {
    const cardsPerView = window.innerWidth >= 768 ? 4 : 2;
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + cardsPerView;
      return nextIndex >= guards.length ? 0 : nextIndex;
    });
  };

  const prevSlide = () => {
    const cardsPerView = window.innerWidth >= 768 ? 4 : 2;
    setCurrentIndex((prevIndex) => {
      const prevIdx = prevIndex - cardsPerView;
      return prevIdx < 0 ? Math.max(0, guards.length - cardsPerView) : prevIdx;
    });
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-orange-600 mb-4">Our Professional Guards</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet our highly trained and experienced security professionals dedicated to your safety
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Cards Container */}
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / (window.innerWidth >= 768 ? 4 : 2))}%)` }}
            >
              {guards.map((guard) => (
                <div
                  key={guard.id}
                  className="w-1/2 md:w-1/4 flex-shrink-0 px-2"
                >
                  <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <div className="aspect-w-3 aspect-h-4">
                      <img
                        src={guard.image}
                        alt={guard.name}
                        className="w-full h-64 object-cover"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400/f97316/ffffff?text=Security+Guard';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2">
                        {guard.name}
                      </h3>
                      <p className="text-orange-600 font-medium text-sm">
                        {guard.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50 z-10"
            aria-label="Previous slide"
          >
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:bg-orange-50 z-10"
            aria-label="Next slide"
          >
            <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: Math.ceil(guards.length / (window.innerWidth >= 768 ? 4 : 2)) }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index * (window.innerWidth >= 768 ? 4 : 2))}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                Math.floor(currentIndex / (window.innerWidth >= 768 ? 4 : 2)) === index
                  ? 'bg-orange-600'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuardsGallery;
